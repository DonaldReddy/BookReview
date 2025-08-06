import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyEmail, resendVerificationEmail } from '../api';
import { EmailVerificationResponse } from '../types';
import { useAppDispatch } from '../redux/store';
import { authActions } from '../redux/slices/authSlice';

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      handleVerification(token);
    }
  }, [searchParams]);

  const handleVerification = async (token: string) => {
    setIsLoading(true);
    try {
      const response: EmailVerificationResponse = await verifyEmail(token);
      setVerificationStatus('success');
      
      // Auto-login the user after successful verification
      if (response.user) {
        dispatch(authActions.login(response.user));
      }
      
      toast.success(response.message || 'Email verified successfully! You are now logged in.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      
      // Redirect to home page after successful verification
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error: any) {
      setVerificationStatus('error');
      const errorMessage = error.response?.data?.message || 'Email verification failed';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsResending(true);
    try {
      const response: EmailVerificationResponse = await resendVerificationEmail(email);
      toast.success(response.message || 'Verification email sent successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setEmail('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to resend verification email', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-2xl p-8 space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Email Verification
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {verificationStatus === 'pending' ? 'Verifying your email address...' : 
               verificationStatus === 'success' ? 'Email verified successfully!' :
               'Verification failed'}
            </p>
          </div>

          {/* Verification in progress */}
          {verificationStatus === 'pending' && isLoading && (
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we verify your email address...
              </p>
            </div>
          )}

          {/* Verification successful */}
          {verificationStatus === 'success' && (
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="text-green-500 text-6xl mb-4">✅</div>
                <div className="absolute -top-2 -right-2 animate-ping h-4 w-4 bg-green-400 rounded-full"></div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Welcome to BookReview!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your email has been verified successfully. You are now logged in and will be redirected to the home page.
                </p>
              </div>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Continue to Home
              </button>
            </div>
          )}

          {/* Verification failed */}
          {verificationStatus === 'error' && (
            <div className="text-center space-y-6">
              <div className="text-red-500 text-6xl mb-4">❌</div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Verification Failed
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The verification link is invalid or has expired. You can request a new verification email below.
                </p>
              </div>
            </div>
          )}

          {/* Resend verification email form */}
          {(verificationStatus === 'error' || (!searchParams.get('token') && verificationStatus === 'pending')) && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                  Resend Verification Email
                </h4>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-200"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <button
                    onClick={handleResendVerification}
                    disabled={isResending}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                  >
                    {isResending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      'Resend Verification Email'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="text-center space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
            >
              ← Back to Home
            </button>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Need help? <a href="/contact" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">Contact Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
