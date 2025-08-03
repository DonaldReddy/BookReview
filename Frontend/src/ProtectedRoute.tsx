import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "./redux/store";
import useClient from "./hook/useClient";

export default function ProtectedRoute({
	access,
}: {
	access: "ADMIN" | "USER";
}) {
	const { isAuthenticated, user } = useAppSelector((state) => state.auth);
	const isClient = useClient();

	if (!isClient) return <div>Loading...</div>;

	if (!isAuthenticated) return <Navigate to="/sign-in" />;

	if (access === user?.role || user?.role === "ADMIN") return <Outlet />;

	return <Navigate to="/sign-in" />;
}
