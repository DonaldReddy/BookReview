import prisma from "../database/dbConnect.js";

export class BookRepository {
	getBooks = async (page, limit, search, filter, sortby) => {
		const filterObj = {};

		if (filter) {
			if (filter === "rating=4") {
				filterObj.rating = { gte: 4 };
			}
			if (filter === "rating=3") {
				filterObj.rating = { gte: 3 };
			}
			if (filter === "rating=2") {
				filterObj.rating = { gte: 2 };
			}
			if (filter === "rating=1") {
				filterObj.rating = { gte: 1 };
			}
		}

		const sortObj = {};
		if (sortby) {
			if (sortby === "rating") {
				sortObj.rating = "desc";
			}
			if (sortby === "createdAt") {
				sortObj.createdAt = "desc";
			}
			if (sortby === "title") {
				sortObj.title = "asc";
			}
			if (sortby === "author") {
				sortObj.author = "asc";
			}
		}

		const books = await prisma.book.findMany({
			where: {
				title: { contains: search, mode: "insensitive" },
				...filterObj,
			},
			skip: (page - 1) * limit,
			take: limit,
			orderBy: sortObj,
			select: {
				id: true,
				title: true,
				rating: true,
				author: true,
				coverImage: true,
				description: true,
				createdAt: true,
				ratingCount: true,
				featured: true,
			},
		});
		return books;
	};

	getBookById = async (id) => {
		const book = await prisma.book.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				title: true,
				rating: true,
				author: true,
				coverImage: true,
				description: true,
				createdAt: true,
				ratingCount: true,
			},
		});
		return book;
	};

	getTotalBooks = async (search, filter, sortby) => {
		const totalBooks = await prisma.book.count({
			where: {
				title: { contains: search },
			},
		});
		return totalBooks;
	};

	getFeaturedBooks = async () => {
		const books = await prisma.book.findMany({
			where: {
				featured: "YES",
			},
			orderBy: {
				createdAt: "desc",
			},
			take: 10,
			select: {
				id: true,
				title: true,
				rating: true,
				author: true,
				coverImage: true,
				description: true,
				createdAt: true,
				ratingCount: true,
			},
		});
		return books;
	};

	createBook = async (data) => {
		const book = await prisma.book.create({
			data,
		});
		return book;
	};

	updateBook = async (id, data) => {
		const book = await prisma.book.update({
			where: { id },
			data,
		});
		return book;
	};

	updateBookRating = async (bookId, rating, prismaTransaction) => {
		let currentPrisma = prismaTransaction || prisma;

		const book = await currentPrisma.book.findUnique({
			where: {
				id: bookId,
			},
		});

		if (!book) {
			throw new Error("Book not found");
		}

		const aggregateRating =
			(book.rating * book.ratingCount + rating) / (book.ratingCount + 1);
		const bookCount = book.ratingCount + 1;
		await currentPrisma.book.update({
			where: {
				id: bookId,
			},
			data: {
				rating: Math.floor(aggregateRating),
				ratingCount: bookCount,
			},
		});
	};

	deleteBook = async (id) => {
		const book = await prisma.book.delete({
			where: { id },
		});
		return book;
	};
}
