import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestPaged } from '@/types/rest';
import type { PaknResponse } from '../types';

export const paknResponseApi = {
  getByCode: (paknCode: string) => {
    return http.get<RestPaged<PaknResponse>>(
      API_PATH.MANAGER.PAKN.RESPONSE.GET_BY_CODE(paknCode)
    );
  },
};

