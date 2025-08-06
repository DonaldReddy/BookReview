import { OAuth2Client } from "google-auth-library";
import { userRepository } from "../repository/user.repo.js";
import { emailService } from "../utils/emailService.js";
import { 
	generateVerificationToken, 
	getEmailVerificationExpiry,
	verifyToken 
} from "../utils/tokenUtils.js";
import bcrypt from "bcrypt";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class AuthService {
	signIn = async ({ email, password }) => {
		const user = await userRepository.findUserByEmail(email);
		if (!user) {
			throw new Error("User not found");
		}

		// Check if user has verified their email (only for regular email/password users)
		if (user.password && !user.isVerified) {
			throw new Error("Please verify your email before signing in");
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new Error("Invalid password");
		}

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			isVerified: user.isVerified,
		};
	};

	signUp = async ({ name, email, password }) => {
		const existingUser = await userRepository.findUserByEmail(email);
		if (existingUser) {
			throw new Error("User already exists");
		}

		const hashPassword = await bcrypt.hash(password, 10);
		
		// Generate verification token
		const verificationToken = generateVerificationToken();
		const verificationExpires = getEmailVerificationExpiry();

		const newUser = await userRepository.createNewUser({
			name,
			email,
			password: hashPassword,
			isVerified: false,
			verificationToken,
			verificationExpires,
		});

		if (!newUser) {
			throw new Error("User creation failed");
		}

		// Send verification email
		try {
			const emailResult = await emailService.sendVerificationEmail(email, name, verificationToken);
			if (!emailResult.success) {
				console.log('📧 Email service not configured. User can verify manually.');
			}
		} catch (error) {
			console.error("Failed to send verification email:", error);
			// Don't fail the signup process if email fails - user can request resend
		}

		return {
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			role: newUser.role,
			isVerified: newUser.isVerified,
		};
	};

	googleAuth = async (token) => {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();

		const { email, name, picture, sub } = payload;

		let user = await userRepository.findUserByEmail(email);

		if (!user) {
			user = await userRepository.createNewUser({
				name,
				email,
				profileImage: picture,
				googleId: sub,
				isVerified: true, // Google accounts are automatically verified
			});
		} else {
			user = await userRepository.updateUser(user.id, {
				profileImage: picture,
				googleId: sub,
				isVerified: true, // Update verification status for Google users
			});
		}

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			profileImage: user.profileImage,
			role: user.role,
			isVerified: user.isVerified,
		};
	};

	verifyEmail = async (token) => {
		console.log('Looking for user with verification token:', token.substring(0, 16) + '...'); // Debug log
		
		const user = await userRepository.findUserByVerificationToken(token);
		
		if (!user) {
			console.log('No user found with verification token'); // Debug log
			throw new Error("Invalid or expired verification token");
		}

		console.log('Found user:', user.email, 'isVerified:', user.isVerified, 'tokenExpires:', user.verificationExpires); // Debug log

		// If user is already verified, return success
		if (user.isVerified) {
			console.log('User is already verified:', user.email); // Debug log
			return {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
				isVerified: user.isVerified,
			};
		}

		// Check if token has expired
		if (user.verificationExpires && new Date() > user.verificationExpires) {
			console.log('Verification token has expired for user:', user.email); // Debug log
			throw new Error("Verification token has expired. Please request a new verification email.");
		}

		// Verify the user
		const verifiedUser = await userRepository.verifyUserEmail(user.id);
		
		console.log('User verification completed:', verifiedUser.email, 'isVerified:', verifiedUser.isVerified); // Debug log
		
		return {
			id: verifiedUser.id,
			name: verifiedUser.name,
			email: verifiedUser.email,
			role: verifiedUser.role,
			isVerified: verifiedUser.isVerified,
		};
	};

	resendVerificationEmail = async (email) => {
		const user = await userRepository.findUserByEmail(email);
		if (!user) {
			throw new Error("User not found");
		}

		if (user.isVerified) {
			throw new Error("Email is already verified");
		}

		// Generate new verification token
		const verificationToken = generateVerificationToken();
		const verificationExpires = getEmailVerificationExpiry();

		await userRepository.updateVerificationToken(user.id, verificationToken, verificationExpires);

		// Send new verification email
		await emailService.sendVerificationEmail(user.email, user.name, verificationToken);

		return { message: "Verification email sent successfully" };
	};
}

export const authService = new AuthService();
