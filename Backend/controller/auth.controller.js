import { authService } from "../service/auth.service.js";
import { generateToken } from "../utils/jwt.js";

class AuthController {
    constructor() {}

    signIn = async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send("All fields are required");
            }

            const user = await authService.signIn({ email, password });

            const token = generateToken(user);

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24,
                sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
            });

            res.status(200).send({ user });
        } catch (error) {
            res.status(400).json({
                message: error.message || "Internal server error",
            });
        }
    };

    signUp = async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).send("All fields are required");
            }
            if (password.length < 6) {
                return res
                    .status(400)
                    .send("Password must be at least 6 characters long");
            }

            const user = await authService.signUp({ name, email, password });

            if (!user) {
                return res.status(400).send("User already exists");
            }

            // Don't sign them in automatically, they need to verify email first

            res.status(201).json({
                message:
                    "Account created successfully! Please check your email to verify your account.",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    isVerified: user.isVerified,
                },
            });
        } catch (error) {
            res.status(400).json({
                message: error.message || "Internal server error",
            });
        }
    };

    googleAuth = async (req, res) => {
        try {
            const { token } = req.body;

            if (!token) {
                return res.status(400).json({ message: "No token provided" });
            }

            const response = await authService.googleAuth(token);

            const jwtToken = generateToken(response);

            res.cookie("token", jwtToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24,
                sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
            });

            res.status(200).json({ user: response });
        } catch (error) {
            console.error("Google Auth Error:", error);
            res.status(401).json({ message: "Invalid Google token" });
        }
    };

    signOut = async (req, res) => {
        res.clearCookie("token");
        res.status(200).send("Sign out successful");
    };

    verifyEmail = async (req, res) => {
        try {
            const { token } = req.body;

            console.log("Email verification request received:", {
                token: token ? token.substring(0, 16) + "..." : "undefined",
                hasToken: !!token,
            }); // Debug log

            if (!token) {
                return res
                    .status(400)
                    .json({ message: "Verification token is required" });
            }

            const user = await authService.verifyEmail(token);

            console.log("Email verification successful for user:", user.email); // Debug log

            res.status(200).json({
                message: "Email verified successfully! You can now sign in.",
                user,
            });
        } catch (error) {
            console.error("Email verification error:", error.message); // Debug log
            res.status(400).json({
                message: error.message || "Email verification failed",
            });
        }
    };

    resendVerificationEmail = async (req, res) => {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }

            const result = await authService.resendVerificationEmail(email);

            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                message: error.message || "Failed to resend verification email",
            });
        }
    };

    forgotPassword = async (req, res) => {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }

            const result = await authService.forgotPassword(email);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                message: error.message || "Failed to send password reset email",
            });
        }
    };

    resetPassword = async (req, res) => {
        try {
            const { token, password } = req.body;

            if (!token || !password) {
                return res
                    .status(400)
                    .json({ message: "Token and password are required" });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    message: "Password must be at least 6 characters long",
                });
            }

            const result = await authService.resetPassword(token, password);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                message: error.message || "Failed to reset password",
            });
        }
    };
}

export const authController = new AuthController();
