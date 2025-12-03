import { workshiftApi, UpdateStaffWorkShiftRequest } from '../api/workshift.api';
import type {
  WorkShift,
  CreateWorkShiftRequest,
  UpdateWorkShiftRequest,
  AssignStaffWorkShiftRequest,
  CounterOption,
  StaffOption,
  StaffWorkShift,
  AvailableStaff,
  WorkShiftFilters,
} from '../types';
import type { RestResponse, RestPaged } from '@/types/rest';

// ==================== WorkShift Service ====================

export class WorkShiftService {
  /**
   * Lấy danh sách ca làm việc
   */
  static async getWorkShifts(filters: WorkShiftFilters = {}): Promise<RestPaged<WorkShift>> {
    return workshiftApi.getAll(filters);
  }

  /**
   * Lấy thông tin chi tiết ca làm việc
   */
  static async getWorkShiftDetail(id: string): Promise<RestResponse<WorkShift>> {
    return workshiftApi.getById(id);
  }

  /**
   * Tạo ca làm việc mới
   * Validates that no duplicate shift (same date + shift type) exists
   */
  static async createWorkShift(data: CreateWorkShiftRequest): Promise<RestResponse<WorkShift>> {
    // Validate: Check if shift with same date and type already exists
    const allShifts = await this.getWorkShifts({ page: 1, size: 200 });
    
    const dateStr = typeof data.shiftDate === 'string' 
        ? data.shiftDate.split('T')[0]
        : new Date(data.shiftDate).toISOString().split('T')[0];
    
    // Check if there's already a shift with the same date and shift type
    const items = allShifts.data?.items;
    if (items) {
      const itemsArray = (items as { $values?: WorkShift[] }).$values || 
                        (Array.isArray(items) ? items : []);
      
      const duplicate = itemsArray.find(shift => {
        const shiftDateStr = typeof shift.shiftDate === 'string'
            ? shift.shiftDate.split('T')[0]
            : new Date(shift.shiftDate).toISOString().split('T')[0];
        
        return shiftDateStr === dateStr && shift.shiftType === data.shiftType;
      });
      
      if (duplicate) {
        throw new Error(`Đã tồn tại ca "${data.shiftType}" vào ngày này. Không thể tạo ca trùng lặp.`);
      }
    }
    
    return workshiftApi.create(data);
  }

  /**
   * Cập nhật ca làm việc
   */
  static async updateWorkShift(
    id: string,
    data: UpdateWorkShiftRequest,
  ): Promise<RestResponse<WorkShift>> {
    return workshiftApi.update(id, data);
  }

  /**
   * Xóa ca làm việc
   */
  static async deleteWorkShift(id: string): Promise<RestResponse<object>> {
    return workshiftApi.delete(id);
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
   * Business rules validation:
   * - Tối đa MAX_SHIFTS_PER_WEEK ca/tuần
   * - Không được trùng ca (cùng ngày, cùng workShiftId)
   * - Backend sẽ validate và trả về error nếu vi phạm
   */
  static async assignStaffWorkShift(data: AssignStaffWorkShiftRequest): Promise<RestResponse<object>> {
    // Business rules validation will be handled by backend
    // Frontend can also validate for better UX using validateShiftAssignment utility
    return workshiftApi.assignStaffWorkShift(data);
  }

  /**
   * Get staff work shifts by staff ID
   * Used for business rules validation
   */
  static async getStaffWorkShiftsByStaffId(staffId: string): Promise<StaffWorkShift[]> {
    const allShifts = await this.getStaffWorkShifts();
    if (!allShifts?.data?.items) return [];

    // Extract $values if exists
    const items = (allShifts.data.items as { $values?: StaffWorkShift[] }).$values ||
      (Array.isArray(allShifts.data.items) ? allShifts.data.items : []);

    return items.filter((shift) => shift.staffId === staffId && !shift.isDeleted);
  }

  /**
   * Cập nhật phân công nhân viên
   */
  static async updateStaffWorkShift(data: UpdateStaffWorkShiftRequest): Promise<RestResponse<object>> {
    return workshiftApi.updateStaffWorkShift(data);
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
