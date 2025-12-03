import { leaveRequestApi } from '../api/leave-request.api';
import type {
    LeaveRequest,
    CreateLeaveRequestRequest,
    ApproveLeaveRequestRequest,
    RejectLeaveRequestRequest,
    AvailableStaff,
    LeaveRequestFilters,
} from '../types';

export const leaveRequestService = {
    async getAll(filters?: LeaveRequestFilters) {
        const response = await leaveRequestApi.getAll(filters);
        return response.data;
    },

    async getMyLeaveRequests(filters?: LeaveRequestFilters) {
        const response = await leaveRequestApi.getMyLeaveRequests(filters);
        return response.data;
    },

    async getById(id: string): Promise<LeaveRequest | null> {
        const response = await leaveRequestApi.getById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        return response.data.data as LeaveRequest;
    },

    async create(data: CreateLeaveRequestRequest): Promise<LeaveRequest> {
        const response = await leaveRequestApi.create(data);
        if (!response.data?.success || !response.data?.data) {
            const errorMessage = (response.data as { message?: string })?.message || 'Failed to create leave request';
            throw new Error(errorMessage);
        }
        return response.data.data as LeaveRequest;
    },

    async getAvailableReplacements(leaveRequestId: string): Promise<AvailableStaff[]> {
        const response = await leaveRequestApi.getAvailableReplacements(leaveRequestId);
        if (!response.data?.success || !response.data?.data) {
            return [];
        }

        // Response structure: { success: true, data: { $values: [...] } }
        const responseData = response.data.data;
        
        // Handle $values format
        if (responseData && typeof responseData === 'object' && '$values' in responseData) {
            const values = (responseData as { $values?: AvailableStaff[] }).$values;
            return (values || []) as AvailableStaff[];
        }
        
        // Fallback: if data is already an array
        if (Array.isArray(responseData)) {
            return responseData as AvailableStaff[];
        }

        return [];
    },

    async approve(data: ApproveLeaveRequestRequest): Promise<LeaveRequest> {
        const response = await leaveRequestApi.approve(data);
        if (!response.data?.success || !response.data?.data) {
            const errorMessage = (response.data as { message?: string })?.message || 'Failed to approve leave request';
            throw new Error(errorMessage);
        }
        return response.data.data as LeaveRequest;
    },

    async reject(data: RejectLeaveRequestRequest): Promise<LeaveRequest> {
        const response = await leaveRequestApi.reject(data);
        if (!response.data?.success || !response.data?.data) {
            const errorMessage = (response.data as { message?: string })?.message || 'Failed to reject leave request';
            throw new Error(errorMessage);
        }
        return response.data.data as LeaveRequest;
    },
};

