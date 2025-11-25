import { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

export const PAKN_CATEGORY_QUERY_KEYS = {
    BASE: ['staff', 'pakn-category'] as const,
    LIST: (filters: unknown) => [...PAKN_CATEGORY_QUERY_KEYS.BASE, 'list', filters] as const,
    DETAIL: (id: string) => [...PAKN_CATEGORY_QUERY_KEYS.BASE, 'detail', id] as const,
};

export { CACHE_TIME, STALE_TIME };

