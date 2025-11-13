/**
 * Public Service News Constants
 * Query keys, cache times, and other constants
 */

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

// React Query keys for public service news
export const QUERY_KEYS = {
    PUBLIC_SERVICE_NEWS_LIST: (filters: { keyword?: string; serviceId?: string; newsCategoryId?: string; staffId?: string; isPublished?: boolean; page: number; size: number }) =>
        ['public-service-news', 'list', filters] as const,
    PUBLIC_SERVICE_NEWS_DETAIL: (id: string) =>
        ['public-service-news', 'detail', id] as const,
    PUBLIC_SERVICE_NEWS_BASE: ['public-service-news'] as const,
} as const;

