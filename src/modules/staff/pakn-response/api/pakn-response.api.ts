import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestPaged } from '@/types/rest';
import type { PaknResponse, CreatePaknResponseRequest, PaknResponseFilters } from '../types';

const toFormData = (payload: CreatePaknResponseRequest): FormData => {
  const formData = new FormData();
  formData.append('PAKNId', payload.paknId);
  formData.append('ResponseContent', payload.responseContent);
  
  if (payload.attachments && payload.attachments.length > 0) {
    payload.attachments.forEach((file) => {
      formData.append('Attachments', file);
    });
  }
  
  return formData;
};

export const paknResponseApi = {
  create: (payload: CreatePaknResponseRequest) => {
    const formData = toFormData(payload);
    return http.post<RestResponse<PaknResponse>>(
      API_PATH.MANAGER.PAKN.RESPONSE.POST,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  },

  getList: (filters: PaknResponseFilters) => {
    return http.get<RestPaged<PaknResponse>>(
      API_PATH.MANAGER.PAKN.RESPONSE.GET_LIST(filters.paknId, filters.page, filters.size)
    );
  },

  getById: (id: string) => {
    return http.get<RestResponse<PaknResponse>>(
      API_PATH.MANAGER.PAKN.RESPONSE.GET_BY_ID(id)
    );
  },
};

