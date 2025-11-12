/**
 * FAQ Category Constants
 * Query keys, cache times, and other constants
 */

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

// React Query keys for FAQ categories
export const QUERY_KEYS = {
    FAQ_CATEGORY_LIST: (filters: { keyword?: string; isActive?: boolean; page: number; size: number }) =>
        ['faq-categories', 'list', filters] as const,
    FAQ_CATEGORY_DETAIL: (id: string) =>
        ['faq-categories', 'detail', id] as const,
    FAQ_CATEGORY_ALL: () =>
        ['faq-categories', 'all'] as const,
} as const;

