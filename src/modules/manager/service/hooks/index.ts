"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { serviceService } from "../services/service.service";
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from "../constants";
import type { CreateServiceRequest, UpdateServiceRequest, ServiceFilters, AssignSubmissionMethodsRequest, AssignAudienceRequest } from "../types";

// Re-export custom hooks
export { useServiceForm } from './useServiceForm';

// GET list hook
export const useServices = (filters: ServiceFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.SERVICE_LIST(filters),
        queryFn: () => serviceService.getServiceList(filters),
        gcTime: CACHE_TIME.SHORT,
        staleTime: STALE_TIME.MEDIUM,
    });
};

// GET detail hook
export const useServiceDetail = (id: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.SERVICE_DETAIL(id),
        queryFn: () => serviceService.getServiceById(id),
        enabled: !!id,
    });
};

// CREATE mutation
export const useCreateService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateServiceRequest) => serviceService.createService(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SERVICE_BASE
            });
        },
    });
};

// UPDATE mutation
export const useUpdateService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, request }: { id: string; request: UpdateServiceRequest }) =>
            serviceService.updateService(id, request),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SERVICE_BASE
            });
        },
    });
};

// DELETE mutation
export const useDeleteService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => serviceService.deleteService(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SERVICE_BASE
            });
        },
    });
};

// ASSIGN SUBMISSION METHODS mutation
export const useAssignSubmissionMethods = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: AssignSubmissionMethodsRequest) => 
            serviceService.assignSubmissionMethods(data),
        onSuccess: (_, variables) => {
            // Invalidate service detail to refresh submission methods
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SERVICE_DETAIL(variables.serviceId)
            });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SERVICE_BASE
            });
        },
    });
};

// ASSIGN AUDIENCE mutation
export const useAssignAudience = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: AssignAudienceRequest) => 
            serviceService.assignAudience(data),
        onSuccess: (_, variables) => {
            // Invalidate service detail to refresh audience
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SERVICE_DETAIL(variables.serviceId)
            });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SERVICE_BASE
            });
        },
    });
};

