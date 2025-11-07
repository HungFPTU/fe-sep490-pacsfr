/**
 * Response types for Service Group API
 */

export type ServiceGroup = {
    id: string;
    groupCode: string;
    groupName: string;
    description: string;
    iconUrl: string;
    displayOrder: number;
    isActive: boolean;
    createdAt: string | Date;
    modifiedAt?: string | Date;
    $id?: string;
};

