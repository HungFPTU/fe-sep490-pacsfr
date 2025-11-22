'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { WorkShiftService } from '../services/workshift.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import type { CreateWorkShiftRequest } from '../types';

// Export hooks first
// Re-export custom hooks at the end
export { useWorkShiftForm } from './useWorkShiftForm';
// GET list hook (không có filter)
export const useWorkShifts = () => {
  return useQuery({
    queryKey: QUERY_KEYS.WORKSHIFT_LIST,
    queryFn: () => WorkShiftService.getWorkShifts(),
    gcTime: CACHE_TIME.SHORT,
    staleTime: STALE_TIME.MEDIUM,
  });
};

// GET detail hook
export const useWorkShiftDetail = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.WORKSHIFT_DETAIL(id),
    queryFn: () => WorkShiftService.getWorkShiftDetail(id),
    enabled: !!id,
  });
};

// CREATE mutation
export const useCreateWorkShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkShiftRequest) => WorkShiftService.createWorkShift(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSHIFT_BASE,
      });
    },
  });
};

// UPDATE mutation
export const useUpdateWorkShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: CreateWorkShiftRequest }) =>
      WorkShiftService.updateWorkShift(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSHIFT_BASE,
      });
    },
  });
};

// DELETE mutation
export const useDeleteWorkShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => WorkShiftService.deleteWorkShift(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSHIFT_BASE,
      });
    },
  });
};

