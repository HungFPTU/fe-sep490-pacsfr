/**
 * Response types for FAQ Category API
 */

export type FaqCategory = {
    id: string;
    categoryCode: string;
    categoryName: string;
    description: string;
    isActive: boolean;
    createdAt: string | Date;
    createdBy?: string;
    modifiedAt?: string | Date;
    modifiedBy?: string;
    $id?: string;
};

