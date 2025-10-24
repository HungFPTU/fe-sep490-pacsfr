export const QUERY_KEYS = {
    DEPARTMENT_BASE: ['department'] as const,
    DEPARTMENT_LIST: (filters: unknown) => ['department', 'list', filters] as const,
    DEPARTMENT_DETAIL: (id: string) => ['department', 'detail', id] as const,
};

export const CACHE_TIME = 5 * 60 * 1000; // 5 minutes
export const STALE_TIME = 1 * 60 * 1000; // 1 minute

export const DEFAULT_PAGE_SIZE = 10;

