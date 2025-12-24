import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse } from '@/types/rest';
import type { CaseDetailResponse, UpdateCaseRequest, UpdateCaseResponse, UpdateCaseStatusRequest, UpdateCaseStatusResponse, MoveNextStepRequest, MoveNextStepResponse } from '../types/case-search';

export const caseDetailApi = {
  getById: (id: string) => {
    return http.get<RestResponse<CaseDetailResponse>>(`${API_PATH.STAFF.CASE.DETAIL}/${id}`);
  },

  update: (id: string, data: UpdateCaseRequest) => {
    console.log('🔄 Case Update API called with id:', id, 'data:', data);
    return http.put<UpdateCaseResponse>(API_PATH.STAFF.CASE.UPDATE(id), data);
  },

  updateStatus: (id: string, data: UpdateCaseStatusRequest) => {
    console.log('🔄 Case Status Update API called with id:', id, 'data:', data);
    return http.put<UpdateCaseStatusResponse>(API_PATH.STAFF.CASE.UPDATE_STATUS(id), data);
  },

  moveNextStep: (data: MoveNextStepRequest) => {
    console.log('🔄 Move Next Step API called with data:', data);
    return http.post<MoveNextStepResponse>(API_PATH.STAFF.CASE.MOVE_NEXT_STEP, data);
  },
};

