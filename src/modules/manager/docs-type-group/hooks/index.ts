/**
 * Docs Type Group Hooks
 * React Query hooks for data fetching and mutations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { docsTypeGroupService } from '../services/docs-type-group.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import { useFormDataStore } from '@/shared/stores';
import type { CreateDocsTypeGroupRequest, UpdateDocsTypeGroupRequest, DocsTypeGroupFilters } from '../types/request';

// Re-export custom form hook
export { useDocsTypeGroupForm } from './useDocsTypeGroupForm';

/**
 * Hook for getting docs type groups list with filters
 */
export const useDocsTypeGroups = (filters: DocsTypeGroupFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.DOCS_TYPE_GROUP_LIST(filters),
        queryFn: () => docsTypeGroupService.getDocsTypeGroups(filters),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for getting docs type group by ID
 */
export const useDocsTypeGroup = (id: string, enabled = true) => {
    return useQuery({
        queryKey: QUERY_KEYS.DOCS_TYPE_GROUP_DETAIL(id),
        queryFn: () => docsTypeGroupService.getDocsTypeGroupById(id),
        enabled: !!id && enabled,
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for creating docs type group
 */
export const useCreateDocsTypeGroup = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (data: CreateDocsTypeGroupRequest) =>
            docsTypeGroupService.createDocsTypeGroup(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.DOCS_TYPE_GROUP_ALL(),
            });
            invalidateDropdown('docsTypeGroup');
        },
    });
};

/**
 * Hook for updating docs type group
 */
export const useUpdateDocsTypeGroup = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateDocsTypeGroupRequest }) =>
            docsTypeGroupService.updateDocsTypeGroup(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.DOCS_TYPE_GROUP_DETAIL(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.DOCS_TYPE_GROUP_ALL(),
            });
            invalidateDropdown('docsTypeGroup');
        },
    });
};

/**
 * Hook for deleting docs type group
 */
export const useDeleteDocsTypeGroup = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (id: string) => docsTypeGroupService.deleteDocsTypeGroup(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.DOCS_TYPE_GROUP_ALL(),
            });
            invalidateDropdown('docsTypeGroup');
        },
    });
};
