/**
 * TargetAudience Constants
 * Query keys, cache times, and other constants
 */

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

// React Query keys for TargetAudiences
export const QUERY_KEYS = {
    TARGET_AUDIENCE_LIST: (filters: { keyword?: string; isActive?: boolean; page: number; size: number }) =>
        ['target-audiences', 'list', filters] as const,
    TARGET_AUDIENCE_DETAIL: (id: string) =>
        ['target-audiences', 'detail', id] as const,
    TARGET_AUDIENCE_ALL: () =>
        ['target-audiences', 'all'] as const,
} as const;

