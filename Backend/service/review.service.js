import { BookRepository } from "../repository/book.repo.js";
import { ReviewRepository } from "../repository/review.repo.js";

const reviewRepo = new ReviewRepository();
const bookRepo = new BookRepository();

export class ReviewService {
	getReviews = async (bookId) => {
		const reviews = await reviewRepo.getReviews(bookId);
		return reviews;
	};

	addReview = async ({ bookId, userId, comment, rating }) => {
		const book = await bookRepo.getBookById(bookId);
		if (!book) {
			throw new Error("Book not found");
		}

		const result = await reviewRepo.addReview({
			bookId,
			userId,
			comment,
			rating,
		});
		return result;
	};

	refineReview = async ({ comment, bookTitle, bookAuthor }) => {
		try {
			console.log('Sending request to AI for review refinement');

			const response = await fetch(
				"https://api.mistral.ai/v1/chat/completions",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${process.env.AI_KEY}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						model: "mistral-small",
						messages: [
							{
								role: "user",
								content: `You are an expert editor. Your task is to refine the following book review for the book titled "${bookTitle}" by ${bookAuthor}:
											- Expand the review slightly by approximately 10% to enrich its details or descriptions.
											- Keep the total word count at or below 100 words.
											- Maintain the original tone, meaning, and sentiment.
											- Ensure excellent grammar, natural flow, and readability.
											- Do not introduce any new facts or opinions not present in the original comment.
											- Only return the refined review.

											Here is the review:
											${comment}`,
							},
						],
					}),
				},
			);

			if (!response.ok) {
				const error = await response.text();
				console.error('API Error:', error);
				throw new Error(`OpenRouter API Error: ${error}`);
			}

			const data = await response.json();
			const refined = data?.choices?.[0]?.message?.content;

			if (!refined) {
				console.error('No content received from AI');
				throw new Error("Invalid response from AI");
			}

			const cleanRefined = refined.trim().replace(/^["']|["']$/g, "");

			// Log the AI response for debugging
			console.log('AI Response:', cleanRefined);

			return cleanRefined;
		} catch (error) {
			console.error("Review refinement failed:", error);
			return comment; // fallback to original review
		}
	};
}
