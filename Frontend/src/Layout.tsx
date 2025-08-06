import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import EmailVerificationBanner from "./components/NavBar/EmailVerificationBanner";

export default function Layout() {
	return (
		<div
			className="min-h-dvh w-full flex flex-col
  bg-blue-200/40 text-black
  dark:bg-slate-800 dark:text-white transition-colors"
		>
			<NavBar />
			<EmailVerificationBanner />
			<div className="my-24 h-full w-full flex-grow">{<Outlet />}</div>

			<Footer />
		</div>
	);
}
