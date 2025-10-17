// Legal Basis Types
export interface LegalBasis {
    id: string;
    name: string;
    content: string;
    link: string;
    description: string;
    isActive: boolean;
    createdAt: string;
}

export interface LegalBasisDetailResponse {
    $id: string;
    success: boolean;
    message: string;
    data: LegalBasis;
    timestamp: string;
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
