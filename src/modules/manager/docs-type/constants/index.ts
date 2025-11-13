/**
 * Docs Type Constants
 * Query keys, cache times, and other constants
 */

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

// React Query keys for docs types
export const QUERY_KEYS = {
    DOCS_TYPE_LIST: (filters: { keyword?: string; groupId?: string; isActive?: boolean; page: number; size: number }) =>
        ['docs-types', 'list', filters] as const,
    DOCS_TYPE_DETAIL: (id: string) =>
        ['docs-types', 'detail', id] as const,
    DOCS_TYPE_ALL: () =>
        ['docs-types', 'all'] as const,
} as const;

