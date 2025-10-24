export enum DepartmentLevel {
    LEVEL_1 = 1,
    LEVEL_2 = 2,
    LEVEL_3 = 3,
}

export const DEPARTMENT_LEVELS = [
    { value: 1, label: 'Cấp 1' },
    { value: 2, label: 'Cấp 2' },
    { value: 3, label: 'Cấp 3' },
] as const;

