import nodemailer from "nodemailer";
import { passwordResetEmailTemplate } from "../templates/resetPassword.mail.js";

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || "smtp.gmail.com",
            port: parseInt(process.env.EMAIL_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendPasswordResetEmail(email, resetToken, userName) {
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Password Reset - BookReview",
            html: passwordResetEmailTemplate(userName, resetUrl),
        };

        try {
            await this.transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.error("Email sending failed:", error);
            throw new Error("Failed to send password reset email");
        }
    }

    async verifyConnection() {
        try {
            await this.transporter.verify();
            return true;
        } catch (error) {
            console.error("Email service connection failed:", error);
            return false;
        }
    }
}

export const emailService = new EmailService();
