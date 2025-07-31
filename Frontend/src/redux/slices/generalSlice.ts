import { createSlice } from "@reduxjs/toolkit";

interface GeneralState {
	theme: "light" | "dark";
}

const getInitialTheme = (): "light" | "dark" => {
  const stored = localStorage.getItem("theme");
  return stored === "dark" ? "dark" : "light";
};

const initialState: GeneralState = {
	theme: getInitialTheme(),
};

const generalSlice = createSlice({
	name: "general",
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.theme = state.theme === "light" ? "dark" : "light";
			localStorage.setItem("theme", state.theme);

			if (state.theme === "dark") {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
		},
	},
});

export const generalActions = generalSlice.actions;
export const generalReducer = generalSlice.reducer;