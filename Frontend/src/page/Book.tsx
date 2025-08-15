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
      createdAt: string; // changed to string for safe parsing
      updatedAt: string;
      user: {
        id: string;
        name: string;
      };
    }[]
  >([]);
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
  }, [bookId, router]);

  React.useEffect(() => {
    if (!bookId) return;
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
    fetchReviews();
  }, [bookId]);

  // Safe fallback values
  const rating = book.rating ?? 0;
  const ratingCount = book.ratingCount ?? 0;
  const createdAtDate = book.createdAt ? new Date(book.createdAt) : null;

  return (
    <div className="min-h-[150dvh]">
      {!isBookLoading ? (
        <div className="my-4 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {typeof book.coverImage === "string" && (
              <img
                src={book.coverImage}
                alt={book.title || "Book cover"}
                className="w-full md:w-1/4"
              />
            )}
            <div className="flex flex-col gap-2 md:w-3/4">
              <div>
                <h1 className="text-2xl md:text-4xl">{book.title || "Untitled"}</h1>
                <p className="text-sm my-2">
                  by:{" "}
                  <span className="underline underline-offset-4 text-blue-950">
                    {book.author || "Unknown Author"}
                  </span>
                </p>
                <div className="flex items-center gap-2 my-2">
                  {Array(Math.min(Math.max(Math.round(rating), 0), 5))
                    .fill(null)
                    .map((_, index) => (
                      <span key={index} className="text-sm text-[#de7921]">
                        <FaStar />
                      </span>
                    ))}
                  {Array(Math.max(5 - Math.round(rating), 0))
                    .fill(null)
                    .map((_, index) => (
                      <span key={index} className="text-sm text-gray-500">
                        <FaStar />
                      </span>
                    ))}
                  <p className="text-lg">{ratingCount}</p>
                  {(rating < 0 || rating > 5) && (
                    <span className="text-red-500">Invalid rating: {rating}</span>
                  )}
                </div>
              </div>
              <p className="text-lg">{book.description || "No description available."}</p>
              <div>
                <p className="text-sm">
                  Created At:{" "}
                  {createdAtDate
                    ? createdAtDate.toLocaleDateString()
                    : "Unknown"}
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
          {reviews.map((review) => {
            const reviewCreatedAt = review.createdAt
              ? new Date(review.createdAt)
              : null;
            return (
              <div
                key={review.id}
                className="p-4 border rounded-lg shadow-md flex gap-4 bg-blue-100"
              >
                <img
                  src={`https://api.dicebear.com/9.x/personas/svg?seed=${review.userId}`}
                  className="w-12 h-12 rounded-full border-black border"
                  alt={review.user?.name || "User avatar"}
                />
                <div className="w-full">
                  <p className="text-sm text-gray-500">
                    {review.user?.name || "Anonymous"}
                  </p>
                  <div className="flex items-center gap-2">
                    {Array(Math.min(Math.max(review.rating, 0), 5))
                      .fill(null)
                      .map((_, index) => (
                        <span key={index} className="text-sm text-[#de7921]">
                          <FaStar />
                        </span>
                      ))}
                    {Array(5 - Math.min(Math.max(review.rating, 0), 5))
                      .fill(null)
                      .map((_, index) => (
                        <span key={index} className="text-sm text-gray-500">
                          <FaStar />
                        </span>
                      ))}
                    <p className="text-sm">
                      {reviewCreatedAt
                        ? reviewCreatedAt.toLocaleDateString()
                        : "Unknown date"}
                    </p>
                  </div>
                  <div className="my-2">
                    <p className="text-lg">
                      {review.comment
                        .split(" ")
                        .slice(0, 100)
                        .join(" ")}
                      {review.comment.split(" ").length > 100 ? "..." : ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center">
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
