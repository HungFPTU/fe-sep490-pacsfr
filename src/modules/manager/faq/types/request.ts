/**
 * Request types for FAQ API
 */

export type CreateFaqRequest = {
    serviceId: string;
    faqCategoryId: string;
    question: string;
    answer: string;
    isActive: boolean;
};

export type UpdateFaqRequest = {
    id: string;
    serviceId: string;
    faqCategoryId: string;
    question: string;
    answer: string;
    isActive: boolean;
};

export type FaqFilters = {
    keyword?: string;
    serviceId?: string;
    faqCategoryId?: string;
    isActive?: boolean;
    page: number;
    size: number;
};

