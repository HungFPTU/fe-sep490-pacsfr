/**
 * FAQ Category Constants
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

// React Query keys for FAQ categories
export const QUERY_KEYS = {
    FAQ_CATEGORY_LIST: (filters: { keyword?: string; isActive?: boolean; page: number; size: number }) =>
        ['faq-categories', 'list', filters] as const,
    FAQ_CATEGORY_DETAIL: (id: string) =>
        ['faq-categories', 'detail', id] as const,
    FAQ_CATEGORY_ALL: () =>
        ['faq-categories', 'all'] as const,
} as const;

