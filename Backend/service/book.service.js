import { bookRepository } from "../repository/book.repo.js";

class BookService {
    getBooks = async ({ page = 1, limit = 10, search, filter, sortby }) => {
        const books = await bookRepository.getBooks(
            page,
            limit,
            search,
            filter,
            sortby
        );
        const totalBooks = await bookRepository.getTotalBooks(
            search,
            filter,
            sortby
        );
        const totalPages = Math.ceil(totalBooks / limit);
        const previousPage = page > 1 ? page - 1 : null;
        const nextPage = page < totalPages ? page + 1 : null;
        return {
            previousPage,
            nextPage,
            totalPages,
            currentPage: page,
            limit,
            books,
        };
    };

    getBookById = async (id) => {
        const book = await bookRepository.getBookById(id);
        return book;
    };

    getFeaturedBooks = async () => {
        const books = await bookRepository.getFeaturedBooks();
        return {
            books,
        };
    };

    createBook = async ({
        title,
        author,
        coverImage,
        description,
        featured = false,
        genre,
    }) => {
        const book = await bookRepository.createBook({
            title,
            author,
            coverImage,
            description,
            featured,
            genre: genre.split(","),
        });
        return book;
    };

    updateBook = async (
        id,
        { title, author, coverImage, description, featured }
    ) => {
        const book = await bookRepository.updateBook(id, {
            title,
            author,
            coverImage,
            description,
            featured,
        });
        return book;
    };

    deleteBook = async (id) => {
        const book = await bookRepository.deleteBook(id);
        return book;
    };
}

export const bookService = new BookService();
