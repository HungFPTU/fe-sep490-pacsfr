// Main WorkShift entity type
export type WorkShift = {
    id: string;
    name: string;
    startTime: string;  // Time string like "08:00"
    endTime: string;    // Time string like "17:00"
    description?: string;
    isActive: boolean;
    createdAt: string | Date;
    modifiedAt?: string | Date;
    $id?: string;
};

// Request types
export type CreateWorkShiftRequest = {
    name: string;
    startTime: string;
    endTime: string;
    description?: string;
    isActive: boolean;
};

export type UpdateWorkShiftRequest = {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    description?: string;
    isActive: boolean;
};

// Work Shift Assignment type (for assigned shifts)
export type WorkShiftAssignment = {
    id: string;
    counterId: string;
    staffId: string;
    shiftDate: string;
    startTime: string;
    endTime: string;
    shiftType: string;
    createdAt: string;
    $id?: string;
};

// Filter types
export type WorkShiftFilters = {
    keyword?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
    staffId?: string; // optional: filter assigned shifts by staff
};

