// Auth module exports
export { authApi } from "./api/auth.api";
export { authService } from "./services/auth.service";
export { LoginForm } from "./components/login/LoginForm";
export { RegisterForm } from "./components/register/RegisterForm";
export { RoleSelector } from "./components/authorization/RoleSelector";
export { useAuthStore } from "./stores/useAuthStore";

// Hooks
export { useAuth } from "./hooks";
export { usePermissions } from "./hooks/usePermissions";
export { useAuthRedirect, useAutoRedirect, useRouteProtection } from "./hooks/useAuthRedirect";
export {
    useRolePermissions,
    useRouteAccess,
    useFeaturePermission,
    useAccessibleRoutes,
    useAccessibleFeatures,
    useActionPermissions
} from "./hooks/useRolePermissions";

// Components
export { RouteGuard } from "./components/authorization/RouteGuard";
export { ProtectedRoute } from "./components/authorization/ProtectedRoute";
export {
    PermissionGuard,
    FeatureGuard,
    RouteGuard as RoutePermissionGuard,
    RoleGuard,
    PositionGuard
} from "./components/authorization/PermissionGuard";

// Utilities
export * from "./utils/role.utils";
export * from "./utils/auth-redirect.utils";
export * from "./utils/login-redirect.utils";
export {
    getUserDataFromStorage,
    getUserRoleFromStorage,
    getUserPositionFromStorage,
    getUserTokenFromStorage,
    isUserAuthenticatedFromStorage,
    hasRole as hasUserRole,
    hasPosition as hasUserPosition,
    hasAnyRole,
    hasAnyPosition,
    hasRoleLevel as hasUserRoleLevel,
    getUserPermissionsSummary,
    canAccessRouteFromStorage,
    getAccessibleRoutesFromStorage,
    validateUserSession
} from "./utils/permission.utils";

// Permission Config
export {
    ROLE_HIERARCHY,
    POSITION_PERMISSIONS,
    ROUTE_PERMISSIONS,
    FEATURE_PERMISSIONS,
    canAccessRoute,
    hasFeaturePermission,
    getUserPermissions,
    getDefaultRoute,
    hasRouteAccess
} from "./config/role-permissions.config";

// Types
export type * from "./types";

// Enums
export * from "./enums";

// Constants
export * from "./consts";
