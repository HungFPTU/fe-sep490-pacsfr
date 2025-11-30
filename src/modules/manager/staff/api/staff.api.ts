import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import { RestResponse, RestMany } from '@/types/rest';
import {
  Staff,
  StaffDetail,
  CreateStaffRequest,
  AssignDepartmentRequest,
  AssignServiceGroupsRequest,
  ServiceGroupOption,
  StaffFilters,
  UploadAvatarResponse,
} from '../types';
import { Counter } from '../../workshift';

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
  const url = queryString
    ? `${API_PATH.MANAGER.STAFF_MANAGEMENT.BASE}?${queryString}`
    : API_PATH.MANAGER.STAFF_MANAGEMENT.BASE;

  const response = await http.get<RestMany<Staff>>(url);
  return response.data;
};

export const getCounters = async (): Promise<RestResponse<Counter>> => {
  const url = API_PATH.MANAGER.COUNTER.GET_ALL_ACTIVE();
  const response = await http.get<RestMany<Counter>>(url);
  return response.data;
};

/**
 * Lấy thông tin chi tiết nhân viên
 */
export const getStaffDetail = async (id: string): Promise<RestResponse<StaffDetail>> => {
  const response = await http.get<RestResponse<StaffDetail>>(
    API_PATH.MANAGER.STAFF_MANAGEMENT.GET_BY_ID(id),
  );
  return response.data;
};

/**
 * STAFF-03: Tạo nhân viên mới
 */
export const createStaff = async (data: CreateStaffRequest): Promise<RestResponse<Staff>> => {
  const response = await http.post<RestResponse<Staff>>(
    API_PATH.MANAGER.STAFF_MANAGEMENT.CREATE,
    data,
  );
  return response.data;
};

/**
 * Xóa nhân viên
 */
export const deleteStaff = async (id: string): Promise<RestResponse<Staff>> => {
  const response = await http.delete<RestResponse<Staff>>(
    API_PATH.MANAGER.STAFF_MANAGEMENT.DELETE(id),
  );
  return response.data;
};

/**
 * STAFF-06: Gán nhân viên vào phòng ban
 */
export const assignDepartment = async (
  staffId: string,
  data: AssignDepartmentRequest,
): Promise<RestResponse<Staff>> => {
  const response = await http.post<RestResponse<Staff>>(
    API_PATH.MANAGER.STAFF_MANAGEMENT.ASSIGN_DEPARTMENT(staffId),
    data,
  );
  return response.data;
};

/**
 * Lấy danh sách Service Groups (không filter)
 */
export const getServiceGroups = async (): Promise<ServiceGroupOption[]> => {
  const response = await http.get<RestMany<{ id: string; groupName: string; groupCode?: string; [key: string]: unknown }>>(
    API_PATH.MANAGER.STAFF_MANAGEMENT.GET_SERVICE_GROUPS,
  );
  const data = response.data;
  if (!data?.success || !data.data) return [];
  
  // Handle different response structures
  let items: Array<{ id: string; groupName: string; groupCode?: string }> = [];
  
  if (Array.isArray(data.data)) {
    items = data.data;
  } else if (data.data && '$values' in data.data && Array.isArray(data.data.$values)) {
    items = data.data.$values;
  } else if (data.data && 'items' in data.data) {
    const itemsData = data.data.items;
    if (Array.isArray(itemsData)) {
      items = itemsData;
    } else if (itemsData && '$values' in itemsData && Array.isArray(itemsData.$values)) {
      items = itemsData.$values;
    }
  }
  
  // Map to only id and groupName
  return items.map((item) => ({
    id: item.id,
    groupName: item.groupName || '',
    groupCode: item.groupCode,
  }));
};

/**
 * STAFF-10: Gán nhiều service groups cho staff (batch assignment)
 */
export const assignServiceGroups = async (
  staffId: string,
  data: AssignServiceGroupsRequest,
): Promise<RestResponse<Staff>> => {
  const response = await http.post<RestResponse<Staff>>(
    API_PATH.MANAGER.STAFF_MANAGEMENT.ASSIGN_SERVICE_GROUPS(staffId),
    data,
  );
  return response.data;
};

/**
 * STAFF-07: Upload avatar cho nhân viên
 */
export const uploadAvatar = async (
  staffId: string,
  file: File,
): Promise<RestResponse<UploadAvatarResponse>> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await http.post<RestResponse<UploadAvatarResponse>>(
    API_PATH.MANAGER.STAFF_MANAGEMENT.UPLOAD_AVATAR(staffId),
    formData,
  );
  return response.data;
};
