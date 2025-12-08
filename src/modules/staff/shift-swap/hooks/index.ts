import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { shiftSwapService } from '../services/shift-swap.service';
import { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';
import type { CreateShiftSwapRequest, ShiftSwapFilters, StaffWithShifts } from '../types';
import { http } from '@/core/http/client';
import { API_PATH } from '@/core/config/api.path';
import type { RestMany } from '@/types/rest';

const QUERY_KEYS = {
  BASE: ['staff-shift-swap'] as const,
  MY_REQUESTS: (status?: number) => [...QUERY_KEYS.BASE, 'my-requests', status] as const,
  LIST: (filters?: ShiftSwapFilters) => [...QUERY_KEYS.BASE, 'list', filters] as const,
  DETAIL: (id: string) => [...QUERY_KEYS.BASE, 'detail', id] as const,
  AVAILABLE_STAFF: (keyword?: string) => [...QUERY_KEYS.BASE, 'available-staff', keyword] as const,
};

export const useCreateShiftSwapRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateShiftSwapRequest) => shiftSwapService.createRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BASE });
    },
  });
};

export const useMyShiftSwapRequests = (status?: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.MY_REQUESTS(status),
    queryFn: () => shiftSwapService.getMyRequests(status),
    gcTime: CACHE_TIME.SHORT,
    staleTime: STALE_TIME.SHORT,
  });
};

export const useShiftSwapList = (filters?: ShiftSwapFilters) => {
  return useQuery({
    queryKey: QUERY_KEYS.LIST(filters),
    queryFn: () => shiftSwapService.getList(filters?.status, filters?.page, filters?.size),
    gcTime: CACHE_TIME.SHORT,
    staleTime: STALE_TIME.SHORT,
  });
};

export const useShiftSwapDetail = (id: string | null, enabled = false) => {
  return useQuery({
    queryKey: QUERY_KEYS.DETAIL(id || ''),
    queryFn: () => shiftSwapService.getById(id!),
    enabled: !!id && enabled,
  });
};

export const useRespondToShiftSwap = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof shiftSwapService.respondToRequest>[1] }) =>
      shiftSwapService.respondToRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BASE });
    },
  });
};

export const useApproveShiftSwap = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof shiftSwapService.approveRequest>[1] }) =>
      shiftSwapService.approveRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BASE });
    },
  });
};

export const useCancelShiftSwap = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => shiftSwapService.cancelRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BASE });
    },
  });
};

// Hook to fetch my work shifts
export const useMyWorkShifts = () => {
  return useQuery({
    queryKey: [...QUERY_KEYS.BASE, 'my-shifts'] as const,
    queryFn: () => shiftSwapService.getMyWorkShifts(),
    gcTime: CACHE_TIME.MEDIUM,
    staleTime: STALE_TIME.MEDIUM,
  });
};

// Hook to fetch available staff with their shifts
export const useAvailableStaffWithShifts = (keyword?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.AVAILABLE_STAFF(keyword),
    queryFn: () => shiftSwapService.getAvailableStaffWithShifts(),
    gcTime: CACHE_TIME.MEDIUM,
    staleTime: STALE_TIME.MEDIUM,
  });
};

