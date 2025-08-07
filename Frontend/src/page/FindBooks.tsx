import BookFilter from "../components/Book/BookFilter";
import { useAppDispatch, useAppSelector } from "../redux/store";
import BookCard from "../components/Book/BookCard";
import BookSkeleton from "../components/Book/BookSkeleton";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { userBookActions } from "../redux/slices/userBookSlice";
import { useSearchParams } from "react-router-dom";

export default function FindBooks() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { isLoading } = useAppSelector((state) => state.userBook);
    const { books, previousPage, nextPage, limit } = useAppSelector(
        (state) => state.userBook.books
    );
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(searchParams.get("page") || 1);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            dispatch(userBookActions.fetchBooks());
        }, 500);
        return () => clearTimeout(timeOut);
    }, [searchParams]);

    useEffect(() => {
        setSearchParams({ page: page.toString() });
    }, [page]);

    return (
        <div className="min-h-dvh">
            <h1 className="text-4xl my-2">
                Find and Review the books you love
            </h1>

            <div className="my-6 w-full">
                <BookFilter />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[90dvh]">
                {!isLoading &&
                    books.map((book) => (
                        <BookCard
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            author={book.author}
                            coverImage={book.coverImage}
                            description={book.description}
                            rating={book.rating}
                            ratingCount={book.ratingCount}
                            createdAt={new Date(book.createdAt)}
                            featured={book.featured}
                        />
                    ))}

                {isLoading &&
                    Array(limit)
                        .fill(0)
                        .map((_, index) => <BookSkeleton key={index} />)}

                {!isLoading && books.length === 0 && (
                    <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center min-h-[80dvh]">
                        <p className="text-2xl">No books found</p>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-center gap-4 mt-5 pt-5">
                {previousPage && (
                    <button
                        className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
                        onClick={() => setPage(previousPage)}
                    >
                        <FaArrowLeftLong />
                        Prev
                    </button>
                )}
                <p className="text-xl">Page: {page}</p>
                {nextPage && (
                    <button
                        className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
                        onClick={() => setPage(nextPage)}
                    >
                        Next
                        <FaArrowRightLong />
                    </button>
                )}
            </div>
        </div>
    );
}
