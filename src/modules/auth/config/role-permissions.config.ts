/**
 * Role & Permission Configuration
 * 
 * Comprehensive role-based access control system
 * Based on user data from localStorage
 */

import { UserRole } from '../enums';

// ============================================================================
// ROLE HIERARCHY
// ============================================================================

export const ROLE_HIERARCHY = {
    [UserRole.MANAGER]: 3, // Highest level
    [UserRole.STAFF]: 2,   // Medium level  
    [UserRole.GUEST]: 1,   // Lowest level
} as const;

/**
 * Check if user role has sufficient level
 */
export function hasRoleLevel(userRole: UserRole, requiredLevel: UserRole): boolean {
    const userLevel = ROLE_HIERARCHY[userRole];
    const requiredLevelValue = ROLE_HIERARCHY[requiredLevel];
    return userLevel >= requiredLevelValue;
}

// ============================================================================
// POSITION-BASED PERMISSIONS
// ============================================================================

export enum Position {
    ADMIN = 'Admin',
    MANAGER = 'Manager',
    STAFF = 'Staff',
    GUEST = 'Guest',
}

/**
 * Position permissions matrix
 */
export const POSITION_PERMISSIONS = {
    [Position.ADMIN]: {
        canManageAll: true,
        canViewAll: true,
        canEditAll: true,
        canDeleteAll: true,
        canAssignRoles: true,
        canManageSystem: true,
    },
    [Position.MANAGER]: {
        canManageAll: true,
        canViewAll: true,
        canEditAll: true,
        canDeleteAll: false,
        canAssignRoles: true,
        canManageSystem: false,
    },
    [Position.GUEST]: {
        canManageAll: false,
        canViewAll: false,
        canEditAll: false,
        canDeleteAll: false,
        canAssignRoles: false,
        canManageSystem: false,
    },
} as const;

// ============================================================================
// ROUTE PERMISSIONS BY ROLE & POSITION
// ============================================================================

/**
 * Route permissions based on role and position
 */
export const ROUTE_PERMISSIONS = {
    // Manager routes
    '/manager': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN, Position.MANAGER],
        description: 'Manager dashboard'
    },
    '/manager/staff-management': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN, Position.MANAGER],
        description: 'Staff management'
    },
    '/manager/co-quan': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN, Position.MANAGER],
        description: 'Organization management'
    },
    '/manager/phong-ban': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN, Position.MANAGER],
        description: 'Department management'
    },
    '/manager/dich-vu': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN, Position.MANAGER],
        description: 'Service management'
    },
    '/manager/queue': {
        roles: [UserRole.MANAGER, UserRole.STAFF],
        positions: [Position.ADMIN, Position.MANAGER],
        description: 'Queue management'
    },
    '/manager/monitoring': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN, Position.MANAGER],
        description: 'System monitoring'
    },
    '/manager/reporting': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN, Position.MANAGER],
        description: 'Reports and analytics'
    },

    // Staff routes
    '/staff': {
        roles: [UserRole.STAFF],
        positions: [Position.STAFF],
        description: 'Staff dashboard'
    },
    '/staff/dashboard': {
        roles: [UserRole.STAFF],
        positions: [Position.STAFF],
        description: 'Staff dashboard'
    },
    '/staff/queue': {
        roles: [UserRole.STAFF],
        positions: [Position.STAFF],
        description: 'Queue management'
    },
    '/staff/workshift': {
        roles: [UserRole.STAFF],
        positions: [Position.STAFF],
        description: 'Work shift management'
    },
    '/staff/create-case': {
        roles: [UserRole.STAFF],
        positions: [Position.STAFF],
        description: 'Create new case'
    },

    // Public routes
    '/': {
        roles: [UserRole.MANAGER, UserRole.STAFF, UserRole.GUEST],
        positions: 'all',
        description: 'Home page'
    },
    '/about': {
        roles: [UserRole.MANAGER, UserRole.STAFF, UserRole.GUEST],
        positions: 'all',
        description: 'About page'
    },
    '/contact': {
        roles: [UserRole.MANAGER, UserRole.STAFF, UserRole.GUEST],
        positions: 'all',
        description: 'Contact page'
    },
} as const;

// ============================================================================
// FEATURE PERMISSIONS
// ============================================================================

/**
 * Feature permissions based on role and position
 */
