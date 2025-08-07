import crypto from "crypto";
import jwt from "jsonwebtoken";

// Generate a secure random verification token
export const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString("hex");
};

// Generate JWT token for email verification with expiration
export const generateEmailVerificationJWT = (email) => {
    return jwt.sign(
        { email, purpose: "email_verification" },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );
};

// Generate JWT token for password reset with expiration
export const generatePasswordResetJWT = (email) => {
    return jwt.sign(
        { email, purpose: "password_reset" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

// Verify and decode JWT token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};

// Calculate expiration time (24 hours from now for email verification)
export const getEmailVerificationExpiry = () => {
    return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
};

// Calculate expiration time (1 hour from now for password reset)
export const getPasswordResetExpiry = () => {
    return new Date(Date.now() + 60 * 60 * 1000); // 1 hour
};
