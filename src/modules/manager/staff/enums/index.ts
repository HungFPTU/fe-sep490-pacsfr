/**
 * Staff Enums
 */

export enum StaffStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
}

export enum RoleType {
    STAFF = 'Staff',
    MANAGER = 'Manager',
    ADMIN = 'Admin',
}

export enum StaffPosition {
    RECEPTIONIST = 'Receptionist',
    OFFICER = 'Officer',
    SPECIALIST = 'Specialist',
    HEAD_OF_DEPARTMENT = 'Head of Department',
    DEPUTY_HEAD = 'Deputy Head',
}

export const STAFF_STATUS_LABELS: Record<StaffStatus, string> = {
    [StaffStatus.ACTIVE]: 'Active',
    [StaffStatus.INACTIVE]: 'Inactive',
};

export const ROLE_TYPE_LABELS: Record<RoleType, string> = {
    [RoleType.STAFF]: 'Nhân viên',
    [RoleType.MANAGER]: 'Quản lý',
    [RoleType.ADMIN]: 'Quản trị viên',
};

export const STAFF_POSITION_LABELS: Record<StaffPosition, string> = {
    [StaffPosition.RECEPTIONIST]: 'Lễ tân',
    [StaffPosition.OFFICER]: 'Công chức',
    [StaffPosition.SPECIALIST]: 'Chuyên viên',
    [StaffPosition.HEAD_OF_DEPARTMENT]: 'Trưởng phòng',
    [StaffPosition.DEPUTY_HEAD]: 'Phó phòng',
};
