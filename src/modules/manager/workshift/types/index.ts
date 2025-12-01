// Main WorkShift entity type
export type WorkShift = {
    id: string;
    shiftDate: string | Date;
    startTime: string;
    endTime: string;
    shiftType: string;
    description?: string;
    isActive?: boolean;
    createdAt: string | Date;
    modifiedAt?: string | Date;
    $id?: string;
};


export type CreateWorkShiftRequest = {
    shiftDate: string | Date;
    startTime: string;
    endTime: string;
    shiftType: string;
    description?: string;
};

export type UpdateWorkShiftRequest = {
    id: string;
    counterId: string;
    shiftDate: string | Date;
    startTime: string;
    endTime: string;
    shiftType: string;
    description?: string;
};

// Work Shift Assignment 
export type WorkShiftAssignment = {
    id: string;
    shiftDate: string;
    startTime: string;
    endTime: string;
    shiftType: string;
    createdAt: string;
    $id?: string;
};


export type WorkShiftFilters = {
    keyword?: string;
    shiftType?: string;
    shiftDate?: string; 
    fromTime?: string; 
    toTime?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
};

// Counter types
export type Counter = {
    id: string;
    counterCode?: string;
    counterName: string;
    location?: string;
    counterType?: string;
    maxCapacity?: number;
    isActive: boolean;
    staffId?: string;
    staffName?: string;
    serviceGroups?: {
        $id?: string;
        $values?: ServiceGroup[];
    };
};

export type ServiceGroup = {
    id: string;
    groupName: string;
    currentLength: number;
    status: string;
};

export type CounterOption = Counter;


export type AssignStaffWorkShiftRequest = {
    workShiftId: string;
    staffId: string;
    counterId: string;
    workDate: string | Date;
    status?: string;
    checkInTime?: string | Date;
    checkOutTime?: string | Date;
    notes?: string;
};


export type StaffOption = {
    id: string;
    fullName: string;
};

// Staff WorkShift 
export type StaffWorkShift = {
    id: string;
    workShiftId: string;
    staffId: string;
    counterId?: string; 
    workDate: string | Date;
    status: string;
    checkInTime?: string | Date;
    checkOutTime?: string | Date;
    isDeleted: boolean;
    staffName: string;
    shiftType: string;
    startTime: string;
    endTime: string;
    counterName: string;
    createdAt: string | Date;
    createdBy?: string;
    notes?: string;
    $id?: string;
};

export type AvailableStaff = {
    staffId: string;
    staffCode: string;
    fullName: string;
    email: string;
    phone: string;
    position: string;
    avatarUrl?: string;
    serviceGroups?: {
        $id?: string;
        $values?: StaffServiceGroup[];
    };
    isAssignedToOtherCounter: boolean;
};

export type StaffServiceGroup = {
    serviceGroupId: string;
    groupCode: string;
    groupName: string;
    proficiencyLevel?: string;
};


