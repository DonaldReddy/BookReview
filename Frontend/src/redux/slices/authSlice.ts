import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    user: {
        id: string;
        name: string;
        email: string;
        role: "ADMIN" | "USER";
        isVerified: boolean;
        profileImage?: string;
    };
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: {
        id: "",
        name: "",
        email: "",
        role: "USER",
        isVerified: false,
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = {
                id: "",
                name: "",
                email: "",
                role: "USER",
                isVerified: false,
            };
        },
        updateUser: (state, user) => {
            state.user = { ...state.user, ...user.payload };
        },
    },
});

export const authActions = {
    ...authSlice.actions,
};

export const authReducer = authSlice.reducer;