export const FEATURE_PERMISSIONS = {
    // Staff Management
    'staff.create': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN, Position.MANAGER],
    },
    'staff.view': {
        roles: [UserRole.MANAGER, UserRole.STAFF],
        positions: [Position.ADMIN, Position.MANAGER],
    },
    'staff.edit': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN, Position.MANAGER],
    },
    'staff.delete': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN],
    },

    // Department Management
    'department.create': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN, Position.MANAGER],
    },
    'department.view': {
        roles: [UserRole.MANAGER, UserRole.STAFF],
        positions: [Position.ADMIN, Position.MANAGER],
    },
    'department.edit': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN, Position.MANAGER],
    },
    'department.delete': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN],
    },

    // Service Management
    'service.create': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN, Position.MANAGER],
    },
    'service.view': {
        roles: [UserRole.MANAGER, UserRole.STAFF],
        positions: 'all',
    },
    'service.edit': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN, Position.MANAGER],
    },
    'service.delete': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN],
    },

    // Queue Management
    'queue.manage': {
        roles: [UserRole.MANAGER, UserRole.STAFF],
        positions: [Position.ADMIN, Position.MANAGER],
    },
    'queue.view': {
        roles: [UserRole.MANAGER, UserRole.STAFF],
        positions: 'all',
    },
    'queue.create': {
        roles: [UserRole.STAFF],
        positions: [Position.STAFF],
    },

    // Reports
    'reports.view': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN, Position.MANAGER],
    },
    'reports.export': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN, Position.MANAGER],
    },

    // System Management
    'system.manage': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN],
    },
    'system.view': {
        roles: [UserRole.MANAGER],
        positions: [Position.ADMIN, Position.MANAGER],
    },
} as const;

// ============================================================================
// PERMISSION CHECKERS
// ============================================================================

/**
 * Check if user can access a route
 */
export function canAccessRoute(
    route: string,
    userRole?: UserRole,
    userPosition?: string
): boolean {
    const routeConfig = ROUTE_PERMISSIONS[route as keyof typeof ROUTE_PERMISSIONS];

    if (!routeConfig) {
        // Unknown route, allow access
        return true;
    }

    // If no user role (not authenticated), allow access to public routes
    if (!userRole) {
        // Allow access to login, register, and public routes
        if (route.startsWith('/login') ||
            route.startsWith('/register') ||
            route.startsWith('/') ||
            route === '/') {
            return true;
        }
        return false;
    }

    // Check role first
    if (!(routeConfig.roles as readonly UserRole[]).includes(userRole)) {
        return false;
    }

    // If role matches, check position
    if (userPosition && routeConfig.positions !== 'all') {
        if (Array.isArray(routeConfig.positions)) {
            const hasPosition = routeConfig.positions.includes(userPosition as Position);

            // If position doesn't match but role does, allow access for Manager/Staff roles
            if (!hasPosition) {
                // Special case: Manager role can access manager routes regardless of position
                if (userRole === UserRole.MANAGER && route.startsWith('/manager')) {
                    return true;
                }
                // Special case: Staff role can access staff routes regardless of position
                if (userRole === UserRole.STAFF && route.startsWith('/staff')) {
                    return true;
                }
                return false;
            }
        }
    }

    return true;
}

/**
 * Check if user has a specific feature permission
 */
export function hasFeaturePermission(
    feature: keyof typeof FEATURE_PERMISSIONS,
    userRole?: UserRole,
    userPosition?: string
): boolean {
    const featureConfig = FEATURE_PERMISSIONS[feature];

    if (!featureConfig) {
        return false;
    }

    // Check role
    if (userRole && !(featureConfig.roles as readonly UserRole[]).includes(userRole)) {
        return false;
    }

    // Check position
    if (userPosition && featureConfig.positions !== 'all') {
        if (Array.isArray(featureConfig.positions)) {
            return featureConfig.positions.includes(userPosition as Position);
        }
    }

    return true;
}

/**
 * Get all permissions for a user
 */
export function getUserPermissions(
    userRole?: UserRole,
    userPosition?: string
): {
    routes: string[];
    features: string[];
    positionPermissions: typeof POSITION_PERMISSIONS[keyof typeof POSITION_PERMISSIONS];
} {
    const accessibleRoutes: string[] = [];
    const accessibleFeatures: string[] = [];

    // Check route permissions
    Object.entries(ROUTE_PERMISSIONS).forEach(([route]) => {
        if (canAccessRoute(route, userRole, userPosition)) {
            accessibleRoutes.push(route);
        }
    });

    // Check feature permissions
    Object.entries(FEATURE_PERMISSIONS).forEach(([feature]) => {
        if (hasFeaturePermission(feature as keyof typeof FEATURE_PERMISSIONS, userRole, userPosition)) {
            accessibleFeatures.push(feature);
        }
    });

    // Get position-specific permissions
    const positionPermissions = userPosition
        ? POSITION_PERMISSIONS[userPosition as keyof typeof POSITION_PERMISSIONS] || POSITION_PERMISSIONS[Position.ADMIN]
        : POSITION_PERMISSIONS[Position.ADMIN];
    return {
        routes: accessibleRoutes,
        features: accessibleFeatures,
        positionPermissions,
    };
}

// ============================================================================
// COMPATIBILITY FUNCTIONS
// ============================================================================

/**
 * Get default route for user role (compatibility)
 */
export function getDefaultRoute(userRole?: UserRole): string {
    if (!userRole) return '/';

    switch (userRole) {
        case UserRole.MANAGER:
            return '/manager';
        case UserRole.STAFF:
            return '/staff/dashboard';
        case UserRole.GUEST:
            return '/';
        default:
            return '/';
    }
}

/**
 * Check if user has access to a route (compatibility)
 */
export function hasRouteAccess(route: string, userRole?: UserRole, userPosition?: string): boolean {
    return canAccessRoute(route, userRole, userPosition);
}
