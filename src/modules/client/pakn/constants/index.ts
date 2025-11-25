import { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

export const PAKN_QUERY_KEYS = {
    BASE: ['client', 'pakn'] as const,
    LIST: (filters: unknown) => [...PAKN_QUERY_KEYS.BASE, 'list', filters] as const,
    CATEGORIES: ['client', 'pakn', 'categories'] as const,
    ORG_UNITS: ['client', 'pakn', 'org-units'] as const,
    ATTACHMENTS: (paknCode: string) => [...PAKN_QUERY_KEYS.BASE, 'attachments', paknCode] as const,
};

export const PAKN_STATUS_OPTIONS = [
    { value: '', label: 'Tất cả trạng thái' },
    { value: 'Pending', label: 'Chờ tiếp nhận' },
    { value: 'Processing', label: 'Đang xử lý' },
    { value: 'Resolved', label: 'Đã xử lý' },
    { value: 'Closed', label: 'Đã đóng' },
] as const;

export const PAKN_LIST_PAGE_SIZE = 10;

export { CACHE_TIME, STALE_TIME };

