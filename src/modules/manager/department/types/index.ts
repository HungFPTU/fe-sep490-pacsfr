// Main Department entity type
export type Department = {
    id: string;
    serviceGroupId: string;  // FK to ServiceGroup
    code: string;
    name: string;
    description: string;
    levelOrder: number;
    isActive: boolean;
    createdAt: string | Date;
    modifiedAt?: string | Date;
    $id?: string;

    // Populated fields (optional)
    serviceGroupName?: string;
};

// Request types
export type CreateDepartmentRequest = {
    serviceGroupId: string;
    code: string;
    name: string;
    description: string;
    levelOrder: number;
    isActive: boolean;
};

export type UpdateDepartmentRequest = {
    id: string;
    serviceGroupId: string;
    code: string;
    name: string;
    description: string;
    levelOrder: number;
    isActive: boolean;
};

// Filter types
export type DepartmentFilters = {
    keyword?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
};

