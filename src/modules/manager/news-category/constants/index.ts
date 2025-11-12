/**
 * News Category Constants
 * Query keys, cache times, and other constants
 */

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

// React Query keys for news categories
export const QUERY_KEYS = {
    NEWS_CATEGORY_LIST: (filters: { keyword?: string; isActive?: boolean; page: number; size: number }) =>
        ['news-categories', 'list', filters] as const,
    NEWS_CATEGORY_DETAIL: (id: string) =>
        ['news-categories', 'detail', id] as const,
    NEWS_CATEGORY_ALL: () =>
        ['news-categories', 'all'] as const,
} as const;

