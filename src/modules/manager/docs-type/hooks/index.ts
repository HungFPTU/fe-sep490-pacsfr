/**
 * Docs Type Hooks
 * React Query hooks for data fetching and mutations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { docsTypeService } from '../services/docs-type.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import type { CreateDocsTypeRequest, UpdateDocsTypeRequest, DocsTypeFilters } from '../types/request';
import type { DocsType } from '../types/response';

// Re-export custom form hook
export { useDocsTypeForm } from './useDocsTypeForm';

/**
 * Hook for getting docs types list with filters
 */
export const useDocsTypes = (filters: DocsTypeFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.DOCS_TYPE_LIST(filters),
        queryFn: () => docsTypeService.getDocsTypes(filters),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for getting docs type by ID
 */
export const useDocsType = (id: string, enabled = true) => {
    return useQuery({
        queryKey: QUERY_KEYS.DOCS_TYPE_DETAIL(id),
        queryFn: () => docsTypeService.getDocsTypeById(id),
        enabled: !!id && enabled,
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for creating docs type
 */
export const useCreateDocsType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateDocsTypeRequest) =>
            docsTypeService.createDocsType(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.DOCS_TYPE_ALL(),
            });
        },
    });
};

/**
 * Hook for updating docs type
 */
export const useUpdateDocsType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateDocsTypeRequest }) =>
            docsTypeService.updateDocsType(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.DOCS_TYPE_DETAIL(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.DOCS_TYPE_ALL(),
            });
        },
    });
};

/**
 * Hook for deleting docs type
 */
export const useDeleteDocsType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => docsTypeService.deleteDocsType(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.DOCS_TYPE_ALL(),
            });
        },
    });
};

