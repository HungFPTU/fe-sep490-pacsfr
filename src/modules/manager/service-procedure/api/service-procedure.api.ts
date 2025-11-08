/**
 * Service Procedure API Layer
 */

import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestPaged, RestResponse } from '@/types/rest';
import type { ServiceProcedure } from '../types/response';
import type { CreateServiceProcedureRequest, UpdateServiceProcedureRequest, ServiceProcedureFilters } from '../types/request';

export const serviceProcedureApi = {
    getList: (filters: ServiceProcedureFilters) => {
        return http.get<RestPaged<ServiceProcedure>>(
            API_PATH.MANAGER.SERVICE_PROCEDURE.GET_ALL(
                filters.keyword || '',
                filters.serviceId || '',
                filters.isActive ?? true,
                filters.page,
                filters.size
            )
        );
    },

    getById: (id: string) => {
        return http.get<RestResponse<ServiceProcedure>>(
            API_PATH.MANAGER.SERVICE_PROCEDURE.GET_BY_ID(id)
        );
    },

    create: (data: CreateServiceProcedureRequest) => {
        return http.post<RestResponse<ServiceProcedure>>(
            API_PATH.MANAGER.SERVICE_PROCEDURE.POST,
            data
        );
    },

    update: (id: string, data: UpdateServiceProcedureRequest) => {
        return http.put<RestResponse<ServiceProcedure>>(
            API_PATH.MANAGER.SERVICE_PROCEDURE.PUT(id),
            data
        );
    },

    delete: (id: string) => {
        return http.delete<RestResponse<{ success: boolean }>>(
            API_PATH.MANAGER.SERVICE_PROCEDURE.DELETE(id)
        );
    },
};
