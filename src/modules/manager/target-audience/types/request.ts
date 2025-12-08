/**
 * Request types for TargetAudience API
 */

export type CreateTargetAudienceRequest = {
    name: string;
    isActive: boolean;
    description: string;
};

export type UpdateTargetAudienceRequest = {
    id: string;
    name: string;
    isActive: boolean;
    description: string;
};

export type TargetAudienceFilters = {
    keyword?: string;
    isActive?: boolean;
    page: number;
    size: number;
};

