import { http, httpNoLoading } from '@core/http/client';
import { API_PATH } from '@/core/config/api.path';
import { RestResponse, RestPaged } from '@/types/rest';
import type { Service, CreateServiceRequest, UpdateServiceRequest, ServiceFilters, AssignSubmissionMethodsRequest } from '../types';

export const serviceApi = {
    // GET list with filters
    getAll: (filters: ServiceFilters) => {
        return httpNoLoading.get<RestPaged<Service>>(
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

    // Assign submission methods
    assignSubmissionMethods: (data: AssignSubmissionMethodsRequest) => {
        return httpNoLoading.post<RestResponse<{ success: boolean; message: string }>>(
            API_PATH.MANAGER.SERVICES.ASSIGN_SUBMISSION_METHODS,
            data
        );
    },
};

