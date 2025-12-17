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

export type ShiftSwapStatus = 
  | 'PendingTargetResponse'
  | 'PendingManagerApproval'
  | 'Approved'
  | 'RejectedByTarget'
  | 'RejectedByManager'
  | 'Cancelled';

export const SHIFT_SWAP_STATUS_LABELS: Record<ShiftSwapStatus, string> = {
  'PendingTargetResponse': 'Chờ phản hồi',
  'PendingManagerApproval': 'Chờ duyệt',
  'Approved': 'Đã duyệt',
  'RejectedByTarget': 'Bị từ chối (nhân viên)',
  'RejectedByManager': 'Manager từ chối',
  'Cancelled': 'Đã hủy',
};

export const SHIFT_SWAP_STATUS_COLORS: Record<ShiftSwapStatus, string> = {
  'PendingTargetResponse': 'bg-yellow-100 text-yellow-800',
  'PendingManagerApproval': 'bg-blue-100 text-blue-800',
  'Approved': 'bg-green-100 text-green-800',
  'RejectedByTarget': 'bg-red-100 text-red-800',
  'RejectedByManager': 'bg-red-100 text-red-800',
  'Cancelled': 'bg-slate-100 text-slate-800',
};

// Helper to check if status is pending manager approval
export const isPendingManagerApproval = (status: ShiftSwapStatus): boolean => {
  return status === 'PendingManagerApproval';
};

// Helper to convert status to display format
export const getStatusLabel = (status: ShiftSwapStatus): string => {
  return SHIFT_SWAP_STATUS_LABELS[status];
};

export const getStatusColor = (status: ShiftSwapStatus): string => {
  return SHIFT_SWAP_STATUS_COLORS[status];
};

