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

// Request types
export type CreateWorkShiftRequest = {
    shiftDate: string | Date;
    startTime: string;
    endTime: string;
    shiftType: string;
    description?: string;
};

export type UpdateWorkShiftRequest = {
    id: string;
    shiftDate: string | Date;
    startTime: string;
    endTime: string;
    shiftType: string;
    description?: string;
};

// Work Shift Assignment type (for assigned shifts)
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


