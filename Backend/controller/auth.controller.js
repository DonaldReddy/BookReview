import { OAuth2Client } from "google-auth-library";
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

    googleAuth = async (req, res) => {
        try {
            const { token } = req.body;

            if (!token) {
                return res.status(400).json({ message: "No token provided" });
            }

            const response = await authService.googleAuth(token);

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
                return res
                    .status(400)
                    .json({
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
