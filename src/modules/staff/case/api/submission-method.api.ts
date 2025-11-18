import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse } from '@/types/rest';

export interface SubmissionMethod {
  id: string;
  submissionMethodName: string;
  processingTime: string;
  fee: number;
  description: string;
}

export interface SubmissionMethodResponse {
  $id: string;
  size: number;
  page: number;
  total: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: {
    $id: string;
    $values: SubmissionMethod[];
  };
}

export const submissionMethodApi = {
  /**
   * Get all submission methods
   */
  async getAllSubmissionMethods(): Promise<RestResponse<SubmissionMethodResponse>> {
    const response = await http.get<RestResponse<SubmissionMethodResponse>>(
      API_PATH.SUBMISSION_METHOD.GET_ALL
    );
    return response.data;
  },
};
