// Enums for WorkShift if needed
export enum ShiftStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export const SHIFT_STATUS_OPTIONS = [
    { value: true, label: 'Hoạt động' },
    { value: false, label: 'Ngừng hoạt động' },
] as const;

