import { caseLookupApi } from '../api/case-lookup.api';

export const caseLookupService = {
  async getCaseById(caseId: string) {
    const response = await caseLookupApi.getCaseById(caseId);
    return response.data;
  },
};
