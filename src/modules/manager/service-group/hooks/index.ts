/**
 * Service Group Hooks
 * React Query hooks for data fetching and mutations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { serviceGroupService } from '../services/service-group.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import type { CreateServiceGroupRequest, UpdateServiceGroupRequest, ServiceGroupFilters } from '../types/request';

// Re-export custom form hook
export { useServiceGroupForm } from './useServiceGroupForm';

/**
 * Hook for getting service groups list with filters
 */
export const useServiceGroups = (filters: ServiceGroupFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.SERVICE_GROUP_LIST(filters),
        queryFn: () => serviceGroupService.getServiceGroups(filters),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for getting service group by ID
 */
export const useServiceGroup = (id: string, enabled = true) => {
    return useQuery({
        queryKey: QUERY_KEYS.SERVICE_GROUP_DETAIL(id),
        queryFn: () => serviceGroupService.getServiceGroupById(id),
        enabled: !!id && enabled,
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

/**
 * Hook for creating service group
 */
export const useCreateServiceGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateServiceGroupRequest) =>
            serviceGroupService.createServiceGroup(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SERVICE_GROUP_ALL(),
            });
        },
    });
};

/**
 * Hook for updating service group
 */
export const useUpdateServiceGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateServiceGroupRequest }) =>
            serviceGroupService.updateServiceGroup(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SERVICE_GROUP_DETAIL(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SERVICE_GROUP_ALL(),
            });
        },
    });
};

/**
 * Hook for deleting service group
 */
export const useDeleteServiceGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => serviceGroupService.deleteServiceGroup(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SERVICE_GROUP_ALL(),
            });
        },
    });
};
