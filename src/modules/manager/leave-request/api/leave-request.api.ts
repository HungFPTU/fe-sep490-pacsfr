import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import { RestResponse, RestMany } from '@/types/rest';
import type {
    LeaveRequest,
    CreateLeaveRequestRequest,
    ApproveLeaveRequestRequest,
    RejectLeaveRequestRequest,
    AvailableStaff,
    LeaveRequestFilters,
} from '../types';

export const leaveRequestApi = {
    /**
     * Get all leave requests with filters (Manager)
     */
    getAll: (filters?: LeaveRequestFilters) => {
        const params = new URLSearchParams();

        if (filters?.Page) params.append('Page', String(filters.Page));
        if (filters?.PageSize) params.append('PageSize', String(filters.PageSize));
        if (filters?.Status) params.append('Status', filters.Status);
        if (filters?.StaffId) params.append('StaffId', filters.StaffId);
        if (filters?.FromDate) params.append('FromDate', filters.FromDate);
        if (filters?.ToDate) params.append('ToDate', filters.ToDate);
        if (filters?.SearchTerm) params.append('SearchTerm', filters.SearchTerm);

        const queryString = params.toString();
        const url = queryString
            ? `${API_PATH.MANAGER.LEAVE_REQUEST.BASE}?${queryString}`
            : API_PATH.MANAGER.LEAVE_REQUEST.BASE;

        return http.get<RestMany<LeaveRequest>>(url);
    },

    /**
     * Get my leave requests (Staff)
     */
    getMyLeaveRequests: (filters?: LeaveRequestFilters) => {
        const params = new URLSearchParams();

        if (filters?.Page) params.append('Page', String(filters.Page));
        if (filters?.PageSize) params.append('PageSize', String(filters.PageSize));
        if (filters?.Status) params.append('Status', filters.Status);

        const queryString = params.toString();
        const url = queryString
            ? `${API_PATH.STAFF.LEAVE_REQUEST.MY}?${queryString}`
            : API_PATH.STAFF.LEAVE_REQUEST.MY;

        return http.get<RestMany<LeaveRequest>>(url);
    },

    /**
     * Get leave request by ID
     */
    getById: (id: string) => {
        return http.get<RestResponse<LeaveRequest>>(
            API_PATH.MANAGER.LEAVE_REQUEST.GET_BY_ID(id)
        );
    },

    /**
     * Create leave request
     */
    create: (data: CreateLeaveRequestRequest) => {
        return http.post<RestResponse<LeaveRequest>>(
            API_PATH.MANAGER.LEAVE_REQUEST.CREATE,
            data
        );
    },

    /**
     * Get available replacement staff for a leave request
     */
    getAvailableReplacements: (leaveRequestId: string) => {
        return http.get<RestResponse<{ $values?: AvailableStaff[] }>>(
            API_PATH.MANAGER.LEAVE_REQUEST.GET_AVAILABLE_REPLACEMENTS(leaveRequestId)
        );
    },

    /**
     * Approve leave request
     */
    approve: (data: ApproveLeaveRequestRequest) => {
        return http.post<RestResponse<LeaveRequest>>(
            API_PATH.MANAGER.LEAVE_REQUEST.APPROVE,
            data
        );
    },

    /**
     * Reject leave request
     */
    reject: (data: RejectLeaveRequestRequest) => {
        return http.post<RestResponse<LeaveRequest>>(
            API_PATH.MANAGER.LEAVE_REQUEST.REJECT,
            data
        );
    },
};

