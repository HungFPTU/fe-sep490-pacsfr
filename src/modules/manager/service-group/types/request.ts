/**
 * Request types for Service Group API
 */

export type CreateServiceGroupRequest = {
    groupCode?: string;
    groupName: string;
    description: string;
    iconUrl: string;
    displayOrder: number;
    isActive: boolean;
};

export type UpdateServiceGroupRequest = {
    id: string;
    groupCode?: string;
    groupName: string;
    description: string;
    iconUrl: string;
    displayOrder: number;
    isActive: boolean;
};

export type ServiceGroupFilters = {
    keyword?: string;
    isActive?: boolean;
    page: number;
    size: number;
};

