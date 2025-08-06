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
        verificationToken = null,
        verificationExpires = null,
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
                verificationToken,
                verificationExpires,
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

    findUserByVerificationToken = async (token) => {
        // Find user with the verification token
        const user = await prisma.user.findFirst({
            where: {
                verificationToken: token,
            },
        });
        return user;
    };

    verifyUserEmail = async (id) => {
        const user = await prisma.user.update({
            where: {
                id,
            },
            data: {
                isVerified: true,
                // Keep the token for a short grace period to handle duplicate clicks
                // verificationToken: null,
                // verificationExpires: null,
            },
        });
        return user;
    };

    updateVerificationToken = async (id, token, expires) => {
        const user = await prisma.user.update({
            where: {
                id,
            },
            data: {
                verificationToken: token,
                verificationExpires: expires,
            },
        });
        return user;
    };

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
                resetTokenExpiry: {
                    gt: new Date(),
                },
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
