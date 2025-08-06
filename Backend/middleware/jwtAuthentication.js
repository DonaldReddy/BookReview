import jwt from "jsonwebtoken";
import { userRepository } from "../repository/user.repo.js";

export async function jwtAuthentication(req, res, next) {
	const token = req.cookies.token;
	if (!token) {
		return res.status(401).send("Access denied. No token provided.");
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		
		// Get the current user data to check verification status
		const user = await userRepository.findUserById(decoded.id);
		if (!user) {
			return res.status(401).send("User not found.");
		}

		// Check if email is verified (skip for Google auth users who don't have password)
		if (user.password && !user.isVerified) {
			return res.status(403).json({
				message: "Please verify your email before accessing this resource.",
				requiresVerification: true
			});
		}

		req.user = {
			...decoded,
			isVerified: user.isVerified
		};
		next();
	} catch (error) {
		return res.status(401).send("Unauthorized");
	}
}
