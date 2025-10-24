/**
 * Service Group Constants
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

// React Query keys for service groups
export const QUERY_KEYS = {
    SERVICE_GROUP_LIST: (filters: { keyword?: string; isActive?: boolean; page: number; size: number }) =>
        ['service-groups', 'list', filters] as const,
    SERVICE_GROUP_DETAIL: (id: string) =>
        ['service-groups', 'detail', id] as const,
    SERVICE_GROUP_ALL: () =>
        ['service-groups', 'all'] as const,
} as const;

