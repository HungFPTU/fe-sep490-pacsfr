/**
 * Permission Guard Component
 * 
 * Protects components based on user permissions
 */

'use client';

import { ReactNode } from 'react';
import { useRolePermissions } from '../../hooks/useRolePermissions';

interface PermissionGuardProps {
    children: ReactNode;
    /** Required feature permission */
    feature?: string;
    /** Required route access */
    route?: string;
    /** Required role */
    role?: string;
    /** Required position */
    position?: string;
    /** Fallback component when access is denied */
    fallback?: ReactNode;
    /** Show nothing when access is denied */
    hideOnDeny?: boolean;
}

export function PermissionGuard({
    children,
    feature,
    route,
    role,
    position,
    fallback,
    hideOnDeny = false,
}: PermissionGuardProps) {
    const {
        canAccessRoute,
        hasFeaturePermission,
        isManager,
        isStaff,
        isGuest,
        position: userPosition
    } = useRolePermissions();

    // Check feature permission
    if (feature && !hasFeaturePermission(feature)) {
        return hideOnDeny ? null : <>{fallback}</>;
    }

    // Check route access
    if (route && !canAccessRoute(route)) {
        return hideOnDeny ? null : <>{fallback}</>;
    }

    // Check role
    if (role) {
        const hasRole =
            (role === 'manager' && isManager) ||
            (role === 'staff' && isStaff) ||
            (role === 'guest' && isGuest);

        if (!hasRole) {
            return hideOnDeny ? null : <>{fallback}</>;
        }
    }

    // Check position
    if (position && userPosition !== position) {
        return hideOnDeny ? null : <>{fallback}</>;
    }

    // All checks passed, render children
    return <>{children}</>;
}

/**
 * Feature Permission Guard
 */
interface FeatureGuardProps {
    children: ReactNode;
    feature: string;
    fallback?: ReactNode;
    hideOnDeny?: boolean;
}

export function FeatureGuard({
    children,
    feature,
    fallback,
    hideOnDeny = false
}: FeatureGuardProps) {
    return (
        <PermissionGuard
            feature={feature}
            fallback={fallback}
            hideOnDeny={hideOnDeny}
        >
            {children}
        </PermissionGuard>
    );
}

/**
 * Route Permission Guard
 */
interface RouteGuardProps {
    children: ReactNode;
    route: string;
    fallback?: ReactNode;
    hideOnDeny?: boolean;
}

export function RouteGuard({
    children,
    route,
    fallback,
    hideOnDeny = false
}: RouteGuardProps) {
    return (
        <PermissionGuard
            route={route}
            fallback={fallback}
            hideOnDeny={hideOnDeny}
        >
            {children}
        </PermissionGuard>
    );
}

/**
 * Role Permission Guard
 */
interface RoleGuardProps {
    children: ReactNode;
    role: 'manager' | 'staff' | 'guest';
    fallback?: ReactNode;
    hideOnDeny?: boolean;
}

export function RoleGuard({
    children,
    role,
    fallback,
    hideOnDeny = false
}: RoleGuardProps) {
    return (
        <PermissionGuard
            role={role}
            fallback={fallback}
            hideOnDeny={hideOnDeny}
        >
            {children}
        </PermissionGuard>
    );
}

/**
 * Position Permission Guard
 */
interface PositionGuardProps {
    children: ReactNode;
    position: string;
    fallback?: ReactNode;
    hideOnDeny?: boolean;
}

export function PositionGuard({
    children,
    position,
    fallback,
    hideOnDeny = false
}: PositionGuardProps) {
    return (
        <PermissionGuard
            position={position}
            fallback={fallback}
            hideOnDeny={hideOnDeny}
        >
            {children}
        </PermissionGuard>
    );
}
