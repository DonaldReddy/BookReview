import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../api";
import { Eye, EyeOff, Lock } from "lucide-react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function ResetPassword() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const token = searchParams.get("token");

	const [passwords, setPasswords] = useState({
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	useEffect(() => {
		if (!token) {
			toast.error("Invalid reset link. Please request a new password reset.", {
				position: "top-right",
				autoClose: 3000,
				theme: "colored",
			});
			navigate("/sign-in");
		}
	}, [token, navigate]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPasswords((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (passwords.password !== passwords.confirmPassword) {
			toast.error("Passwords do not match", {
				position: "top-right",
				autoClose: 3000,
				theme: "colored",
			});
			return;
		}

		if (passwords.password.length < 6) {
			toast.error("Password must be at least 6 characters long", {
				position: "top-right",
				autoClose: 3000,
				theme: "colored",
			});
			return;
		}

		setLoading(true);
		try {
			await api.post("/api/v1/auth/reset-password", {
				token,
				password: passwords.password,
			});

			toast.success(
				"Password reset successfully! You can now sign in with your new password.",
				{
					position: "top-right",
					autoClose: 5000,
					theme: "colored",
				},
			);

			navigate("/sign-in");
		} catch (error: unknown) {
			console.error("Reset password error:", error);
			if (error instanceof AxiosError) {
				const message =
					error?.response?.data?.message || "Failed to reset password";
				toast.error(message, {
					position: "top-right",
					autoClose: 3000,
					theme: "colored",
				});
			} else {
				toast.error("An unexpected error occurred", {
					position: "top-right",
					autoClose: 3000,
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

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	if (!token) {
		return null;
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-8">
			<div className="w-full max-w-md">
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
					{/* Header */}
					<div className="text-center mb-8">
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
							📚 BookReview
						</h1>
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
							Reset Your Password
						</h2>
						<p className="text-gray-600 dark:text-gray-400 mt-2">
							Enter your new password below
						</p>
					</div>

					{/* Reset Password Form */}
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* New Password */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
							>
								New Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="Enter your new password"
									name="password"
									className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-800"
									value={passwords.password}
									onChange={handleInputChange}
									required
									disabled={loading}
									minLength={6}
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

						{/* Confirm Password */}
						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
							>
								Confirm New Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="confirmPassword"
									type={showConfirmPassword ? "text" : "password"}
									placeholder="Confirm your new password"
									name="confirmPassword"
									className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-gray-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-800"
									value={passwords.confirmPassword}
									onChange={handleInputChange}
									required
									disabled={loading}
									minLength={6}
								/>
								<button
									type="button"
									onClick={toggleConfirmPasswordVisibility}
									disabled={loading}
									className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-r-lg transition-colors duration-200 min-w-[44px] min-h-[44px] justify-center disabled:cursor-not-allowed"
									aria-label={
										showConfirmPassword ? "Hide password" : "Show password"
									}
								>
									{showConfirmPassword ? (
										<EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									) : (
										<Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									)}
								</button>
							</div>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={
								loading || !passwords.password || !passwords.confirmPassword
							}
							className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
						>
							{loading ? <Loader /> : "Reset Password"}
						</button>
					</form>

					{/* Back to Sign In */}
					<div className="text-center mt-6">
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Remember your password?{" "}
							<button
								onClick={() => navigate("/sign-in")}
								className="font-semibold text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition-colors duration-200"
							>
								Sign In
							</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
