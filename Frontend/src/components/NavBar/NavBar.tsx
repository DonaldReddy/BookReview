import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { RxExit } from "react-icons/rx";
import { authActions } from "../../redux/slices/authSlice";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { useEffect, useRef } from "react";

export default function NavBar() {
	const location = useLocation();
	const { isAuthenticated, user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const [openMenu, setOpenMenu] = useState(false);
	const [showNavbar, setShowNavbar] = useState(true);
    const lastScrollY = useRef(0);


	const linkClass = (path: string) =>
        `px-3 py-1 rounded-md m-1 text-base font-medium text-black/60 dark:text-white/60 hover:scale-105 hover:text-black dark:hover:text-white transition-all duration-200 ${
        location.pathname === path ? "text-black dark:text-white underline underline-offset-4" : ""
    }`;

	const handleLogout = () => {
		setOpenMenu(false);
		dispatch(authActions.logout());
	};

	useEffect(() => {
	const handleScroll = () => {
		if (typeof window !== "undefined") {
			const currentScrollY = window.scrollY;
			if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
				// Scrolling down
				setShowNavbar(false);
			} else {
				// Scrolling up
				setShowNavbar(true);
			}
			lastScrollY.current = currentScrollY;
		}
	};

	window.addEventListener("scroll", handleScroll);
	return () => window.removeEventListener("scroll", handleScroll);
}, []);

	return (
		<div className={`p-3 max-w-screen-2xl fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-blue-100/40 dark:bg-black/30 shadow-sm transform transition-transform duration-300 ${ showNavbar ? "translate-y-0" : "-translate-y-full"}`}>

            <div className="max-w-screen-2xl mx-auto h-14 px-4 flex justify-between items-center transition-all duration-300">
				<div className="w-1/5 px-3">
					<Link to="/" className="text-black dark:text-gray-100 text-lg">
						BookReview<span className="text-[12px]">.in</span>
					</Link>
				</div>
				<div className="hidden w-4/5 md:flex items-center justify-end px-3">
					<Link to="/" className={linkClass("/")}>
						Home
					</Link>

					{isAuthenticated && (
						<Link to="/app/books" className={linkClass("/app/books")}>
							Books
						</Link>
					)}

					{!isAuthenticated && (
						<Link to="/sign-in" className={linkClass("/sign-in")}>
							Sign In
						</Link>
					)}
					{!isAuthenticated && (
						<Link to="/sign-up" className={linkClass("/sign-up")}>
							Sign Up
						</Link>
					)}

					{isAuthenticated && user.role === "ADMIN" && (
						<Link to="/admin" className={linkClass("/admin")}>
							Manage Books
						</Link>
					)}

					{isAuthenticated && (
						<>
							<Link
								to={`/app/profile/${user.id}`}
								className={linkClass(`/app/profile/${user.id}`)}
							>
								<FaRegUserCircle
									className=" text-black/60 dark:text-gray-100 hover:scale-105 hover:text-black/100 dark:hover:text-gray-100 transition-all duration-200 cursor-pointer"
									size={25}
								/>
							</Link>

							<RxExit
								className="ml-2 text-black/60 dark:text-gray-100 hover:scale-105 hover:text-black/100 dark:hover:text-gray-100 transition-all duration-200 cursor-pointer"
								size={25}
								onClick={handleLogout}
							/>
						</>
					)}
				</div>
				<div className="w-4/5 md:hidden flex items-center justify-end px-3">
					<IoMenu size={30} onClick={() => setOpenMenu(!openMenu)} />{" "}
					{openMenu && (
						<div className="absolute top-10 right-0 w-2/4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-md p-4 z-20">
							<div className="w-full flex gap-2 flex-col  ">
								<Link
									to="/"
									className={linkClass("/")}
									onClick={() => setOpenMenu(false)}
								>
									Home
								</Link>

								{isAuthenticated && (
									<Link
										to="/app/books"
										className={linkClass("/app/books")}
										onClick={() => setOpenMenu(false)}
									>
										Books
									</Link>
								)}

								{!isAuthenticated && (
									<Link
										to="/sign-in"
										className={linkClass("/sign-in")}
										onClick={() => setOpenMenu(false)}
									>
										Sign In
									</Link>
								)}
								{!isAuthenticated && (
									<Link
										to="/sign-up"
										className={linkClass("/sign-up")}
										onClick={() => setOpenMenu(false)}
									>
										Sign Up
									</Link>
								)}

								{isAuthenticated && user.role === "ADMIN" && (
									<Link
										to="/admin"
										className={linkClass("/admin")}
										onClick={() => setOpenMenu(false)}
									>
										Manage Books
									</Link>
								)}

								{isAuthenticated && (
									<>
										<Link
											to={`/app/profile/${user.id}`}
											className={
												linkClass(`/app/profile/${user.id}`) +
												" flex items-center gap-2"
											}
											onClick={() => setOpenMenu(false)}
										>
											<FaRegUserCircle
												className=" text-black/60 dark:text-gray-100 hover:scale-105 hover:text-black/100 dark:hover:text-gray-100 transition-all duration-200 cursor-pointer"
												size={25}
											/>
											Profile
										</Link>
										<div
											className="flex items-center gap-2 ml-2"
											onClick={handleLogout}
										>
											<RxExit
												className="ml-2 text-black/60 dark:text-gray-100 hover:scale-105 hover:text-black/100 dark:hover:text-gray-100 transition-all duration-200 cursor-pointer"
												size={25}
											/>
											Logout
										</div>
									</>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}