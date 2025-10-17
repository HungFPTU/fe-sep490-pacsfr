"use client";

import { useQuery } from "@tanstack/react-query";
import { ServiceGroupService } from "../services/service-group.service";

// Query keys
export const serviceGroupKeys = {
    SERVICE_GROUPS: ["serviceGroups"] as const,
    SERVICE_GROUP_DETAILS: () => [...serviceGroupKeys.SERVICE_GROUPS, "detail"] as const,
    SERVICE_GROUP_DETAIL: (id: string) => [...serviceGroupKeys.SERVICE_GROUP_DETAILS(), id] as const,
} as const;

// Hook for getting service group by ID
export const useServiceGroup = (id: string) => {
    return useQuery({
        queryKey: serviceGroupKeys.SERVICE_GROUP_DETAIL(id),
        queryFn: () => ServiceGroupService.getServiceGroupById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
};

// Hook for getting all service groups
export const useServiceGroups = () => {
    return useQuery({
        queryKey: serviceGroupKeys.SERVICE_GROUPS,
        queryFn: ServiceGroupService.getServiceGroups,
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
    });
};
