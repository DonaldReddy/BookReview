import { PrismaClient } from "@prisma/client";

async function addSampleBook() {
    const prisma = new PrismaClient();

    try {
        // Add a sample book with all required fields
        const book = await prisma.book.create({
            data: {
                title: "The Pragmatic Programmer",
                author: "Andrew Hunt, David Thomas",
                rating: Math.floor(4.5),
                ratingCount: 1, // Added missing field
                featured: "NO", // Added missing field
                genre: ["Programming"], // Changed to array as per schema
                description: "A guide to software development principles and best practices.",
                coverImage: "https://images.unsplash.com/photo-1545298555-1973656f4b9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        console.log("Sample book added:", book);
    } catch (error) {
        console.error("Error adding sample book:", error);
    } finally {
        await prisma.$disconnect();
    }
}

addSampleBook();
