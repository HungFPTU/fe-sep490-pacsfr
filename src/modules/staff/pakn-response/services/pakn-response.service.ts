import type { RestPaged, RestResponse } from '@/types/rest';
import { paknResponseApi } from '../api/pakn-response.api';
import type { PaknResponse, CreatePaknResponseRequest, PaknResponseFilters } from '../types';

export const paknResponseService = {
  async createResponse(payload: CreatePaknResponseRequest): Promise<PaknResponse> {
    const response = await paknResponseApi.create(payload);
    if (!response.data?.success || !response.data?.data) {
      throw new Error('Không thể tạo phản hồi');
    }
    return response.data.data as PaknResponse;
  },

  async getResponses(filters: PaknResponseFilters): Promise<RestPaged<PaknResponse>> {
    const response = await paknResponseApi.getList(filters);
    return response.data;
  },

  async getResponseById(id: string): Promise<PaknResponse | null> {
    const response = await paknResponseApi.getById(id);
    if (!response.data?.success || !response.data?.data) {
      return null;
    }
    return response.data.data as PaknResponse;
  },
};

