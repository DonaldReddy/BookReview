import { bookService } from "../service/book.service.js";

class BookController {
    getBooks = async (req, res) => {
        try {
            const {
                page = 1,
                limit = 10,
                search = "",
                filter,
                sortby,
            } = req.query;
            const books = await bookService.getBooks({
                page: parseInt(page),
                limit: parseInt(limit),
                search,
                filter,
                sortby,
            });
            return res.send(books);
        } catch (error) {
            res.status(400).json({
                message: error.message || "Internal server error",
            });
        }
    };

    getBookById = async (req, res) => {
        try {
            const { id } = req.params;
            const book = await bookService.getBookById(id);
            if (!book) {
                return res.status(404).send("Book not found");
            }
            return res.send(book);
        } catch (error) {
            res.status(400).json({
                message: error.message || "Internal server error",
            });
        }
    };

    getFeaturedBooks = async (req, res) => {
        try {
            const books = await bookService.getFeaturedBooks();
            return res.send(books);
        } catch (error) {
            res.status(400).json({
                message: error.message || "Internal server error",
            });
        }
    };

    createBook = async (req, res) => {
        try {
            const { title, author, coverImage, description, featured, genre } =
                req.body;

            if (
                !title ||
                !author ||
                !coverImage ||
                !description ||
                !featured ||
                !genre
            ) {
                return res.status(400).send("All fields are required");
            }

            const book = await bookService.createBook({
                title,
                author,
                coverImage,
                description,
                genre,
                featured,
            });

            return res.status(201).send(book);
        } catch (error) {
            res.status(400).json({
                message: error.message || "Internal server error",
            });
        }
    };

    updateBook = async (req, res) => {
        try {
            const { id } = req.params;
            const { title, author, coverImage, description, featured } =
                req.body;

            if (!title || !author || !coverImage || !description || !featured) {
                return res.status(400).send("All fields are required");
            }

            const book = await bookService.updateBook(id, {
                title,
                author,
                coverImage,
                description,
                featured,
            });

            return res.status(200).send(book);
        } catch (error) {
            res.status(400).json({
                message: error.message || "Internal server error",
            });
        }
    };

    deleteBook = async (req, res) => {
        try {
            const { id } = req.params;
            const book = await bookService.deleteBook(id);
            if (!book) {
                return res.status(404).send("Book not found");
            }
            return res.status(200).send(book);
        } catch (error) {
            res.status(400).json({
                message: error.message || "Internal server error",
            });
        }
    };
}

export const bookController = new BookController();
