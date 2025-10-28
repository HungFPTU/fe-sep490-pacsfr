import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestMany } from '@/types/rest';
import type { 
    WorkShift, 
    CreateWorkShiftRequest, 
    UpdateWorkShiftRequest, 
    WorkShiftFilters, 
    Counter, 
    Staff 
} from '../types';

// ==================== WorkShift API ====================

/**
 * Lấy danh sách ca làm việc với bộ lọc
 */
export const getWorkShifts = async (filters?: WorkShiftFilters): Promise<RestResponse<WorkShift>> => {
    const params = new URLSearchParams();

    if (filters?.keyword) {
        params.append('keyword', filters.keyword);
    }

    if (filters?.isActive !== undefined) {
        params.append('isActive', String(filters.isActive));
    }

    if (filters?.page) {
        params.append('Page', String(filters.page));
    }

    if (filters?.size) {
        params.append('Size', String(filters.size));
    }

    const queryString = params.toString();
    const url = queryString ? `/WorkShift?${queryString}` : '/WorkShift';

    const response = await http.get<RestMany<WorkShift>>(url);
    return response.data;
};

/**
 * Lấy thông tin chi tiết ca làm việc
 */
export const getWorkShiftDetail = async (id: string): Promise<RestResponse<WorkShift>> => {
    const response = await http.get<RestResponse<WorkShift>>(API_PATH.MANAGER.WORKSHIFT.GET_BY_ID(id));
    return response.data;
};

/**
 * Tạo ca làm việc mới
 */
export const createWorkShift = async (data: CreateWorkShiftRequest): Promise<RestResponse<WorkShift>> => {
    const response = await http.post<RestResponse<WorkShift>>(API_PATH.MANAGER.WORKSHIFT.POST, data);
    return response.data;
};

/**
 * Cập nhật ca làm việc
 */
export const updateWorkShift = async (id: string, data: UpdateWorkShiftRequest): Promise<RestResponse<WorkShift>> => {
    const response = await http.put<RestResponse<WorkShift>>(API_PATH.MANAGER.WORKSHIFT.PUT(id), data);
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
    const response = await http.get<RestResponse<Counter>>(API_PATH.MANAGER.WORKSHIFT.GET_ACTIVE_COUNTERS);
    return response.data;
};

/**
 * Lấy danh sách nhân viên
 */
export const getStaffList = async (): Promise<RestResponse<Staff>> => {
    const response = await http.get<RestResponse<Staff>>(API_PATH.MANAGER.WORKSHIFT.GET_STAFF_LIST);
    return response.data;
};
