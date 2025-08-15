import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { authActions } from "../redux/slices/authSlice";
import React, { useEffect } from "react";
import { Eye, EyeOff, User, Mail, Lock, CheckCircle } from "lucide-react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

interface ErrorState {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
}

export default function SignUp() {
    const [userInfo, setUserInfo] = React.useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });

    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const [error, setError] = React.useState<ErrorState>({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [showVerificationPrompt, setShowVerificationPrompt] =
        React.useState(false);
    const [verificationMessage, setVerificationMessage] = React.useState("");
    const [resendingVerification, setResendingVerification] =
        React.useState(false);

    const router = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isAuthenticated && user) {
            router(user.role === "ADMIN" ? "/admin" : "/");
        }
    }, [isAuthenticated, user, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
        if (error[name as keyof ErrorState]) {
            setError((prevError) => ({ ...prevError, [name]: "" }));
        }
    };

    const validateForm = () => {
        const currentError: ErrorState = {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
        };

        if (!userInfo.name) currentError.name = "Please enter your full name";
        if (!userInfo.email)
            currentError.email = "Please enter your email address";
        if (!userInfo.password) {
            currentError.password = "Please create a password";
        } else if (
    !/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+={}[\]:;"'<>,.?~`-]{8,}$/.test(
                userInfo.password
            )
        ) {
            currentError.password =
                "Password must be at least 8 characters with at least one letter and one number.";
        }
        if (!userInfo.confirmPassword) {
            currentError.confirmPassword = "Please confirm your password";
        } else if (userInfo.password !== userInfo.confirmPassword) {
            currentError.confirmPassword = "Passwords do not match";
        }

        setError(currentError);
        return Object.values(currentError).every((err) => err === "");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleResendVerification = async () => {
        setResendingVerification(true);
        try {
            const response = await api.post(
                "/api/v1/auth/resend-verification",
                {
                    email: userInfo.email,
                }
            );
            toast.success(response.data.message || "Verification email sent!");
        } catch (error: unknown) {
            console.error("Resend verification error:", error);
            toast.error(
                error.response?.data?.message ||
                    "Failed to resend verification email"
            );
        } finally {
            setResendingVerification(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            const response = await api.post("/api/v1/auth/sign-up", {
                name: userInfo.name,
                email: userInfo.email,
                password: userInfo.password,
            });

            // Check if email verification is required
            if (response.data.requiresVerification) {
                // Email verification flow - don't auto-login
                setVerificationMessage(response.data.message);
                setShowVerificationPrompt(true);
                toast.success(
                    "Account created! Please check your email to verify your account."
                );
            } else {
                // Original flow - auto-login if verification not required
                dispatch(authActions.login(response.data.user));
                router("/");
            }
        } catch (error: unknown) {
            console.error("Sign up error:", error);
            setError({
                email: error.response?.data?.message?.includes("email")
                    ? error.response.data.message
                    : "",
                password: error.response?.data?.message?.includes("password")
                    ? error.response.data.message
                    : "",
                name: error.response?.data?.message?.includes("name")
                    ? error.response.data.message
                    : "Something went wrong. Please try again.",
                confirmPassword: "",
            });
            toast.error(
                error.response?.data?.message ||
                    "Sign up failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-2xl p-8 space-y-8">
                    {showVerificationPrompt ? (
                        /* Verification Prompt */
                        <div className="text-center space-y-6">
                            <div className="flex justify-center">
                                <CheckCircle className="h-16 w-16 text-green-500" />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Check Your Email!
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {verificationMessage}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    We've sent a verification link to{" "}
                                    <strong>{userInfo.email}</strong>
                                </p>
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={handleResendVerification}
                                    disabled={resendingVerification}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    {resendingVerification ? (
                                        <>
                                            <Loader />
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
                                    Go to Sign In
                                </Link>
                            </div>

                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Didn't receive the email? Check your spam folder
                                or click resend.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="text-center space-y-2">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Create Account
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Join us and get started today
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                                    >
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                                        </div>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            name="name"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-800"
                                            value={userInfo.name}
                                            onChange={handleInputChange}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    {error.name && (
                                        <p className="text-red-500 dark:text-red-400 text-sm font-medium flex items-center gap-1">
                                            {error.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                                    >
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            name="email"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-800"
                                            value={userInfo.email}
                                            onChange={handleInputChange}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    {error.email && (
                                        <p className="text-red-500 dark:text-red-400 text-sm font-medium flex items-center gap-1">
                                            {error.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                                        </div>
                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Create a strong password"
                                            name="password"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-800"
                                            value={userInfo.password}
                                            onChange={handleInputChange}
                                            required
                                            disabled={loading}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            disabled={loading}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 dark:hover:bg-gray-300 rounded-r-lg transition-colors duration-200 min-w-[44px] min-h-[44px] justify-center disabled:cursor-not-allowed disabled:hover:bg-transparent"
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 " />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                    {error.password && (
                                        <p className="text-red-500 dark:text-red-400 text-sm font-medium flex items-center gap-1">
                                            {error.password}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-sm font-semibold text-gray-700"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </span>
                                        <input
                                            id="confirmPassword"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="confirmPassword"
                                            value={userInfo.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Re-enter your password"
                                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-4 focus:ring-violet-500 focus:border-violet-500 focus:ring-offset-1"
                                            disabled={loading}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 inset-y-0 flex items-center"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            disabled={loading}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <Eye className="w-5 h-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                    {error.confirmPassword && (
                                        <p className="text-sm text-red-500">
                                            {error.confirmPassword}
                                        </p>
                                    )}
                                </div>

                                <div className="relative group">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-blue-500 hover:bg-blue-600/70 text-gray-100 font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-lg flex justify-center items-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader size={20} />
                                                <span>Creating Account...</span>
                                            </>
                                        ) : (
                                            "Create Account"
                                        )}
                                    </button>
                                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-64 bg-blue-100 text-blue-800 text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300 px-3 py-2 pointer-events-none group-hover:pointer-events-auto z-10">
                                        Please double-check your inputs before
                                        creating the account.
                                    </div>
                                </div>
                            </form>

                            {/* Divider */}
                            <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mt-4">
                                <div className="h-px bg-gray-300 flex-1" />
                                <span>or continue with</span>
                                <div className="h-px bg-gray-300 flex-1" />
                            </div>

                            {/* Google Sign Up/Login */}
                            <div className="flex items-center justify-center mt-4">
                                <GoogleLogin
                                    onSuccess={async (credentialResponse) => {
                                        try {
                                            const res = await api.post(
                                                "/api/v1/auth/google-auth",
                                                {
                                                    token: credentialResponse.credential,
                                                }
                                            );

                                            dispatch(
                                                authActions.login(res.data.user)
                                            );
                                            if (
                                                res.data.user.role === "ADMIN"
                                            ) {
                                                router("/admin");
                                            } else {
                                                router("/");
                                            }
                                        } catch (err) {
                                            console.error(
                                                "Google SignUp error",
                                                err
                                            );
                                        }
                                    }}
                                    onError={() => {
                                        toast.error("Google Login Failed", {
                                            position: "top-right",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            theme: "colored",
                                        });
                                    }}
                                />
                            </div>

                            {/* Footer */}
                            <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-600">
                                <p className=" text-gray-600 dark:text-gray-100">
                                    Already have an account?{" "}
                                    <Link
                                        to="/sign-in"
                                        className="font-semibold text-blue-600 dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-400 transition-colors duration-200"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
