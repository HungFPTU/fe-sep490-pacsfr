import { caseDetailApi } from '../api/case-detail.api';

export const caseDetailService = {
  async getCaseById(id: string) {
    try {
      const response = await caseDetailApi.getById(id);
      return response.data;
    } catch (error) {
      console.error('Error fetching case detail:', error);
      throw error;
    }
  },
};

