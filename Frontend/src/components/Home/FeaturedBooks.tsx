import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { userBookActions } from "../../redux/slices/userBookSlice";
import BookCard from "../Book/BookCard";
import BookSkeleton from "../Book/BookSkeleton";

export default function FeaturedBooks() {
	const { isLoading, featuredBooks } = useAppSelector(
		(state) => state.userBook,
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		// Add proper check for featuredBooks existence and length
		if (featuredBooks && featuredBooks.length > 0) return;
		dispatch(userBookActions.fetchFeaturedBooks());
	}, [featuredBooks, dispatch]); // Add dependencies

	// Add loading state for initial render
	if (!featuredBooks && isLoading) {
		return (
			<div className="w-full flex flex-col items-center">
				<h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 dark:from-[#a5b4fc] to-10% to-pink-400 dark:to-yellow-100/80 bg-clip-text text-transparent">
					Featured Books
				</h2>
				<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4">
					{Array(4)
						.fill(0)
						.map((_, index) => (
							<BookSkeleton key={index} />
						))}
				</div>
			</div>
		);
	}

	return (
		<div className="w-full flex flex-col items-center">
			<h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 dark:from-[#a5b4fc] to-10% to-pink-400 dark:to-[#fbcfe8] bg-clip-text text-transparent">
				Featured Books
			</h2>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4">
				{/* Safe mapping with fallback */}
				{featuredBooks && featuredBooks.length > 0 ? (
					featuredBooks.map((book) => (
						<BookCard
							key={book.id}
							id={book.id}
							title={book.title}
							author={book.author}
							coverImage={book.coverImage}
							rating={book.rating}
							description={book.description}
							ratingCount={book.ratingCount}
							featured={book.featured}
							createdAt={book.createdAt}
						/>
					))
				) : (
					!isLoading && (
						<div className="col-span-full text-center py-8">
							<p className="text-gray-500 dark:text-gray-400">No featured books available</p>
						</div>
					)
				)}
				
				{/* Loading skeletons */}
				{isLoading &&
					Array(4)
						.fill(0)
						.map((_, index) => <BookSkeleton key={index} />)}
			</div>
		</div>
	);
}