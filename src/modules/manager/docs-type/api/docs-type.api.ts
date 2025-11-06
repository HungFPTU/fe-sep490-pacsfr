/**
 * Docs Type API Layer
 * Raw HTTP calls to the backend
 */

import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestPaged } from '@/types/rest';
import type { DocsType } from '../types/response';
import type { CreateDocsTypeRequest, UpdateDocsTypeRequest, DocsTypeFilters } from '../types/request';

export const docsTypeApi = {
    /**
     * Get all docs types with filters and pagination
     */
    getList: (filters: DocsTypeFilters) => {
        return http.get<RestPaged<DocsType>>(
            API_PATH.MANAGER.DOCS_TYPE.GET_ALL(
                filters.keyword || '',
                filters.groupId || '',
                filters.isActive ?? true,
                filters.page,
                filters.size
            )
        );
    },

    /**
     * Get docs type by ID
     */
    getById: (id: string) => {
        return http.get<RestResponse<DocsType>>(
            API_PATH.MANAGER.DOCS_TYPE.GET_BY_ID(id)
        );
    },

    /**
     * Create new docs type
     */
    create: (data: CreateDocsTypeRequest) => {
        return http.post<RestResponse<DocsType>>(
            API_PATH.MANAGER.DOCS_TYPE.POST,
            data
        );
    },

    /**
     * Update existing docs type
     */
    update: (id: string, data: UpdateDocsTypeRequest) => {
        return http.put<RestResponse<DocsType>>(
            API_PATH.MANAGER.DOCS_TYPE.PUT(id),
            data
        );
    },

    /**
     * Delete docs type
     */
    delete: (id: string) => {
        return http.delete<RestResponse<{ success: boolean }>>(
            API_PATH.MANAGER.DOCS_TYPE.DELETE(id)
        );
    },
};

