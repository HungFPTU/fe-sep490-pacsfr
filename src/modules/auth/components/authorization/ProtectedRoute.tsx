/**
 * Protected Route Component
 * 
 * Wrapper component for routes that require authentication and specific roles
 */

'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../stores/useAuthStore';
import { UserRole } from '../../enums';
import { ClientOnly } from './ClientOnly';
// import { AccessDeniedPage } from '@/shared/components/common/403'; // No longer used
import { LoadingRedirect } from '@/shared/components/common/LoadingRedirect';
import { useLogoutState } from '../../hooks/useLogoutState';


interface ProtectedRouteProps {
  children: ReactNode;
  /** Required roles to access this route */
  allowedRoles?: UserRole[];
  /** Redirect path if access is denied */
  redirectTo?: string;
  /** Custom fallback component */
  fallback?: ReactNode;
}

function ProtectedRouteContent({
  children,
  allowedRoles,
  redirectTo,
  fallback,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { isLoggingOut } = useLogoutState();
  const isLoading = false; // TODO: Add loading state to auth store if needed

  useEffect(() => {
    if (isLoading) return;

    // Check authentication
    if (!isAuthenticated || !user) {
      console.log('[ProtectedRoute] User not authenticated, redirecting to login');
      if (redirectTo) {
        // If user is logging out, don't redirect immediately to prevent 403 flash
        if (isLoggingOut) {
          console.log('[ProtectedRoute] User is logging out, delaying redirect');
          setTimeout(() => {
            router.push(redirectTo);
          }, 200);
        } else {
          router.push(redirectTo);
        }
        return;
      }
      return;
    }

    // Check role-based access
    if (allowedRoles && allowedRoles.length > 0) {
      // Defensive: don't even try role checks if user.role is missing
      const hasUserRole = typeof user.role !== 'undefined' && user.role !== null;
      const userRoleType = (user as { roleType?: string })?.roleType;
      let hasAccess = false;

      console.log('[ProtectedRoute] Role check:', {
        hasUserRole,
        userRole: user.role,
        userRoleType,
        allowedRoles,
        user: user
      });

      // Try user.role first
      if (hasUserRole) {
        hasAccess =
          allowedRoles.includes(user.role) ||
          allowedRoles.some(role => role.toString() === user.role?.toString()) ||
          allowedRoles.some(role => role === user.role);
        console.log('[ProtectedRoute] Using user.role:', user.role, 'hasAccess:', hasAccess);
      }

      // If no access with user.role, try roleType fallback
      if (!hasAccess && userRoleType) {
        console.log('[ProtectedRoute] Using roleType fallback:', userRoleType);
        hasAccess = allowedRoles.some(role => role.toString() === userRoleType);
        console.log('[ProtectedRoute] roleType hasAccess:', hasAccess);
      }

      if (!hasAccess) {
        console.log(
          `[ProtectedRoute] Access denied for role: ${hasUserRole ? user.role : 'undefined'} Allowed: ${JSON.stringify(allowedRoles.map(r => r?.toString()))}`
        );
        if (redirectTo) {
          router.push(redirectTo);
          return;
        }
      }
    }
  }, [isAuthenticated, user, allowedRoles, redirectTo, router, isLoading, isLoggingOut]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-sm text-slate-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Check authentication
  if (!isAuthenticated || !user) {
    // Skip 403 page if user is logging out
    if (isLoggingOut) {
      console.log('[ProtectedRoute] User is logging out, skipping 403 page');
      return <>{children}</>;
    }

    if (fallback) {
      return <>{fallback}</>;
    }

    // Show loading while redirecting instead of 403 page
    console.log('[ProtectedRoute] User not authenticated, redirecting to login');
    if (redirectTo) {
      router.push(redirectTo);
    } else {
      router.push('/login');
    }
    return <LoadingRedirect message="Đang chuyển hướng đến trang đăng nhập..." />;
  }

  // Check role-based access
  if (allowedRoles && allowedRoles.length > 0) {
    // Skip role check if user is logging out
    if (isLoggingOut) {
      console.log('[ProtectedRoute] User is logging out, skipping role check');
      return <>{children}</>;
    }

    const hasUserRole = typeof user.role !== 'undefined' && user.role !== null;
    const userRoleType = (user as { roleType?: string })?.roleType;
    let hasAccess = false;

    console.log('[ProtectedRoute] Debug info:', {
      hasUserRole,
      userRole: user.role,
      userRoleType,
      allowedRoles,
      user: user
    });

    // Try user.role first
    if (hasUserRole) {
      hasAccess =
        allowedRoles.includes(user.role) ||
        allowedRoles.some(role => role.toString() === user.role?.toString()) ||
        allowedRoles.some(role => role === user.role);
      console.log('[ProtectedRoute] Using user.role:', user.role, 'hasAccess:', hasAccess);
    }

    // If no access with user.role, try roleType fallback
    if (!hasAccess && userRoleType) {
      console.log('[ProtectedRoute] Using roleType fallback:', userRoleType);
      hasAccess = allowedRoles.some(role => role.toString() === userRoleType);
      console.log('[ProtectedRoute] roleType hasAccess:', hasAccess);
    }

    if (!hasAccess) {
      // Show loading while redirecting instead of 403 page
      console.log('[ProtectedRoute] Access denied, redirecting to login');
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push('/login');
      }
      return <LoadingRedirect message="Đang chuyển hướng đến trang đăng nhập..." />;
    }
  }

  // Render children if all checks pass
  return <>{children}</>;
}

export function ProtectedRoute(props: ProtectedRouteProps) {
  return (
    <ClientOnly
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-sm text-slate-600">Đang tải...</p>
          </div>
        </div>
      }
    >
      <ProtectedRouteContent {...props} />
    </ClientOnly>
  );
}
