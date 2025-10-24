"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orgUnitService } from "../services/org-unit.service";
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from "../constants";
import type { CreateOrgUnitRequest, UpdateOrgUnitRequest, OrgUnitFilters } from "../types";

// Re-export custom hooks
export { useOrgUnitForm } from './useOrgUnitForm';

// GET list hook
export const useOrgUnits = (filters: OrgUnitFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.ORG_UNIT_LIST(filters),
        queryFn: () => orgUnitService.getOrgUnitList(filters),
        gcTime: CACHE_TIME,
        staleTime: STALE_TIME,
    });
};

// GET detail hook
export const useOrgUnitDetail = (id: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.ORG_UNIT_DETAIL(id),
        queryFn: () => orgUnitService.getOrgUnitById(id),
        enabled: !!id,
    });
};

// CREATE mutation
export const useCreateOrgUnit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateOrgUnitRequest) => orgUnitService.createOrgUnit(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.ORG_UNIT_BASE
            });
        },
    });
};

// UPDATE mutation
export const useUpdateOrgUnit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, request }: { id: string; request: UpdateOrgUnitRequest }) =>
            orgUnitService.updateOrgUnit(id, request),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.ORG_UNIT_BASE
            });
        },
    });
};

// DELETE mutation
export const useDeleteOrgUnit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => orgUnitService.deleteOrgUnit(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.ORG_UNIT_BASE
            });
        },
    });
};

