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
                isManager: false,
                isStaff: false,
                isCitizen: false,
                canAccessManagerPanel: false,
                canManageQueues: false,
                canViewAllStaff: false,
                canEditProfile: false,
                hasPermission: () => false,
            };
        }

        // user.role is already of type UserRole, so we can use it directly
        const userRole = user.role;

        return {
            // Role checks using enum values directly
            isManager: userRole === UserRole.MANAGER,
            isStaff: userRole === UserRole.STAFF,
            isGuest: userRole === UserRole.GUEST,

            // Permission checks using utility functions
            canAccessManagerPanel: hasRoleLevel(userRole, UserRole.MANAGER),
            canManageServices: hasRoleLevel(userRole, UserRole.MANAGER),
            canManageDepartments: hasRoleLevel(userRole, UserRole.MANAGER),
            canManageStaff: hasRoleLevel(userRole, UserRole.MANAGER),
            canViewAllStaff: hasRoleLevel(userRole, UserRole.STAFF),
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