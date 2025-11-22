import * as workshiftApi from '../api/workshift.api';
import type { WorkShift, CreateWorkShiftRequest } from '../types';
import type { RestResponse } from '@/types/rest';

// ==================== WorkShift Service ====================

export class WorkShiftService {
  /**
   * Lấy danh sách ca làm việc (không có filter)
   */
  static async getWorkShifts(): Promise<RestResponse<WorkShift>> {
    return workshiftApi.getWorkShifts();
  }

  /**
   * Lấy thông tin chi tiết ca làm việc
   */
  static async getWorkShiftDetail(id: string): Promise<RestResponse<WorkShift>> {
    return workshiftApi.getWorkShiftDetail(id);
  }

  /**
   * Tạo ca làm việc mới
   */
  static async createWorkShift(data: CreateWorkShiftRequest): Promise<RestResponse<WorkShift>> {
    return workshiftApi.createWorkShift(data);
  }

  /**
   * Cập nhật ca làm việc
   */
  static async updateWorkShift(
    id: string,
    data: CreateWorkShiftRequest,
  ): Promise<RestResponse<WorkShift>> {
    return workshiftApi.updateWorkShift(id, data);
  }

  /**
   * Xóa ca làm việc
   */
  static async deleteWorkShift(id: string): Promise<RestResponse<object>> {
    return workshiftApi.deleteWorkShift(id);
  }
}
