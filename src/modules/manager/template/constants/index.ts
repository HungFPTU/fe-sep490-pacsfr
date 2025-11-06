/**
 * Template Constants
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

// React Query keys for templates
export const QUERY_KEYS = {
    TEMPLATE_LIST: (filters: { keyword?: string; docsTypeId?: string; isActive?: boolean; page: number; size: number }) =>
        ['templates', 'list', filters] as const,
    TEMPLATE_DETAIL: (id: string) =>
        ['templates', 'detail', id] as const,
    TEMPLATE_ALL: () =>
        ['templates', 'all'] as const,
} as const;

