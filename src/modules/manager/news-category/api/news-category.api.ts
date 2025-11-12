/**
 * News Category API Layer
 * Raw HTTP calls to the backend
 */

import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestPaged } from '@/types/rest';
import type { NewsCategory } from '../types/response';
import type { CreateNewsCategoryRequest, UpdateNewsCategoryRequest, NewsCategoryFilters } from '../types/request';

export const newsCategoryApi = {
    /**
     * Get all news categories with filters and pagination
     */
    getList: (filters: NewsCategoryFilters) => {
        return http.get<RestPaged<NewsCategory>>(
            API_PATH.MANAGER.NEWS_CATEGORY.GET_ALL(
                filters.keyword || '',
                filters.isActive ?? true,
                filters.page,
                filters.size
            )
        );
    },

    /**
     * Get news category by ID
     */
    getById: (id: string) => {
        return http.get<RestResponse<NewsCategory>>(
            API_PATH.MANAGER.NEWS_CATEGORY.GET_BY_ID(id)
        );
    },

    /**
     * Create new news category
     */
    create: (data: CreateNewsCategoryRequest) => {
        return http.post<RestResponse<NewsCategory>>(
            API_PATH.MANAGER.NEWS_CATEGORY.POST,
            data
        );
    },

    /**
     * Update existing news category
     */
    update: (id: string, data: UpdateNewsCategoryRequest) => {
        return http.put<RestResponse<NewsCategory>>(
            API_PATH.MANAGER.NEWS_CATEGORY.PUT(id),
            data
        );
    },

    /**
     * Delete news category
     */
    delete: (id: string) => {
        return http.delete<RestResponse<{ success: boolean }>>(
            API_PATH.MANAGER.NEWS_CATEGORY.DELETE(id)
        );
    },
};

