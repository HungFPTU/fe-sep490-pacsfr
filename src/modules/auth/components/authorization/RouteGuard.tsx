/**
 * Route Guard Component
 * 
 * Protects routes based on user role and permissions
 */

'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../../stores/useAuthStore';
import { hasRouteAccess, getDefaultRoute } from '../../config/role-permissions.config';
import { ClientOnly } from './ClientOnly';
import { GlobalLoadingOverlay } from '@/shared/components';

interface RouteGuardProps {
  children: ReactNode;
}

function RouteGuardContent({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();
  const isLoading = false; // TODO: Add loading state to auth store if needed

  useEffect(() => {
    // Wait for auth to load
    if (isLoading) return;

    // Skip route guard for login pages to avoid conflicts
    if (pathname.startsWith('/manager-login') ||
      pathname.startsWith('/staff-login') ||
      pathname.startsWith('/login') ||
      pathname.startsWith('/register')) {
      return;
    }

    // Only check access if user is authenticated
    if (!isAuthenticated || !user) {
      return;
    }

    // Check if user has access to current route
    const hasAccess = hasRouteAccess(pathname, user?.role);

    if (!hasAccess) {
      // Authenticated but no access - redirect to default route for role
      const defaultRoute = getDefaultRoute(user?.role);
      if (defaultRoute !== pathname) {
        router.push(defaultRoute);
      }
    }
  }, [pathname, user?.role, user, isAuthenticated, isLoading, router]);

  // Show loading state while checking
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <GlobalLoadingOverlay />
          <p className="mt-4 text-sm text-slate-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // Skip access check for login/register pages
  if (pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/manager-login') ||
    pathname.startsWith('/staff-login')) {
    return <>{children}</>;
  }

  // Only check access if user is authenticated
  if (!isAuthenticated || !user) {
    return <>{children}</>;
  }

  // Check access for other routes
  const hasAccess = hasRouteAccess(pathname, user?.role);

  if (!hasAccess) {
    // Return null while redirecting
    return null;
  }

  // Render children if access is granted
  return <>{children}</>;
}

export function RouteGuard(props: RouteGuardProps) {
  return (
    <ClientOnly
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <GlobalLoadingOverlay />
            <p className="mt-4 text-sm text-slate-600">Đang kiểm tra quyền truy cập...</p>
          </div>
        </div>
      }
    >
      <RouteGuardContent {...props} />
    </ClientOnly>
  );
}

