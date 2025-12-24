'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { WorkShiftService } from '../services/workshift.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import { useFormDataStore } from '@/shared/stores';
import type { CreateWorkShiftRequest, UpdateWorkShiftRequest, AssignStaffWorkShiftRequest, UpdateStaffWorkShiftRequest } from '../types';

// Re-export custom hooks
export { useWorkShiftForm } from './useWorkShiftForm';

// GET list hook (with maximum page size)
export const useWorkShifts = () => {
  return useQuery({
    queryKey: QUERY_KEYS.WORKSHIFT_LIST,
    queryFn: () => WorkShiftService.getWorkShifts({ page: 1, size: 400 }),
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

// CREATE mutation with immediate refetch
export const useCreateWorkShift = () => {
  const queryClient = useQueryClient();
  const invalidateDropdown = useFormDataStore((s) => s.invalidate);

  return useMutation({
    mutationFn: (data: CreateWorkShiftRequest) => WorkShiftService.createWorkShift(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSHIFT_BASE,
      });
      await queryClient.refetchQueries({
        queryKey: QUERY_KEYS.WORKSHIFT_LIST,
      });
      invalidateDropdown('workshift');
    },
  });
};

// UPDATE mutation with immediate refetch
export const useUpdateWorkShift = () => {
  const queryClient = useQueryClient();
  const invalidateDropdown = useFormDataStore((s) => s.invalidate);

  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: UpdateWorkShiftRequest }) =>
      WorkShiftService.updateWorkShift(id, request),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSHIFT_BASE,
      });
      await queryClient.refetchQueries({
        queryKey: QUERY_KEYS.WORKSHIFT_LIST,
      });
      invalidateDropdown('workshift');
    },
  });
};

// DELETE mutation with immediate refetch
export const useDeleteWorkShift = () => {
  const queryClient = useQueryClient();
  const invalidateDropdown = useFormDataStore((s) => s.invalidate);

  return useMutation({
    mutationFn: (id: string) => WorkShiftService.deleteWorkShift(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSHIFT_BASE,
      });
      await queryClient.refetchQueries({
        queryKey: QUERY_KEYS.WORKSHIFT_LIST,
      });
      invalidateDropdown('workshift');
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

// GET available staff for counter + work shift
export const useAvailableStaff = (
  counterId?: string,
  workShiftId?: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: ['workshift', 'available-staff', counterId, workShiftId],
    queryFn: () => {
      if (!counterId || !workShiftId) {
        return Promise.resolve([]);
      }
      return WorkShiftService.getAvailableStaff(counterId, workShiftId);
    },
    enabled: enabled && !!counterId && !!workShiftId,
    gcTime: CACHE_TIME.SHORT,
    staleTime: STALE_TIME.SHORT,
    
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
      queryClient.invalidateQueries({
        queryKey: ['workshift', 'staff-work-shifts'],
      });
    },
  });
};

// UPDATE staff work shift mutation
export const useUpdateStaffWorkShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateStaffWorkShiftRequest) => WorkShiftService.updateStaffWorkShift(data),
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

// GET staff work shifts hook
export const useStaffWorkShifts = () => {
  return useQuery({
    queryKey: ['workshift', 'staff-work-shifts'],
    queryFn: () => WorkShiftService.getStaffWorkShifts(),
    gcTime: CACHE_TIME.SHORT,
    staleTime: STALE_TIME.MEDIUM,
  });
};

// GET staff work shifts by staff ID (for validation)
export const useStaffWorkShiftsByStaffId = (staffId: string) => {
  return useQuery({
    queryKey: ['workshift', 'staff-work-shifts', 'by-staff', staffId],
    queryFn: () => WorkShiftService.getStaffWorkShiftsByStaffId(staffId),
    enabled: !!staffId,
    gcTime: CACHE_TIME.SHORT,
    staleTime: STALE_TIME.SHORT,
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
