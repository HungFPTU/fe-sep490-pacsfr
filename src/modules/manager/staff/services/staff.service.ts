import * as staffApi from '../api/staff.api';
import {
    Staff,
    StaffDetail,
    CreateStaffRequest,
    AssignDepartmentRequest,
    AssignWorkShiftRequest,
    StaffFilters,
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
     * Lấy thông tin chi tiết nhân viên
     */
    static async getStaffDetail(id: string): Promise<RestResponse<StaffDetail>> {
        return staffApi.getStaffDetail(id);
    }

    /**
     * Tạo nhân viên mới
     */
    static async createStaff(data: CreateStaffRequest): Promise<RestResponse<Staff>> {
        return staffApi.createStaff(data);
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
        data: AssignDepartmentRequest
    ): Promise<RestResponse<Staff>> {
        return staffApi.assignDepartment(staffId, data);
    }

    /**
     * Gán nhân viên vào ca làm việc
     */
    static async assignWorkShift(
        staffId: string,
        data: AssignWorkShiftRequest
    ): Promise<RestResponse<Staff>> {
        return staffApi.assignWorkShift(staffId, data);
    }
}

