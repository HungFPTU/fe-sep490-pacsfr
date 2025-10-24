/**
 * Staff Enums
 */

export enum StaffStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export enum RoleType {
    STAFF = 'STAFF',
    MANAGER = 'MANAGER',
    ADMIN = 'ADMIN',
}

export enum StaffPosition {
    RECEPTIONIST = 'RECEPTIONIST',
    OFFICER = 'OFFICER',
    SPECIALIST = 'SPECIALIST',
    HEAD_OF_DEPARTMENT = 'HEAD_OF_DEPARTMENT',
    DEPUTY_HEAD = 'DEPUTY_HEAD',
}

export const STAFF_STATUS_LABELS: Record<StaffStatus, string> = {
    [StaffStatus.ACTIVE]: 'Hoạt động',
    [StaffStatus.INACTIVE]: 'Ngừng hoạt động',
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
