/**
 * Service Procedure Constants
 */

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';

export const QUERY_KEYS = {
    SERVICE_PROCEDURE_BASE: ['service-procedures'] as const,
    SERVICE_PROCEDURE_LIST: (filters: { keyword?: string; serviceId?: string; isActive?: boolean; page: number; size: number }) =>
        ['service-procedures', 'list', filters] as const,
    SERVICE_PROCEDURE_DETAIL: (id: string) => ['service-procedures', 'detail', id] as const,
} as const;
