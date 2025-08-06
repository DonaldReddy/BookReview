import { OAuth2Client } from "google-auth-library";
import { userRepository } from "../repository/user.repo.js";
import { emailService } from "./email.service.js";
import bcrypt from "bcrypt";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class AuthService {
	signIn = async ({ email, password }) => {
		const user = await userRepository.findUserByEmail(email);
		if (!user) {
			throw new Error("User not found");
		}

		// Check if user has verified their email (only for email/password login)
		if (user.password && !user.isVerified) {
			throw new Error("Please verify your email address before signing in");
		}

		const isPasswordValid = bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new Error("Invalid password");
		}

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		};
	};

	signUp = async ({ name, email, password }) => {
		const user = await userRepository.findUserByEmail(email);
		if (user) {
			throw new Error("User already exists");
		}

		const hashPassword = await bcrypt.hash(password, 10);

		// Generate verification token and expiration
		const verificationToken = emailService.generateVerificationToken();
		const tokenExpiresAt = emailService.generateTokenExpiration();

		const newUser = await userRepository.createNewUser({
			name,
			email,
			password: hashPassword,
			emailVerificationToken: verificationToken,
			tokenExpiresAt: tokenExpiresAt,
		});

		if (!newUser) {
			throw new Error("User creation failed");
		}

		// Send verification email
		try {
			await emailService.sendVerificationEmail(email, name, verificationToken);
		} catch (error) {
			console.error('Failed to send verification email:', error);
			// Don't fail signup if email fails, but log the error
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

		console.log("Google Auth Payload:", payload);

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
				isVerified: true, // Mark as verified if using Google auth
			});
		}

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			profileImage: user.profileImage,
			role: user.role,
		};
	};

	// Verify email with token
	verifyEmail = async (token) => {
		const user = await userRepository.findUserByVerificationToken(token);
		if (!user) {
			throw new Error("Invalid or expired verification token");
		}

		await userRepository.verifyUserEmail(user.id);

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			isVerified: true,
		};
	};

	// Resend verification email
	resendVerificationEmail = async (email) => {
		const user = await userRepository.findUserByEmail(email);
		if (!user) {
			throw new Error("User not found");
		}

		if (user.isVerified) {
			throw new Error("Email is already verified");
		}

		// Generate new verification token and expiration
		const verificationToken = emailService.generateVerificationToken();
		const tokenExpiresAt = emailService.generateTokenExpiration();

		// Update user with new token
		await userRepository.updateVerificationToken(user.id, verificationToken, tokenExpiresAt);

		// Send verification email
		await emailService.sendVerificationEmail(email, user.name, verificationToken);

		return { message: "Verification email sent successfully" };
	};
}

export const authService = new AuthService();
