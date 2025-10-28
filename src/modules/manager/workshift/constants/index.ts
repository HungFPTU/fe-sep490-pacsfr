export const QUERY_KEYS = {
    WORKSHIFT_BASE: ['workshift'] as const,
    WORKSHIFT_LIST: (filters: unknown) => ['workshift', 'list', filters] as const,
    WORKSHIFT_DETAIL: (id: string) => ['workshift', 'detail', id] as const,
};

export const CACHE_TIME = 5 * 60 * 1000; // 5 minutes
export const STALE_TIME = 1 * 60 * 1000; // 1 minute

export const DEFAULT_PAGE_SIZE = 10;

