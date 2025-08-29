import React from "react";
import { UserRole } from "../enums";
import { ROLE_LABELS } from "../consts";
import { getAvailableRolesForRegistration } from "../utils/role.utils";

interface RoleSelectorProps {
    value: UserRole;
    onChange: (role: UserRole) => void;
    disabled?: boolean;
    allowedRoles?: UserRole[];
    showAdminRole?: boolean;
    className?: string;
}

/**
 * Reusable Role Selector Component
 * Demonstrates proper usage of ROLES constants
 */
export function RoleSelector({
    value,
    onChange,
    disabled = false,
    allowedRoles,
    showAdminRole = false,
    className = ""
}: RoleSelectorProps) {
    // Use utility function to get available roles
    const availableRoles = allowedRoles || (
        showAdminRole ? Object.values(UserRole) : getAvailableRolesForRegistration()
    );

    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as UserRole)}
            disabled={disabled}
            className={`w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-black bg-white ${className}`}
        >
            {availableRoles.map((role) => (
                <option key={role} value={role}>
                    {ROLE_LABELS[role]}
                </option>
            ))}
        </select>
    );
}

/**
 * Usage Examples:
 * 
 * // Basic usage for registration form
 * <RoleSelector 
 *   value={form.role} 
 *   onChange={(role) => setForm({...form, role})} 
 * />
 * 
 * // Admin panel with all roles
 * <RoleSelector 
 *   value={selectedRole} 
 *   onChange={setSelectedRole}
 *   showAdminRole={true}
 * />
 * 
 * // Restricted roles based on current user
 * <RoleSelector 
 *   value={userRole} 
 *   onChange={updateUserRole}
 *   allowedRoles={getSelectableRoles(currentUser.role)}
 * />
 */