'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSkeleton } from './LoadingSkeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireData?: boolean;
}

export function ProtectedRoute({ children, requireData = false }: ProtectedRouteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = () => {
      try {
        if (requireData) {
          const skinData = localStorage.getItem('skinData');
          if (!skinData) {
            router.push('/onboarding');
            return;
          }
        }
        setHasAccess(true);
      } catch (error) {
        console.error('Access check failed:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [requireData, router]);

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
}