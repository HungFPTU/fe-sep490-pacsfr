/**
 * Service Hooks
 * React Query hooks for service data fetching
 */

import { useQuery } from '@tanstack/react-query';
import { serviceClientService } from '../services/service.service';
import { SERVICE_QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import type { ServiceFilters } from '../types';

/**
 * Get services list hook
 */
export const useServiceList = (filters: ServiceFilters) => {
    return useQuery({
        queryKey: SERVICE_QUERY_KEYS.SERVICE_LIST(filters),
        queryFn: () => serviceClientService.getServices(filters),
        gcTime: CACHE_TIME.MEDIUM,
        staleTime: STALE_TIME.SHORT,
    });
};

/**
 * Get service detail hook
 */
export const useServiceDetail = (id: string) => {
    return useQuery({
        queryKey: SERVICE_QUERY_KEYS.SERVICE_DETAIL(id),
        queryFn: () => serviceClientService.getServiceById(id),
        enabled: !!id,
        gcTime: CACHE_TIME.MEDIUM,
        staleTime: STALE_TIME.SHORT,
    });
};

