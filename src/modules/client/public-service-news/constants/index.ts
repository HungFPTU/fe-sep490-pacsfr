export const PUBLIC_SERVICE_NEWS_QUERY_KEYS = {
    BASE: ['public-service-news'] as const,
    LIST: (filters: Record<string, unknown>) => [
        ...PUBLIC_SERVICE_NEWS_QUERY_KEYS.BASE,
        'list',
        filters,
    ] as const,
    DETAIL: (id: string) => [...PUBLIC_SERVICE_NEWS_QUERY_KEYS.BASE, 'detail', id] as const,
};

export const PUBLIC_SERVICE_NEWS_CACHE_TIME = {
    DEFAULT: 5 * 60 * 1000, // 5 minutes
};

export const PUBLIC_SERVICE_NEWS_STALE_TIME = {
    DEFAULT: 60 * 1000, // 1 minute
};

export const PUBLIC_SERVICE_NEWS_DEFAULT_PAGE = 1;
export const PUBLIC_SERVICE_NEWS_DEFAULT_PAGE_SIZE = 6;

