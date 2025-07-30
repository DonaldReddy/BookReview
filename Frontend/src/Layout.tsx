import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";

export default function Layout() {
	return (
		<div className="bg-blue-200/40 min-h-dvh max-w-screen-2xl flex flex-col items-center text-black">
			<NavBar />
			<div className=" my-15 h-full w-full ">{<Outlet />}</div>
			<div className="mb-4">
				Made with ⚡ by{" "}
				<a href="https://donaldreddy.xyz" target="_blank" className="underline	">
					Donald Reddy
				</a>{" "}
				{new Date().getFullYear()}
			</div>
		</div>
	);
}
