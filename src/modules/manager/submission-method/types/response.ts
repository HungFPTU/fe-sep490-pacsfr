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

