/**
 * Request types for FAQ Category API
 */

export type CreateFaqCategoryRequest = {
    categoryCode?: string;
    categoryName: string;
    description: string;
    isActive: boolean;
};

export type UpdateFaqCategoryRequest = {
    id: string;
    categoryCode?: string;
    categoryName: string;
    description: string;
    isActive: boolean;
};

export type FaqCategoryFilters = {
    keyword?: string;
    isActive?: boolean;
    page: number;
    size: number;
};

