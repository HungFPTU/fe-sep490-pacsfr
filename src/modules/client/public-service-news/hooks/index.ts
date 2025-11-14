import { useQuery } from '@tanstack/react-query';
import { publicServiceNewsClientService } from '../services/public-service-news.service';
import {
    PUBLIC_SERVICE_NEWS_QUERY_KEYS,
    PUBLIC_SERVICE_NEWS_CACHE_TIME,
    PUBLIC_SERVICE_NEWS_STALE_TIME,
} from '../constants';
import type { PublicServiceNews, PublicServiceNewsFilters } from '../types';
import type { PageResult } from '@/types/rest';

export const usePublicServiceNewsList = (filters: PublicServiceNewsFilters) => {
    return useQuery<PageResult<PublicServiceNews>>({
        queryKey: PUBLIC_SERVICE_NEWS_QUERY_KEYS.LIST(filters),
        queryFn: () => publicServiceNewsClientService.getPublicServiceNews(filters),
        staleTime: PUBLIC_SERVICE_NEWS_STALE_TIME.DEFAULT,
        gcTime: PUBLIC_SERVICE_NEWS_CACHE_TIME.DEFAULT,
    });
};

export const usePublicServiceNewsDetail = (id?: string) => {
    return useQuery<PublicServiceNews | null>({
        queryKey: PUBLIC_SERVICE_NEWS_QUERY_KEYS.DETAIL(id ?? 'unknown'),
        queryFn: () => {
            if (!id) {
                return Promise.resolve(null);
            }
            return publicServiceNewsClientService.getPublicServiceNewsDetail(id);
        },
        enabled: !!id,
        staleTime: PUBLIC_SERVICE_NEWS_STALE_TIME.DEFAULT,
        gcTime: PUBLIC_SERVICE_NEWS_CACHE_TIME.DEFAULT,
    });
};

