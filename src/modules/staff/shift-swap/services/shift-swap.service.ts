import type { RestPaged } from '@/types/rest';
import { shiftSwapApi } from '../api/shift-swap.api';
import { http } from '@/core/http/client';
import { API_PATH } from '@/core/config/api.path';
import { useAuthStore } from '@/modules/auth/stores/useAuthStore';
import type {
  ShiftSwapRequest,
  CreateShiftSwapRequest,
  RespondShiftSwapRequest,
  ApproveShiftSwapRequest,
  StaffWithShifts,
} from '../types';

export const shiftSwapService = {
  async createRequest(data: CreateShiftSwapRequest): Promise<ShiftSwapRequest> {
    const response = await shiftSwapApi.create(data);
    const result = response.data.data as ShiftSwapRequest;
    return result;
  },

  async getMyRequests(status?: number): Promise<RestPaged<ShiftSwapRequest>> {
    const response = await shiftSwapApi.getMyRequests(status);
    return response.data as RestPaged<ShiftSwapRequest>;
  },

  async getList(status?: number, page = 1, size = 10): Promise<RestPaged<ShiftSwapRequest>> {
    const response = await shiftSwapApi.getList(status, page, size);
    return response.data as RestPaged<ShiftSwapRequest>;
  },

  async getById(id: string): Promise<ShiftSwapRequest | null> {
    const response = await shiftSwapApi.getById(id);
    const result = response.data.data as ShiftSwapRequest | undefined;
    return result || null;
  },

  async respondToRequest(
    id: string,
    data: RespondShiftSwapRequest
  ): Promise<ShiftSwapRequest> {
    const response = await shiftSwapApi.respond(id, data);
    return response.data.data as ShiftSwapRequest;
  },

  async approveRequest(
    id: string,
    data: ApproveShiftSwapRequest
  ): Promise<ShiftSwapRequest> {
    const response = await shiftSwapApi.approve(id, data);
    return response.data.data as ShiftSwapRequest;
  },

  async cancelRequest(id: string): Promise<void> {
    await shiftSwapApi.cancel(id);
  },

  // Fetch current staff's work shifts
  async getMyWorkShifts(): Promise<Array<{
    id: string;
    staffId: string;
    shiftDate: string;
    shiftType: string;
    startTime: string;
    endTime: string;
    counterName?: string;
  }>> {
    try {
      const response = await http.get<any>(
        API_PATH.STAFF.STAFF_WORKSHIFT.MY
      );
      const items = response.data?.data?.$values || response.data?.data || [];
      if (!Array.isArray(items)) {
        return [];
      }

      // Map directly from response - API already includes shiftType, startTime, endTime
      return items.map((item: any) => ({
        id: item.id,
        staffId: item.staffId,
        shiftDate: item.workDate,
        shiftType: item.shiftType || 'Unknown',
        startTime: item.startTime || '08:00',
        endTime: item.endTime || '17:00',
        counterName: item.counterName,
      }));
    } catch (error) {
      console.error('Error fetching my work shifts:', error);
      return [];
    }
  },

  // Fetch available staff with their work shifts for a specific workshift
  async getAvailableStaffWithShifts(workShiftId?: string): Promise<StaffWithShifts[]> {
    try {
      // Get current user ID from auth store
      const currentUser = useAuthStore.getState().user;
      const currentStaffId = currentUser?.id || '';

      // First get current user's workshift if not provided
      let targetWorkShiftId = workShiftId;
      if (!targetWorkShiftId) {
        const myShiftsResponse = await http.get<any>(
          API_PATH.STAFF.STAFF_WORKSHIFT.MY
        );
        const myShifts = myShiftsResponse.data?.data?.$values || myShiftsResponse.data?.data || [];
        if (myShifts.length === 0) {
          return [];
        }
        // Use first workshift
        targetWorkShiftId = myShifts[0].workShiftId;
      }

      // Fetch all staff members for this specific workshift
      const shiftsResponse = await http.get<any>(
        `/StaffWorkShift?WorkShiftId=${targetWorkShiftId}`
      );
      const shiftItems = shiftsResponse.data?.data?.items?.$values || shiftsResponse.data?.data?.$values || [];
      
      if (!Array.isArray(shiftItems)) {
        return [];
      }

      // Group shifts by staff, excluding current user
      const staffMap = new Map<string, any>();
      shiftItems.forEach((item: any) => {
        // Skip current user
        if (currentStaffId && item.staffId === currentStaffId) {
          return;
        }

        if (!staffMap.has(item.staffId)) {
          staffMap.set(item.staffId, {
            id: item.staffId,
            name: item.staffName,
            code: item.code || `STAFF_${item.staffId.substring(0, 8)}`,
            shifts: [],
          });
        }
        
        const staff = staffMap.get(item.staffId);
        staff.shifts.push({
          id: item.id,
          staffId: item.staffId,
          shiftDate: item.workDate,
          shiftType: item.shiftType || 'Unknown',
          startTime: item.startTime || '08:00',
          endTime: item.endTime || '17:00',
          counterName: item.counterName,
        });
      });

      return Array.from(staffMap.values());
    } catch (error) {
      console.error('Error fetching available staff with shifts:', error);
      return [];
    }
  },
};
