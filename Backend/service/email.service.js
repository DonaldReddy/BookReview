import nodemailer from "nodemailer";
import { emailTemplates } from "../templates//email.templates.js";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_HOST = process.env.EMAIL_HOST || "EMAIL.gmail.com";
const EMAIL_PORT = process.env.EMAIL_PORT || 587;
const EMAIL_FROM = process.env.EMAIL_FROM;
const CLIENT_URL = process.env.FRONTEND_URL || "http://localhost:3000";

class EmailService {
    constructor() {
        // Validate required environment variables
        if (!EMAIL_USER || !EMAIL_PASS) {
            console.warn(
                "⚠️  Email service: EMAIL credentials not configured. Email features will be disabled."
            );
            this.isConfigured = false;
            return;
        }

        this.isConfigured = true;
        this.transporter = nodemailer.createTransport({
            host: EMAIL_HOST,
            port: parseInt(EMAIL_PORT),
            secure: false, // true for 465, false for other ports
            auth: {
                user: EMAIL_USER, // your email
                pass: EMAIL_PASS, // your email password or app password
            },
            from: EMAIL_FROM,
        });

        // Test the connection on startup
        this.verifyConnection();
    }

    async verifyConnection() {
        if (!this.isConfigured) return;

        try {
            await this.transporter.verify();
            console.log(
                "✅ Email service: EMAIL connection verified successfully"
            );
        } catch (error) {
            console.error(
                "❌ Email service: EMAIL connection failed:",
                error.message
            );
            this.isConfigured = false;
        }
    }

    async sendVerificationEmail(email, name, verificationToken) {
        if (!this.isConfigured) {
            console.log(
                "📧 Email service not configured. Verification email not sent."
            );
            console.log(
                `📋 Manual verification link: ${CLIENT_URL}/verify-email?token=${verificationToken}`
            );
            return { success: false, message: "Email service not configured" };
        }

        const verificationUrl = `${CLIENT_URL}/verify-email?token=${verificationToken}`;

        const mailOptions = {
            to: email,
            subject: "Verify Your Email Address",
            html: emailTemplates.verificationEmailTemplate(
                name,
                verificationUrl
            ),
            from: EMAIL_FROM,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log("✅ Verification email sent:", info.messageId);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error("❌ Error sending verification email:", error);
            console.log(`📋 Manual verification link: ${verificationUrl}`);
            throw new Error("Failed to send verification email");
        }
    }

    async sendPasswordResetEmail(email, name, resetToken) {
        const resetUrl = `${CLIENT_URL}/reset-password?token=${resetToken}`;

        const mailOptions = {
            to: email,
            subject: "Reset Your Password",
            html: emailTemplates.passwordResetEmailTemplate(name, resetUrl),
            from: EMAIL_FROM,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log("Password reset email sent:", info.messageId);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error("Error sending password reset email:", error);
            throw new Error("Failed to send password reset email");
        }
    }
}

export const emailService = new EmailService();
