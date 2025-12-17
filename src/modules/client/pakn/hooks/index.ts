"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { paknService } from '../services/pakn.service';
import { PAKN_QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
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

export const usePaknCategories = () => {
    return useQuery({
        queryKey: PAKN_QUERY_KEYS.CATEGORIES,
        queryFn: () => paknService.getCategories(),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.LONG,
    });
};

export const usePaknOrgUnits = () => {
    return useQuery({
        queryKey: PAKN_QUERY_KEYS.ORG_UNITS,
        queryFn: () => paknService.getOrgUnits(),
        gcTime: CACHE_TIME.LONG,
        staleTime: STALE_TIME.LONG,
    });
};

export const usePaknSubmit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: PaknSubmitPayload) => paknService.submit(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PAKN_QUERY_KEYS.BASE });
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

