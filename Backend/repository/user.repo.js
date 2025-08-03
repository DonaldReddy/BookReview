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
	}) => {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
				googleId,
				profileImage,
				role,
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

	// Password reset methods
	updateResetToken = async (email, resetToken, resetTokenExpiry) => {
		const user = await prisma.user.update({
			where: {
				email,
			},
			data: {
				resetToken,
				resetTokenExpiry,
			},
		});
		return user;
	};

	findUserByResetToken = async (resetToken) => {
		const user = await prisma.user.findFirst({
			where: {
				resetToken,
			},
		});
		return user;
	};

	updatePasswordAndClearToken = async (email, hashedPassword) => {
		const user = await prisma.user.update({
			where: {
				email,
			},
			data: {
				password: hashedPassword,
				resetToken: null,
				resetTokenExpiry: null,
			},
		});
		return user;
	};
}

export const userRepository = new UserRepository();
