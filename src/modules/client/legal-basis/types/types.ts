// Legal Basis Types
export interface LegalBasis {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt?: string;
}

export interface LegalBasisListResponse {
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
            $values: LegalBasis[];
        };
    };
    timestamp: string;
}

export interface LegalBasisDetailResponse {
    $id: string;
    success: boolean;
    message: string;
    data: LegalBasis;
    timestamp: string;
}

// Search and Filter Types
export interface LegalBasisSearchParams {
    keyword?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
}

export interface LegalBasisFilters {
    keyword: string;
    isActive: boolean | null;
    page: number;
    size: number;
}
