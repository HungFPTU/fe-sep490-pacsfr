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

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;

