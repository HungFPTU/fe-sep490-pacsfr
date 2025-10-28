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

// Filter types
export type WorkShiftFilters = {
    keyword?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
};

