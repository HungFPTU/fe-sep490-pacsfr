/**
 * Authentication feature utilities
 */

import { UserRole } from '../enums';
import { ROLE_HIERARCHY, REGISTRATION_ROLES, ROLE_LABELS } from '../consts';

/**
 * Check if user has required role level
 */
export function hasRoleLevel(userRole: UserRole, requiredRole: UserRole): boolean {
    return ROLE_HIERARCHY[userRole as keyof typeof ROLE_HIERARCHY] >= ROLE_HIERARCHY[requiredRole as keyof typeof ROLE_HIERARCHY];
}

/**
 * Check if user is admin
 */
export function isManager(userRole: UserRole): boolean {
    return userRole === UserRole.MANAGER;
}

/**
 * Check if user is staff (staff or admin)
 */
export function isStaff(userRole: UserRole): boolean {
    return hasRoleLevel(userRole, UserRole.STAFF);
}

/**
 * Get available roles for registration
 */
export function getAvailableRolesForRegistration(): readonly UserRole[] {
    return REGISTRATION_ROLES;
}

/**
 * Get role display label
 */
export function getRoleLabel(role: UserRole): string {
    return ROLE_LABELS[role as keyof typeof ROLE_LABELS] as string;
}

/**
 * Validate token format
 */
export function isValidTokenFormat(token: string): boolean {
    if (!token || typeof token !== 'string') return false;

    // Basic JWT format check (3 parts separated by dots)
    const parts = token.split('.');
    return parts.length === 3;
}

/**
 * Check if token is expired (basic check without verification)
 */
export function isTokenExpired(token: string): boolean {
    try {
        if (!isValidTokenFormat(token)) return true;

        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp;

        if (!exp) return false; // No expiration

        return Date.now() >= exp * 1000;
    } catch {
        return true; // If we can't decode, consider it expired
    }
}

/**
 * Extract user info from token (basic, without verification)
 */
export function extractTokenPayload(token: string): Record<string, unknown> | null {
    try {
        if (!isValidTokenFormat(token)) return null;

        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    } catch {
        return null;
    }
}

/**
 * Format user display name
 */
export function formatUserDisplayName(user: { name?: string; username: string }): string {
    return user.name || user.username;
}

/**
 * Get user initials for avatar display
 */
export function getUserInitials(user: { name?: string; username: string }): string {
    const displayName = formatUserDisplayName(user);
    const initials = displayName
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return initials || 'U';
}

/**
 * Generate avatar URL or initials
 */
export function getUserAvatar(user: { name?: string; username: string; avatar?: string }): string {
    if (user.avatar) return user.avatar;

    const initials = getUserInitials(user);
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=3b82f6&color=fff`;
}

/**
 * Check if user can access route based on role
 */
export function canAccessRoute(userRole: UserRole, routeRequiredRole?: UserRole): boolean {
    if (!routeRequiredRole) return true; // Public route

    return hasRoleLevel(userRole, routeRequiredRole);
}
