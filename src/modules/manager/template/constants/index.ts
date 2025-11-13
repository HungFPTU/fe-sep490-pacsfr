/**
 * Template Constants
 * Query keys, cache times, and other constants
 */

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

// React Query keys for templates
export const QUERY_KEYS = {
    TEMPLATE_LIST: (filters: { keyword?: string; docsTypeId?: string; isActive?: boolean; page: number; size: number }) =>
        ['templates', 'list', filters] as const,
    TEMPLATE_DETAIL: (id: string) =>
        ['templates', 'detail', id] as const,
    TEMPLATE_ALL: () =>
        ['templates', 'all'] as const,
} as const;

