/**
 * Public Service News API Layer
 * Raw HTTP calls to the backend
 */

import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestPaged } from '@/types/rest';
import type { PublicServiceNews } from '../types/response';
import type { CreatePublicServiceNewsRequest, UpdatePublicServiceNewsRequest, PublicServiceNewsFilters } from '../types/request';

export const publicServiceNewsApi = {
    /**
     * Get all public service news with filters and pagination
     */
    getList: (filters: PublicServiceNewsFilters) => {
        return http.get<RestPaged<PublicServiceNews>>(
            API_PATH.MANAGER.PUBLIC_SERVICE_NEWS.GET_ALL(
                filters.keyword || '',
                filters.serviceId || '',
                filters.newsCategoryId || '',
                filters.staffId || '',
                filters.isPublished ?? true,
                filters.page,
                filters.size
            )
        );
    },

    /**
     * Get public service news by ID
     */
    getById: (id: string) => {
        return http.get<RestResponse<PublicServiceNews>>(
            API_PATH.MANAGER.PUBLIC_SERVICE_NEWS.GET_BY_ID(id)
        );
    },

    /**
     * Create new public service news
     */
    create: (data: CreatePublicServiceNewsRequest) => {
        return http.post<RestResponse<PublicServiceNews>>(
            API_PATH.MANAGER.PUBLIC_SERVICE_NEWS.POST,
            data
        );
    },

    /**
     * Update existing public service news
     */
    update: (id: string, data: UpdatePublicServiceNewsRequest) => {
        return http.put<RestResponse<PublicServiceNews>>(
            API_PATH.MANAGER.PUBLIC_SERVICE_NEWS.PUT(id),
            data
        );
    },

    /**
     * Delete public service news
     */
    delete: (id: string) => {
        return http.delete<RestResponse<{ success: boolean }>>(
            API_PATH.MANAGER.PUBLIC_SERVICE_NEWS.DELETE(id)
        );
    },
};

