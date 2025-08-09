import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Book } from "../types";
import { api } from "../api";
import { FaStar } from "react-icons/fa";
import BookPageSkeleton from "../components/Book/BookPageSkeleton";
import ReviewSkeleton from "../components/Book/ReviewSkeleton";
import ReviewForm from "../components/Book/ReviewForm";

export default function BookPage() {
    const { id: bookId } = useParams();
    const [isBookLoading, setIsBookLoading] = React.useState(true);
    const [isReviewLoading, setIsReviewLoading] = React.useState(true);
    const [book, setBook] = React.useState<Book>({} as Book);
    const [reviews, setReviews] = React.useState<any[]>([]);
    const router = useNavigate();
    const [showReviewForm, setShowReviewForm] = React.useState(false);

    React.useEffect(() => {
        if (bookId) {
            const fetchBook = async () => {
                try {
                    setIsBookLoading(true);
                    const { data } = await api.get(`/api/v1/books/${bookId}`);
                    setBook(data);
                } catch (error) {
                    console.error("Failed to fetch book:", error);
                } finally {
                    setIsBookLoading(false);
                }
            };
            fetchBook();
        } else {
            router("/app/books");
        }
    }, []);

    React.useEffect(() => {
        const fetchReviews = async () => {
            try {
                setIsReviewLoading(true);
                const { data } = await api.get(`/api/v1/reviews?bookId=${bookId}`);
                setReviews(data);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setIsReviewLoading(false);
            }
        };
        if (bookId) fetchReviews();
    }, [bookId]);

    return (
        <div className="min-h-[150dvh]">
            {!isBookLoading ? (
                <div className="my-6 p-4">
                    <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
                        {typeof book.coverImage === "string" && (
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full md:w-1/4 rounded-xl object-cover shadow-md"
                            />
                        )}
                        <div className="flex flex-col gap-4 md:w-3/4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    {book.title}
                                </h1>
                                <p className="text-sm my-2 flex items-center gap-2 text-gray-600">
                                    <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                        📚
                                    </span>
                                    <span>
                                        by{" "}
                                        <span className="underline underline-offset-4 text-blue-900 font-medium">
                                            {book.author}
                                        </span>
                                    </span>
                                </p>
                                <div className="flex items-center gap-1 my-2">
                                    {Array(book.rating)
                                        .fill(null)
                                        .map((_, index) => (
                                            <FaStar
                                                key={index}
                                                className="text-lg text-yellow-500"
                                            />
                                        ))}
                                    {Array(5 - book.rating)
                                        .fill(null)
                                        .map((_, index) => (
                                            <FaStar
                                                key={index}
                                                className="text-lg text-gray-300"
                                            />
                                        ))}
                                    <p className="text-base ml-2 text-gray-700">
                                        {book.ratingCount} ratings
                                    </p>
                                </div>
                            </div>
                            <p className="text-base leading-relaxed text-gray-700">
                                {book.description}
                            </p>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <button
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                    onClick={() => setShowReviewForm(true)}
                                >
                                    Review it
                                </button>
                                <button
                                    className="bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                                    onClick={() => router("/app/books")}
                                >
                                    View More Books
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <BookPageSkeleton />
            )}

            <h2 className="text-2xl font-semibold my-4">Reviews</h2>
            {!isReviewLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="p-4 border rounded-lg shadow-md flex gap-4 bg-gradient-to-br from-blue-50 to-white"
                        >
                            <img
                                src={`https://api.dicebear.com/9.x/personas/svg?seed=${review.userId}`}
                                className="w-12 h-12 rounded-full border border-gray-400"
                            />
                            <div className="w-full">
                                <p className="text-sm text-gray-500 font-semibold">
                                    {review.user.name}
                                </p>
                                <div className="flex items-center gap-1">
                                    {Array(review.rating)
                                        .fill(null)
                                        .map((_, index) => (
                                            <FaStar
                                                key={index}
                                                className="text-sm text-yellow-500"
                                            />
                                        ))}
                                    {Array(5 - review.rating)
                                        .fill(null)
                                        .map((_, index) => (
                                            <FaStar
                                                key={index}
                                                className="text-sm text-gray-300"
                                            />
                                        ))}
                                    <p className="text-xs text-gray-500 ml-2">
                                        {new Date(
                                            review.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="mt-2 text-gray-700">
                                    <p className="text-sm">
                                        {review.comment.split(" ").slice(0, 100).join(" ")}
                                        {review.comment.split(" ").length > 100 ? "..." : ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center">
                    <div className="w-3/4">
                        <ReviewSkeleton />
                    </div>
                </div>
            )}

            {showReviewForm && (
                <ReviewForm
                    book={book}
                    handleClose={() => setShowReviewForm(false)}
                />
            )}
        </div>
    );
}
