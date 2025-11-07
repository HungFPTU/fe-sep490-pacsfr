/**
 * Template API Layer
 * Raw HTTP calls to the backend
 */

import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestPaged } from '@/types/rest';
import type { Template } from '../types/response';
import type { CreateTemplateRequest, UpdateTemplateRequest, TemplateFilters } from '../types/request';

export const templateApi = {
    /**
     * Get all templates with filters and pagination
     */
    getList: (filters: TemplateFilters) => {
        return http.get<RestPaged<Template>>(
            API_PATH.MANAGER.TEMPLATE.GET_ALL(
                filters.keyword || '',
                filters.docsTypeId || '',
                filters.isActive ?? true,
                filters.page,
                filters.size
            )
        );
    },

    /**
     * Get template by ID
     */
    getById: (id: string) => {
        return http.get<RestResponse<Template>>(
            API_PATH.MANAGER.TEMPLATE.GET_BY_ID(id)
        );
    },

    /**
     * Create new template
     */
    create: (data: CreateTemplateRequest) => {
        return http.post<RestResponse<Template>>(
            API_PATH.MANAGER.TEMPLATE.POST,
            data
        );
    },

    /**
     * Update existing template
     */
    update: (id: string, data: UpdateTemplateRequest) => {
        return http.put<RestResponse<Template>>(
            API_PATH.MANAGER.TEMPLATE.PUT(id),
            data
        );
    },

    /**
     * Delete template
     */
    delete: (id: string) => {
        return http.delete<RestResponse<{ success: boolean }>>(
            API_PATH.MANAGER.TEMPLATE.DELETE(id)
        );
    },
};

