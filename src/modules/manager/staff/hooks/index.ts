import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { StaffService } from '../services/staff.service';
import { QUERY_KEYS } from '../constants';
import {
  Staff,
  StaffDetail,
  CreateStaffRequest,
  AssignDepartmentRequest,
  AssignWorkShiftRequest,
  StaffFilters,
} from '../types';
import { RestResponse } from '@/types/rest';
import { Counter } from '../../workshift';

export const useStaffs = (
  filters?: StaffFilters,
  options?: Omit<UseQueryOptions<RestResponse<Staff>>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.STAFF_LIST(filters),
    queryFn: () => StaffService.getStaffs(filters),
    ...options,
  });
};

// Để để tạm, sau này làm counter riêng
export const useCounters = (
  options?: Omit<UseQueryOptions<RestResponse<Counter>>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.COUNTER_LIST_ACTIVE(),
    queryFn: () => StaffService.getCounters(),
    ...options,
  });
};

export const useStaffDetail = (
  id: string,
  options?: Omit<UseQueryOptions<RestResponse<StaffDetail>>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.STAFF_DETAIL(id),
    queryFn: () => StaffService.getStaffDetail(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStaffRequest) => StaffService.createStaff(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STAFF_ALL() });
    },
  });
};

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => StaffService.deleteStaff(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STAFF_ALL() });
    },
  });
};

export const useAssignDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ staffId, data }: { staffId: string; data: AssignDepartmentRequest }) =>
      StaffService.assignDepartment(staffId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STAFF_ALL() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STAFF_DETAIL(variables.staffId) });
    },
  });
};

export const useAssignWorkShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ staffId, data }: { staffId: string; data: AssignWorkShiftRequest }) =>
      StaffService.assignWorkShift(staffId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STAFF_ALL() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STAFF_DETAIL(variables.staffId) });
    },
  });
};

export * from './useStaffForm';
