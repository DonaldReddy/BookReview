import { userRepository } from "../repository/user.repo.js";

// Middleware to check if user's email is verified
export const requireEmailVerification = async (req, res, next) => {
    try {
        // This middleware should be used after JWT authentication middleware
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Authentication required" });
        }

        // Get user from database to check verification status
        const user = await userRepository.findUserById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if email is verified (skip for Google auth users or if password is null)
        if (user.password && !user.isVerified) {
            return res.status(403).json({ 
                message: "Email verification required. Please verify your email address to access this resource.",
                requiresVerification: true 
            });
        }

        // Add verified user info to request
        req.user.isVerified = user.isVerified;
        
        next();
    } catch (error) {
        console.error("Email verification middleware error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
