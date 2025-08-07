import axios from "axios";
import { store } from "./redux/store";
import { authActions } from "./redux/slices/authSlice";
import { adminBookActions } from "./redux/slices/adminBookSlice";
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
    }
);

export { api };
