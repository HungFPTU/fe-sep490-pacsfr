/**
 * WorkShift Service Layer
 * Uses Repository pattern for data access
 * Backend handles all validation
 */

import { workshiftRepository } from '../repositories/WorkShiftRepository';
import { workshiftApi } from '../api/workshift.api';
import type {
  WorkShift,
  CreateWorkShiftRequest,
  UpdateWorkShiftRequest,
  AssignStaffWorkShiftRequest,
  UpdateStaffWorkShiftRequest,
  WorkShiftFilters,
  StaffWorkShift,
  AvailableStaff,
  CounterOption,
  StaffOption,
} from '../types';
import type { RestPaged, RestResponse } from '@/types/rest';

export class WorkShiftService {
  /**
   * Get all work shifts with optional filters
   */
  static async getWorkShifts(filters: WorkShiftFilters = {}): Promise<RestPaged<WorkShift>> {
    const result = await workshiftRepository.findAll(filters);
    
    if (result.isFailure) {
      throw new Error(result.getError().message);
    }
    
    return result.getValue();
  }

  /**
   * Create a new work shift
   * Backend handles all validation
   */
  static async createWorkShift(data: CreateWorkShiftRequest): Promise<RestResponse<WorkShift>> {
    const createResult = await workshiftRepository.create(data);
    
    if (createResult.isFailure) {
      throw new Error(createResult.getError().message);
    }

    return { data: createResult.getValue(), success: true };
  }

  /**
   * Get work shift detail by ID
   */
  static async getWorkShiftDetail(id: string): Promise<RestResponse<WorkShift>> {
    const result = await workshiftRepository.findById(id);
    
    if (result.isFailure) {
      throw new Error(result.getError().message);
    }

    return { data: result.getValue(), success: true };
  }

  /**
   * Update work shift
   */
  static async updateWorkShift(
    id: string,
    request: UpdateWorkShiftRequest
  ): Promise<RestResponse<WorkShift>> {
    const result = await workshiftRepository.update(id, request);
    
    if (result.isFailure) {
      throw new Error(result.getError().message);
    }

    return { data: result.getValue(), success: true };
  }

  /**
   * Delete work shift
   */
  static async deleteWorkShift(id: string): Promise<RestResponse<object>> {
    const result = await workshiftRepository.delete(id);
    
    if (result.isFailure) {
      throw new Error(result.getError().message);
    }

    return { data: {}, success: true };
  }

  /**
   * Get active counters
   */
  static async getActiveCounters(): Promise<CounterOption[]> {
    const result = await workshiftRepository.getActiveCounters();
    
    if (result.isFailure) {
      throw new Error(result.getError().message);
    }

    return result.getValue();
  }

  /**
   * Get staff list
   */
  static async getStaffList(): Promise<StaffOption[]> {
    const result = await workshiftRepository.getStaffList();
    
    if (result.isFailure) {
      throw new Error(result.getError().message);
    }

    return result.getValue();
  }

  /**
   * Get available staff for assignment
   */
  static async getAvailableStaff(counterId: string, workShiftId: string): Promise<AvailableStaff[]> {
    const result = await workshiftRepository.getAvailableStaff(counterId, workShiftId);
    
    if (result.isFailure) {
      throw new Error(result.getError().message);
    }

    return result.getValue();
  }

  /**
   * Assign staff to work shift
   */
  static async assignStaffWorkShift(data: AssignStaffWorkShiftRequest): Promise<RestResponse<object>> {
    const result = await workshiftRepository.assignStaff(data);
    
    if (result.isFailure) {
      throw new Error(result.getError().message);
    }

    return { data: {}, success: true };
  }

  /**
   * Update staff work shift
   */
  static async updateStaffWorkShift(data: UpdateStaffWorkShiftRequest): Promise<RestResponse<object>> {
    return workshiftApi.updateStaffWorkShift(data);
  }

  /**
   * Get all staff work shifts
   */
  static async getStaffWorkShifts(): Promise<RestPaged<StaffWorkShift>> {
    const result = await workshiftRepository.getStaffWorkShifts();
    
    if (result.isFailure) {
      throw new Error(result.getError().message);
    }

    return result.getValue();
  }

  /**
   * Get staff work shifts by staff ID (for validation)
   */
  static async getStaffWorkShiftsByStaffId(staffId: string): Promise<StaffWorkShift[]> {
    const staffWorkShiftsResult = await workshiftRepository.getStaffWorkShifts();
    
    if (staffWorkShiftsResult.isFailure) {
      return [];
    }

    const allShifts = staffWorkShiftsResult.getValue();
    if (!allShifts?.data?.items) return [];

    const items = allShifts.data.items;
    const itemsArray = (items as { $values?: StaffWorkShift[] }).$values || 
                      (Array.isArray(items) ? items : []);

    return itemsArray.filter(
      (shift) => shift.staffId === staffId && !shift.isDeleted
    );
  }

  /**
   * Delete staff work shift
   */
  static async deleteStaffWorkShift(id: string): Promise<RestResponse<object>> {
    const result = await workshiftRepository.deleteStaffWorkShift(id);
    
    if (result.isFailure) {
      throw new Error(result.getError().message);
    }

    return { data: {}, success: true };
  }
}
