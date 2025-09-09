import { ApiResponse } from "@/core/config";

/**
 * Authentication feature types
 * Consolidated type definitions for auth domain
 */

import { UserRole } from "./enums";

export type Acccount = {
  id: string
  name: string
  code: string
  status: "ACTIVE" | "INACTIVE" | "DISABLED"
  roles: "Admin" | "User"
  description: string
  createdTime: Date | string;
  updatedTime: Date | string;
}

// API responses - based on actual backend response structure
export interface AuthTokens {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
}

// Permission and role types
export interface Permission {
    id: string;
    name: string;
    resource: string;
    action: string;
}

export interface RolePermissions {
    role: UserRole;
    permissions: Permission[];
}
