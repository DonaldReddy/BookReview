import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { authActions } from "../../redux/slices/authSlice";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { IoMenu, IoClose } from "react-icons/io5";
import { Bell } from "lucide-react";
import logo from "../../assets/logo.png";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
    const location = useLocation();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [openMenu, setOpenMenu] = useState(false);
    const [clicked, setClicked] = useState("");

    const handleLogout = () => {
        setOpenMenu(false);
        dispatch(authActions.logout());
    };

    const linkClass = (path) =>
        `px-3 py-1 rounded-md transition-all duration-200 transform hover:scale-110 ${
            location.pathname === path
                ? "bg-blue-700/60 text-white font-semibold"
                : "text-black/70 dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-blue-200/20 hover:text-black dark:hover:text-gray-100"
        } ${clicked === path ? "text-lg font-bold scale-110" : ""}`;

    // Function to handle clicking the logo, which scrolls to the top of the page.
    const handleLogoClick = () => {
        // Scroll to the top of the page with a smooth animation.
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Call the existing handleClick to update the visual state.
        handleClick("/");
    };

    const navLinks = [
        // FIX: Added a leading slash to create an absolute path to prevent "page not found" errors.
        { to: "/app/books", label: "Browse Books" },
        { to: "/about", label: "About Us" },
    ];

    const handleClick = (path) => {
        setClicked(path);
        setTimeout(() => setClicked(""), 300);
    };

    return (
        <div
            className={`p-2 w-full z-10 fixed top-0 left-0 right-0 z-100 backdrop-blur-md bg-blue-100/40 dark:bg-black/30 shadow-sm `}
        >
            <div className="w-full h-14 px-4 flex justify-between items-center transition-all duration-300">
                {/* Logo */}
                <>
                    <Link
                        to="/"
                        onClick={handleLogoClick} // Call the new scroll-to-top function here.
                        className="flex items-center gap-2 w-1/4 md:w-1/5"
                    >
                        <img src={logo} alt="logo" className="h-10 w-auto" />
                        <span className="text-gray-700 dark:text-gray-200 text-xl font-bold hover:scale-110 transition-all">
                            BookReview<span className="text-sm">.in</span>
                        </span>
                    </Link>
                </>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4 w-4/5 justify-end">
                    <Link
                        to="/"
                        onClick={() => handleClick("/")}
                        className={linkClass("/")}
                    >
                        Home
                    </Link>
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => handleClick(link.to)}
                            className={linkClass(link.to)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {isAuthenticated && (
                        <Link
                            to={`/app/profile/${user.id}`}
                            onClick={() =>
                                handleClick(`/app/profile/${user.id}`)
                            }
                            className={linkClass(`/app/profile/${user.id}`)}
                        >
                            <FaRegUserCircle
                                size={20}
                                className="inline mr-1"
                            />{" "}
                            My Account
                        </Link>
                    )}
                    {!isAuthenticated ? (
                        <Link
                            to="/sign-in"
                            className="px-5 py-2 rounded-full bg-blue-700/60 dark:bg-blue-700/60  text-gray-100 hover:bg-blue-400 dark:hover:bg-blue-500 font-semibold transition-all"
                            onClick={() => handleClick("/sign-in")}
                        >
                            Login / Register
                        </Link>
                    ) : (
                        <RxExit
                            className="text-black/60 dark:text-gray-200 hover:scale-105 transition cursor-pointer"
                            size={22}
                            onClick={handleLogout}
                            title="Logout"
                        />
                    )}

                    <div className="mt-2 sm:mt-0">
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile Nav Icons */}
                <div className="md:hidden flex items-center justify-end gap-2">
                    <Bell
                        size={20}
                        className="text-black/70 dark:text-gray-200"
                    />
                    <button onClick={() => setOpenMenu(!openMenu)}>
                        {openMenu ? (
                            <IoClose size={30} />
                        ) : (
                            <IoMenu size={30} />
                        )}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {openMenu && (
                    <div className="md:hidden absolute top-16 right-4 w-11/12 max-w-sm bg-white dark:bg-gray-700 rounded-md shadow-xl p-4 z-50">
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/"
                                onClick={() => setOpenMenu(false)}
                                className={linkClass("/")}
                            >
                                Home
                            </Link>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={linkClass(link.to)}
                                    onClick={() => setOpenMenu(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {isAuthenticated && (
                                <Link
                                    to={`/app/profile/${user.id}`}
                                    className={linkClass(
                                        `/app/profile/${user.id}`
                                    )}
                                    onClick={() => setOpenMenu(false)}
                                >
                                    <FaRegUserCircle
                                        size={18}
                                        className="inline mr-1"
                                    />{" "}
                                    My Account
                                </Link>
                            )}
                            {!isAuthenticated ? (
                                <Link
                                    to="/sign-in"
                                    className="bg-blue-700/60 dark:bg-blue-700/60  text-white hover:bg-blue-400 dark:hover:bg-blue-400 px-4 py-2 font-semibold text-center rounded-md transition-all"
                                    onClick={() => setOpenMenu(false)}
                                >
                                    Login / Register
                                </Link>
                            ) : (
                                <>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 text-black/70 dark:text-gray-300 hover:text-black dark:hover:text-gray-100"
                                    >
                                        <RxExit size={20} /> Logout
                                    </button>
                                </>
                            )}
                            <div className="mt-2 sm:mt-0">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
