import { useMemo } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { UserRole } from "../enums";
import { hasRoleLevel } from "../utils/role.utils";

/**
 * Permission Hook - Demonstrates ROLES constant usage for authorization
 */
export function usePermissions() {
    const { user } = useAuthStore();

    const permissions = useMemo(() => {
        if (!user?.role) {
            return {
                isAdmin: false,
                isStaff: false,
                isCitizen: false,
                canAccessAdminPanel: false,
                canManageQueues: false,
                canViewAllUsers: false,
                canEditProfile: false,
                hasPermission: () => false,
            };
        }

        // user.role is already of type UserRole, so we can use it directly
        const userRole = user.role;

        return {
            // Role checks using enum values directly
            isAdmin: userRole === UserRole.ADMIN,
            isStaff: userRole === UserRole.STAFF || userRole === UserRole.ADMIN,
            isCitizen: userRole === UserRole.CITIZEN,

            // Permission checks using utility functions
            canAccessAdminPanel: hasRoleLevel(userRole, UserRole.ADMIN),
            canManageQueues: hasRoleLevel(userRole, UserRole.ADMIN),
            canViewAllUsers: hasRoleLevel(userRole, UserRole.STAFF),
            canEditProfile: true, // All authenticated users can edit their profile

            // Generic permission checker
            hasPermission: (requiredRole: UserRole) => hasRoleLevel(userRole, requiredRole),
        };
    }, [user?.role]);

    return permissions;
}

/**
 * Usage Examples:
 * 
 * function AdminPanel() {
 *   const { canAccessAdminPanel } = usePermissions();
 *   
 *   if (!canAccessAdminPanel) {
 *     return <div>Access Denied</div>;
 *   }
 *   
 *   return <div>Admin Panel Content</div>;
 * }
 * 
 * function QueueManagement() {
 *   const { canManageQueues, hasPermission } = usePermissions();
 *   
 *   return (
 *     <div>
 *       {canManageQueues && <ManageQueuesButton />}
 *       {hasPermission(USER_ROLES.ADMIN) && <AdminOnlyFeature />}
 *     </div>
 *   );
 * }
 */