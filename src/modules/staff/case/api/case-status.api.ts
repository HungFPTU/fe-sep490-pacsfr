import { http } from "@core/http/client";
import { API_PATH } from "@core/config/api.path";
import type { CaseStatusResponse } from "../constants/case-statuses";

export const caseStatusApi = {
  /**
   * Get all case statuses
   */
  async getAllStatuses(): Promise<CaseStatusResponse> {
    console.log("[CaseStatusAPI] Fetching case statuses");

    const response = await http.get<CaseStatusResponse>(API_PATH.CASE_STATUS.GET_ALL);

    console.log("[CaseStatusAPI] Response:", response.data);

    return response.data;
  }
};
