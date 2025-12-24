"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { paknService } from '../services/pakn.service';
import { PAKN_QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import { useFormDataStore, useDropdownRefreshTrigger } from '@/shared/stores';
import type { PaknListFilters, PaknSubmitPayload } from '../types/request';

export { usePaknVerifyOTP } from './usePaknVerifyOTP';
export { usePaknResendOTP } from './usePaknResendOTP';

export const usePaknList = (filters: PaknListFilters) => {
    return useQuery({
        queryKey: PAKN_QUERY_KEYS.LIST(filters),
        queryFn: () => paknService.getList(filters),
        gcTime: CACHE_TIME.MEDIUM,
        staleTime: STALE_TIME.SHORT,
    });
};

/**
 * Hook for PAKN Categories dropdown
 * Auto-refreshes when paknCategory is invalidated via Zustand store
 */
export const usePaknCategories = () => {
    const refreshTrigger = useDropdownRefreshTrigger('paknCategory');

    return useQuery({
        queryKey: [...PAKN_QUERY_KEYS.CATEGORIES, refreshTrigger],
        queryFn: () => paknService.getCategories(),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.LONG,
    });
};

/**
 * Hook for PAKN Org Units dropdown
 * Auto-refreshes when orgUnit is invalidated via Zustand store
 */
export const usePaknOrgUnits = () => {
    const refreshTrigger = useDropdownRefreshTrigger('orgUnit');

    return useQuery({
        queryKey: [...PAKN_QUERY_KEYS.ORG_UNITS, refreshTrigger],
        queryFn: () => paknService.getOrgUnits(),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.LONG,
    });
};

export const usePaknSubmit = () => {
    const queryClient = useQueryClient();
    const invalidateDropdown = useFormDataStore((s) => s.invalidate);

    return useMutation({
        mutationFn: (payload: PaknSubmitPayload) => paknService.submit(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PAKN_QUERY_KEYS.BASE });
            invalidateDropdown('pakn');
        },
    });
};

export const usePaknAttachments = (paknCode: string) => {
    return useQuery({
        queryKey: PAKN_QUERY_KEYS.ATTACHMENTS(paknCode),
        queryFn: () => paknService.getAttachments(paknCode),
        enabled: Boolean(paknCode),
        gcTime: CACHE_TIME.MEDIUM,
        staleTime: STALE_TIME.SHORT,
    });
};
