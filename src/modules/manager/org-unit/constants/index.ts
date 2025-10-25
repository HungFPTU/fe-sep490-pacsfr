export const QUERY_KEYS = {
    ORG_UNIT_BASE: ['org-unit'] as const,
    ORG_UNIT_LIST: (filters: unknown) => ['org-unit', 'list', filters] as const,
    ORG_UNIT_DETAIL: (id: string) => ['org-unit', 'detail', id] as const,
};

export const CACHE_TIME = 5 * 60 * 1000; // 5 minutes
export const STALE_TIME = 1 * 60 * 1000; // 1 minute

export const DEFAULT_PAGE_SIZE = 10;

