import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { authActions } from "../../redux/slices/authSlice";
import { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { IoMenu, IoClose } from "react-icons/io5";
import { BsSun, BsMoon } from "react-icons/bs";
import { Bell, Phone } from "lucide-react";
import logo from "../../assets/logo.png";

export default function NavBar() {
  const location = useLocation();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [clicked, setClicked] = useState("");
  const lastScrollY = useRef(0);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleLogout = () => {
    setOpenMenu(false);
    dispatch(authActions.logout());
  };

  const linkClass = (path: string) =>
    `px-3 py-1 rounded-md transition-all duration-200 transform hover:scale-110 ${
      location.pathname === path
        ? "bg-violet-500 text-white font-semibold"
        : "text-black/70 hover:bg-violet-200 hover:text-black"
    } ${clicked === path ? "text-lg font-bold scale-110" : ""}`;

  const navLinks = [
    { to: "/browse", label: "Browse Books" },
    { to: "/ai-suggestions", label: "AI Suggestions" },
    { to: "/blog", label: "Blog" },
    {
      to: "/contact",
      label: (
        <>
          <Phone size={14} className="inline mr-1" /> Contact
        </>
      ),
    },
    { to: "/about", label: "About Us" },
  ];

  const handleClick = (path: string) => {
    setClicked(path);
    setTimeout(() => setClicked(""), 300);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        setShowNavbar(currentScrollY < lastScrollY.current || currentScrollY < 60);
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`p-3 max-w-screen-2xl fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-blue-100/40 dark:bg-black/30 shadow-sm transform transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto h-14 px-4 flex justify-between items-center transition-all duration-300">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 w-1/4 md:w-1/5">
          <img src={logo} alt="logo" className="h-10 w-auto" />
          <span className="text-violet-700 text-xl font-bold hover:scale-110 transition-all">
            BookReview<span className="text-sm">.in</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 w-4/5 justify-end">
          <Link to="/" onClick={() => handleClick("/")} className={linkClass("/")}>
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
              onClick={() => handleClick(`/app/profile/${user.id}`)}
              className={linkClass(`/app/profile/${user.id}`)}
            >
              <FaRegUserCircle size={20} className="inline mr-1" /> Dashboard
            </Link>
          )}
          {!isAuthenticated ? (
            <Link
              to="/sign-in"
              className="px-4 py-1 rounded-full bg-green-600 text-white hover:bg-green-700 transition-all"
              onClick={() => handleClick("/sign-in")}
            >
              Login / Register
            </Link>
          ) : (
            <RxExit
              className="text-black/60 hover:scale-105 transition cursor-pointer"
              size={22}
              onClick={handleLogout}
              title="Logout"
            />
          )}
          <button onClick={toggleDarkMode}>
            {darkMode ? <BsSun size={18} /> : <BsMoon size={18} />}
          </button>
        </div>

        {/* Mobile Nav Icons */}
        <div className="md:hidden flex items-center justify-end gap-2">
          <Bell size={20} className="text-black/70" />
          <button onClick={toggleDarkMode}>
            {darkMode ? <BsSun size={18} /> : <BsMoon size={18} />}
          </button>
          <button onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? <IoClose size={30} /> : <IoMenu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {openMenu && (
        <div className="md:hidden absolute top-16 right-4 w-11/12 max-w-sm bg-white rounded-md shadow-xl p-4 z-50">
          <div className="flex flex-col gap-4">
            <Link to="/" onClick={() => setOpenMenu(false)} className={linkClass("/")}>
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
                className={linkClass(`/app/profile/${user.id}`)}
                onClick={() => setOpenMenu(false)}
              >
                <FaRegUserCircle size={18} className="inline mr-1" /> Dashboard
              </Link>
            )}
            {!isAuthenticated ? (
              <Link
                to="/sign-in"
                className="bg-green-600 text-white px-4 py-2 text-center rounded-md hover:bg-green-700 transition-all"
                onClick={() => setOpenMenu(false)}
              >
                Login / Register
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-black/70 hover:text-black"
              >
                <RxExit size={20} /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
