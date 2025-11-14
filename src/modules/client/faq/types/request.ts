/**
 * Request types for Client FAQ API
 */

export type FaqFilters = {
    keyword?: string;
    serviceId?: string;
    faqCategoryId?: string;
    isActive?: boolean;
    page: number;
    size: number;
};

export type FaqCategoryFilters = {
    keyword?: string;
    isActive?: boolean;
    page: number;
    size: number;
};

