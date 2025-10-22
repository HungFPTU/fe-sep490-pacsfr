/**
 * Authentication feature types
 * Consolidated type definitions for auth domain
 */

import { UserRole } from "./enums";

export type AccountLogin = {
  id: string
  subject: string;
  role: string;
  token: string;
  expiresAt: Date | string;
}

export type Account = {
  id: string
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
  status: "ACTIVE" | "INACTIVE" | "DISABLED"
  createdTime: Date | string;
  updatedTime: Date | string;
}

export type CreateAccountRequest = {
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

export class UpdateAccountRequest {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  position?: string;
  roleType: string;
  specialization?: string;
  isActive?: boolean;
  modifiedBy ?: string;
  
  constructor(account?: UpdateAccountRequest) {
    this.id = account?.id || '';
    this.fullName = account?.fullName || '';
    this.email = account?.email || '';
    this.phone = account?.phone || '';
    this.position = account?.position || '';
    this.roleType = account?.roleType || '';
    this.specialization = account?.specialization || '';
    this.isActive = account?.isActive || false;
    this.modifiedBy = account?.modifiedBy || '';
  }
};

export class AssignDepartmentAccountRequest {
  departmentId: string;

  constructor(departmentId: string) {
    this.departmentId = departmentId;
  }
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


export interface OrgUnit {
  id: string;
  unitCode: string;
  unitName: string;
  unitType: string;
  address: string;
  phone: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  $id?: string;
}
