import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../types";
import { api } from "../../api";

interface UserBookState {
    books: {
        previousPage: number | null;
        nextPage: number | null;
        totalPages: number;
        currentPage: number;
        limit: number;
        books: Book[];
    };
    featuredBooks: Book[];
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
>("userBook/fetchBooks", async (_, { rejectWithValue }) => {
    try {
        const searchParams = new URLSearchParams(window.location.search);
        const { data } = await api.get(
            "/api/v1/books?" + searchParams.toString()
        );
        return data;
    } catch (error) {
        return rejectWithValue("Error fetching books: " + error);
    }
});

const fetchFeaturedBooks = createAsyncThunk<
    Book[],
    void,
    { rejectValue: string }
>("userBook/fetchFeaturedBooks", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get("/api/v1/books/featured");
        return data.books;
    } catch (error) {
        return rejectWithValue("Error fetching featured books: " + error);
    }
});

const initialState: UserBookState = {
    books: {
        previousPage: null,
        nextPage: null,
        totalPages: 0,
        currentPage: 1,
        limit: 10,
        books: [],
    },
    featuredBooks: [],
    isLoading: false,
    error: null,
};

const userBookSlice = createSlice({
    name: "userBook",
    initialState,
    reducers: {
        clearSlice: (state) => {
            state = initialState;
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
        });
        builder.addCase(fetchFeaturedBooks.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchFeaturedBooks.fulfilled, (state, action) => {
            state.featuredBooks = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchFeaturedBooks.rejected, (state, action) => {
            state.isLoading = false;
            state.featuredBooks = [];
            state.error = action.payload as string;
        });
    },
});

export const userBookActions = {
    fetchBooks,
    fetchFeaturedBooks,
    ...userBookSlice.actions,
};

export const userBookReducer = userBookSlice.reducer;
