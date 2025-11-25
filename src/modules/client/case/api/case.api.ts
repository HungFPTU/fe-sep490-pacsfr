import { http } from "@core/http/client";
import { API_PATH } from "@core/config/api.path";
import type { CaseProgressApiResponse, CaseFeedback } from "../types";
import type { CaseProgressRequest, CaseFeedbackRequest } from "../types";

export const caseClientApi = {
    progress: (payload: CaseProgressRequest) => {
        console.log("[CaseAPI] Calling progress endpoint:", API_PATH.CLIENT.CASE.PROGRESS);
        console.log("[CaseAPI] Payload:", {
            caseCode: payload.caseCode,
            captchaTokenLength: payload.captchaToken?.length || 0,
            captchaTokenPrefix: payload.captchaToken?.substring(0, 20) + "...",
        });

        return http.post<CaseProgressApiResponse>(API_PATH.CLIENT.CASE.PROGRESS, payload, {
            auth: false,
        });
    },
    feedback: (payload: CaseFeedbackRequest) => {
        return http.post(API_PATH.CLIENT.FEEDBACK.SUBMIT, payload, {
            auth: false,
        });
    },
    getFeedbackByCase: (caseId: string) => {
        return http.get<{ success?: boolean; message?: string; data?: CaseFeedback }>(
            API_PATH.CLIENT.FEEDBACK.BY_CASE(caseId),
            {
                auth: false,
            },
        );
    },
};

