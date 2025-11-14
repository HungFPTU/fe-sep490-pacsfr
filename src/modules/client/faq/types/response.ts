/**
 * Response types for Client FAQ API
 */

export type Faq = {
    id: string;
    serviceId?: string;
    faqCategoryId?: string;
    question: string;
    answer: string;
    isActive: boolean;
    createdAt?: string | Date;
    modifiedAt?: string | Date;
    $id?: string;
    
    // Populated fields (optional)
    serviceName?: string;
    categoryName?: string;
};

export type FaqCategory = {
    id: string;
    categoryCode?: string;
    categoryName: string;
    description?: string;
    isActive: boolean;
    createdAt?: string | Date;
    modifiedAt?: string | Date;
    $id?: string;
};

