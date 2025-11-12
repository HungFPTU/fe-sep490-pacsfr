/**
 * Response types for News Category API
 */

export type NewsCategory = {
    id: string;
    categoryCode: string;
    categoryName: string;
    categoryDescription: string;
    isActive: boolean;
    createdAt: string | Date;
    createdBy?: string;
    modifiedAt?: string | Date;
    modifiedBy?: string;
    $id?: string;
};

