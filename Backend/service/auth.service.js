import { userRepository } from "../repository/user.repo.js";
import bcrypt from "bcrypt";

class AuthService {
	constructor() {}

	signIn = async ({ email, password }) => {
		const user = await userRepository.findUserByEmail(email);
		if (!user) {
			throw new Error("User not found");
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

	// 🆕 Google Auth Helpers
	findByEmail = async (email) => {
		return await userRepository.findUserByEmail(email);
	};

	createGoogleUser = async ({ name, email, googleId, picture }) => {
		const newUser = await userRepository.createNewUser({
			name,
			email,
			googleId,
			profileImage: picture,
			role: "USER",
		});

		if (!newUser) {
			throw new Error("Google user creation failed");
		}

		return {
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			role: newUser.role,
		};
	};
}

export const authService = new AuthService();
