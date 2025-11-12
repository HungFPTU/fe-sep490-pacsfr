export const QUERY_KEYS = {
    ORG_UNIT_BASE: ['org-unit'] as const,
    ORG_UNIT_LIST: (filters: unknown) => ['org-unit', 'list', filters] as const,
    ORG_UNIT_DETAIL: (id: string) => ['org-unit', 'detail', id] as const,
};

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

export const DEFAULT_PAGE_SIZE = 10;

