/**
 * Request types for SubmissionMethod API
 */

export type CreateSubmissionMethodRequest = {
    submissionMethodName: string;
    description?: string;
};

export type UpdateSubmissionMethodRequest = {
    id: string;
    submissionMethodName: string;
    description?: string;
};

export type SubmissionMethodFilters = {
    keyword?: string;
    isActive?: boolean;
    page: number;
    size: number;
};

export type AssignSubmissionMethodsRequest = {
    serviceId: string;
    methods: Array<{
        submissionMethodId: string;
        fee: number;
        processingTime: string; // Number of days as string (e.g., "02", "30")
    }>;
};

