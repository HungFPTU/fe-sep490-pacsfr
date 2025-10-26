import { caseSearchApi } from '../api/case-search.api';
import type { CaseSearchFilters } from '../types/case-search';

export const caseSearchService = {
  async getCaseList(filters: CaseSearchFilters) {
    const response = await caseSearchApi.getCaseList(filters);
    return response.data;
  },
};
