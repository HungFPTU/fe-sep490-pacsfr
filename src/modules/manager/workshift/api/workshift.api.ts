import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestMany } from '@/types/rest';
import type {
  WorkShift,
  CreateWorkShiftRequest,
  WorkShiftFilters,
  Counter,
  Staff,
} from '../types';

export const workshiftApi = {
    // GET list với filters
    getList: (filters: WorkShiftFilters) => {
        return http.get<RestMany<WorkShift>>(
            API_PATH.MANAGER.WORKSHIFT.GET_ALL(
                filters.keyword || '',
                filters.isActive ?? true,
                filters.page || 1,
                filters.size || 10,
                filters.staffId || ''
            )
        );
    },

/**
 * Lấy danh sách ca làm việc với bộ lọc
 */
const toIsoDate = (v: string | Date): string => {
  if (v instanceof Date) return v.toISOString();
  const s = v.trim();
  // 'YYYY-MM-DD' -> ISO 00:00:00Z
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    return new Date(`${s}T00:00:00.000Z`).toISOString();
  }
  // đã là ISO hoặc định dạng khác -> giữ nguyên
  return s;
};

const normTime = (t?: string): string | undefined => {
  if (!t) return undefined;
  const s = t.trim();
  if (!s) return undefined;
  // thêm giây nếu thiếu
  if (/^\d{2}:\d{2}$/.test(s)) return `${s}:00`;
  return s; // 'HH:mm:ss' thì giữ nguyên
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

/**
 * Lấy thông tin chi tiết ca làm việc
 */
export const getWorkShiftDetail = async (id: string): Promise<RestResponse<WorkShift>> => {
  const response = await http.get<RestResponse<WorkShift>>(
    API_PATH.MANAGER.WORKSHIFT.GET_BY_ID(id),
  );
  return response.data;
};

/**
 * Tạo ca làm việc mới
 */
export const createWorkShift = async (
  data: CreateWorkShiftRequest,
): Promise<RestResponse<WorkShift>> => {
  const response = await http.post<RestResponse<WorkShift>>(API_PATH.MANAGER.WORKSHIFT.POST, data);
  return response.data;
};

/**
 * Cập nhật ca làm việc
 */
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

/**
 * Xóa ca làm việc
 */
export const deleteWorkShift = async (id: string): Promise<RestResponse<object>> => {
  const response = await http.delete<RestResponse<object>>(API_PATH.MANAGER.WORKSHIFT.DELETE(id));
  return response.data;
};

/**
 * Lấy danh sách quầy đang hoạt động
 */
export const getActiveCounters = async (): Promise<RestResponse<Counter>> => {
  const response = await http.get<RestResponse<Counter>>(
    API_PATH.MANAGER.WORKSHIFT.GET_ACTIVE_COUNTERS,
  );
  return response.data;
};

/**
 * Lấy danh sách nhân viên
 */
export const getStaffList = async (): Promise<RestResponse<Staff>> => {
  const response = await http.get<RestResponse<Staff>>(API_PATH.MANAGER.WORKSHIFT.GET_STAFF_LIST);
  return response.data;
};
