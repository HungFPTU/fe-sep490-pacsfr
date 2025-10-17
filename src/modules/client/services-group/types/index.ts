// Service Group Types
export interface ServiceGroup {
    id: string;
    groupCode: string;
    departmentId: string;
    groupName: string;
    description: string;
    isActive: boolean;
    createdAt: string;
}

export interface ServiceGroupDetailResponse {
    $id: string;
    success: boolean;
    message: string;
    data: ServiceGroup;
    timestamp: string;
}

export interface ServiceGroupListResponse {
    $id: string;
    success: boolean;
    message: string;
    data: {
        $id: string;
        size: number;
        page: number;
        total: number;
        totalPages: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        items: {
            $id: string;
            $values: ServiceGroup[];
        };
    };
    timestamp: string;
}
