import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestMany } from '@/types/rest';
import type { WorkShift, CreateWorkShiftRequest, WorkShiftFilters } from '../types';

/**
 * Lấy danh sách ca làm việc với bộ lọc (query-string builder chuẩn)
 */
const toIsoDate = (v: string | Date): string => {
  if (v instanceof Date) return v.toISOString();
  const s = v.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    return new Date(`${s}T00:00:00.000Z`).toISOString();
  }
  return s;
};

const normTime = (t?: string): string | undefined => {
  if (!t) return undefined;
  const s = t.trim();
  if (!s) return undefined;
  if (/^\d{2}:\d{2}$/.test(s)) return `${s}:00`;
  return s;
};

export const getWorkShifts = async (
  filters?: WorkShiftFilters,
): Promise<RestResponse<WorkShift>> => {
  const params = new URLSearchParams();

  const append = (k: string, v?: string | number | boolean) => {
    if (v === undefined || v === null || v === '') return;
    params.append(k, String(v));
  };

  append('Keyword', filters?.keyword?.trim());
  append('CounterId', filters?.counterId);
  append('StaffId', filters?.staffId);
  append('ShiftType', filters?.shiftType);

  if (filters?.shiftDate) {
    append('ShiftDate', toIsoDate(filters.shiftDate));
  }

  append('FromTime', normTime(filters?.fromTime));
  append('ToTime', normTime(filters?.toTime));

  if (filters?.isActive !== undefined) append('IsActive', filters.isActive);
  if (filters?.page) append('Page', filters.page);
  if (filters?.size) append('Size', filters.size);

  const qs = params.toString();
  const url = qs ? `/WorkShift?${qs}` : '/WorkShift';

  const response = await http.get<RestMany<WorkShift>>(url);
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
