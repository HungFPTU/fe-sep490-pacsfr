export interface ShiftSwapRequest {
  id: string;
  requestingStaffId: string;
  requestingStaffName: string;
  requestingStaffCode: string;
  requestingShiftId: string;
  requestingShiftDate: string | Date;
  requestingShiftType: string;
  requestingShiftStartTime: string;
  requestingShiftEndTime: string;

  targetStaffId: string;
  targetStaffName: string;
  targetStaffCode: string;
  targetShiftId: string;
  targetShiftDate: string | Date;
  targetShiftType: string;
  targetShiftStartTime: string;
  targetShiftEndTime: string;

  reason: string;
  status: ShiftSwapStatus;
  targetStaffAccepted?: boolean;
  targetStaffRespondedAt?: string | Date;

  approvedBy?: string;
  processedAt?: string | Date;
  rejectionReason?: string;

  createdAt: string | Date;
}

export type ShiftSwapStatus = 0 | 1 | 2 | 3 | 4 | 5;

export const SHIFT_SWAP_STATUS_LABELS: Record<ShiftSwapStatus, string> = {
  0: 'Chờ phản hồi',
  1: 'Chờ duyệt',
  2: 'Đã duyệt',
  3: 'Bị từ chối',
  4: 'Manager từ chối',
  5: 'Đã hủy',
};

export const SHIFT_SWAP_STATUS_COLORS: Record<ShiftSwapStatus, string> = {
  0: 'bg-yellow-100 text-yellow-800',
  1: 'bg-blue-100 text-blue-800',
  2: 'bg-green-100 text-green-800',
  3: 'bg-red-100 text-red-800',
  4: 'bg-red-100 text-red-800',
  5: 'bg-slate-100 text-slate-800',
};

