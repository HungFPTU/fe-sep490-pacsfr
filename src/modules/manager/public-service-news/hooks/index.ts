/**
 * Public Service News Hooks
 * React Query hooks for data fetching and mutations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { publicServiceNewsService } from '../services/public-service-news.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import type { CreatePublicServiceNewsRequest, UpdatePublicServiceNewsRequest, PublicServiceNewsFilters } from '../types/request';

// Re-export custom form hook
export { usePublicServiceNewsForm } from './usePublicServiceNewsForm';

/**
 * Hook for getting public service news list with filters
 */
export const usePublicServiceNewsList = (filters: PublicServiceNewsFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.PUBLIC_SERVICE_NEWS_LIST(filters),
        queryFn: () => publicServiceNewsService.getPublicServiceNewsList(filters),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for getting public service news by ID
 */
export const usePublicServiceNews = (id: string, enabled = true) => {
    return useQuery({
        queryKey: QUERY_KEYS.PUBLIC_SERVICE_NEWS_DETAIL(id),
        queryFn: () => publicServiceNewsService.getPublicServiceNewsById(id),
        enabled: !!id && enabled,
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for creating public service news
 */
export const useCreatePublicServiceNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreatePublicServiceNewsRequest) =>
            publicServiceNewsService.createPublicServiceNews(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.PUBLIC_SERVICE_NEWS_BASE,
            });
        },
    });
};

/**
 * Hook for updating public service news
 */
export const useUpdatePublicServiceNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdatePublicServiceNewsRequest }) =>
            publicServiceNewsService.updatePublicServiceNews(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.PUBLIC_SERVICE_NEWS_DETAIL(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.PUBLIC_SERVICE_NEWS_BASE,
            });
        },
    });
};

/**
 * Hook for deleting public service news
 */
export const useDeletePublicServiceNews = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => publicServiceNewsService.deletePublicServiceNews(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.PUBLIC_SERVICE_NEWS_BASE,
            });
        },
    });
};

