import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestMany, RestPaged } from '@/types/rest';
import type { WorkShift, CreateWorkShiftRequest, UpdateWorkShiftRequest, AssignStaffWorkShiftRequest, CounterOption, StaffOption, StaffWorkShift } from '../types';

/**
 * Lấy danh sách ca làm việc (không có filter)
 */
export const getWorkShifts = async (): Promise<RestResponse<WorkShift>> => {
  const response = await http.get<RestMany<WorkShift>>('/WorkShift');
  return response.data;
};

export const getWorkShiftDetail = async (id: string): Promise<RestResponse<WorkShift>> => {
  const response = await http.get<RestResponse<WorkShift>>(
    API_PATH.MANAGER.WORKSHIFT.GET_BY_ID(id),
  );
  return response.data;
};

export const createWorkShift = async (
  data: CreateWorkShiftRequest,
): Promise<RestResponse<WorkShift>> => {
  const response = await http.post<RestResponse<WorkShift>>(API_PATH.MANAGER.WORKSHIFT.POST, data);
  return response.data;
};

export const updateWorkShift = async (
  id: string,
  data: UpdateWorkShiftRequest,
): Promise<RestResponse<WorkShift>> => {
  const response = await http.put<RestResponse<WorkShift>>(
    API_PATH.MANAGER.WORKSHIFT.PUT(id),
    data,
  );
  return response.data;
};

export const deleteWorkShift = async (id: string): Promise<RestResponse<object>> => {
  const response = await http.delete<RestResponse<object>>(API_PATH.MANAGER.WORKSHIFT.DELETE(id));
  return response.data;
};

/**
 * Lấy danh sách tất cả quầy đang hoạt động (chỉ lấy id và counterName)
 */
export const getActiveCounters = async (): Promise<CounterOption[]> => {
  const response = await http.get<RestMany<{ id: string; counterName: string; [key: string]: unknown }>>(
    API_PATH.MANAGER.WORKSHIFT.GET_ACTIVE_COUNTERS,
  );
  const data = response.data;
  if (!data?.success || !data.data) return [];
  
  // Extract $values array
  const values = (data.data as { $values?: Array<{ id: string; counterName: string }> }).$values || [];
  
  // Map to only id and counterName
  return values.map((item) => ({
    id: item.id,
    counterName: item.counterName || '',
  }));
};

/**
 * Lấy danh sách tất cả nhân viên (chỉ lấy id và fullName)
 */
export const getStaffList = async (): Promise<StaffOption[]> => {
  const response = await http.get<RestMany<{ id: string; fullName: string; [key: string]: unknown }>>(
    API_PATH.MANAGER.WORKSHIFT.GET_STAFF_LIST,
  );
  const data = response.data;
  if (!data?.success || !data.data) return [];
  
  // Extract $values array
  const values = (data.data as { $values?: Array<{ id: string; fullName: string }> }).$values || [];
  
  // Map to only id and fullName
  return values.map((item) => ({
    id: item.id,
    fullName: item.fullName || '',
  }));
};

/**
 * Phân công nhân viên vào ca làm việc
 */
export const assignStaffWorkShift = async (
  data: AssignStaffWorkShiftRequest,
): Promise<RestResponse<object>> => {
  const response = await http.post<RestResponse<object>>(
    API_PATH.MANAGER.WORKSHIFT.ASSIGN_STAFF,
    data,
  );
  return response.data;
};

/**
 * Lấy danh sách tất cả phân công nhân viên vào ca làm việc (không có filter)
 */
export const getStaffWorkShifts = async (): Promise<RestPaged<StaffWorkShift>> => {
  const response = await http.get<RestPaged<StaffWorkShift>>(
    API_PATH.MANAGER.WORKSHIFT.GET_STAFF_WORKSHIFTS,
  );
  return response.data;
};

/**
 * Xóa phân công nhân viên khỏi ca làm việc
 */
export const deleteStaffWorkShift = async (id: string): Promise<RestResponse<object>> => {
  const response = await http.delete<RestResponse<object>>(
    API_PATH.MANAGER.WORKSHIFT.DELETE_STAFF_WORKSHIFT(id),
  );
  return response.data;
};
