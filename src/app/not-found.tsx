import Link from 'next/link';
import { Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-primary-50 via-white to-skin-light">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Search className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}