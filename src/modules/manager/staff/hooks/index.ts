import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { StaffService } from '../services/staff.service';
import { QUERY_KEYS } from '../constants';
import {
  Staff,
  StaffDetail,
  CreateStaffRequest,
  AssignDepartmentRequest,
  AssignServiceGroupsRequest,
  ServiceGroupOption,
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

export const useServiceGroups = () => {
  return useQuery({
    queryKey: ['serviceGroups', 'all'],
    queryFn: () => StaffService.getServiceGroups(),
  });
};

export const useAssignServiceGroups = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ staffId, data }: { staffId: string; data: AssignServiceGroupsRequest }) =>
      StaffService.assignServiceGroups(staffId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STAFF_ALL() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STAFF_DETAIL(variables.staffId) });
    },
  });
};

export const useDeleteServiceGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (staffServiceGroupId: string) =>
      StaffService.deleteServiceGroup(staffServiceGroupId),
    onSuccess: () => {
      // Invalidate all staff queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ staffId, file }: { staffId: string; file: File }) =>
      StaffService.uploadAvatar(staffId, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STAFF_ALL() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STAFF_DETAIL(variables.staffId) });
    },
  });
};

export * from './useStaffForm';
