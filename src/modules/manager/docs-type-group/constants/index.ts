/**
 * Docs Type Group Constants
 * Query keys, cache times, and other constants
 */

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

// React Query keys for docs type groups
export const QUERY_KEYS = {
    DOCS_TYPE_GROUP_LIST: (filters: { keyword?: string; isActive?: boolean; page: number; size: number }) =>
        ['docs-type-groups', 'list', filters] as const,
    DOCS_TYPE_GROUP_DETAIL: (id: string) =>
        ['docs-type-groups', 'detail', id] as const,
    DOCS_TYPE_GROUP_ALL: () =>
        ['docs-type-groups', 'all'] as const,
} as const;

