/**
 * Role & Permission Hooks
 * 
 * Hooks for checking user permissions based on role and position
 */

import { useMemo } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import {
    canAccessRoute,
    hasFeaturePermission,
    getUserPermissions,
    POSITION_PERMISSIONS,
    Position,
    FEATURE_PERMISSIONS
} from '../config/role-permissions.config';
import { UserRole } from '../enums';
import { User } from '@/modules/auth/types';

/**
 * Hook for checking user permissions
 */
export function useRolePermissions() {
    const { user, role, isAuthenticated } = useAuthStore();

    const permissions = useMemo(() => {
        if (!isAuthenticated || !user || !role) {
            return {
                canAccessRoute: () => false,
                hasFeaturePermission: () => false,
                getUserPermissions: () => ({ routes: [], features: [], positionPermissions: POSITION_PERMISSIONS[Position.ADMIN] }),
                isManager: false,
                isStaff: false,
                isGuest: false,
                position: null,
                roleLevel: 0,
            };
        }

        // Extract position from user data
        const position = (user as User).position as keyof typeof POSITION_PERMISSIONS || Position.MANAGER;

        return {
            // Permission checkers
            canAccessRoute: (route: string) => canAccessRoute(route, role, position),
            hasFeaturePermission: (feature: string) => hasFeaturePermission(feature as keyof typeof FEATURE_PERMISSIONS, role, position),
            getUserPermissions: () => getUserPermissions(role, position),

            // Role checks
            isManager: role === UserRole.MANAGER,
            isStaff: role === UserRole.STAFF,
            isGuest: role === UserRole.GUEST,

            // Position and level
            position,
            roleLevel: role === UserRole.MANAGER ? 3 : role === UserRole.STAFF ? 2 : 1,

            // Position-specific permissions
            canManageAll: POSITION_PERMISSIONS[position as keyof typeof POSITION_PERMISSIONS]?.canManageAll || false,
            canViewAll: POSITION_PERMISSIONS[position as keyof typeof POSITION_PERMISSIONS]?.canViewAll || false,
            canEditAll: POSITION_PERMISSIONS[position as keyof typeof POSITION_PERMISSIONS]?.canEditAll || false,
            canDeleteAll: POSITION_PERMISSIONS[position as keyof typeof POSITION_PERMISSIONS]?.canDeleteAll || false,
            canAssignRoles: POSITION_PERMISSIONS[position as keyof typeof POSITION_PERMISSIONS]?.canAssignRoles || false,
            canManageSystem: POSITION_PERMISSIONS[position as keyof typeof POSITION_PERMISSIONS]?.canManageSystem || false,
        };
    }, [isAuthenticated, user, role]);

    return permissions;
}

/**
 * Hook for checking specific route access
 */
export function useRouteAccess(route: string) {
    const { canAccessRoute } = useRolePermissions();

    return useMemo(() => {
        return canAccessRoute(route);
    }, [canAccessRoute, route]);
}

/**
 * Hook for checking specific feature permission
 */
export function useFeaturePermission(feature: string) {
    const { hasFeaturePermission } = useRolePermissions();

    return useMemo(() => {
        return hasFeaturePermission(feature);
    }, [hasFeaturePermission, feature]);
}

/**
 * Hook for getting user's accessible routes
 */
export function useAccessibleRoutes() {
    const { getUserPermissions } = useRolePermissions();

    return useMemo(() => {
        const { routes } = getUserPermissions();
        return routes;
    }, [getUserPermissions]);
}

/**
 * Hook for getting user's accessible features
 */
export function useAccessibleFeatures() {
    const { getUserPermissions } = useRolePermissions();

    return useMemo(() => {
        const { features } = getUserPermissions();
        return features;
    }, [getUserPermissions]);
}

/**
 * Hook for checking if user can perform specific actions
 */
export function useActionPermissions() {
    const {
        canManageAll,
        canViewAll,
        canEditAll,
        canDeleteAll,
        canAssignRoles,
        canManageSystem,
    } = useRolePermissions();

    return {
        // Management permissions
        canManageAll,
        canViewAll,
        canEditAll,
        canDeleteAll,
        canAssignRoles,
        canManageSystem,

        // Specific action checks
        canCreateStaff: canManageAll,
        canEditStaff: canEditAll,
        canDeleteStaff: canDeleteAll,
        canViewStaff: canViewAll,
        canAssignStaffRoles: canAssignRoles,

        canCreateDepartment: canManageAll,
        canEditDepartment: canEditAll,
        canDeleteDepartment: canDeleteAll,
        canViewDepartment: canViewAll,

        canCreateService: canManageAll,
        canEditService: canEditAll,
        canDeleteService: canDeleteAll,
        canViewService: canViewAll,

        canViewReports: canViewAll,
        canExportReports: canViewAll,
        canManageSystemSettings: canManageSystem,
    };
}
