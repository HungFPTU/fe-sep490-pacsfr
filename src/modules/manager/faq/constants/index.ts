/**
 * FAQ Constants
 * Query keys, cache times, and other constants
 */

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

// React Query keys for FAQs
export const QUERY_KEYS = {
    FAQ_LIST: (filters: { keyword?: string; serviceId?: string; faqCategoryId?: string; isActive?: boolean; page: number; size: number }) =>
        ['faqs', 'list', filters] as const,
    FAQ_DETAIL: (id: string) =>
        ['faqs', 'detail', id] as const,
    FAQ_ALL: () =>
        ['faqs', 'all'] as const,
} as const;

