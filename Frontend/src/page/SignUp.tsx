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
    const [showVerificationPrompt, setShowVerificationPrompt] = React.useState(false);
    const [verificationMessage, setVerificationMessage] = React.useState("");
    const [resendingVerification, setResendingVerification] = React.useState(false);

    const router = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isAuthenticated && user) {
            router(user.role === "ADMIN" ? "/admin" : "/");
        }
    }, [isAuthenticated, user, router]);

    const validateStrongPassword = (password: string) => {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));

        if (name === "password") {
            if (!validateStrongPassword(value)) {
                setError((prev) => ({
                    ...prev,
                    password: "Password must be at least 8 characters.",
                }));
            } else {
                setError((prev) => ({ ...prev, password: "" }));
            }
        }

        if (name === "confirmPassword") {
            if (value.length < 8) {
                setError((prev) => ({
                    ...prev,
                    confirmPassword: "Confirm Password must be at least 8 characters.",
                }));
            } else if (value !== userInfo.password) {
                setError((prev) => ({
                    ...prev,
                    confirmPassword: "Passwords do not match",
                }));
            } else {
                setError((prev) => ({ ...prev, confirmPassword: "" }));
            }
        }

        if (error[name as keyof ErrorState] && name !== "password" && name !== "confirmPassword") {
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
        if (!userInfo.email) currentError.email = "Please enter your email address";

        if (!userInfo.password) {
            currentError.password = "Please create a password";
        } else if (!validateStrongPassword(userInfo.password)) {
            currentError.password = "Password must be at least 8 characters.";
        }

        if (!userInfo.confirmPassword) {
            currentError.confirmPassword = "Please confirm your password";
        } else if (userInfo.confirmPassword.length < 8) {
            currentError.confirmPassword = "Confirm Password must be at least 8 characters.";
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
            const response = await api.post("/api/v1/auth/resend-verification", {
                email: userInfo.email,
            });
            toast.success(response.data.message || "Verification email sent!");
        } catch (error: any) {
            console.error("Resend verification error:", error);
            toast.error(error.response?.data?.message || "Failed to resend verification email");
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

            if (response.data.requiresVerification) {
                setVerificationMessage(response.data.message);
                setShowVerificationPrompt(true);
                toast.success("Account created! Please check your email to verify your account.");
            } else {
                dispatch(authActions.login(response.data.user));
                router("/");
            }
        } catch (error: any) {
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
            toast.error(error.response?.data?.message || "Sign up failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    Create your account
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-1 font-medium text-gray-900 dark:text-gray-200">
                            Full Name
                        </label>
                        <div className="flex items-center border rounded-lg px-3 dark:border-gray-600">
                            <User className="text-gray-400 dark:text-gray-300" />
                            <input
                                type="text"
                                name="name"
                                value={userInfo.name}
                                onChange={handleInputChange}
                                className="flex-1 p-2 outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="Enter your full name"
                            />
                        </div>
                        {error.name && <p className="text-sm text-red-500">{error.name}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-900 dark:text-gray-200">
                            Email
                        </label>
                        <div className="flex items-center border rounded-lg px-3 dark:border-gray-600">
                            <Mail className="text-gray-400 dark:text-gray-300" />
                            <input
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleInputChange}
                                className="flex-1 p-2 outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        {error.email && <p className="text-sm text-red-500">{error.email}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-900 dark:text-gray-200">
                            Password
                        </label>
                        <div className="flex items-center border rounded-lg px-3 dark:border-gray-600">
                            <Lock className="text-gray-400 dark:text-gray-300" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={userInfo.password}
                                onChange={handleInputChange}
                                className="flex-1 p-2 outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="Create a strong password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="focus:outline-none"
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                        {error.password && <p className="text-sm text-red-500">{error.password}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-900 dark:text-gray-200">
                            Confirm Password
                        </label>
                        <div className="flex items-center border rounded-lg px-3 dark:border-gray-600">
                            <Lock className="text-gray-400 dark:text-gray-300" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={userInfo.confirmPassword}
                                onChange={handleInputChange}
                                className="flex-1 p-2 outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="Re-enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="focus:outline-none"
                            >
                                {showConfirmPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                        {error.confirmPassword && (
                            <p className="text-sm text-red-500">{error.confirmPassword}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        disabled={loading}
                    >
                        {loading ? <Loader /> : "Create Account"}
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-gray-900 dark:text-gray-300">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>

                {showVerificationPrompt && (
                    <div className="p-4 border rounded-lg mt-4 dark:border-gray-600">
                        <CheckCircle className="text-green-500 inline mr-2" />
                        <span className="text-gray-900 dark:text-gray-300">{verificationMessage}</span>
                        <button
                            onClick={handleResendVerification}
                            className="ml-4 text-indigo-600 hover:underline"
                            disabled={resendingVerification}
                        >
                            {resendingVerification ? "Resending..." : "Resend Email"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
