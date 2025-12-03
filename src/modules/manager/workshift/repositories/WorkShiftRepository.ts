/**
 * Repository interface for WorkShift data access
 * Abstracts data fetching and provides a clean API
 */

import { workshiftApi } from '../api/workshift.api';
import type {
  WorkShift,
  CreateWorkShiftRequest,
  UpdateWorkShiftRequest,
  AssignStaffWorkShiftRequest,
  WorkShiftFilters,
  StaffWorkShift,
  AvailableStaff,
  CounterOption,
  StaffOption,
} from '../types';
import type { RestPaged, RestResponse } from '@/types/rest';
import { Result, type AsyncResult } from '../types/Result';

/**
 * Error handler for API calls
 */
class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class WorkShiftRepository {
  /**
   * Fetch all work shifts with optional filters
   */
  async findAll(filters: WorkShiftFilters = {}): AsyncResult<RestPaged<WorkShift>> {
    try {
      const data = await workshiftApi.getAll(filters);
      return Result.ok(data);
    } catch (error) {
      return Result.fail(this.handleError(error, 'Failed to fetch work shifts'));
    }
  }

  /**
   * Fetch a single work shift by ID
   */
  async findById(id: string): AsyncResult<WorkShift> {
    try {
      const response = await workshiftApi.getById(id);
      if (!response.data) {
        throw new ApiError('Work shift not found', 404);
      }
      return Result.ok(response.data as WorkShift);
    } catch (error) {
      return Result.fail(this.handleError(error, 'Failed to fetch work shift'));
    }
  }

  /**
   * Create a new work shift
   */
  async create(data: CreateWorkShiftRequest): AsyncResult<WorkShift> {
    try {
      const response = await workshiftApi.create(data);
      if (!response.data) {
        throw new ApiError('Failed to create work shift');
      }
      return Result.ok(response.data as WorkShift);
    } catch (error) {
      return Result.fail(this.handleError(error, 'Failed to create work shift'));
    }
  }

  /**
   * Update an existing work shift
   */
  async update(id: string, data: UpdateWorkShiftRequest): AsyncResult<WorkShift> {
    try {
      const response = await workshiftApi.update(id, data);
      if (!response.data) {
        throw new ApiError('Failed to update work shift');
      }
      return Result.ok(response.data as WorkShift);
    } catch (error) {
      return Result.fail(this.handleError(error, 'Failed to update work shift'));
    }
  }

  /**
   * Delete a work shift
   */
  async delete(id: string): AsyncResult<void> {
    try {
      await workshiftApi.delete(id);
      return Result.ok(undefined);
    } catch (error) {
      return Result.fail(this.handleError(error, 'Failed to delete work shift'));
    }
  }

  /**
   * Get active counters
   */
  async getActiveCounters(): AsyncResult<CounterOption[]> {
    try {
      const data = await workshiftApi.getActiveCounters();
      return Result.ok(data);
    } catch (error) {
      return Result.fail(this.handleError(error, 'Failed to fetch counters'));
    }
  }

  /**
   * Get staff list
   */
  async getStaffList(): AsyncResult<StaffOption[]> {
    try {
      const data = await workshiftApi.getStaffList();
      return Result.ok(data);
    } catch (error) {
      return Result.fail(this.handleError(error, 'Failed to fetch staff'));
    }
  }

  /**
   * Get available staff for assignment
   */
  async getAvailableStaff(counterId: string, workShiftId: string): AsyncResult<AvailableStaff[]> {
    try {
      const data = await workshiftApi.getAvailableStaff(counterId, workShiftId);
      return Result.ok(data);
    } catch (error) {
      return Result.fail(this.handleError(error, 'Failed to fetch available staff'));
    }
  }

  /**
   * Assign staff to work shift
   */
  async assignStaff(data: AssignStaffWorkShiftRequest): AsyncResult<void> {
    try {
      await workshiftApi.assignStaffWorkShift(data);
      return Result.ok(undefined);
    } catch (error) {
      return Result.fail(this.handleError(error, 'Failed to assign staff'));
    }
  }

  /**
   * Get all staff work shifts
   */
  async getStaffWorkShifts(): AsyncResult<RestPaged<StaffWorkShift>> {
    try {
      const data = await workshiftApi.getStaffWorkShifts();
      return Result.ok(data);
    } catch (error) {
      return Result.fail(this.handleError(error, 'Failed to fetch staff work shifts'));
    }
  }

  /**
   * Delete staff work shift
   */
  async deleteStaffWorkShift(id: string): AsyncResult<void> {
    try {
      await workshiftApi.deleteStaffWorkShift(id);
      return Result.ok(undefined);
    } catch (error) {
      return Result.fail(this.handleError(error, 'Failed to delete staff assignment'));
    }
  }

  /**
   * Handle and normalize errors from API
   */
  private handleError(error: unknown, defaultMessage: string): ApiError {
    if (error instanceof ApiError) {
      return error;
    }

    if (error instanceof Error) {
      return new ApiError(error.message || defaultMessage);
    }

    if (typeof error === 'object' && error !== null) {
      const err = error as any;
      return new ApiError(
        err.message || defaultMessage,
        err.statusCode || err.status,
        err
      );
    }

    return new ApiError(defaultMessage);
  }
}

// Export singleton instance
export const workshiftRepository = new WorkShiftRepository();
