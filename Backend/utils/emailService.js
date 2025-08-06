import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {
	constructor() {
		// Validate required environment variables
		if (!process.env.SMTP_USER || (!process.env.SMTP_PASS && !process.env.SMTP_PASSWORD)) {
			console.warn('⚠️  Email service: SMTP credentials not configured. Email features will be disabled.');
			this.isConfigured = false;
			return;
		}

		this.isConfigured = true;
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST || 'smtp.gmail.com',
			port: parseInt(process.env.SMTP_PORT) || 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.SMTP_USER, // your email
				pass: process.env.SMTP_PASS || process.env.SMTP_PASSWORD, // your email password or app password
			},
		});

		// Test the connection on startup
		this.verifyConnection();
	}

	async verifyConnection() {
		if (!this.isConfigured) return;
		
		try {
			await this.transporter.verify();
			console.log('✅ Email service: SMTP connection verified successfully');
		} catch (error) {
			console.error('❌ Email service: SMTP connection failed:', error.message);
			this.isConfigured = false;
		}
	}

	async sendVerificationEmail(email, name, verificationToken) {
		if (!this.isConfigured) {
			console.log('📧 Email service not configured. Verification email not sent.');
			console.log(`📋 Manual verification link: ${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`);
			return { success: false, message: 'Email service not configured' };
		}

		const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
		
		const mailOptions = {
			from: `"BookReview App" <${process.env.SMTP_USER}>`,
			to: email,
			subject: 'Verify Your Email Address',
			html: this.getVerificationEmailTemplate(name, verificationUrl),
		};

		try {
			const info = await this.transporter.sendMail(mailOptions);
			console.log('✅ Verification email sent:', info.messageId);
			return { success: true, messageId: info.messageId };
		} catch (error) {
			console.error('❌ Error sending verification email:', error);
			console.log(`📋 Manual verification link: ${verificationUrl}`);
			throw new Error('Failed to send verification email');
		}
	}

	async sendPasswordResetEmail(email, name, resetToken) {
		const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
		
		const mailOptions = {
			from: `"BookReview App" <${process.env.SMTP_USER}>`,
			to: email,
			subject: 'Reset Your Password',
			html: this.getPasswordResetEmailTemplate(name, resetUrl),
		};

		try {
			const info = await this.transporter.sendMail(mailOptions);
			console.log('Password reset email sent:', info.messageId);
			return { success: true, messageId: info.messageId };
		} catch (error) {
			console.error('Error sending password reset email:', error);
			throw new Error('Failed to send password reset email');
		}
	}

	getVerificationEmailTemplate(name, verificationUrl) {
		return `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Verify Your Email</title>
				<style>
					body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
					.container { max-width: 600px; margin: 0 auto; padding: 20px; }
					.header { background-color: #4f46e5; color: white; padding: 20px; text-align: center; }
					.content { padding: 20px; background-color: #f9f9f9; }
					.button { 
						display: inline-block; 
						padding: 12px 30px; 
						background-color: #4f46e5; 
						color: white; 
						text-decoration: none; 
						border-radius: 5px; 
						margin: 20px 0;
					}
					.footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<h1>Welcome to BookReview!</h1>
					</div>
					<div class="content">
						<h2>Hi ${name}!</h2>
						<p>Thank you for signing up to BookReview. To complete your registration, please verify your email address by clicking the button below:</p>
						<div style="text-align: center;">
							<a href="${verificationUrl}" class="button">Verify Email Address</a>
						</div>
						<p>This verification link will expire in 24 hours.</p>
						<p>If you didn't create an account with us, please ignore this email.</p>
						<p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
						<p style="word-break: break-all; color: #4f46e5;">${verificationUrl}</p>
					</div>
					<div class="footer">
						<p>&copy; 2025 BookReview. All rights reserved.</p>
					</div>
				</div>
			</body>
			</html>
		`;
	}

	getPasswordResetEmailTemplate(name, resetUrl) {
		return `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Reset Your Password</title>
				<style>
					body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
					.container { max-width: 600px; margin: 0 auto; padding: 20px; }
					.header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
					.content { padding: 20px; background-color: #f9f9f9; }
					.button { 
						display: inline-block; 
						padding: 12px 30px; 
						background-color: #dc2626; 
						color: white; 
						text-decoration: none; 
						border-radius: 5px; 
						margin: 20px 0;
					}
					.footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<h1>Password Reset Request</h1>
					</div>
					<div class="content">
						<h2>Hi ${name}!</h2>
						<p>We received a request to reset your password for your BookReview account. Click the button below to reset your password:</p>
						<div style="text-align: center;">
							<a href="${resetUrl}" class="button">Reset Password</a>
						</div>
						<p>This link will expire in 1 hour for security reasons.</p>
						<p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
						<p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
						<p style="word-break: break-all; color: #dc2626;">${resetUrl}</p>
					</div>
					<div class="footer">
						<p>&copy; 2025 BookReview. All rights reserved.</p>
					</div>
				</div>
			</body>
			</html>
		`;
	}
}

export const emailService = new EmailService();
