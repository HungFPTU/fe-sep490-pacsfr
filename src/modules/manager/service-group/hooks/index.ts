"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { serviceGroupService } from "../services/service-group.service";
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from "../constants";
import type { CreateServiceGroupRequest, UpdateServiceGroupRequest, ServiceGroupFilters } from "../types";

// Hook for getting service groups with filters
export const useServiceGroups = (filters: ServiceGroupFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.SERVICE_GROUP_LIST(filters),
        queryFn: () => serviceGroupService.getServiceGroups(
            filters.keyword,
            filters.isActive,
            filters.page,
            filters.size
        ),
        staleTime: STALE_TIME.MEDIUM,
        gcTime: CACHE_TIME.LONG,
    });
};

// Hook for getting service group by ID
export const useServiceGroup = (id: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.SERVICE_GROUP_DETAIL(id),
        queryFn: () => serviceGroupService.getServiceGroupById(id),
        enabled: !!id,
        staleTime: STALE_TIME.MEDIUM,
        gcTime: CACHE_TIME.LONG,
    });
};

// Hook for creating service group
export const useCreateServiceGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: CreateServiceGroupRequest) =>
            serviceGroupService.createServiceGroup(request),
        onSuccess: () => {
            // Invalidate and refetch service groups list
            queryClient.invalidateQueries({
                queryKey: ['service-groups', 'list'],
            });
        },
    });
};

// Hook for updating service group
export const useUpdateServiceGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, request }: { id: string; request: UpdateServiceGroupRequest }) =>
            serviceGroupService.updateServiceGroup(id, request),
        onSuccess: (_, variables) => {
            // Invalidate specific service group and list
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SERVICE_GROUP_DETAIL(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: ['service-groups', 'list'],
            });
        },
    });
};

// Hook for deleting service group
export const useDeleteServiceGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => serviceGroupService.deleteServiceGroup(id),
        onSuccess: () => {
            // Invalidate service groups list
            queryClient.invalidateQueries({
                queryKey: ['service-groups', 'list'],
            });
        },
    });
};

