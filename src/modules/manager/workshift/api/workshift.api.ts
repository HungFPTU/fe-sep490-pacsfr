import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestMany } from '@/types/rest';
import type { WorkShift, CreateWorkShiftRequest } from '../types';

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
  data: CreateWorkShiftRequest,
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
