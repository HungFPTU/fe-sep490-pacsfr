/**
 * Constants for Required Document module
 */

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

export const QUERY_KEYS = {
    REQUIRED_DOCUMENT_BASE: ['required-documents'] as const,
    REQUIRED_DOCUMENT_LIST: (filters: { keyword?: string; serviceId?: string; docTypeId?: string; isActive?: boolean; page: number; size: number }) =>
        ['required-documents', 'list', filters] as const,
    REQUIRED_DOCUMENT_DETAIL: (id: string) => ['required-documents', 'detail', id] as const,
} as const;

