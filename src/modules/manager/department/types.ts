/**
 * Authentication feature types
 * Consolidated type definitions for auth domain
 */

import { UserRole } from "./enums";

export type Department = {
  id: string
  orgUnitId: string;
  code: string;
  name: string;
  description: string;
  levelOrder: number;
  isActive: boolean;
  createdAt: Date | string;
}

export type CreateDepartmentRequest = {
  orgUnitId: string;
  staffCode: string;
  fullName: string;
  username: string;
  password: string;
  email: string;
  phone?: string;
  position?: string;
  roleType: string;
  specialization?: string;
  createdBy?: string;
  note?: string;
};

export type UpdateAccountRequest = {
  fullName: string;
  email: string;
  phone?: string;
  position?: string;
  roleType: string;
  specialization?: string;
  isActive?: boolean;
  modifiedBy?: string;
};

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
