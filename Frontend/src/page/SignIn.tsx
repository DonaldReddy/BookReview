import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { authActions } from "../redux/slices/authSlice";
import React, { useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { LoginError } from "../types";

export default function SignIn() {
	const [userInfo, setUserInfo] = React.useState({
		email: "",
		password: "",
	});
	const router = useNavigate();
	const { isAuthenticated, user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const [loading, setLoading] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);
	const [verificationError, setVerificationError] = React.useState<LoginError | null>(null);
	const [resendingVerification, setResendingVerification] = React.useState(false);

	useEffect(() => {
		if (isAuthenticated && user) {
			if (user.role === "ADMIN") {
				router("/admin");
			} else if (user.role === "USER") {
				router("/");
			}
		}
	}, [isAuthenticated, user, router]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserInfo((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setVerificationError(null);
		try {
			const response = await api.post("/api/v1/auth/sign-in", userInfo);
			dispatch(authActions.login(response.data.user));
			toast.success("Signed in successfully!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: "colored",
			});
			router("/");
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				const errorData = error?.response?.data;
				const message = errorData?.message || "Sign in failed. Please check your credentials.";

				// Check if error is due to email verification
				if (errorData?.requiresVerification || message.includes("verify your email")) {
					setVerificationError({
						message,
						requiresVerification: true
					});
				} else {
					toast.error(message, {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						theme: "colored",
					});
				}
			} else {
				// Handle unexpected errors
				toast.error("An unexpected error occurred", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: "colored",
				});
			}
		} finally {
			setLoading(false);
		}
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
			setVerificationError(null);
		} catch (error: any) {
			console.error("Resend verification error:", error);
			toast.error(
				error.response?.data?.message || "Failed to resend verification email",
			);
		} finally {
			setResendingVerification(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-8">
			<div className="w-full max-w-md">
				<div className="bg-white dark:bg-slate-800 shadow-2xl rounded-2xl p-8 space-y-8">
					{/* Header */}
					<div className="text-center space-y-2">
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
							Welcome Back
						</h1>
						<p className="text-gray-600 dark:text-gray-300">
							Sign in to your account
						</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-6">
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
									type={showPassword ? "text" : "password"}
									placeholder="Enter your password"
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
									className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-r-lg transition-colors duration-200 min-w-[44px] min-h-[44px] justify-center disabled:cursor-not-allowed"
									aria-label={showPassword ? "Hide password" : "Show password"}
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									) : (
										<Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									)}
								</button>
							</div>
						</div>

						{/* Forgot Password */}
						<div className="flex justify-end">
							<button
								type="button"
								disabled={loading}
								className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition-colors duration-200 disabled:text-gray-400 disabled:cursor-not-allowed"
							>
								Forgot Password?
							</button>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={loading}
							className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:to-blue-500 hover:from-blue-700 hover:to-blue-800 dark:hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 dark:disabled:to-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
						>
							{loading ? (
								<>
									<Loader size={20} />
									<span>Logging in...</span>
								</>
							) : (
								"Login"
							)}
						</button>
					</form>
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
									const res = await api.post("/api/v1/auth/google-auth", {
										token: credentialResponse.credential,
									});

									dispatch(authActions.login(res.data.user));
									if (res.data.user.role === "ADMIN") {
										router("/admin");
									} else {
										router("/");
									}
								} catch (err) {
									console.error("Google SignUp error", err);
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

					{/* Email Verification Error */}
					{verificationError && verificationError.requiresVerification && (
						<div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg space-y-3">
							<div className="flex items-start space-x-3">
								<AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
								<div className="flex-1">
									<h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
										Email Verification Required
									</h4>
									<p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
										{verificationError.message}
									</p>
								</div>
							</div>
							<div className="flex space-x-3">
								<button
									onClick={handleResendVerification}
									disabled={resendingVerification || !userInfo.email}
									className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white text-sm font-medium rounded-md transition-colors duration-200 flex items-center gap-2"
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
								<button
									onClick={() => setVerificationError(null)}
									className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md transition-colors duration-200"
								>
									Dismiss
								</button>
							</div>
						</div>
					)}

					{/* Footer */}
					<div className="text-center pt-4 border-t border-gray-100">
						<p className="text-gray-600 dark:text-gray-400">
							Don't have an account?{" "}
							<Link
								to="/sign-up"
								className="font-semibold text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition-colors duration-200"
							>
								Register
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
