export interface WorkShift {
    $id?: string;
    id: string;
    workShiftId: string;
    staffId: string;
    workDate: string; // ISO date string (e.g., "2025-12-04T00:00:00")
    startTime: string; // HH:mm:ss format
    endTime: string;   // HH:mm:ss format
    shiftType: string;
    status: string;
    shiftDate: string;
    staffName?: string;
    counterName?: string;
    isDeleted?: boolean;
    createdAt?: string;
    createdBy?: string;
}

export interface WorkShiftResponse {
    $id?: string;
    $values: WorkShift[];
}

export interface CalendarShift {
    date: string;
    shifts: WorkShift[];
}
