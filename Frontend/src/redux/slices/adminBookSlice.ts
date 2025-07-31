import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../types";
import { api } from "../../api";
import { toast } from "react-toastify";

interface AdminBookState {
	books: {
		previousPage: number | null;
		nextPage: number | null;
		totalPages: number;
		currentPage: number;
		limit: number;
		books: Book[];
	};
	isLoading: boolean;
	error: string | null;
}

const fetchBooks = createAsyncThunk<
	{
		previousPage: number | null;
		nextPage: number | null;
		totalPages: number;
		currentPage: number;
		limit: number;
		books: Book[];
	},
	void,
	{ rejectValue: string }
>("adminBook/fetchBooks", async (_, { rejectWithValue }) => {
	try {
		const searchParams = new URLSearchParams(window.location.search);
		const { data } = await api.get("/api/v1/books?" + searchParams.toString());
		return data;
	} catch (error) {
		return rejectWithValue("Error fetching books: " + error);
	}
});

const deleteBook = createAsyncThunk<string, string, { rejectValue: string }>(
	"adminBook/deleteBook",
	async (id, { rejectWithValue }) => {
		try {
			const { data } = await api.delete(`/api/v1/books/${id}`);
			return data.id;
		} catch (error) {
			return rejectWithValue("Error deleting book: " + error);
		}
	},
);

const initialState: AdminBookState = {
	books: {
		previousPage: null,
		nextPage: null,
		totalPages: 0,
		currentPage: 1,
		limit: 10,
		books: [],
	},
	isLoading: false,
	error: null,
};

const adminBookSlice = createSlice({
	name: "adminBook",
	initialState,
	reducers: {
		clearSlice: (state) => {
			state.books = initialState.books;
			state.isLoading = initialState.isLoading;
			state.error = initialState.error;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchBooks.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchBooks.fulfilled, (state, action) => {
			state.books = action.payload;
			state.isLoading = false;
			state.error = null;
		});
		builder.addCase(fetchBooks.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
			toast.error(action.payload || "Failed to load books", {
				position: "top-right",
				autoClose: 3000,
				theme: "colored",
			});
		});
		builder.addCase(deleteBook.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(deleteBook.fulfilled, (state, action) => {
			state.isLoading = false;
			state.books.books = state.books.books.filter(
				(book) => book.id !== action.payload,
			);
			state.error = null;

			toast.success("Book deleted successfully!", {
				position: "top-right",
				autoClose: 3000,
				theme: "colored",
			});
		});
		builder.addCase(deleteBook.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;

		toast.error(action.payload || "Failed to delete book", {
				position: "top-right",
				autoClose: 3000,
				theme: "colored",
			});
		});
	},
});

export const adminBookActions = {
	fetchBooks,
	deleteBook,
	...adminBookSlice.actions,
};

export const adminBookReducer = adminBookSlice.reducer;
