import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { CaseLookupResponse } from '../types/case-search';

export const caseLookupApi = {
  getCaseById: (caseId: string) => {
    console.log('🔍 Case Lookup API called with caseId:', caseId);
    return http.get<CaseLookupResponse>(
      API_PATH.STAFF.DASHBOARD.CASE_LOOKUP(caseId)
    );
  },
};
