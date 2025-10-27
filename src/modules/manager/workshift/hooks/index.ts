"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { workshiftService } from "../services/workshift.service";
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from "../constants";
import type { CreateWorkShiftRequest, UpdateWorkShiftRequest, WorkShiftFilters } from "../types";

// Export hooks first
// Re-export custom hooks at the end
export { useWorkShiftForm } from './useWorkShiftForm';
// GET list hook
export const useWorkShifts = (filters: WorkShiftFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.WORKSHIFT_LIST(filters),
        queryFn: () => workshiftService.getWorkShiftList(filters),
        gcTime: CACHE_TIME,
        staleTime: STALE_TIME,
    });
};

// GET detail hook
export const useWorkShiftDetail = (id: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.WORKSHIFT_DETAIL(id),
        queryFn: () => workshiftService.getWorkShiftById(id),
        enabled: !!id,
    });
};

// CREATE mutation
export const useCreateWorkShift = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateWorkShiftRequest) => workshiftService.createWorkShift(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.WORKSHIFT_BASE
            });
        },
    });
};

// UPDATE mutation
export const useUpdateWorkShift = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, request }: { id: string; request: UpdateWorkShiftRequest }) =>
            workshiftService.updateWorkShift(id, request),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.WORKSHIFT_BASE
            });
        },
    });
};

// DELETE mutation
export const useDeleteWorkShift = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => workshiftService.deleteWorkShift(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.WORKSHIFT_BASE
            });
        },
    });
};



