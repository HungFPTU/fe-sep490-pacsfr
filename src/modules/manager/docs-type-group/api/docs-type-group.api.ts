/**
 * Docs Type Group API Layer
 * Raw HTTP calls to the backend
 */

import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestPaged } from '@/types/rest';
import type { DocsTypeGroup } from '../types/response';
import type { CreateDocsTypeGroupRequest, UpdateDocsTypeGroupRequest, DocsTypeGroupFilters } from '../types/request';

export const docsTypeGroupApi = {
    /**
     * Get all docs type groups with filters and pagination
     */
    getList: (filters: DocsTypeGroupFilters) => {
        return http.get<RestPaged<DocsTypeGroup>>(
            API_PATH.MANAGER.DOCS_TYPE_GROUP.GET_ALL(
                filters.keyword || '',
                filters.isActive ?? true,
                filters.page,
                filters.size
            )
        );
    },

    /**
     * Get docs type group by ID
     */
    getById: (id: string) => {
        return http.get<RestResponse<DocsTypeGroup>>(
            API_PATH.MANAGER.DOCS_TYPE_GROUP.GET_BY_ID(id)
        );
    },

    /**
     * Create new docs type group
     */
    create: (data: CreateDocsTypeGroupRequest) => {
        return http.post<RestResponse<DocsTypeGroup>>(
            API_PATH.MANAGER.DOCS_TYPE_GROUP.POST,
            data
        );
    },

    /**
     * Update existing docs type group
     */
    update: (id: string, data: UpdateDocsTypeGroupRequest) => {
        return http.put<RestResponse<DocsTypeGroup>>(
            API_PATH.MANAGER.DOCS_TYPE_GROUP.PUT(id),
            data
        );
    },

    /**
     * Delete docs type group
     */
    delete: (id: string) => {
        return http.delete<RestResponse<{ success: boolean }>>(
            API_PATH.MANAGER.DOCS_TYPE_GROUP.DELETE(id)
        );
    },
};

