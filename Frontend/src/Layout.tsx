import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
    return (
        <div
            className="min-h-dvh w-full flex flex-col
  bg-blue-200/40 text-black
  dark:bg-slate-800 dark:text-white transition-colors"
        >
            <NavBar />
            <div className="my-24 h-full w-full flex-grow">{<Outlet />}</div>

            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
