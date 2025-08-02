import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

export default function Layout() {
	return (
		<div
			className="min-h-dvh max-w-screen-2xl flex flex-col items-center
  bg-blue-200/40 text-black
  dark:bg-slate-800 dark:text-white transition-colors"
		>
			<NavBar />
			<div className=" my-15 h-full w-full ">{<Outlet />}</div>
		
			<Footer />
		</div>
	);
}
