import jwt from "jsonwebtoken";

export function generateToken(user) {
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h",
        }
    );
    return token;
}

export function verifyToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
}
