export const QUERY_KEYS = {
    COUNTER_BASE: ['counter'],
    COUNTER_LIST: ['counter', 'list'],
    COUNTER_DETAIL: (id: string) => ['counter', 'detail', id] as const,
};

export const CACHE_TIME = 5 * 60 * 1000;
export const STALE_TIME = 1 * 60 * 1000;
