/**
 * Service Group API Layer
 * Raw HTTP calls to the backend
 */

import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestPaged } from '@/types/rest';
import type { ServiceGroup } from '../types/response';
import type { CreateServiceGroupRequest, UpdateServiceGroupRequest, ServiceGroupFilters } from '../types/request';

export const serviceGroupApi = {
    /**
     * Get all service groups with filters and pagination
     */
    getList: (filters: ServiceGroupFilters) => {
        return http.get<RestPaged<ServiceGroup>>(
            API_PATH.MANAGER.SERVICE_GROUP.GET_ALL(
                filters.keyword || '',
                filters.isActive ?? true,
                filters.page,
                filters.size
            )
        );
    },

    /**
     * Get service group by ID
     */
    getById: (id: string) => {
        return http.get<RestResponse<ServiceGroup>>(
            API_PATH.MANAGER.SERVICE_GROUP.GET_BY_ID(id)
        );
    },

    /**
     * Create new service group
     */
    create: (data: CreateServiceGroupRequest) => {
        return http.post<RestResponse<ServiceGroup>>(
            API_PATH.MANAGER.SERVICE_GROUP.POST,
            data
        );
    },

    /**
     * Update existing service group
     */
    update: (id: string, data: UpdateServiceGroupRequest) => {
        return http.put<RestResponse<ServiceGroup>>(
            API_PATH.MANAGER.SERVICE_GROUP.PUT(id),
            data
        );
    },

    /**
     * Delete service group
     */
    delete: (id: string) => {
        return http.delete<RestResponse<{ success: boolean }>>(
            API_PATH.MANAGER.SERVICE_GROUP.DELETE(id)
        );
    },
};
