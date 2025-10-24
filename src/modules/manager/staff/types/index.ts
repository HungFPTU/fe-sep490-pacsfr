export type Staff = {
    id: string;
    orgUnitId: string;
    departmentId?: string;
    staffCode: string;
    fullName: string;
    username: string;
    email: string;
    phone: string;
    position: string;
    roleType: string;
    specialization?: string;
    isActive: boolean;
    orgUnitName?: string; // From API list response
    createdAt: string;
    createdBy: string;
    modifiedAt?: string;
    modifiedBy?: string;
    $id?: string;
}

export type StaffDetail = Staff & {
    department?: {
        id: string;
        name: string;
        code: string;
    };
    orgUnit?: {
        id: string;
        unitName: string;
        unitCode: string;
    };
    workShift?: {
        id: string;
        shiftName: string;
        startTime: string;
        endTime: string;
    };
}

export type CreateStaffRequest = {
    orgUnitId: string;
    staffCode: string;
    fullName: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    position: string;
    roleType: string;
    specialization?: string;
    createdBy: string;
}

export type AssignDepartmentRequest = {
    departmentId: string;
}

export type AssignWorkShiftRequest = {
    workShiftId: string;
}

export type StaffFilters = {
    SearchTerm?: string;
    IsActive?: boolean;
    RoleType?: string;
    Page?: number;
    PageSize?: number;
}
