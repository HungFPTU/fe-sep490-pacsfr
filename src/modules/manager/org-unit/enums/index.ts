export enum OrgUnitType {
    DEPARTMENT = 'Phòng ban',
    DIVISION = 'Đơn vị',
    CENTER = 'Trung tâm',
    OFFICE = 'Văn phòng',
}

export const ORG_UNIT_TYPES = [
    { value: 'DEPARTMENT', label: 'Phòng ban' },
    { value: 'DIVISION', label: 'Đơn vị' },
    { value: 'CENTER', label: 'Trung tâm' },
    { value: 'OFFICE', label: 'Văn phòng' },
] as const;

