import { reviewRepository } from "../repository/review.repo.js";

const AI_MODEL = process.env.AI_MODEL;
if (!AI_MODEL) {
    throw new Error("AI_MODEL environment variable is required");
}

class ReviewService {
    getReviews = async (bookId) => {
        const reviews = await reviewRepository.getReviews(bookId);
        return reviews;
    };

    addReview = async ({ bookId, userId, comment, rating }) => {
        const book = await bookRepo.getBookById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }

        const result = await reviewRepository.addReview({
            bookId,
            userId,
            comment,
            rating,
        });
        return result;
    };

    refineReview = async ({ comment, bookTitle, bookAuthor }) => {
        try {
            const response = await fetch(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${process.env.AI_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: AI_MODEL,
                        messages: [
                            {
                                role: "user",
                                content: `You are an expert editor. Your task is to refine the following book review for the book titled "${bookTitle}" by ${bookAuthor}:
										- Expand the review slightly by approximately 10% to enrich its details or descriptions.
										- Keep the total word count at or below 100 words.
										- Maintain the original tone, meaning, and sentiment.
										- Ensure excellent grammar, natural flow, and readability.
										- Do not introduce any new facts or opinions not present in the original comment.
										- Only return the refined review, wrapped with a single '#' character at the beginning and end.

										Here is the review:
										${comment}`,
                            },
                        ],
                    }),
                }
            );

            if (!response.ok) {
                const error = await response.text();
                throw new Error(`OpenRouter API Error: ${error}`);
            }

            const data = await response.json();
            const refined = data?.choices?.[0]?.message?.content;

            if (!refined) throw new Error("Invalid response from AI");

            // // Extract content between ##
            const match = refined.match(/#([\s\S]*?)#/);

            return match ? match[1].trim() : refined.trim();
        } catch (error) {
            console.error("Review refinement failed:", error);
            return comment; // fallback to original review
        }
    };
}

export const reviewService = new ReviewService();
