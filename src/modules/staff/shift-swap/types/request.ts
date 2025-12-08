export interface CreateShiftSwapRequest {
  myStaffWorkShiftId: string;
  targetStaffId: string;
  targetStaffWorkShiftId?: string;
  reason: string;
}

export interface RespondShiftSwapRequest {
  shiftSwapRequestId: string;
  accept: boolean;
  rejectionReason?: string;
}

export interface ApproveShiftSwapRequest {
  shiftSwapRequestId: string;
  approve: boolean;
  rejectionReason?: string;
}

export interface ShiftSwapFilters {
  status?: string;
  page?: number;
  size?: number;
}

// For fetching staff with their shifts
export interface StaffWithShifts {
  id: string;
  name: string;
  code: string;
  shifts?: Array<{
    id: string;
    staffId: string;
    shiftDate: string;
    shiftType: string;
    startTime: string;
    endTime: string;
    counterName?: string;
  }>;
}

