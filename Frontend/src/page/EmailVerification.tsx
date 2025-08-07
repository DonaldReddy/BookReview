import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { api } from "../api";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const EmailVerificationPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<"verifying" | "success" | "error">(
        "verifying"
    );
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get("token");

            console.log("Verification token from URL:", token); // Debug log

            if (!token) {
                setStatus("error");
                setMessage("Invalid verification link. The token is missing.");
                return;
            }

            try {
                console.log(
                    "Sending verification request with token:",
                    token.substring(0, 16) + "..."
                ); // Debug log
                const response = await api.post("/api/v1/auth/verify-email", {
                    token,
                });

                console.log("Verification response:", response.data); // Debug log

                if (response.status === 200) {
                    setStatus("success");
                    setMessage(
                        response.data.message || "Email verified successfully!"
                    );
                    toast.success("Email verified! You can now sign in.");

                    // Redirect to login after 3 seconds
                    setTimeout(() => navigate("/sign-in"), 3000);
                } else {
                    setStatus("error");
                    setMessage(response.data.message || "Verification failed");
                }
            } catch (error: any) {
                console.error("Email verification error:", error);
                console.error("Error response:", error.response?.data); // Debug log

                const errorMessage = error.response?.data?.message;

                // Handle specific error cases
                if (errorMessage?.includes("already verified")) {
                    setStatus("success");
                    setMessage(
                        "Your email is already verified! You can sign in now."
                    );
                    toast.info("Email already verified!");
                    setTimeout(() => navigate("/sign-in"), 2000);
                } else if (errorMessage?.includes("expired")) {
                    setStatus("error");
                    setMessage(
                        "This verification link has expired. Please request a new verification email."
                    );
                } else {
                    setStatus("error");
                    setMessage(
                        errorMessage ||
                            "Network error. Please check your connection and try again."
                    );
                }
            }
        };

        verifyEmail();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-2xl p-8 space-y-8">
                    {status === "verifying" && (
                        <div className="text-center space-y-6">
                            <div className="flex justify-center">
                                <div className="relative">
                                    <RefreshCw className="h-16 w-16 text-blue-500 animate-spin" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Verifying Your Email
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Please wait while we verify your email
                                    address...
                                </p>
                            </div>
                            <Loader />
                        </div>
                    )}

                    {status === "success" && (
                        <div className="text-center space-y-6">
                            <div className="flex justify-center">
                                <CheckCircle className="h-16 w-16 text-green-500" />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    ✅ Email Verified!
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {message}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    You can now sign in to your account.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <Link
                                    to="/sign-in"
                                    className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-center"
                                >
                                    Continue to Sign In
                                </Link>

                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Redirecting automatically in 3 seconds...
                                </p>
                            </div>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="text-center space-y-6">
                            <div className="flex justify-center">
                                <XCircle className="h-16 w-16 text-red-500" />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    ❌ Verification Failed
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {message}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                    <h3 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
                                        Common Issues:
                                    </h3>
                                    <ul className="text-xs text-red-700 dark:text-red-300 space-y-1 text-left">
                                        <li>
                                            • The verification link may have
                                            expired (24 hours)
                                        </li>
                                        <li>
                                            • The link may have been used
                                            already
                                        </li>
                                        <li>
                                            • The link may be malformed or
                                            incomplete
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-3">
                                    <Link
                                        to="/sign-up"
                                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-center"
                                    >
                                        Try Signing Up Again
                                    </Link>

                                    <Link
                                        to="/sign-in"
                                        className="block w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-center"
                                    >
                                        Back to Sign In
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationPage;
