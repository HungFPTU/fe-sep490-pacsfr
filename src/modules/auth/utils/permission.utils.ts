/**
 * Permission Utilities
 * 
 * Utility functions for permission checking and management
 */

import { UserRole } from '../enums';
import { User } from '../types';

/**
 * Extract user data from localStorage
 */
export function getUserDataFromStorage() {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const authStorage = localStorage.getItem('auth-storage');
        if (!authStorage) return null;

        const parsed = JSON.parse(authStorage);
        return parsed.state;
    } catch (error) {
        console.error('Error parsing auth storage:', error);
        return null;
    }
}

/**
 * Get user role from localStorage
 */
export function getUserRoleFromStorage(): UserRole | null {
    const userData = getUserDataFromStorage();
    return userData?.role || null;
}

/**
 * Get user position from localStorage
 */
export function getUserPositionFromStorage(): string | null {
    const userData = getUserDataFromStorage();
    return userData?.user?.position || null;
}

/**
 * Get user ID from localStorage
 */
export function getUserIdFromStorage(): string | null {
    const userData = getUserDataFromStorage();
    return userData?.user?.id || null;
}

/**
 * Get user token from localStorage
 */
export function getUserTokenFromStorage(): string | null {
    const userData = getUserDataFromStorage();
    return userData?.token || null;
}

/**
 * Check if user is authenticated based on localStorage
 */
export function isUserAuthenticatedFromStorage(): boolean {
    const userData = getUserDataFromStorage();
    return userData?.isAuthenticated || false;
}

/**
 * Get user full data from localStorage
 */
export function getUserFullDataFromStorage() {
    const userData = getUserDataFromStorage();
    return userData?.user || null;
}

/**
 * Check if user has specific role
 */
export function hasRole(requiredRole: UserRole): boolean {
    const userRole = getUserRoleFromStorage();
    return userRole === requiredRole;
}

/**
 * Check if user has specific position
 */
export function hasPosition(requiredPosition: string): boolean {
    const userPosition = getUserPositionFromStorage();
    return userPosition === requiredPosition;
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(roles: UserRole[]): boolean {
    const userRole = getUserRoleFromStorage();
    return userRole ? roles.includes(userRole) : false;
}

/**
 * Check if user has any of the specified positions
 */
export function hasAnyPosition(positions: string[]): boolean {
    const userPosition = getUserPositionFromStorage();
    return userPosition ? positions.includes(userPosition) : false;
}

/**
 * Check if user has higher or equal role level
 */
export function hasRoleLevel(requiredRole: UserRole): boolean {
    const userRole = getUserRoleFromStorage();
    if (!userRole) return false;

    const roleLevels = {
        [UserRole.MANAGER]: 3,
        [UserRole.STAFF]: 2,
        [UserRole.GUEST]: 1,
    };

    return roleLevels[userRole] >= roleLevels[requiredRole];
}

/**
 * Get user permissions summary
 */
export function getUserPermissionsSummary() {
    const userData = getUserDataFromStorage();

    if (!userData) {
        return {
            isAuthenticated: false,
            role: null,
            position: null,
            userId: null,
            hasToken: false,
        };
    }

    return {
        isAuthenticated: userData.isAuthenticated,
        role: userData.role,
        position: userData.user?.position,
        userId: userData.user?.id,
        hasToken: !!userData.token,
        user: userData.user,
    };
}

/**
 * Check if user can access specific route based on localStorage data
 */
export function canAccessRouteFromStorage(route: string): boolean {
    const userData = getUserDataFromStorage();

    if (!userData?.isAuthenticated) {
        // Public routes
        const publicRoutes = ['/', '/about', '/contact', '/faq', '/guide', '/lookup', '/news'];
        return publicRoutes.some(r => route.startsWith(r));
    }

    const userRole = userData.role;

    // Manager routes
    if (route.startsWith('/manager')) {
        return userRole === UserRole.MANAGER;
    }

    // Staff routes
    if (route.startsWith('/staff')) {
        return userRole === UserRole.STAFF;
    }

    // Queue routes (accessible by both manager and staff)
    if (route.startsWith('/queue')) {
        return userRole === UserRole.MANAGER || userRole === UserRole.STAFF;
    }

    // Public routes
    return true;
}

/**
 * Get user's accessible routes based on localStorage data
 */
export function getAccessibleRoutesFromStorage(): string[] {
    const userData = getUserDataFromStorage();

    if (!userData?.isAuthenticated) {
        return ['/', '/about', '/contact', '/faq', '/guide', '/lookup', '/news'];
    }

    const userRole = userData.role;
    const accessibleRoutes: string[] = ['/', '/about', '/contact', '/faq', '/guide', '/lookup', '/news'];

    if (userRole === UserRole.MANAGER) {
        accessibleRoutes.push(
            '/manager',
            '/manager/quan-ly-nhan-vien',
            '/manager/ca-lam-viec',
            '/manager/co-quan',
            '/manager/phong-ban',
            '/manager/dich-vu',
            '/manager/queue',
            '/manager/monitoring',
            '/manager/reporting'
        );
    }

    if (userRole === UserRole.STAFF) {
        accessibleRoutes.push(
            '/staff',
            '/staff/dashboard',
            '/staff/queue',
            '/staff/workshift',
            '/staff/create-case'
        );
    }

    if (userRole === UserRole.MANAGER || userRole === UserRole.STAFF) {
        accessibleRoutes.push('/queue');
    }

    return accessibleRoutes;
}

/**
 * Validate user session from localStorage
 */
export function validateUserSession(): {
    isValid: boolean;
    user: User | null;
    role: UserRole | null;
    position: string | null;
    token: string | null;
} {
    const userData = getUserDataFromStorage();

    if (!userData) {
        return {
            isValid: false,
            user: null,
            role: null,
            position: null,
            token: null,
        };
    }

    const { isAuthenticated, user, role, token } = userData;

    return {
        isValid: isAuthenticated && !!user && !!role && !!token,
        user,
        role,
        position: user?.position,
        token,
    };
}
