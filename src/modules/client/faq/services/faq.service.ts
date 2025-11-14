/**
 * FAQ Service Layer for Client
 * Business logic for FAQ operations
 */

import { faqClientApi } from '../api/faq.api';
import type { RestPaged, RestResponse } from '@/types/rest';
import { getValuesPage } from '@/types/rest';
import type { Faq, FaqCategory } from '../types/response';
import type { FaqFilters, FaqCategoryFilters } from '../types/request';

export const faqClientService = {
    /**
     * Get FAQs list with filters
     */
    async getFaqList(filters: FaqFilters): Promise<ReturnType<typeof getValuesPage<Faq>>> {
        const response = await faqClientApi.getList(filters);
        return getValuesPage(response.data);
    },

    /**
     * Get FAQ by ID
     */
    async getFaqById(id: string): Promise<Faq | null> {
        const response = await faqClientApi.getById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        return response.data.data as Faq;
    },

    /**
     * Get FAQ categories list with filters
     */
    async getFaqCategoryList(filters: FaqCategoryFilters): Promise<ReturnType<typeof getValuesPage<FaqCategory>>> {
        const response = await faqClientApi.getCategoryList(filters);
        return getValuesPage(response.data);
    },

    /**
     * Get FAQ category by ID
     */
    async getFaqCategoryById(id: string): Promise<FaqCategory | null> {
        const response = await faqClientApi.getCategoryById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        return response.data.data as FaqCategory;
    },
};

