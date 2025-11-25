import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse } from '@/types/rest';

export interface ServiceItem {
  id: string;
  serviceCode: string;
  serviceName: string;
  description?: string;
  isActive: boolean;
}

export interface ServiceResponse {
  $id?: string;
  success: boolean;
  message?: string;
  data?: {
    $id?: string;
    size?: number;
    page?: number;
    total?: number;
    items?: {
      $id?: string;
      $values?: ServiceItem[];
    };
    $values?: ServiceItem[];
  };
}

export const serviceApi = {
  async getServices() {
    const response = await http.get<ServiceResponse>(`${API_PATH.CLIENT.SERVICES.ALL}?Page=1&Size=1000`);
    return response.data;
  },
};
