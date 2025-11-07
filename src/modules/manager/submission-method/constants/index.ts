/**
 * SubmissionMethod Constants
 * Query keys, cache times, and other constants
 */

export * from './submission-method-options';

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

// React Query keys for submission methods
export const QUERY_KEYS = {
    SUBMISSION_METHOD_LIST: (filters: { keyword?: string; isActive?: boolean; page: number; size: number }) =>
        ['submission-methods', 'list', filters] as const,
    SUBMISSION_METHOD_DETAIL: (id: string) =>
        ['submission-methods', 'detail', id] as const,
    SUBMISSION_METHOD_BASE: ['submission-methods'] as const,
} as const;

