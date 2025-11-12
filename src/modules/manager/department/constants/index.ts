export const QUERY_KEYS = {
    DEPARTMENT_BASE: ['department'] as const,
    DEPARTMENT_LIST: (filters: unknown) => ['department', 'list', filters] as const,
    DEPARTMENT_DETAIL: (id: string) => ['department', 'detail', id] as const,
};

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

export const DEFAULT_PAGE_SIZE = 10;

