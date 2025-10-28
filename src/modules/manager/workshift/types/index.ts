// Main WorkShift entity type
export type WorkShift = {
    id: string;
    counterId: string;
    staffId: string;
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

// Request types
export type CreateWorkShiftRequest = {
    counterId: string;
    staffId: string;
    shiftDate: string | Date;
    startTime: string;
    endTime: string;
    shiftType: string;
    description?: string;
};

export type UpdateWorkShiftRequest = {
    id: string;
    counterId: string;
    staffId: string;
    shiftDate: string | Date;
    startTime: string;
    endTime: string;
    shiftType: string;
    description?: string;
};

// Filter types
export type WorkShiftFilters = {
    keyword?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
};

// Counter types
export type Counter = {
    id: string;
    counterCode: string;
    counterName: string;
    isActive: boolean;
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

// Staff types
export type Staff = {
    id: string;
    staffCode: string;
    fullName: string;
    username?: string;
    email?: string;
    phone?: string;
    position?: string;
    roleType?: string;
    specialization?: string;
    isActive: boolean;
    orgUnitName?: string;
    createdAt?: string | Date;
};

