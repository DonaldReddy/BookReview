import jwt from "jsonwebtoken";

export async function jwtAuthentication(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send("Unauthorized");
    }
}
