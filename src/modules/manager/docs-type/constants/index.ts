/**
 * Docs Type Constants
 * Query keys, cache times, and other constants
 */

// Cache time constants (in milliseconds)
export const CACHE_TIME = {
    SHORT: 1000 * 60 * 5, // 5 minutes
    MEDIUM: 1000 * 60 * 10, // 10 minutes
    LONG: 1000 * 60 * 30, // 30 minutes
    VERY_LONG: 1000 * 60 * 60, // 1 hour
} as const;

// Stale time constants (in milliseconds)
export const STALE_TIME = {
    SHORT: 1000 * 30, // 30 seconds
    MEDIUM: 1000 * 60, // 1 minute
    LONG: 1000 * 60 * 5, // 5 minutes
    VERY_LONG: 1000 * 60 * 10, // 10 minutes
} as const;

// React Query keys for docs types
export const QUERY_KEYS = {
    DOCS_TYPE_LIST: (filters: { keyword?: string; groupId?: string; isActive?: boolean; page: number; size: number }) =>
        ['docs-types', 'list', filters] as const,
    DOCS_TYPE_DETAIL: (id: string) =>
        ['docs-types', 'detail', id] as const,
    DOCS_TYPE_ALL: () =>
        ['docs-types', 'all'] as const,
} as const;

