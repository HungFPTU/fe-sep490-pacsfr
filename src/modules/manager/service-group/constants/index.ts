/**
 * Service Group Constants
 * Query keys, cache times, and other constants
 */

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

// React Query keys for service groups
export const QUERY_KEYS = {
    SERVICE_GROUP_LIST: (filters: { keyword?: string; isActive?: boolean; page: number; size: number }) =>
        ['service-groups', 'list', filters] as const,
    SERVICE_GROUP_DETAIL: (id: string) =>
        ['service-groups', 'detail', id] as const,
    SERVICE_GROUP_ALL: () =>
        ['service-groups', 'all'] as const,
} as const;

