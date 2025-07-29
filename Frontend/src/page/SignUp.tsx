import { GoogleLogin } from "@react-oauth/google";
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
    if (!userInfo.email) currentError.email = "Please enter your email address";
    if (!userInfo.password) {
      currentError.password = "Please create a password";
    } else if (
      !/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]{8,}$/.test(
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
      dispatch(authActions.login(response.data.user));
      router("/");
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
      toast.error(
        error.response?.data?.message || "Sign up failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6e0ff] to-[#f3e8ff] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-8 border border-violet-200">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-violet-700">
              Create Your Account
            </h1>
            <p className="text-gray-600">
              Begin your reading journey today with us.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </span>
                </span>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-4 focus:ring-violet-500 focus:border-violet-500 focus:ring-offset-1"
                  disabled={loading}
                  required
                />
              </div>
              {error.name && (
                <p className="text-sm text-red-500">{error.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </span>
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-4 focus:ring-violet-500 focus:border-violet-500 focus:ring-offset-1"
                  disabled={loading}
                  required
                />
              </div>
              {error.email && (
                <p className="text-sm text-red-500">{error.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userInfo.password}
                  onChange={handleInputChange}
                  placeholder="Create a secure password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-4 focus:ring-violet-500 focus:border-violet-500 focus:ring-offset-1"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 inset-y-0 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                </button>
              </div>
              {error.password && <p className="text-sm text-red-500">{error.password}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                </button>
              </div>
              {error.confirmPassword && <p className="text-sm text-red-500">{error.confirmPassword}</p>}
            </div>

            <div className="relative group">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 shadow-lg flex justify-center items-center gap-2"
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
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-64 bg-green-100 text-green-800 text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300 px-3 py-2 pointer-events-none group-hover:pointer-events-auto z-10">
                Please double-check your inputs before creating the account.
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
                console.error("Google Login Failed");
              }}
            />
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="font-semibold text-violet-600 hover:text-violet-800 transition-colors duration-200"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
