import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});

export async function connectToDatabase() {
    try {
        console.log("Connecting to database...");
        await prisma.$connect();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
    }
}

export default prisma;
