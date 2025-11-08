/**
 * Response type for Required Document module
 */

export type RequiredDocument = {
    id: string;
    serviceId: string;
    serviceName?: string;
    docTypeId: string;
    docTypeName?: string;
    docTypeCode?: string;
    description: string;
    quantityOriginal: number;
    quantityCopy: number;
    isActive: boolean;
    createdAt?: string | Date;
    modifiedAt?: string | Date;
    createdBy?: string;
    modifiedBy?: string;
    $id?: string;
};

