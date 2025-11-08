/**
 * Request and filter types for Required Document module
 */

export type CreateRequiredDocumentRequest = {
    serviceId: string;
    docTypeId: string;
    description: string;
    quantityOriginal: number;
    quantityCopy: number;
    isActive: boolean;
};

export type UpdateRequiredDocumentRequest = {
    id: string;
} & CreateRequiredDocumentRequest;

export type RequiredDocumentFilters = {
    keyword?: string;
    serviceId?: string;
    docTypeId?: string;
    isActive?: boolean;
    page: number;
    size: number;
};

export type RequiredDocumentFormValues = {
    serviceId: string;
    docTypeId: string;
    description: string;
    quantityOriginal: number;
    quantityCopy: number;
    isActive: boolean;
};

