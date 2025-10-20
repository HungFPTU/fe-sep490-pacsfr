// Service Group Types
export interface ServiceGroup {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt?: string;
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

export interface ServiceGroupDetailResponse {
    $id: string;
    success: boolean;
    message: string;
    data: ServiceGroup;
    timestamp: string;
}

// Search and Filter Types
export interface ServiceGroupSearchParams {
    keyword?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
}

export interface ServiceGroupFilters {
    keyword: string;
    isActive: boolean | null;
    page: number;
    size: number;
}
