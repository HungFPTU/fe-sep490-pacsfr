// Main Legal Document entity type
export type LegalDocument = {
    id: string;
    documentNumber: string;
    documentType: string;
    name: string;
    issueDate: string | Date;
    issueBody: string;
    effectiveDate: string | Date;
    status: string;
    isActive: boolean;
    createdAt: string | Date;
    modifiedAt?: string | Date;
    $id?: string;

    // File related fields
    fileName?: string;
    fileUrl?: string;
    fileSize?: number;
    fileType?: string;
};

// Request types
export type CreateLegalDocumentRequest = {
    documentNumber: string;
    documentType: string;
    name: string;
    issueDate: string | Date;
    issueBody: string;
    effectiveDate: string | Date;
    status: string;
    isActive: boolean;
    file?: File;
};

export type UpdateLegalDocumentRequest = {
    id: string;
    documentNumber: string;
    documentType: string;
    name: string;
    issueDate: string | Date;
    issueBody: string;
    effectiveDate: string | Date;
    status: string;
    isActive: boolean;
    file?: File;
};

// Filter types
export type LegalDocumentFilters = {
    keyword?: string;
    documentType?: string;
    status?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
};

// Form validation types
export type LegalDocumentFormData = {
    documentNumber: string;
    documentType: string;
    name: string;
    issueDate: string;
    issueBody: string;
    effectiveDate: string;
    status: string;
    isActive: boolean;
    file?: File;
};

// API Response types
export type LegalDocumentListResponse = {
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
            $values: LegalDocument[];
        };
    };
    timestamp: string;
};

export type LegalDocumentDetailResponse = {
    $id: string;
    success: boolean;
    message: string;
    data: LegalDocument;
    timestamp: string;
};
