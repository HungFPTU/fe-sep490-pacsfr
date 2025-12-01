import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestPaged } from '@/types/rest';
import type { Pakn, PaknFilters } from '../types';

export const paknApi = {
  getList: (filters: PaknFilters) => {
    return http.get<RestPaged<Pakn>>(
      API_PATH.MANAGER.PAKN.GET_ALL(
        filters.keyword,
        filters.status,
        filters.categoryId,
        filters.page,
        filters.size
      )
    );
  },

  getById: (id: string) => {
    return http.get<RestResponse<Pakn>>(
      API_PATH.MANAGER.PAKN.GET_BY_ID(id)
    );
  },

  assignStaff: (paknId: string, staffId: string) => {
    return http.post<RestResponse<any>>(API_PATH.MANAGER.PAKN.ASSIGN_STAFF, {
      paknId,
      staffId,
    });
  },

  updateStatus: (paknId: string, newStatus: string, note: string) => {
    return http.post<RestResponse<any>>(API_PATH.MANAGER.PAKN.UPDATE_STATUS, {
      paknId,
      newStatus,
      note,
    });
  },
};
