'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { WorkShiftService } from '../services/workshift.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import type { CreateWorkShiftRequest, UpdateWorkShiftRequest, AssignStaffWorkShiftRequest } from '../types';

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
    mutationFn: ({ id, request }: { id: string; request: UpdateWorkShiftRequest }) =>
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

// GET active counters hook
export const useActiveCounters = () => {
  return useQuery({
    queryKey: ['workshift', 'active-counters'],
    queryFn: () => WorkShiftService.getActiveCounters(),
    gcTime: CACHE_TIME.SHORT,
    staleTime: STALE_TIME.MEDIUM,
  });
};

// GET staff list hook
export const useStaffList = () => {
  return useQuery({
    queryKey: ['workshift', 'staff-list'],
    queryFn: () => WorkShiftService.getStaffList(),
    gcTime: CACHE_TIME.SHORT,
    staleTime: STALE_TIME.MEDIUM,
  });
};

// ASSIGN staff to workshift mutation
export const useAssignStaffWorkShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssignStaffWorkShiftRequest) => WorkShiftService.assignStaffWorkShift(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSHIFT_BASE,
      });
      // Also invalidate staff work shifts
      queryClient.invalidateQueries({
        queryKey: ['workshift', 'staff-work-shifts'],
      });
    },
  });
};

// GET staff work shifts hook
export const useStaffWorkShifts = () => {
  return useQuery({
    queryKey: ['workshift', 'staff-work-shifts'],
    queryFn: () => WorkShiftService.getStaffWorkShifts(),
    gcTime: CACHE_TIME.SHORT,
    staleTime: STALE_TIME.MEDIUM,
  });
};

// DELETE staff work shift mutation
export const useDeleteStaffWorkShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => WorkShiftService.deleteStaffWorkShift(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workshift', 'staff-work-shifts'],
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSHIFT_BASE,
      });
    },
  });
};

