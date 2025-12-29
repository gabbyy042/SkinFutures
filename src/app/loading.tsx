import { Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-skin-light">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="animate-spin">
            <Sparkles className="w-16 h-16 text-primary-500" />
          </div>
          <div className="absolute inset-0 animate-pulse">
            <Sparkles className="w-16 h-16 text-primary-300 opacity-50" />
          </div>
        </div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}