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
}

export type CreateServiceGroupRequest = {
    groupCode: string;
    groupName: string;
    description: string;
    iconUrl?: string; // Made optional for backend integration
    displayOrder: number;
    isActive: boolean;
}

export type UpdateServiceGroupRequest = {
    id: string;
    groupCode: string;
    groupName: string;
    description: string;
    iconUrl?: string; // Made optional for backend integration
    iconFile?: File; // Added for file upload
    displayOrder: number;
    isActive: boolean;
}

export type ServiceGroupFilters = {
    keyword?: string;
    isActive?: boolean;
    page: number;
    size: number;
}

