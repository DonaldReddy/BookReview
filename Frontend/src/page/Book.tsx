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
    const [reviews, setReviews] = React.useState<
        {
            id: string;
            userId: string;
            bookId: string;
            rating: number;
            comment: string;
            createdAt: Date;
            updatedAt: Date;
            user: {
                id: string;
                name: string;
            };
        }[]
    >([]);
    const router = useNavigate();
    const [showReviewForm, setShowReviewForm] = React.useState(false);

    // Added bookId and router to dependency array
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
    }, [bookId, router]);

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
        if (bookId) {
            fetchReviews();
        }
    }, [bookId]);

    return (
        <div className="min-h-[150dvh] ">
            {!isBookLoading ? (
                <div className="my-4 p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {typeof book.coverImage == "string" && (
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full md:w-1/4"
                            />
                        )}
                        <div className="flex flex-col gap-2 md:w-3/4">
                            <div>
                                <h1 className="text-2xl md:text-4xl ">{book.title}</h1>
                                <p className="text-sm my-2 ">
                                    by:{" "}
                                    <span className="underline underline-offset-4 text-blue-950">
                                        {book.author}
                                    </span>
                                </p>
                                <div className="flex items-center gap-2 my-2">
                                    {Array(book.rating)
                                        .fill(null)
                                        .map((_, index) => (
                                            <span key={index} className="text-sm text-[#de7921]">
                                                <FaStar />
                                            </span>
                                        ))}
                                    {Array(5 - book.rating)
                                        .fill(null)
                                        .map((_, index) => (
                                            <span key={index} className="text-sm text-gray-500">
                                                <FaStar />
                                            </span>
                                        ))}
                                    <p className="text-lg"> {book.ratingCount}</p>
                                </div>
                            </div>
                            <p className="text-lg">{book.description}</p>
                            <div>
                                <p className="text-sm">
                                    Created At: {new Date(book.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        className="mt-4 bg-black text-white py-2 px-4 rounded cursor-pointer hover:bg-gray-800 transition-colors duration-300"
                        onClick={() => setShowReviewForm(true)}
                    >
                        Review it
                    </button>
                </div>
            ) : (
                <BookPageSkeleton />
            )}

            <h2 className="text-2xl my-4">Reviews</h2>
            {!isReviewLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="p-4 border rounded-lg shadow-md flex gap-4 bg-blue-100"
                        >
                            <img
                                src={`https://api.dicebear.com/9.x/personas/svg?seed=${review.userId}`}
                                className="w-12 h-12 rounded-full border-black border"
                            />
                            <div className="w-full">
                                <p className="text-sm text-gray-500">{review.user.name}</p>
                                <div className="flex items-center gap-2 ">
                                    {Array(review.rating)
                                        .fill(null)
                                        .map((_, index) => (
                                            <span key={index} className="text-sm text-[#de7921]">
                                                <FaStar />
                                            </span>
                                        ))}
                                    {Array(5 - review.rating)
                                        .fill(null)
                                        .map((_, index) => (
                                            <span key={index} className="text-sm text-gray-500">
                                                <FaStar />
                                            </span>
                                        ))}
                                    <p className="text-sm">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="my-2">
                                    <p className="text-lg">
                                        {review.comment.split(" ").slice(0, 100).join(" ")}
                                        {review.comment.split(" ").length > 100 ? "..." : ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center ">
                    <div className="w-3/4">
                        <ReviewSkeleton />
                    </div>
                </div>
            )}
            {showReviewForm && (
                <ReviewForm book={book} handleClose={() => setShowReviewForm(false)} />
            )}
        </div>
    );
}
