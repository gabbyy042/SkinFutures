'use client';

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
      <div className="space-y-3">
        <div className="h-12 bg-gray-200 rounded-xl"></div>
        <div className="h-12 bg-gray-200 rounded-xl"></div>
        <div className="h-12 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
}

export function ImageSkeleton() {
  return (
    <div className="aspect-square bg-gray-200 rounded-3xl animate-pulse">
      <div className="h-full flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-primary-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl"></div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-32 bg-gray-200 rounded-3xl"></div>
        <div className="h-32 bg-gray-200 rounded-3xl"></div>
      </div>
      <div className="h-64 bg-gray-200 rounded-3xl"></div>
    </div>
  );
}