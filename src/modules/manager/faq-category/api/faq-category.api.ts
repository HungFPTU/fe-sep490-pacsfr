/**
 * FAQ Category API Layer
 * Raw HTTP calls to the backend
 */

import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestPaged } from '@/types/rest';
import type { FaqCategory } from '../types/response';
import type { CreateFaqCategoryRequest, UpdateFaqCategoryRequest, FaqCategoryFilters } from '../types/request';

export const faqCategoryApi = {
    /**
     * Get all FAQ categories with filters and pagination
     */
    getList: (filters: FaqCategoryFilters) => {
        return http.get<RestPaged<FaqCategory>>(
            API_PATH.MANAGER.FAQ_CATEGORY.GET_ALL(
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
    getById: (id: string) => {
        return http.get<RestResponse<FaqCategory>>(
            API_PATH.MANAGER.FAQ_CATEGORY.GET_BY_ID(id)
        );
    },

    /**
     * Create new FAQ category
     */
    create: (data: CreateFaqCategoryRequest) => {
        return http.post<RestResponse<FaqCategory>>(
            API_PATH.MANAGER.FAQ_CATEGORY.POST,
            data
        );
    },

    /**
     * Update existing FAQ category
     */
    update: (id: string, data: UpdateFaqCategoryRequest) => {
        return http.put<RestResponse<FaqCategory>>(
            API_PATH.MANAGER.FAQ_CATEGORY.PUT(id),
            data
        );
    },

    /**
     * Delete FAQ category
     */
    delete: (id: string) => {
        return http.delete<RestResponse<{ success: boolean }>>(
            API_PATH.MANAGER.FAQ_CATEGORY.DELETE(id)
        );
    },
};

