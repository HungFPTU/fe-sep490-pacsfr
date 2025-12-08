/**
 * Response types for TargetAudience API
 */

export type TargetAudience = {
    id: string;
    name: string;
    isActive: boolean;
    description: string;
    createdAt: string | Date;
    createdBy?: string;
    modifiedAt?: string | Date;
    modifiedBy?: string;
    $id?: string;
};

