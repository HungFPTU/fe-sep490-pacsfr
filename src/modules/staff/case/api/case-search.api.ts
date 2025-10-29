import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { CaseListResponse, CaseSearchFilters } from '../types/case-search';

export const caseSearchApi = {
  getCaseList: (filters: CaseSearchFilters) => {
    console.log('🔍 Case Search API called with filters:', filters);
    
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });
    
    const queryString = queryParams.toString();
    const url = queryString ? `${API_PATH.STAFF.DASHBOARD.CASE_LIST}?${queryString}` : API_PATH.STAFF.DASHBOARD.CASE_LIST;
    
    console.log('🔍 Final API URL:', url);
    
    return http.get<CaseListResponse>(url);
  },
};
