/**
 * Response types for SubmissionMethod API
 */

export type SubmissionMethod = {
    id: string;
    submissionMethodName: string;
    processingTime: string | Date;
    fee: number;
    description?: string;
    isActive: boolean;
    createdAt?: string | Date;
    createdBy?: string;
    modifiedAt?: string | Date;
    modifiedBy?: string;
    $id?: string;
};

export type CreateSubmissionMethodResponse = {
    id: string;
    submissionMethodName: string;
    processingTime: string;
    fee: number;
    description?: string;
    isActive: boolean;
};

export type AssignSubmissionMethodsResponse = {
    success: boolean;
    message: string;
};

