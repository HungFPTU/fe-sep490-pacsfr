/**
 * Response types for FAQ API
 */

export type Faq = {
    id: string;
    serviceId: string;
    faqCategoryId: string;
    question: string;
    answer: string;
    isActive: boolean;
    createdAt: string | Date;
    createdBy?: string;
    modifiedAt?: string | Date;
    modifiedBy?: string;
    $id?: string;
    
    // Populated fields (optional)
    serviceName?: string;
    categoryName?: string;
};

