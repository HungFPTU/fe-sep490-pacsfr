import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse } from '@/types/rest';
import type { CaseDetailResponse } from '../types/case-search';

export const caseDetailApi = {
  getById: (id: string) => {
    return http.get<RestResponse<CaseDetailResponse>>(`${API_PATH.STAFF.CASE.DETAIL}/${id}`);
  },
};

