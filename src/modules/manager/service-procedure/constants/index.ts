/**
 * Service Procedure Constants
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
    SERVICE_PROCEDURE_BASE: ['service-procedures'] as const,
    SERVICE_PROCEDURE_LIST: (filters: { keyword?: string; serviceId?: string; isActive?: boolean; page: number; size: number }) =>
        ['service-procedures', 'list', filters] as const,
    SERVICE_PROCEDURE_DETAIL: (id: string) => ['service-procedures', 'detail', id] as const,
} as const;
