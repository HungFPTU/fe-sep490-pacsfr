/**
 * TargetAudience API Layer
 * Raw HTTP calls to the backend
 */

import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestPaged } from '@/types/rest';
import type { TargetAudience } from '../types/response';
import type { CreateTargetAudienceRequest, UpdateTargetAudienceRequest, TargetAudienceFilters } from '../types/request';

export const targetAudienceApi = {
    /**
     * Get all TargetAudiences with filters and pagination
     */
    getList: (filters: TargetAudienceFilters) => {
        return http.get<RestPaged<TargetAudience>>(
            API_PATH.MANAGER.TARGET_AUDIENCE.GET_ALL(
                filters.keyword || '',
                filters.isActive ?? true,
                filters.page,
                filters.size
            )
        );
    },

    /**
     * Get TargetAudience by ID
     */
    getById: (id: string) => {
        return http.get<RestResponse<TargetAudience>>(
            API_PATH.MANAGER.TARGET_AUDIENCE.GET_BY_ID(id)
        );
    },

    /**
     * Create new TargetAudience
     */
    create: (data: CreateTargetAudienceRequest) => {
        return http.post<RestResponse<TargetAudience>>(
            API_PATH.MANAGER.TARGET_AUDIENCE.POST,
            data
        );
    },

    /**
     * Update existing TargetAudience
     */
    update: (id: string, data: UpdateTargetAudienceRequest) => {
        return http.put<RestResponse<TargetAudience>>(
            API_PATH.MANAGER.TARGET_AUDIENCE.PUT(id),
            data
        );
    },

    /**
     * Delete TargetAudience
     */
    delete: (id: string) => {
        return http.delete<RestResponse<{ success: boolean }>>(
            API_PATH.MANAGER.TARGET_AUDIENCE.DELETE(id)
        );
    },
};

