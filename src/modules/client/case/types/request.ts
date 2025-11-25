export interface CaseProgressRequest {
    caseCode: string;
    captchaToken: string;
}

export interface CaseFeedbackRequest {
    caseId: string;
    rating: number;
    comment: string;
    guestName?: string;
    guestPhone?: string;
    isAnonymous: boolean;
}

