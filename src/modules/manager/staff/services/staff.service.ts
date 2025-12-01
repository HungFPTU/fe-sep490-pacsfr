import { Counter } from '../../workshift';
import * as staffApi from '../api/staff.api';
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
import { RestResponse } from '@/types/rest';

// ==================== Staff Service ====================

export class StaffService {
  /**
   * Lấy danh sách nhân viên với bộ lọc
   */
  static async getStaffs(filters?: StaffFilters): Promise<RestResponse<Staff>> {
    return staffApi.getStaffs(filters);
  }

  /**
   * Lấy danh sách quầy đang hoạt động (Để tạm, sau này làm getCounters riêng)
   */
  static async getCounters(): Promise<RestResponse<Counter>> {
    return staffApi.getCounters();
  }

  /**
   * Lấy thông tin chi tiết nhân viên
   */
  static async getStaffDetail(id: string): Promise<RestResponse<StaffDetail>> {
    return staffApi.getStaffDetail(id);
  }

  /**
   * Tạo nhân viên mới
   */
  static async createStaff(data: CreateStaffRequest): Promise<RestResponse<Staff>> {
    const response = await staffApi.createStaff(data);
    if (!response.success || !response.data) {
      // Extract message from API response if available (message is at root level)
      const apiResponse = response as { message?: string; success: boolean };
      const errorMessage = apiResponse?.message || 'Failed to create staff';
      throw new Error(errorMessage);
    }
    return response;
  }

  /**
   * Xóa nhân viên
   */
  static async deleteStaff(id: string): Promise<RestResponse<Staff>> {
    return staffApi.deleteStaff(id) as unknown as RestResponse<Staff>;
  }

  /**
   * Gán nhân viên vào phòng ban
   */
  static async assignDepartment(
    staffId: string,
    data: AssignDepartmentRequest,
  ): Promise<RestResponse<Staff>> {
    return staffApi.assignDepartment(staffId, data);
  }

  /**
   * Lấy danh sách Service Groups
   */
  static async getServiceGroups(): Promise<ServiceGroupOption[]> {
    return staffApi.getServiceGroups();
  }

  /**
   * Gán nhiều service groups cho staff (batch assignment)
   */
  static async assignServiceGroups(
    staffId: string,
    data: AssignServiceGroupsRequest,
  ): Promise<RestResponse<Staff>> {
    return staffApi.assignServiceGroups(staffId, data);
  }

  /**
   * Xóa một service group khỏi staff
   */
  static async deleteServiceGroup(
    staffServiceGroupId: string,
  ): Promise<RestResponse<{ success: boolean }>> {
    return staffApi.deleteServiceGroup(staffServiceGroupId);
  }

  /**
   * Upload avatar cho nhân viên
   */
  static async uploadAvatar(
    staffId: string,
    file: File,
  ): Promise<RestResponse<UploadAvatarResponse>> {
    return staffApi.uploadAvatar(staffId, file);
  }
}
