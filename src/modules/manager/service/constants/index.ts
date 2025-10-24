export const QUERY_KEYS = {
    SERVICE_BASE: ['manager', 'services'],
    SERVICE_LIST: (filters: {
        keyword: string;
        serviceGroupId: string;
        legalBasisId: string;
        isActive: boolean;
        page: number;
        size: number;
    }) => [...QUERY_KEYS.SERVICE_BASE, 'list', filters],
    SERVICE_DETAIL: (id: string) => [...QUERY_KEYS.SERVICE_BASE, 'detail', id],
} as const;

export const CACHE_TIME = 1000 * 60 * 5; // 5 minutes
export const STALE_TIME = 1000 * 60 * 1; // 1 minute

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;

