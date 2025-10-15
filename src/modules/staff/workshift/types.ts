export interface WorkShift {
    $id?: string;
    id: string;
    counterId: string;
    staffId: string;
    shiftDate: string; // ISO date string
    startTime: string; // HH:mm:ss format
    endTime: string;   // HH:mm:ss format
    shiftType: string;
    createdAt: string;
}

export interface WorkShiftResponse {
    $id?: string;
    $values: WorkShift[];
}

export interface CalendarShift {
    date: string;
    shifts: WorkShift[];
}
