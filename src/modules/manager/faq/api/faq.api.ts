/**
 * FAQ API Layer
 * Raw HTTP calls to the backend
 */

import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestPaged } from '@/types/rest';
import type { Faq } from '../types/response';
import type { CreateFaqRequest, UpdateFaqRequest, FaqFilters } from '../types/request';

export const faqApi = {
    /**
     * Get all FAQs with filters and pagination
     */
    getList: (filters: FaqFilters) => {
        return http.get<RestPaged<Faq>>(
            API_PATH.MANAGER.FAQ.GET_ALL(
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
        return http.get<RestResponse<Faq>>(
            API_PATH.MANAGER.FAQ.GET_BY_ID(id)
        );
    },

    /**
     * Create new FAQ
     */
    create: (data: CreateFaqRequest) => {
        return http.post<RestResponse<Faq>>(
            API_PATH.MANAGER.FAQ.POST,
            data
        );
    },

    /**
     * Update existing FAQ
     */
    update: (id: string, data: UpdateFaqRequest) => {
        return http.put<RestResponse<Faq>>(
            API_PATH.MANAGER.FAQ.PUT(id),
            data
        );
    },

    /**
     * Delete FAQ
     */
    delete: (id: string) => {
        return http.delete<RestResponse<{ success: boolean }>>(
            API_PATH.MANAGER.FAQ.DELETE(id)
        );
    },
};

