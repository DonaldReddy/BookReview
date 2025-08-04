import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout";
import ReduxProvider from "./redux/ReduxProvider";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import ResetPassword from "./page/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./page/Home";
import AdminHome from "./page/Admin/AdminHome";
import FindBooks from "./page/FindBooks";
import Book from "./page/Book";
import Profile from "./page/Profile";
import AboutUs from "./page/AboutUs"; // ✅ Import AboutUs
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useAppSelector } from "./redux/store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="app" element={<ProtectedRoute access="USER" />}>
        <Route path="books/:id" element={<Book />} />
        <Route path="books" element={<FindBooks />} />
        <Route path="profile/:id" element={<Profile />} />
      </Route>
      <Route path="admin" element={<ProtectedRoute access="ADMIN" />}>
        <Route index element={<AdminHome />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
);

function InnerApp() {
  const theme = useAppSelector((state) => state.general.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <ReduxProvider>
      <InnerApp />
      <ToastContainer />
    </ReduxProvider>
  );
}

export default App;
