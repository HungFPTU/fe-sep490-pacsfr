import * as workshiftApi from '../api/workshift.api';
import type {
  WorkShift,
  CreateWorkShiftRequest,
  UpdateWorkShiftRequest,
  AssignStaffWorkShiftRequest,
  CounterOption,
  StaffOption,
  StaffWorkShift,
  AvailableStaff,
} from '../types';
import type { RestResponse, RestPaged } from '@/types/rest';

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
    data: UpdateWorkShiftRequest,
  ): Promise<RestResponse<WorkShift>> {
    return workshiftApi.updateWorkShift(id, data);
  }

  /**
   * Xóa ca làm việc
   */
  static async deleteWorkShift(id: string): Promise<RestResponse<object>> {
    return workshiftApi.deleteWorkShift(id);
  }

  /**
   * Lấy danh sách quầy đang hoạt động (chỉ id và counterName)
   */
  static async getActiveCounters(): Promise<CounterOption[]> {
    return workshiftApi.getActiveCounters();
  }

  /**
   * Lấy danh sách nhân viên (chỉ id và fullName)
   */
  static async getStaffList(): Promise<StaffOption[]> {
    return workshiftApi.getStaffList();
  }

  /**
   * Lấy danh sách nhân viên phù hợp với quầy & ca làm việc
   */
  static async getAvailableStaff(counterId: string, workShiftId: string): Promise<AvailableStaff[]> {
    return workshiftApi.getAvailableStaff(counterId, workShiftId);
  }

  /**
   * Phân công nhân viên vào ca làm việc
   */
  static async assignStaffWorkShift(data: AssignStaffWorkShiftRequest): Promise<RestResponse<object>> {
    return workshiftApi.assignStaffWorkShift(data);
  }

  /**
   * Lấy danh sách tất cả phân công nhân viên vào ca làm việc (không có filter)
   */
  static async getStaffWorkShifts(): Promise<RestPaged<StaffWorkShift>> {
    return workshiftApi.getStaffWorkShifts();
  }

  /**
   * Xóa phân công nhân viên khỏi ca làm việc
   */
  static async deleteStaffWorkShift(id: string): Promise<RestResponse<object>> {
    return workshiftApi.deleteStaffWorkShift(id);
  }
}
