/**
 * Template Hooks
 * React Query hooks for data fetching and mutations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { templateService } from '../services/template.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import { useFormDataStore } from '@/shared/stores';
import type { CreateTemplateRequest, UpdateTemplateRequest, TemplateFilters } from '../types/request';

// Re-export custom form hook
export { useTemplateForm } from './useTemplateForm';

/**
 * Hook for getting templates list with filters
 */
export const useTemplates = (filters: TemplateFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.TEMPLATE_LIST(filters),
        queryFn: () => templateService.getTemplates(filters),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for getting template by ID
 */
export const useTemplate = (id: string, enabled = true) => {
    return useQuery({
        queryKey: QUERY_KEYS.TEMPLATE_DETAIL(id),
        queryFn: () => templateService.getTemplateById(id),
        enabled: !!id && enabled,
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for creating template
 */
export const useCreateTemplate = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (data: CreateTemplateRequest) =>
            templateService.createTemplate(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.TEMPLATE_ALL(),
            });
            invalidateDropdown('template');
        },
    });
};

/**
 * Hook for updating template
 */
export const useUpdateTemplate = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateTemplateRequest }) =>
            templateService.updateTemplate(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.TEMPLATE_DETAIL(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.TEMPLATE_ALL(),
            });
            invalidateDropdown('template');
        },
    });
};

/**
 * Hook for deleting template
 */
export const useDeleteTemplate = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (id: string) => templateService.deleteTemplate(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.TEMPLATE_ALL(),
            });
            invalidateDropdown('template');
        },
    });
};
