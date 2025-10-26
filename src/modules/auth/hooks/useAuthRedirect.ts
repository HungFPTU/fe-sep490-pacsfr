/**
 * Authentication Redirect Hook
 * 
 * Handles post-login redirects and URL management
 */

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/useAuthStore';
import { UserRole } from '../enums';
import {
    getPostLoginRedirect,
    extractReturnUrl,
    getAppropriateLoginUrl
} from '../utils/auth-redirect.utils';

/**
 * Hook for handling authentication redirects
 */
export const useAuthRedirect = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Extract return URL from query params
    const returnUrl = extractReturnUrl(searchParams);

    /**
     * Handle post-login redirect
     */
    const handlePostLoginRedirect = (userRole: UserRole) => {
        const redirectUrl = getPostLoginRedirect(userRole, returnUrl);
        console.log('[Auth Redirect] User role:', userRole);
        console.log('[Auth Redirect] Return URL:', returnUrl);
        console.log('[Auth Redirect] Redirecting to:', redirectUrl);

        // Prevent redirect loops
        if (redirectUrl === window.location.pathname) {
            console.warn('[Auth Redirect] Redirect loop detected, skipping redirect');
            return;
        }

        // Use immediate redirect to avoid conflicts
        window.location.replace(redirectUrl);
    };

    /**
     * Redirect to appropriate login page
     */
    const redirectToLogin = (intendedUrl?: string) => {
        const url = intendedUrl || window.location.pathname;
        const loginUrl = getAppropriateLoginUrl(url);
        console.log('[Auth Redirect] Redirecting to login:', loginUrl);
        router.push(loginUrl);
    };

    /**
     * Redirect to role-specific default route
     */
    const redirectToDefaultRoute = (userRole: UserRole) => {
        const defaultUrl = getPostLoginRedirect(userRole);
        console.log('[Auth Redirect] Redirecting to default route:', defaultUrl);
        router.push(defaultUrl);
    };

    return {
        returnUrl,
        handlePostLoginRedirect,
        redirectToLogin,
        redirectToDefaultRoute,
    };
}

/**
 * Hook for automatic post-login redirect
 */
export function useAutoRedirect() {
    const { user, isAuthenticated } = useAuthStore();
    const { handlePostLoginRedirect } = useAuthRedirect();

    useEffect(() => {
        if (isAuthenticated && user?.role) {
            console.log('[Auto Redirect] User authenticated with role:', user.role);
            handlePostLoginRedirect(user.role);
        }
    }, [isAuthenticated, user?.role, handlePostLoginRedirect]);
}

/**
 * Hook for protecting routes and redirecting unauthorized users
 */
export function useRouteProtection() {
    const { user, isAuthenticated } = useAuthStore();
    const { redirectToLogin, redirectToDefaultRoute } = useAuthRedirect();

    /**
     * Check if user can access current route
     */
    const checkRouteAccess = (allowedRoles: UserRole[]): boolean => {
        if (!isAuthenticated || !user) {
            redirectToLogin();
            return false;
        }

        if (!allowedRoles.includes(user.role)) {
            // User doesn't have permission, redirect to their default route
            redirectToDefaultRoute(user.role);
            return false;
        }

        return true;
    };

    return {
        checkRouteAccess,
        redirectToLogin,
    };
}
