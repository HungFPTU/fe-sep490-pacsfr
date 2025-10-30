/**
 * Staff Utility Functions
 * Helper functions for staff module
 */

import { RoleType, StaffStatus, StaffPosition } from '../enums';

// Role Type Color Utilities
export const getRoleTypeColor = (roleType: string): "success" | "warning" | "danger" | "primary" | "default" | "secondary" => {
    switch (roleType) {
        case RoleType.ADMIN: return 'danger';
        case RoleType.MANAGER: return 'warning';
        case RoleType.STAFF: return 'primary';
        default: return 'default';
    }
};

// Role Type Style (for custom styling)
export const getRoleTypeStyle = (roleType: string): string => {
    switch (roleType) {
        case RoleType.ADMIN: return 'bg-red-100 text-red-800 border-red-200';
        case RoleType.MANAGER: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case RoleType.STAFF: return 'bg-blue-100 text-blue-800 border-blue-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

// Staff Status Color Utilities
export const getStatusColor = (isActive: boolean): "success" | "warning" | "danger" | "primary" | "default" | "secondary" => {
    return isActive ? 'success' : 'default';
};

// Staff Status Style (for custom styling)
export const getStatusStyle = (isActive: boolean): string => {
    return isActive
        ? 'bg-green-100 text-green-800 border-green-200'
        : 'bg-gray-100 text-gray-800 border-gray-200';
};

// Staff Position Color Utilities
export const getPositionColor = (position: string): "success" | "warning" | "danger" | "primary" | "default" | "secondary" => {
    switch (position) {
        case StaffPosition.HEAD_OF_DEPARTMENT: return 'danger';
        case StaffPosition.DEPUTY_HEAD: return 'warning';
        case StaffPosition.SPECIALIST: return 'primary';
        case StaffPosition.OFFICER: return 'secondary';
        case StaffPosition.RECEPTIONIST: return 'default';
        default: return 'default';
    }
};

// Staff Position Style (for custom styling)
export const getPositionStyle = (position: string): string => {
    switch (position) {
        case StaffPosition.HEAD_OF_DEPARTMENT: return 'bg-red-100 text-red-800 border-red-200';
        case StaffPosition.DEPUTY_HEAD: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case StaffPosition.SPECIALIST: return 'bg-blue-100 text-blue-800 border-blue-200';
        case StaffPosition.OFFICER: return 'bg-purple-100 text-purple-800 border-purple-200';
        case StaffPosition.RECEPTIONIST: return 'bg-gray-100 text-gray-800 border-gray-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

// Common Badge Style
export const getBadgeStyle = (): string => {
    return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';
};

// Chip Style for HeroUI
export const getChipStyle = (): string => {
    return 'text-xs font-medium';
};

// Action Button Colors
export const getActionButtonColors = () => ({
    view: 'hover:bg-blue-50 text-blue-600',
    assignDepartment: 'hover:bg-purple-50 text-purple-600',
    assignWorkShift: 'hover:bg-green-50 text-green-600',
    delete: 'hover:bg-red-50 text-red-600',
    edit: 'hover:bg-orange-50 text-orange-600',
});

// Status Labels
export const getStatusLabel = (isActive: boolean): string => {
    return isActive ? 'Hoạt động' : 'Ngừng hoạt động';
};

// Role Type Labels
export const getRoleTypeLabel = (roleType: string): string => {
    const labels: Record<string, string> = {
        [RoleType.ADMIN]: 'Quản trị viên',
        [RoleType.MANAGER]: 'Quản lý',
        [RoleType.STAFF]: 'Nhân viên',
    };
    return labels[roleType] || roleType;
};

// Position Labels
export const getPositionLabel = (position: string): string => {
    const labels: Record<string, string> = {
        [StaffPosition.RECEPTIONIST]: 'Lễ tân',
        [StaffPosition.OFFICER]: 'Công chức',
        [StaffPosition.SPECIALIST]: 'Chuyên viên',
        [StaffPosition.HEAD_OF_DEPARTMENT]: 'Trưởng phòng',
        [StaffPosition.DEPUTY_HEAD]: 'Phó phòng',
    };
    return labels[position] || position;
};

// Validation Helpers
export const isValidRoleType = (roleType: string): boolean => {
    return Object.values(RoleType).includes(roleType as RoleType);
};

export const isValidStaffStatus = (status: string): boolean => {
    return Object.values(StaffStatus).includes(status as StaffStatus);
};

export const isValidPosition = (position: string): boolean => {
    return Object.values(StaffPosition).includes(position as StaffPosition);
};

// Format Helpers
export const formatStaffCode = (staffCode: string, username?: string): string => {
    return username ? `${staffCode} (${username})` : staffCode;
};

export const formatOrgUnitName = (orgUnitName?: string): string => {
    return orgUnitName || 'Chưa có';
};

export const formatPhoneNumber = (phone: string): string => {
    // Format Vietnamese phone number
    if (phone.startsWith('+84')) {
        return phone.replace('+84', '0');
    }
    return phone;
};

export const formatEmail = (email: string): string => {
    return email.toLowerCase().trim();
};

// Table Configuration
export const getTableConfig = () => ({
    pageSizeOptions: [10, 20, 50, 100],
    defaultPageSize: 20,
    emptyContent: 'Không có dữ liệu nhân viên',
    ariaLabel: 'Bảng quản lý nhân viên',
});

// Column Configuration
export const getTableColumns = () => [
    { key: 'staffCode', label: 'MÃ NV' },
    { key: 'fullName', label: 'HỌ TÊN' },
    { key: 'email', label: 'EMAIL' },
    { key: 'phone', label: 'SỐ ĐIỆN THOẠI' },
    { key: 'position', label: 'CHỨC VỤ' },
    { key: 'roleType', label: 'VAI TRÒ' },
    { key: 'status', label: 'TRẠNG THÁI' },
    { key: 'createdAt', label: 'NGÀY TẠO' },
    { key: 'actions', label: 'THAO TÁC' },
];

// Filter Options
export const getFilterOptions = () => ({
    status: [
        { label: 'Tất cả', value: '' },
        { label: 'Hoạt động', value: 'true' },
        { label: 'Ngừng hoạt động', value: 'false' },
    ],
    roleType: [
        { label: 'Tất cả', value: '' },
        { label: 'Nhân viên', value: RoleType.STAFF },
        { label: 'Quản lý', value: RoleType.MANAGER },
        { label: 'Quản trị viên', value: RoleType.ADMIN },
    ],
    position: [
        { label: 'Tất cả', value: '' },
        { label: 'Lễ tân', value: StaffPosition.RECEPTIONIST },
        { label: 'Công chức', value: StaffPosition.OFFICER },
        { label: 'Chuyên viên', value: StaffPosition.SPECIALIST },
        { label: 'Phó phòng', value: StaffPosition.DEPUTY_HEAD },
        { label: 'Trưởng phòng', value: StaffPosition.HEAD_OF_DEPARTMENT },
    ],
});
