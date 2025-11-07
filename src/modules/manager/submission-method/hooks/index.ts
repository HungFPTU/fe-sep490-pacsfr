/**
 * SubmissionMethod Hooks
 * React Query hooks for data fetching and mutations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { submissionMethodService } from '../services/submission-method.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import type { CreateSubmissionMethodRequest, UpdateSubmissionMethodRequest, SubmissionMethodFilters } from '../types/request';

// Re-export custom form hook
export { useSubmissionMethodForm } from './useSubmissionMethodForm';

/**
 * Hook for getting submission methods list with filters
 */
export const useSubmissionMethods = (filters: SubmissionMethodFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.SUBMISSION_METHOD_LIST(filters),
        queryFn: () => submissionMethodService.getSubmissionMethods(filters),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for getting submission method by ID
 */
export const useSubmissionMethod = (id: string, enabled = true) => {
    return useQuery({
        queryKey: QUERY_KEYS.SUBMISSION_METHOD_DETAIL(id),
        queryFn: () => submissionMethodService.getSubmissionMethodById(id),
        enabled: !!id && enabled,
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for creating submission method
 */
export const useCreateSubmissionMethod = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateSubmissionMethodRequest) =>
            submissionMethodService.createSubmissionMethod(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SUBMISSION_METHOD_BASE,
            });
        },
    });
};

/**
 * Hook for updating submission method
 */
export const useUpdateSubmissionMethod = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateSubmissionMethodRequest }) =>
            submissionMethodService.updateSubmissionMethod(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SUBMISSION_METHOD_DETAIL(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SUBMISSION_METHOD_BASE,
            });
        },
    });
};

/**
 * Hook for deleting submission method
 */
export const useDeleteSubmissionMethod = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => submissionMethodService.deleteSubmissionMethod(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SUBMISSION_METHOD_BASE,
            });
        },
    });
};

