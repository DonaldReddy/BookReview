import prisma from "../database/dbConnect.js";

class UserRepository {
	findUserByEmail = async (email) => {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		return user;
	};

	findUserById = async (id) => {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});
		return user;
	};

	createNewUser = async ({
		name,
		email,
		password = null,
		googleId = null,
		profileImage = null,
		role = "USER",
		isVerified = false,
		emailVerificationToken = null,
		tokenExpiresAt = null,
	}) => {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
				googleId,
				profileImage,
				role,
				isVerified,
				emailVerificationToken,
				tokenExpiresAt,
			},
		});
		return user;
	};

	updateUser = async (id, data) => {
		const user = await prisma.user.update({
			where: {
				id,
			},
			data,
		});
		return user;
	};

	// Find user by verification token
	findUserByVerificationToken = async (token) => {
		const user = await prisma.user.findFirst({
			where: {
				emailVerificationToken: token,
				tokenExpiresAt: {
					gt: new Date(), // Token must not be expired
				},
			},
		});
		return user;
	};

	// Update user verification status
	verifyUserEmail = async (userId) => {
		const user = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				isVerified: true,
				emailVerificationToken: null,
				tokenExpiresAt: null,
			},
		});
		return user;
	};

	// Update user verification token
	updateVerificationToken = async (userId, token, expiresAt) => {
		const user = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				emailVerificationToken: token,
				tokenExpiresAt: expiresAt,
			},
		});
		return user;
	};
}

export const userRepository = new UserRepository();
