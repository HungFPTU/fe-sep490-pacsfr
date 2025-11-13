/**
 * Request types for News Category API
 */

export type CreateNewsCategoryRequest = {
    categoryCode: string;
    categoryName: string;
    categoryDescription: string;
    isActive: boolean;
};

export type UpdateNewsCategoryRequest = {
    id: string;
    categoryCode: string;
    categoryName: string;
    categoryDescription: string;
    isActive: boolean;
};

export type NewsCategoryFilters = {
    keyword?: string;
    isActive?: boolean;
    page: number;
    size: number;
};

