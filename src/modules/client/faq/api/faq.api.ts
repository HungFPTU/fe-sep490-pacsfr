/**
 * FAQ API Layer for Client
 * Raw HTTP calls using httpNoLoading
 */

import { httpNoLoading } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestPaged, RestResponse } from '@/types/rest';
import type { Faq, FaqCategory } from '../types/response';
import type { FaqFilters, FaqCategoryFilters } from '../types/request';

export const faqClientApi = {
    /**
     * Get all FAQs with filters and pagination
     */
    getList: (filters: FaqFilters) => {
        return httpNoLoading.get<RestPaged<Faq>>(
            API_PATH.CLIENT.FAQ.ALL(
                filters.keyword || '',
                filters.serviceId || '',
                filters.faqCategoryId || '',
                filters.isActive ?? true,
                filters.page,
                filters.size
            )
        );
    },

    /**
     * Get FAQ by ID
     */
    getById: (id: string) => {
        return httpNoLoading.get<RestResponse<Faq>>(
            API_PATH.CLIENT.FAQ.BY_ID(id)
        );
    },

    /**
     * Get all FAQ categories with filters and pagination
     */
    getCategoryList: (filters: FaqCategoryFilters) => {
        return httpNoLoading.get<RestPaged<FaqCategory>>(
            API_PATH.CLIENT.FAQ_CATEGORY.ALL(
                filters.keyword || '',
                filters.isActive ?? true,
                filters.page,
                filters.size
            )
        );
    },

    /**
     * Get FAQ category by ID
     */
    getCategoryById: (id: string) => {
        return httpNoLoading.get<RestResponse<FaqCategory>>(
            API_PATH.CLIENT.FAQ_CATEGORY.BY_ID(id)
        );
    },
};

