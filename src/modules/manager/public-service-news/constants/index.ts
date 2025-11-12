/**
 * Public Service News Constants
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

// React Query keys for public service news
export const QUERY_KEYS = {
    PUBLIC_SERVICE_NEWS_LIST: (filters: { keyword?: string; serviceId?: string; newsCategoryId?: string; staffId?: string; isPublished?: boolean; page: number; size: number }) =>
        ['public-service-news', 'list', filters] as const,
    PUBLIC_SERVICE_NEWS_DETAIL: (id: string) =>
        ['public-service-news', 'detail', id] as const,
    PUBLIC_SERVICE_NEWS_BASE: ['public-service-news'] as const,
} as const;

