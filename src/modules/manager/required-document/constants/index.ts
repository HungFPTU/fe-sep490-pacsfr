/**
 * Constants for Required Document module
 */

export const CACHE_TIME = {
    SHORT: 1000 * 60 * 5,
    MEDIUM: 1000 * 60 * 10,
    LONG: 1000 * 60 * 30,
} as const;

export const STALE_TIME = {
    SHORT: 1000 * 30,
    MEDIUM: 1000 * 60,
    LONG: 1000 * 60 * 5,
} as const;

export const QUERY_KEYS = {
    REQUIRED_DOCUMENT_BASE: ['required-documents'] as const,
    REQUIRED_DOCUMENT_LIST: (filters: { keyword?: string; serviceId?: string; docTypeId?: string; isActive?: boolean; page: number; size: number }) =>
        ['required-documents', 'list', filters] as const,
    REQUIRED_DOCUMENT_DETAIL: (id: string) => ['required-documents', 'detail', id] as const,
} as const;

