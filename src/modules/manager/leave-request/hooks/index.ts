import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { leaveRequestService } from '../services/leave-request.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import type {
    LeaveRequestFilters,
    CreateLeaveRequestRequest,
    ApproveLeaveRequestRequest,
    RejectLeaveRequestRequest,
} from '../types';

// GET all leave requests (Manager)
export const useLeaveRequests = (filters?: LeaveRequestFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.LEAVE_REQUEST_LIST(filters),
        queryFn: () => leaveRequestService.getAll(filters),
        gcTime: CACHE_TIME.SHORT,
        staleTime: STALE_TIME.SHORT,
    });
};

// GET my leave requests (Staff)
export const useMyLeaveRequests = (filters?: LeaveRequestFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.MY_LEAVE_REQUESTS(filters),
        queryFn: () => leaveRequestService.getMyLeaveRequests(filters),
        gcTime: CACHE_TIME.SHORT,
        staleTime: STALE_TIME.SHORT,
    });
};

// GET leave request detail
export const useLeaveRequestDetail = (id: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.LEAVE_REQUEST_DETAIL(id),
        queryFn: () => leaveRequestService.getById(id),
        enabled: !!id,
    });
};

// GET available replacements
export const useAvailableReplacements = (leaveRequestId: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.AVAILABLE_REPLACEMENTS(leaveRequestId),
        queryFn: () => leaveRequestService.getAvailableReplacements(leaveRequestId),
        enabled: !!leaveRequestId,
    });
};

// CREATE leave request
export const useCreateLeaveRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateLeaveRequestRequest) => leaveRequestService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.LEAVE_REQUEST_BASE,
            });
        },
    });
};

// APPROVE leave request
export const useApproveLeaveRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ApproveLeaveRequestRequest) => leaveRequestService.approve(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.LEAVE_REQUEST_BASE,
            });
        },
    });
};

// REJECT leave request
export const useRejectLeaveRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RejectLeaveRequestRequest) => leaveRequestService.reject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.LEAVE_REQUEST_BASE,
            });
        },
    });
};

