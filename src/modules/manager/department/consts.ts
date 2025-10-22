import { UserRole } from './enums';

// Role configurations
export const ROLE_LABELS = {
    [UserRole.ADMIN]: "Quản trị viên",
    [UserRole.STAFF]: "Nhân viên",
    [UserRole.CITIZEN]: "Công dân",
} as const;