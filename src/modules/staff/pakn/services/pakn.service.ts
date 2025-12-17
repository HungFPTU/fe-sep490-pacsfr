import type { RestPaged, RestResponse } from '@/types/rest';
import { paknApi } from '../api/pakn.api';
import type { Pakn, PaknFilters } from '../types';

export const paknService = {
  async getPaknList(filters: PaknFilters): Promise<RestPaged<Pakn>> {
    const response = await paknApi.getList(filters);
    return response.data;
  },

  async getPaknById(id: string): Promise<Pakn | null> {
    const response = await paknApi.getById(id);
    if (!response.data?.success || !response.data?.data) {
      return null;
    }
    return response.data.data as Pakn;
  },

  async updateStatus(paknId: string, newStatus: string, note: string): Promise<RestResponse<any>> {
    const response = await paknApi.updateStatus(paknId, newStatus, note);
    return response.data;
  },
};

