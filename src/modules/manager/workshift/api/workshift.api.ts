import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestMany, RestPaged } from '@/types/rest';
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

/**
 * Lấy danh sách ca làm việc (không có filter)
 */
export const getWorkShifts = async (): Promise<RestResponse<WorkShift>> => {
  const response = await http.get<RestMany<WorkShift>>('/WorkShift');
  return response.data;
};

export const getWorkShiftDetail = async (id: string): Promise<RestResponse<WorkShift>> => {
  const response = await http.get<RestResponse<WorkShift>>(
    API_PATH.MANAGER.WORKSHIFT.GET_BY_ID(id),
  );
  return response.data;
};

export const createWorkShift = async (
  data: CreateWorkShiftRequest,
): Promise<RestResponse<WorkShift>> => {
  const response = await http.post<RestResponse<WorkShift>>(API_PATH.MANAGER.WORKSHIFT.POST, data);
  return response.data;
};

export const updateWorkShift = async (
  id: string,
  data: UpdateWorkShiftRequest,
): Promise<RestResponse<WorkShift>> => {
  const response = await http.put<RestResponse<WorkShift>>(
    API_PATH.MANAGER.WORKSHIFT.PUT(id),
    data,
  );
  return response.data;
};

export const deleteWorkShift = async (id: string): Promise<RestResponse<object>> => {
  const response = await http.delete<RestResponse<object>>(API_PATH.MANAGER.WORKSHIFT.DELETE(id));
  return response.data;
};

/**
 * Lấy danh sách tất cả quầy đang hoạt động (chỉ lấy id và counterName)
 */
export const getActiveCounters = async (): Promise<CounterOption[]> => {
  const response = await http.get<
    RestMany<{
      id: string;
      counterCode?: string;
      counterName?: string;
      location?: string;
      counterType?: string;
      maxCapacity?: number;
      isActive?: boolean;
      staffId?: string;
      staffName?: string;
      serviceGroups?: { $id?: string; $values?: Array<{ id: string; groupName: string; currentLength?: number; status?: string }> };
      [key: string]: unknown;
    }>
  >(API_PATH.MANAGER.WORKSHIFT.GET_ACTIVE_COUNTERS);
  const data = response.data;
  if (!data?.success || !data.data) return [];

  const extractValues = (payload: unknown): Array<Record<string, unknown>> => {
    if (Array.isArray(payload)) return payload;
    if (payload && typeof payload === 'object') {
      if ('$values' in (payload as { $values?: unknown[] })) {
        return ((payload as { $values?: unknown[] }).$values ?? []) as Array<Record<string, unknown>>;
      }
      if ('items' in (payload as { items?: unknown })) {
        const items = (payload as { items?: unknown }).items;
        if (Array.isArray(items)) return items as Array<Record<string, unknown>>;
        if (items && typeof items === 'object' && '$values' in (items as { $values?: unknown[] })) {
          return ((items as { $values?: unknown[] }).$values ?? []) as Array<Record<string, unknown>>;
        }
      }
    }
    return [];
  };

  const values = extractValues(data.data);

  return values.map((item) => {
    const serviceGroupsRaw = item.serviceGroups as { $id?: string; $values?: Array<Record<string, unknown>> } | undefined;
    const serviceGroupValues = serviceGroupsRaw?.$values ?? [];

    return {
      id: String(item.id),
      counterCode: item.counterCode as string | undefined,
      counterName: (item.counterName as string) || '',
      location: item.location as string | undefined,
      counterType: item.counterType as string | undefined,
      maxCapacity: typeof item.maxCapacity === 'number' ? (item.maxCapacity as number) : undefined,
      isActive: Boolean(item.isActive ?? true),
      staffId: item.staffId as string | undefined,
      staffName: item.staffName as string | undefined,
      serviceGroups: {
        $id: serviceGroupsRaw?.$id,
        $values: serviceGroupValues.map((group) => {
          const groupId =
            (group.id as string | undefined) ??
            ((group as { serviceGroupId?: string }).serviceGroupId ?? '');
          return {
            id: groupId,
            groupName: (group.groupName as string) || '',
            currentLength: typeof group.currentLength === 'number' ? (group.currentLength as number) : 0,
            status: (group.status as string) || '',
          };
        }),
      },
    };
  });
};

/**
 * Lấy danh sách tất cả nhân viên (chỉ lấy id và fullName)
 */
