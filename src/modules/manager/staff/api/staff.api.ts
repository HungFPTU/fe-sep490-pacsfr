import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import { RestResponse, RestMany } from '@/types/rest';
import {
    Staff,
    StaffDetail,
    CreateStaffRequest,
    AssignDepartmentRequest,
    AssignWorkShiftRequest,
    StaffFilters,
} from '../types';

// ==================== Staff API ====================

/**
 * STAFF-02: Lấy danh sách nhân viên với bộ lọc
 */
export const getStaffs = async (filters?: StaffFilters): Promise<RestResponse<Staff>> => {
    const params = new URLSearchParams();

    if (filters?.SearchTerm) {
        params.append('SearchTerm', filters.SearchTerm);
    }

    if (filters?.IsActive !== undefined) {
        params.append('IsActive', String(filters.IsActive));
    }

    if (filters?.RoleType) {
        params.append('RoleType', filters.RoleType);
    }

    if (filters?.Page) {
        params.append('Page', String(filters.Page));
    }

    if (filters?.PageSize) {
        params.append('PageSize', String(filters.PageSize));
    }

    const queryString = params.toString();
    const url = queryString ? `${API_PATH.MANAGER.STAFF_MANAGEMENT.BASE}?${queryString}` : API_PATH.MANAGER.STAFF_MANAGEMENT.BASE;

    const response = await http.get<RestMany<Staff>>(url);
    return response.data;
};

/**
 * Lấy thông tin chi tiết nhân viên
 */
export const getStaffDetail = async (id: string): Promise<RestResponse<StaffDetail>> => {
    const response = await http.get<RestResponse<StaffDetail>>(API_PATH.MANAGER.STAFF_MANAGEMENT.GET_BY_ID(id));
    return response.data;
};

/**
 * STAFF-03: Tạo nhân viên mới
 */
export const createStaff = async (data: CreateStaffRequest): Promise<RestResponse<Staff>> => {
    const response = await http.post<RestResponse<Staff>>(API_PATH.MANAGER.STAFF_MANAGEMENT.CREATE, data);
    return response.data;
};

/**
 * Xóa nhân viên
 */
export const deleteStaff = async (id: string): Promise<RestResponse<Staff>> => {
    const response = await http.delete<RestResponse<Staff>>(API_PATH.MANAGER.STAFF_MANAGEMENT.DELETE(id));
    return response.data;
};

/**
 * STAFF-06: Gán nhân viên vào phòng ban
 */
export const assignDepartment = async (
    staffId: string,
    data: AssignDepartmentRequest
): Promise<RestResponse<Staff>> => {
    const response = await http.post<RestResponse<Staff>>(API_PATH.MANAGER.STAFF_MANAGEMENT.ASSIGN_DEPARTMENT(staffId), data);
    return response.data;
};

/**
 * STAFF-07: Gán nhân viên vào ca làm việc
 */
export const assignWorkShift = async (
    staffId: string,
    data: AssignWorkShiftRequest
): Promise<RestResponse<Staff>> => {
    const response = await http.post<RestResponse<Staff>>(API_PATH.MANAGER.STAFF_MANAGEMENT.ASSIGN_WORKSHIFT(staffId), data);
    return response.data;
};

