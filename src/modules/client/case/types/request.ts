export interface CaseProgressRequest {
    caseCode: string;
}

export interface CaseLookupRequest {
    caseCode: string;
}

export interface CaseVerifyOTPRequest {
    caseCode: string;
    otpCode: string;
}

export interface CaseFeedbackRequest {
    caseId: string;
    rating: number;
    comment: string;
    guestName?: string;
    guestPhone?: string;
    isAnonymous: boolean;
}

