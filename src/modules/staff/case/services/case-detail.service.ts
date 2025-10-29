import { caseDetailApi } from '../api/case-detail.api';
import type { UpdateCaseRequest, UpdateCaseStatusRequest } from '../types/case-search';

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

  async updateCase(id: string, data: UpdateCaseRequest) {
    try {
      const response = await caseDetailApi.update(id, data);
      return response.data;
    } catch (error) {
      console.error('Error updating case:', error);
      throw error;
    }
  },

  async updateCaseStatus(id: string, data: UpdateCaseStatusRequest) {
    try {
      const response = await caseDetailApi.updateStatus(id, data);
      return response.data;
    } catch (error) {
      console.error('Error updating case status:', error);
      throw error;
    }
  },
};