export const getStaffList = async (): Promise<StaffOption[]> => {
  const response = await http.get<RestMany<{ id: string; fullName: string; [key: string]: unknown }>>(
    API_PATH.MANAGER.WORKSHIFT.GET_STAFF_LIST,
  );
  const data = response.data;
  if (!data?.success || !data.data) return [];
  
  // Extract $values array
  const values = (data.data as { $values?: Array<{ id: string; fullName: string }> }).$values || [];
  
  // Map to only id and fullName
  return values.map((item) => ({
    id: item.id,
    fullName: item.fullName || '',
  }));
};

/**
 * Phân công nhân viên vào ca làm việc
 */
export const assignStaffWorkShift = async (
  data: AssignStaffWorkShiftRequest,
): Promise<RestResponse<object>> => {
  const response = await http.post<RestResponse<object>>(
    API_PATH.MANAGER.WORKSHIFT.ASSIGN_STAFF,
    data,
  );
  return response.data;
};

/**
 * Lấy danh sách tất cả phân công nhân viên vào ca làm việc (không có filter)
 */
export const getStaffWorkShifts = async (): Promise<RestPaged<StaffWorkShift>> => {
  const response = await http.get<RestPaged<StaffWorkShift>>(
    API_PATH.MANAGER.WORKSHIFT.GET_STAFF_WORKSHIFTS,
  );
  return response.data;
};

/**
 * Xóa phân công nhân viên khỏi ca làm việc
 */
export const deleteStaffWorkShift = async (id: string): Promise<RestResponse<object>> => {
  const response = await http.delete<RestResponse<object>>(
    API_PATH.MANAGER.WORKSHIFT.DELETE_STAFF_WORKSHIFT(id),
  );
  return response.data;
};

/**
 * Lấy danh sách nhân sự phù hợp để phân công cho quầy & ca làm việc
 */
export const getAvailableStaff = async (
  counterId: string,
  workShiftId: string,
): Promise<AvailableStaff[]> => {
  const query = new URLSearchParams({
    counterId,
    workShiftId,
  }).toString();

  const response = await http.get<
    RestMany<{
      staffId: string;
      staffCode: string;
      fullName: string;
      email: string;
      phone: string;
      position: string;
      avatarUrl?: string;
      serviceGroups?: { $id?: string; $values?: Array<Record<string, unknown>> };
      isAssignedToOtherCounter: boolean;
    }>
  >(`${API_PATH.MANAGER.WORKSHIFT.GET_AVAILABLE_STAFF}?${query}`);
  const data = response.data;
  if (!data?.success || !data.data) return [];

  const extractValues = (payload: unknown): Array<Record<string, unknown>> => {
    if (Array.isArray(payload)) return payload;
    if (payload && typeof payload === 'object') {
      if ('$values' in (payload as { $values?: unknown[] })) {
        return ((payload as { $values?: unknown[] }).$values ?? []) as Array<Record<string, unknown>>;
      }
      if ('items' in (payload as { items?: unknown })) {
        const items = (payload as { items?: unknown }).items;
        if (Array.isArray(items)) return items as Array<Record<string, unknown>>;
        if (items && typeof items === 'object' && '$values' in (items as { $values?: unknown[] })) {
          return ((items as { $values?: unknown[] }).$values ?? []) as Array<Record<string, unknown>>;
        }
      }
    }
    return [];
  };

  const values = extractValues(data.data);

  return values.map((item) => {
    const serviceGroupsRaw = item.serviceGroups as { $id?: string; $values?: Array<Record<string, unknown>> } | undefined;
    const serviceGroupValues = serviceGroupsRaw?.$values ?? [];

    return {
      staffId: String(item.staffId),
      staffCode: (item.staffCode as string) || '',
      fullName: (item.fullName as string) || '',
      email: (item.email as string) || '',
      phone: (item.phone as string) || '',
      position: (item.position as string) || '',
      avatarUrl: item.avatarUrl as string | undefined,
      isAssignedToOtherCounter: Boolean(item.isAssignedToOtherCounter),
      serviceGroups: {
        $id: serviceGroupsRaw?.$id,
        $values: serviceGroupValues.map((group) => ({
          serviceGroupId: String(
            (group.serviceGroupId as string | undefined) ?? (group.id as string | undefined) ?? '',
          ),
          groupCode: (group.groupCode as string) || '',
          groupName: (group.groupName as string) || '',
          proficiencyLevel: group.proficiencyLevel as string | undefined,
        })),
      },
    };
  });
};
