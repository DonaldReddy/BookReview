import { OAuth2Client } from "google-auth-library";
import { userRepository } from "../repository/user.repo.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { emailService } from "./email.service.js";

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

        const { email, name, picture: profileImage, sub: googleId } = payload;

        let user = await userRepository.findUserByEmail(email);

        if (!user) {
            user = await userRepository.createNewUser({
                name,
                email,
                profileImage,
                googleId,
            });
        } else {
            user = await userRepository.updateUser(user.id, {
                profileImage,
                googleId,
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

    forgotPassword = async (email) => {
        const user = await userRepository.findUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        await userRepository.updateResetToken(
            email,
            resetToken,
            resetTokenExpiry
        );

        await emailService.sendPasswordResetEmail(email, resetToken, user.name);
        return { message: "Password reset email sent successfully" };
    };

    resetPassword = async (token, newPassword) => {
        const user = await userRepository.findUserByResetToken(token);
        if (!user) {
            throw new Error("Invalid or expired reset token");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await userRepository.updatePasswordAndClearToken(
            user.email,
            hashedPassword
        );

        return { message: "Password reset successfully" };
    };
}

export const authService = new AuthService();
