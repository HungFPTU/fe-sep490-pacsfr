import { http } from "@core/http/client";
import { API_PATH } from "@core/config/api.path";
import type { CaseProgressApiResponse, CaseFeedback } from "../types";
import type { CaseProgressRequest, CaseLookupRequest, CaseFeedbackRequest } from "../types";

export const caseClientApi = {
    lookup: (payload: CaseProgressRequest) => {
        console.log("[CaseAPI] Calling lookup endpoint:", API_PATH.CLIENT.CASE.LOOKUP);
        console.log("[CaseAPI] Payload:", { caseCode: payload.caseCode });

        return http.post<CaseProgressApiResponse>(API_PATH.CLIENT.CASE.LOOKUP, payload, {
            auth: false,
        });
    },
    verifyOTP: (payload: { caseCode: string; otpCode: string }) => {
        console.log("[CaseAPI] Calling verify endpoint:", API_PATH.CLIENT.CASE.VERIFY);
        console.log("[CaseAPI] Payload:", { caseCode: payload.caseCode });

        return http.post<CaseProgressApiResponse>(API_PATH.CLIENT.CASE.VERIFY, payload, {
            auth: false,
        });
    },
    resendOTP: (payload: { caseCode: string }) => {
        console.log("[CaseAPI] Calling resend OTP endpoint:", API_PATH.CLIENT.CASE.RESEND_OTP);
        console.log("[CaseAPI] Payload:", { caseCode: payload.caseCode });

        return http.post<CaseProgressApiResponse>(API_PATH.CLIENT.CASE.RESEND_OTP, payload, {
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
    feedback(payload: CaseFeedbackRequest) {
        return http.post<{ success: boolean; message?: string; data?: any }>(
            API_PATH.CLIENT.FEEDBACK.SUBMIT,
            payload,
            {
                auth: false,
            },
        );
    }
};

