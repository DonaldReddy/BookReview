import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { authActions } from "../redux/slices/authSlice";
import React, { useEffect } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

interface ErrorState {
	email: string;
	password: string;
	name: string;
}

export default function SignUp() {
	const [userInfo, setUserInfo] = React.useState({
		email: "",
		password: "",
		name: "",
	});
	const { isAuthenticated, user } = useAppSelector((state) => state.auth);
	const [error, setError] = React.useState<ErrorState>({
		email: "",
		password: "",
		name: "",
	});
	const [loading, setLoading] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const router = useNavigate();
	const dispatch = useAppDispatch();

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
		
		// Clear error when user starts typing
		if (error[name as keyof ErrorState]) {
			setError((prevError) => ({
				...prevError,
				[name]: "",
			}));
		}
	};

	const validateForm = () => {
		const currentError: ErrorState = {
			email: "",
			password: "",
			name: "",
		};
		
		if (userInfo.email === "") {
			currentError.email = "Email is required";
		}
		
		if (userInfo.password === "") {
			currentError.password = "Password is required";
		} else {
			// allow special characters in password
			const passwordRegex =
				/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]{8,}$/;
			if (!passwordRegex.test(userInfo.password)) {
				currentError.password =
					"Password must be at least 8 characters long and contain at least one letter and one number";
			}
		}

		if (userInfo.name === "") {
			currentError.name = "Name is required";
		}

		setError(currentError);
		return Object.values(currentError).every(err => err === "");
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		if (!validateForm()) {
			toast.error("Please fix the form errors.");
			return;
		}
		
		setLoading(true);
		
		try {
			console.log(userInfo);
			const response = await api.post("/api/v1/auth/sign-up", userInfo);
			dispatch(authActions.login(response.data.user));
			toast.success("Account created successfully!");
			setTimeout(() => router("/"), 1000);
			router("/");
		} catch (error: any) {
			console.error("Sign up error:", error);
			// Handle specific error cases
			if (error.response?.data?.message) {
				// If backend returns field-specific errors
				setError({
					email: error.response.data.message.includes("email") ? error.response.data.message : "",
					password: error.response.data.message.includes("password") ? error.response.data.message : "",
					name: error.response.data.message.includes("name") ? error.response.data.message : "",
				});
			} else {
				// Generic error handling
				setError({
					email: "",
					password: "",
					name: "Something went wrong. Please try again.",
				});
				toast.error("Something went wrong. Please try again.");
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
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h1>
						<p className="text-gray-600 dark:text-gray-300">Join us and get started today</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Name Field */}
						<div className="space-y-2">
							<label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
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
							{error.email && (
								<p className="text-red-500 dark:text-red-400 text-sm font-medium flex items-center gap-1">
									{error.email}
								</p>
							)}
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
									aria-label={showPassword ? "Hide password" : "Show password"}
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
									<span>Creating Account...</span>
								</>
							) : (
								"Create Account"
							)}
						</button>
					</form>

					{/* Footer */}
					<div className="text-center pt-4 border-t border-gray-100 dark:border-gray-600">
						<p className=" text-gray-600 dark:text-gray-100">
							Already have an account?{" "}
							<Link 
								to="/sign-in" 
								className="font-semibold text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition-colors duration-200"
							>
								Sign In
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}