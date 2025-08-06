import { useState } from 'react';
import { toast } from 'react-toastify';
import { resendVerificationEmail } from '../api';

interface EmailVerificationNoticeProps {
  email: string;
  onClose: () => void;
}

export default function EmailVerificationNotice({ email, onClose }: EmailVerificationNoticeProps) {
  const [isResending, setIsResending] = useState(false);

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      await resendVerificationEmail(email);
      toast.success('Verification email sent successfully!');
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="text-center">
          <div className="text-yellow-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Email Verification Required
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please verify your email address before signing in. Check your inbox for a verification email.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={handleResendVerification}
              disabled={isResending}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isResending ? 'Sending...' : 'Resend Verification Email'}
            </button>
            
            <button
              onClick={onClose}
              className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
