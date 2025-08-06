import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { generalReducer } from "./slices/generalSlice";
import { authReducer } from "./slices/authSlice";
import { adminBookReducer } from "./slices/adminBookSlice";
import { userBookReducer } from "./slices/userBookSlice";

const rootReducer = combineReducers({
    general: generalReducer,
    auth: authReducer,
    adminBook: adminBookReducer,
    userBook: userBookReducer,
});

const createNoopStorage = () => {
    return {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setItem(_key: string, _value: string) {
            return Promise.resolve();
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        removeItem(_key: string) {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window === "undefined"
        ? createNoopStorage()
        : createWebStorage("local");

const persistConfig = {
    key: import.meta.env.REDUX_PERSIST_ROOT || "root",
    storage,
    whitelist: ["general", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    // devTools: import.meta.env.PUBLIC_ENV === "development",
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
