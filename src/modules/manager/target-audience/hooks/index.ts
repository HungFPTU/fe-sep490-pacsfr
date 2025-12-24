/**
 * TargetAudience Hooks
 * React Query hooks for data fetching and mutations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { targetAudienceService } from '../services/target-audience.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import { useFormDataStore } from '@/shared/stores';
import type { CreateTargetAudienceRequest, UpdateTargetAudienceRequest, TargetAudienceFilters } from '../types/request';

// Re-export custom form hook
export { useTargetAudienceForm } from './useTargetAudienceForm';

/**
 * Hook for getting TargetAudiences list with filters
 */
export const useTargetAudiences = (filters: TargetAudienceFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.TARGET_AUDIENCE_LIST(filters),
        queryFn: () => targetAudienceService.getTargetAudiences(filters),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for getting TargetAudience by ID
 */
export const useTargetAudience = (id: string, enabled = true) => {
    return useQuery({
        queryKey: QUERY_KEYS.TARGET_AUDIENCE_DETAIL(id),
        queryFn: () => targetAudienceService.getTargetAudienceById(id),
        enabled: !!id && enabled,
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for creating TargetAudience
 */
export const useCreateTargetAudience = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (data: CreateTargetAudienceRequest) =>
            targetAudienceService.createTargetAudience(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.TARGET_AUDIENCE_ALL(),
            });
            invalidateDropdown('targetAudience');
        },
    });
};

/**
 * Hook for updating TargetAudience
 */
export const useUpdateTargetAudience = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateTargetAudienceRequest }) =>
            targetAudienceService.updateTargetAudience(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.TARGET_AUDIENCE_DETAIL(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.TARGET_AUDIENCE_ALL(),
            });
            invalidateDropdown('targetAudience');
        },
    });
};

/**
 * Hook for deleting TargetAudience
 */
export const useDeleteTargetAudience = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (id: string) => targetAudienceService.deleteTargetAudience(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.TARGET_AUDIENCE_ALL(),
            });
            invalidateDropdown('targetAudience');
        },
    });
};
