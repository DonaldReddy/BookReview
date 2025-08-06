import { useState } from 'react';
import { Mail, X, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import { resendVerificationEmail } from '../../api';
import { useAppSelector } from '../../redux/store';

export default function EmailVerificationBanner() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [isResending, setIsResending] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Don't show banner if user is authenticated and verified, or if dismissed
  if (!isAuthenticated || user.isVerified || isDismissed) {
    return null;
  }

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      await resendVerificationEmail(user.email);
      toast.success('Verification email sent successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
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
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 px-4 py-3 relative">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 text-sm">
          <Mail className="h-4 w-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
            <span className="text-yellow-800 dark:text-yellow-200 font-medium">
              Please verify your email address
            </span>
            <span className="text-yellow-700 dark:text-yellow-300 text-xs">
              Check your inbox for a verification link
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleResendVerification}
            disabled={isResending}
            className="inline-flex items-center space-x-1 text-xs bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-md hover:bg-yellow-200 dark:hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending ? (
              <>
                <RefreshCw className="h-3 w-3 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Mail className="h-3 w-3" />
                <span>Resend Email</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => setIsDismissed(true)}
            className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200 transition-colors p-1"
            aria-label="Dismiss verification banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
