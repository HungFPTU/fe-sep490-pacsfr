/**
 * FAQ Category Hooks
 * React Query hooks for data fetching and mutations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { faqCategoryService } from '../services/faq-category.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import type { CreateFaqCategoryRequest, UpdateFaqCategoryRequest, FaqCategoryFilters } from '../types/request';

// Re-export custom form hook
export { useFaqCategoryForm } from './useFaqCategoryForm';

/**
 * Hook for getting FAQ categories list with filters
 */
export const useFaqCategories = (filters: FaqCategoryFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.FAQ_CATEGORY_LIST(filters),
        queryFn: () => faqCategoryService.getFaqCategories(filters),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for getting FAQ category by ID
 */
export const useFaqCategory = (id: string, enabled = true) => {
    return useQuery({
        queryKey: QUERY_KEYS.FAQ_CATEGORY_DETAIL(id),
        queryFn: () => faqCategoryService.getFaqCategoryById(id),
        enabled: !!id && enabled,
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for creating FAQ category
 */
export const useCreateFaqCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateFaqCategoryRequest) =>
            faqCategoryService.createFaqCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.FAQ_CATEGORY_ALL(),
            });
        },
    });
};

/**
 * Hook for updating FAQ category
 */
export const useUpdateFaqCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateFaqCategoryRequest }) =>
            faqCategoryService.updateFaqCategory(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.FAQ_CATEGORY_DETAIL(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.FAQ_CATEGORY_ALL(),
            });
        },
    });
};

/**
 * Hook for deleting FAQ category
 */
export const useDeleteFaqCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => faqCategoryService.deleteFaqCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.FAQ_CATEGORY_ALL(),
            });
        },
    });
};

