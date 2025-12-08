import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestPaged } from '@/types/rest';
import type {
  ShiftSwapRequest,
  CreateShiftSwapRequest,
  RespondShiftSwapRequest,
  ApproveShiftSwapRequest,
} from '../types';

export const shiftSwapApi = {
  create: (data: CreateShiftSwapRequest) => {
    return http.post<RestResponse<ShiftSwapRequest>>(
      API_PATH.MANAGER.SHIFT_SWAP.CREATE,
      data
    );
  },

  getMyRequests: (status?: number) => {
    return http.get<RestPaged<ShiftSwapRequest>>(
      API_PATH.MANAGER.SHIFT_SWAP.GET_MY_REQUESTS(status)
    );
  },

  getList: (status?: number, page?: number, size?: number) => {
    return http.get<RestPaged<ShiftSwapRequest>>(
      API_PATH.MANAGER.SHIFT_SWAP.GET_LIST(status, page, size)
    );
  },

  getById: (id: string) => {
    return http.get<RestResponse<ShiftSwapRequest>>(
      API_PATH.MANAGER.SHIFT_SWAP.GET_BY_ID(id)
    );
  },

  respond: (id: string, data: RespondShiftSwapRequest) => {
    return http.post<RestResponse<ShiftSwapRequest>>(
      API_PATH.MANAGER.SHIFT_SWAP.RESPOND(id),
      data
    );
  },

  approve: (id: string, data: ApproveShiftSwapRequest) => {
    return http.post<RestResponse<ShiftSwapRequest>>(
      API_PATH.MANAGER.SHIFT_SWAP.APPROVE(id),
      data
    );
  },

  cancel: (id: string) => {
    return http.post<RestResponse<{ success: boolean }>>(
      API_PATH.MANAGER.SHIFT_SWAP.CANCEL(id),
      {}
    );
  },
};

