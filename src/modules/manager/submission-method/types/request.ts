/**
 * Request types for SubmissionMethod API
 */

export type CreateSubmissionMethodRequest = {
    submissionMethodName: string;
    processingTime: string; // ISO 8601 date string
    fee: number;
    description?: string;
};

export type UpdateSubmissionMethodRequest = {
    id: string;
    submissionMethodName: string;
    processingTime: string; // ISO 8601 date string
    fee: number;
    description?: string;
};

export type SubmissionMethodFilters = {
    keyword?: string;
    isActive?: boolean;
    page: number;
    size: number;
};

