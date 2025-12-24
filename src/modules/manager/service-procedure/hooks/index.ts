'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { serviceProcedureService } from '../services/service-procedure.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import { useFormDataStore } from '@/shared/stores';
import type {
    CreateServiceProcedureRequest,
    UpdateServiceProcedureRequest,
    ServiceProcedureFilters,
} from '../types/request';

export { useServiceProcedureForm } from './useServiceProcedureForm';

export const useServiceProcedures = (filters: ServiceProcedureFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.SERVICE_PROCEDURE_LIST(filters),
        queryFn: () => serviceProcedureService.getServiceProcedures(filters),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

export const useServiceProcedure = (id: string, enabled = true) => {
    return useQuery({
        queryKey: QUERY_KEYS.SERVICE_PROCEDURE_DETAIL(id),
        queryFn: () => serviceProcedureService.getServiceProcedureById(id),
        enabled: !!id && enabled,
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.MEDIUM,
    });
};

export const useCreateServiceProcedure = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (data: CreateServiceProcedureRequest) =>
            serviceProcedureService.createServiceProcedure(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SERVICE_PROCEDURE_BASE,
            });
            invalidateDropdown('serviceProcedure');
        },
    });
};

export const useUpdateServiceProcedure = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateServiceProcedureRequest }) =>
            serviceProcedureService.updateServiceProcedure(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SERVICE_PROCEDURE_BASE,
            });
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SERVICE_PROCEDURE_DETAIL(variables.id),
            });
            invalidateDropdown('serviceProcedure');
        },
    });
};

export const useDeleteServiceProcedure = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (id: string) => serviceProcedureService.deleteServiceProcedure(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.SERVICE_PROCEDURE_BASE,
            });
            invalidateDropdown('serviceProcedure');
        },
    });
};
