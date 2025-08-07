import { PrismaClient } from "@prisma/client";

async function checkBooks() {
    const prisma = new PrismaClient();

    try {
        // Get all books
        const books = await prisma.book.findMany();
        console.log("Books in database:", books);

        // Get featured books
        const featuredBooks = await prisma.book.findMany({
            where: { featured: "YES" },
            orderBy: { createdAt: "desc" },
            take: 10
        });
        console.log("Featured books:", featuredBooks);

    } catch (error) {
        console.error("Error checking books:", error);
    } finally {
        await prisma.$disconnect();
    }
}

checkBooks();
