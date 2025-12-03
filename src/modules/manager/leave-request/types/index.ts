/**
 * Leave Request Types
 */

export type LeaveRequestStatus = 'Pending' | 'Approved' | 'Rejected';

export type LeaveType = 'Annual' | 'Sick' | 'Personal';

export type LeaveRequest = {
    id: string;
    staffId: string;
    staffCode?: string;
    staffName?: string;
    staffEmail?: string;
    staffAvatarUrl?: string;
    leaveType?: LeaveType;
    fromDate?: string; // ISO date (legacy, may come from API)
    toDate?: string; // ISO date (legacy, may come from API)
    startDate?: string; // ISO datetime (from API response)
    endDate?: string; // ISO datetime (from API response)
    reason: string;
    status: LeaveRequestStatus;
    replacementStaffId?: string;
    replacementStaffName?: string;
    rejectionReason?: string;
    approvedBy?: string; // UUID of approver
    approvedAt?: string; // ISO datetime
    approverName?: string; // Name of approver
    isDeleted?: boolean;
    createdAt: string;
    createdBy?: string;
    modifiedAt?: string;
    modifiedBy?: string;
    $id?: string;
};

export type CreateLeaveRequestRequest = {
    staffId: string;
    leaveType: LeaveType;
    startDate: string; // ISO datetime format with milliseconds and Z: YYYY-MM-DDTHH:mm:ss.SSSZ (e.g., 2025-12-03T01:28:48.588Z)
    endDate: string; // ISO datetime format with milliseconds and Z: YYYY-MM-DDTHH:mm:ss.SSSZ (e.g., 2025-12-03T01:28:48.588Z)
    reason: string;
};

export type ApproveLeaveRequestRequest = {
    leaveRequestId: string;
    replacementStaffId?: string; // Optional, required if there are shifts
};

export type RejectLeaveRequestRequest = {
    leaveRequestId: string;
    rejectionReason: string;
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
        $values?: Array<{
            serviceGroupId?: string;
            groupCode?: string;
            groupName?: string;
            proficiencyLevel?: string;
        }>;
    };
    isAssigned?: boolean;
    isAssignedToOtherCounter?: boolean;
    $id?: string;
};

export type LeaveRequestFilters = {
    Page?: number;
    PageSize?: number;
    Status?: LeaveRequestStatus;
    StaffId?: string;
    FromDate?: string;
    ToDate?: string;
    SearchTerm?: string;
};

