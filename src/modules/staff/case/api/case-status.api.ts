import { http } from "@core/http/client";
import { API_PATH } from "@/core/config/api.path";

export interface CaseStatusItem {
    $id?: string;
    id: string;
    name: string;
    code: string;
    isActive: boolean;
}

export interface CaseStatusResponse {
    $id?: string;
    success: boolean;
    message?: string;
    data?: {
        $id?: string;
        $values?: CaseStatusItem[];
    };
}

export const caseStatusApi = {
    async getCaseStatuses() {
        const response = await http.get<CaseStatusResponse>(API_PATH.CASE_STATUS.GET_ALL);
        return response.data;
    },
};
