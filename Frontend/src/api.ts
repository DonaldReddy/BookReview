import axios from "axios";
import { store } from "./redux/store";
import { authActions } from "./redux/slices/authSlice";
import { adminBookActions } from "./redux/slices/adminBookSlice";
import { EmailVerificationResponse } from "./types";

console.log(import.meta.env.VITE_API_BASE_URL);
const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	withCredentials: true,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			store.dispatch(authActions.logout());
			store.dispatch(adminBookActions.clearSlice());
		}
		return Promise.reject(error);
	},
);

// Email verification API functions
export const verifyEmail = async (token: string): Promise<EmailVerificationResponse> => {
	const response = await api.post("/api/v1/auth/verify-email", { token });
	return response.data;
};

export const resendVerificationEmail = async (email: string): Promise<EmailVerificationResponse> => {
	const response = await api.post("/api/v1/auth/resend-verification", { email });
	return response.data;
};

export { api };
