/**
 * News Category Hooks
 * React Query hooks for data fetching and mutations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { newsCategoryService } from '../services/news-category.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import { useFormDataStore } from '@/shared/stores';
import type { CreateNewsCategoryRequest, UpdateNewsCategoryRequest, NewsCategoryFilters } from '../types/request';

// Re-export custom form hook
export { useNewsCategoryForm } from './useNewsCategoryForm';

/**
 * Hook for getting news categories list with filters
 */
export const useNewsCategories = (filters: NewsCategoryFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.NEWS_CATEGORY_LIST(filters),
        queryFn: () => newsCategoryService.getNewsCategories(filters),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for getting news category by ID
 */
export const useNewsCategory = (id: string, enabled = true) => {
    return useQuery({
        queryKey: QUERY_KEYS.NEWS_CATEGORY_DETAIL(id),
        queryFn: () => newsCategoryService.getNewsCategoryById(id),
        enabled: !!id && enabled,
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for creating news category
 */
export const useCreateNewsCategory = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (data: CreateNewsCategoryRequest) =>
            newsCategoryService.createNewsCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.NEWS_CATEGORY_ALL(),
            });
            invalidateDropdown('newsCategory');
        },
    });
};

/**
 * Hook for updating news category
 */
export const useUpdateNewsCategory = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateNewsCategoryRequest }) =>
            newsCategoryService.updateNewsCategory(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.NEWS_CATEGORY_DETAIL(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.NEWS_CATEGORY_ALL(),
            });
            invalidateDropdown('newsCategory');
        },
    });
};

/**
 * Hook for deleting news category
 */
export const useDeleteNewsCategory = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (id: string) => newsCategoryService.deleteNewsCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.NEWS_CATEGORY_ALL(),
            });
            invalidateDropdown('newsCategory');
        },
    });
};
