/**
 * SubmissionMethod Constants
 * Query keys, cache times, and other constants
 */

export * from './submission-method-options';

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

// React Query keys for submission methods
export const QUERY_KEYS = {
    SUBMISSION_METHOD_LIST: (filters: { keyword?: string; isActive?: boolean; page: number; size: number }) =>
        ['submission-methods', 'list', filters] as const,
    SUBMISSION_METHOD_DETAIL: (id: string) =>
        ['submission-methods', 'detail', id] as const,
    SUBMISSION_METHOD_BASE: ['submission-methods'] as const,
} as const;

