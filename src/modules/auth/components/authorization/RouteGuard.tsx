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
import { useLogoutState } from '../../hooks/useLogoutState';
// import { GlobalLoadingOverlay } from '@/shared/components'; // No longer used
import { LoadingRedirect } from '@/shared/components/common/LoadingRedirect';

interface RouteGuardProps {
  children: ReactNode;
}

function RouteGuardContent({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();
  const { isLoggingOut } = useLogoutState();
  const { isLoggingOut } = useLogoutState();
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
      console.log('[RouteGuard] User not authenticated, skipping route guard');
      // If user is logging out, don't check access to prevent 403 flash
      if (isLoggingOut) {
        console.log('[RouteGuard] User is logging out, skipping access check');
        return;
      }
      console.log('[RouteGuard] User not authenticated, skipping route guard');
      // If user is logging out, don't check access to prevent 403 flash
      if (isLoggingOut) {
        console.log('[RouteGuard] User is logging out, skipping access check');
        return;
      }
      return;
    }

    // Check if user has access to current route
    const hasAccess = hasRouteAccess(pathname, user?.role);
    console.log('[RouteGuard] Route access check:', {
      pathname,
      userRole: user?.role,
      hasAccess
    });
    console.log('[RouteGuard] Route access check:', {
      pathname,
      userRole: user?.role,
      hasAccess
    });

    if (!hasAccess) {
      // Authenticated but no access - redirect to default route for role
      const defaultRoute = getDefaultRoute(user?.role);
      console.log('[RouteGuard] No access, redirecting to:', defaultRoute);
      console.log('[RouteGuard] No access, redirecting to:', defaultRoute);
      if (defaultRoute !== pathname) {
        router.push(defaultRoute);
      }
    }
  }, [pathname, user?.role, user, isAuthenticated, isLoading, router, isLoggingOut]);
}, [pathname, user?.role, user, isAuthenticated, isLoading, router, isLoggingOut]);

// Show loading state while checking
if (isLoading) {
  return <>{children}</>;
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

// Skip access check if user is logging out
if (isLoggingOut) {
  console.log('[RouteGuard] User is logging out, skipping access check');
  return <>{children}</>;
}

// Skip access check if user is logging out
if (isLoggingOut) {
  console.log('[RouteGuard] User is logging out, skipping access check');
  return <>{children}</>;
}

// Check access for other routes
const hasAccess = hasRouteAccess(pathname, user?.role);

if (!hasAccess) {
  // Show loading while redirecting instead of 403
  const defaultRoute = getDefaultRoute(user?.role);
  console.log('[RouteGuard] No access, redirecting to:', defaultRoute);
  if (defaultRoute !== pathname) {
    router.push(defaultRoute);
  }
  return <LoadingRedirect message="Đang chuyển hướng đến trang phù hợp..." />;
  // Show loading while redirecting instead of 403
  const defaultRoute = getDefaultRoute(user?.role);
  console.log('[RouteGuard] No access, redirecting to:', defaultRoute);
  if (defaultRoute !== pathname) {
    router.push(defaultRoute);
  }
  return <LoadingRedirect message="Đang chuyển hướng đến trang phù hợp..." />;
}

// Render children if access is granted
return <>{children}</>;
}

export function RouteGuard(props: RouteGuardProps) {
  return (
    <ClientOnly
      fallback={<>{props.children}</>}
    >
      <RouteGuardContent {...props} />
    </ClientOnly>
  );
}

