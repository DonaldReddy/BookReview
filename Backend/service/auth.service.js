import { OAuth2Client } from "google-auth-library";
import { userRepository } from "../repository/user.repo.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { emailService } from "../utils/emailService.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class AuthService {
	signIn = async ({ email, password }) => {
		const user = await userRepository.findUserByEmail(email);
		if (!user) {
			throw new Error("User not found");
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

		const newUser = await userRepository.createNewUser({
			name,
			email,
			password: hashPassword,
		});

		if (!newUser) {
			throw new Error("User creation failed");
		}

		return {
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			role: newUser.role,
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
			});
		} else {
			user = await userRepository.updateUser(user.id, {
				profileImage: picture,
				googleId: sub,
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

	// Password reset methods
	forgotPassword = async (email) => {
		const user = await userRepository.findUserByEmail(email);
		if (!user) {
			throw new Error("User not found");
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(32).toString('hex');
		const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

		// Save reset token to database
		await userRepository.updateResetToken(email, resetToken, resetTokenExpiry);

		// Try to send reset email
		try {
			await emailService.sendPasswordResetEmail(email, resetToken, user.name);
			return { message: "Password reset email sent successfully" };
		} catch (emailError) {
			console.error('Email sending failed:', emailError);
			// Even if email fails, token is saved, so provide helpful message
			throw new Error("Email service is not configured properly. Please check email settings. Reset token has been generated but email could not be sent.");
		}
	};

	resetPassword = async (token, newPassword) => {
		const user = await userRepository.findUserByResetToken(token);
		if (!user) {
			throw new Error("Invalid reset token");
		}

		// Check if token has expired
		if (user.resetTokenExpiry < new Date()) {
			throw new Error("Reset token has expired");
		}

		// Hash new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Update password and clear reset token
		await userRepository.updatePasswordAndClearToken(user.email, hashedPassword);

		return { message: "Password reset successfully" };
	};
}

export const authService = new AuthService();
