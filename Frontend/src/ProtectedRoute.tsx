import { Navigate, Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useAppSelector } from "./redux/store";
import useClient from "./hook/useClient";
import { AlertCircle } from "lucide-react";
import { api } from "./api";
import { toast } from "react-toastify";
import React from "react";

export default function ProtectedRoute({
    access,
}: {
    access: "ADMIN" | "USER";
}) {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const isClient = useClient();
    const [resendingVerification, setResendingVerification] =
        React.useState(false);

    const handleResendVerification = async () => {
        if (!user?.email) return;

        setResendingVerification(true);
        try {
            const response = await api.post(
                "/api/v1/auth/resend-verification",
                {
                    email: user.email,
                }
            );
            toast.success(response.data.message || "Verification email sent!");
        } catch (error: any) {
            console.error("Resend verification error:", error);
            toast.error(
                error.response?.data?.message ||
                    "Failed to resend verification email"
            );
        } finally {
            setResendingVerification(false);
        }
    };

    if (!isClient) return <div>Loading...</div>;

    if (!isAuthenticated) return <Navigate to="/sign-in" />;

    // Check if user has password (regular signup) and is not verified
    if (user && !user.isVerified && user.role !== "ADMIN") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-2xl p-8 space-y-8">
                        <div className="text-center space-y-6">
                            <div className="flex justify-center">
                                <AlertCircle className="h-16 w-16 text-orange-500" />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Email Verification Required
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Please verify your email address to access
                                    this page.
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Check your inbox for a verification email
                                    sent to <strong>{user.email}</strong>
                                </p>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={handleResendVerification}
                                    disabled={resendingVerification}
                                    className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    {resendingVerification ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        "Resend Verification Email"
                                    )}
                                </button>

                                <Link
                                    to="/sign-in"
                                    className="block w-full text-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                                >
                                    Back to Sign In
                                </Link>
                            </div>

                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Didn't receive the email? Check your spam folder
                                or try resending.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (access === user?.role || user?.role === "ADMIN") return <Outlet />;

    return <Navigate to="/sign-in" />;
}
