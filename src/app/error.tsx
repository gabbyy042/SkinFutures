'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log error to monitoring service
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-primary-50 via-white to-skin-light">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="relative mb-6">
          <AlertTriangle className="w-20 h-20 text-orange-500 mx-auto" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Something Went Wrong
        </h1>

        <p className="text-gray-600 mb-6">
          We encountered an unexpected error. Your data is safe, but something didn't work as expected.
        </p>

        {error.digest && (
          <div className="mb-6 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Error ID: {error.digest}</p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          If this keeps happening, please contact support
        </p>
      </div>
    </div>
  );
}