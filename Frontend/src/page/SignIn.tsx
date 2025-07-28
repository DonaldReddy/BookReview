import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { authActions } from "../redux/slices/authSlice";
import React, { useEffect } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

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
			// TODO add tostify error message
			console.error("Sign in error:", error);
			if (error instanceof AxiosError) {
			const message =
			error?.response?.data?.message ||
			"Sign in failed. Please check your credentials.";

		toast.error(message, {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			theme: "colored",
			});
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

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-8">
			<div className="w-full max-w-md">
				<div className="bg-white dark:bg-slate-800 shadow-2xl rounded-2xl p-8 space-y-8">
					{/* Header */}
					<div className="text-center space-y-2">
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
						<p className="text-gray-600 dark:text-gray-300">Sign in to your account</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Email Field */}
						<div className="space-y-2">
							<label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
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
							<label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
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
									className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-r-lg transition-colors duration-200 min-w-[44px] min-h-[44px] justify-center disabled:cursor-not-allowed disabled:hover:bg-transparent"
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
									<div className="w-5 h-5">
										<Loader size={20} />
									</div>
									<span>Signing In...</span>
								</>
							) : (
								"Sign In"
							)}
						</button>
					</form>

					{/* Footer */}
					<div className="text-center pt-4 border-t border-gray-100">
						<p className="text-gray-600 dark:text-gray-400">
							Don't have an account?{" "}
							<Link 
								to="/sign-up" 
								className="font-semibold text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition-colors duration-200"
							>
								Sign Up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}