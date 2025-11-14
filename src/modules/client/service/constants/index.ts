/**
 * Service Constants
 */

// Query keys for React Query
export const SERVICE_QUERY_KEYS = {
    SERVICE_BASE: ['client', 'service'] as const,
    SERVICE_LIST: (filters: { keyword?: string; serviceGroupId?: string; legalBasisId?: string; serviceType?: string; isActive?: boolean; page: number; size: number }) =>
        [...SERVICE_QUERY_KEYS.SERVICE_BASE, 'list', filters] as const,
    SERVICE_DETAIL: (id: string) => [...SERVICE_QUERY_KEYS.SERVICE_BASE, 'detail', id] as const,
} as const;

// Cache time settings (in milliseconds)
export const CACHE_TIME = {
    SHORT: 2 * 60 * 1000, // 2 minutes
    MEDIUM: 5 * 60 * 1000, // 5 minutes
    LONG: 10 * 60 * 1000, // 10 minutes
} as const;

// Stale time settings (in milliseconds)
export const STALE_TIME = {
    SHORT: 1 * 60 * 1000, // 1 minute
    MEDIUM: 2 * 60 * 1000, // 2 minutes
    LONG: 5 * 60 * 1000, // 5 minutes
} as const;

// Default pagination
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_SIZE_LARGE = 20;

// Re-export ServiceType for convenience
export { ServiceType, SERVICE_TYPE_OPTIONS, getServiceTypeLabel } from '../enums';

