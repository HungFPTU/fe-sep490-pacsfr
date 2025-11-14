/**
 * Service Group Types for Service Module
 * Extended types for service group with classification
 */

export type ServiceGroup = {
    id: string;
    groupCode: string;
    groupName: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    createdBy?: string;
    $id?: string;
};

export type ServiceGroupWithType = ServiceGroup & {
    serviceType?: 'Công dân' | 'Doanh nghiệp' | 'both';
    serviceCount?: number;
};

