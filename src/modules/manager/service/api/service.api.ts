import { http } from '@core/http/client';
import { API_PATH } from '@/core/config/api.path';
import { RestResponse, RestPaged } from '@/types/rest';
import type { Service, CreateServiceRequest, UpdateServiceRequest, ServiceFilters } from '../types';

export const serviceApi = {
    // GET list with filters
    getAll: (filters: ServiceFilters) => {
        return http.get<RestPaged<Service>>(
            API_PATH.MANAGER.SERVICES.GET_ALL(
                filters.keyword,
                filters.serviceGroupId,
                filters.legalBasisId,
                filters.isActive,
                filters.page,
                filters.size
            )
        );
    },

    // GET by ID
    getById: (id: string) => {
        return http.get<RestResponse<Service>>(
            API_PATH.MANAGER.SERVICES.GET_BY_ID(id)
        );
    },

    // POST (create)
    create: (data: CreateServiceRequest) => {
        return http.post<RestResponse<Service>>(
            API_PATH.MANAGER.SERVICES.POST,
            data
        );
    },

    // PUT (update)
    update: (id: string, data: UpdateServiceRequest) => {
        return http.put<RestResponse<Service>>(
            API_PATH.MANAGER.SERVICES.PUT(id),
            data
        );
    },

    // DELETE
    delete: (id: string) => {
        return http.delete<RestResponse<object>>(
            API_PATH.MANAGER.SERVICES.DELETE(id)
        );
    },
};

