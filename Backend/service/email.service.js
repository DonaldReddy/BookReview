import nodemailer from 'nodemailer';
import crypto from 'crypto';

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    // Generate a secure verification token
    generateVerificationToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    // Generate token expiration time (24 hours from now)
    generateTokenExpiration() {
        return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    }

    // Send email verification email
    async sendVerificationEmail(email, name, verificationToken) {
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
        
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Verify Your Email - BookReview',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Welcome to BookReview!</h2>
                    <p>Hi ${name},</p>
                    <p>Thank you for signing up for BookReview. To complete your registration, please verify your email address by clicking the button below:</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationUrl}" 
                           style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                            Verify Email Address
                        </a>
                    </div>
                    
                    <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; color: #007bff;">${verificationUrl}</p>
                    
                    <p><strong>This link will expire in 24 hours.</strong></p>
                    
                    <p>If you didn't create an account with BookReview, please ignore this email.</p>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 12px;">
                        This is an automated message from BookReview. Please do not reply to this email.
                    </p>
                </div>
            `,
            text: `
                Welcome to BookReview!
                
                Hi ${name},
                
                Thank you for signing up for BookReview. To complete your registration, please verify your email address by visiting this link:
                
                ${verificationUrl}
                
                This link will expire in 24 hours.
                
                If you didn't create an account with BookReview, please ignore this email.
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Verification email sent to ${email}`);
            return true;
        } catch (error) {
            console.error('Error sending verification email:', error);
            throw new Error('Failed to send verification email');
        }
    }

    // Send password reset email (for future use)
    async sendPasswordResetEmail(email, name, resetToken) {
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Reset Your Password - BookReview',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    <p>Hi ${name},</p>
                    <p>You requested to reset your password for your BookReview account. Click the button below to set a new password:</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" 
                           style="background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                            Reset Password
                        </a>
                    </div>
                    
                    <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; color: #dc3545;">${resetUrl}</p>
                    
                    <p><strong>This link will expire in 1 hour.</strong></p>
                    
                    <p>If you didn't request a password reset, please ignore this email.</p>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 12px;">
                        This is an automated message from BookReview. Please do not reply to this email.
                    </p>
                </div>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Password reset email sent to ${email}`);
            return true;
        } catch (error) {
            console.error('Error sending password reset email:', error);
            throw new Error('Failed to send password reset email');
        }
    }
}

export const emailService = new EmailService();
