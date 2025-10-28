import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestMany } from '@/types/rest';
import type { WorkShift, CreateWorkShiftRequest, UpdateWorkShiftRequest, WorkShiftFilters } from '../types';

export const workshiftApi = {
    // GET list với filters
    getList: (filters: WorkShiftFilters) => {
        return http.get<RestMany<WorkShift>>(
            API_PATH.MANAGER.WORKSHIFT.GET_ALL(
                filters.keyword || '',
                filters.isActive ?? true,
                filters.page || 1,
                filters.size || 10
            )
        );
    },

    // GET detail by ID
    getById: (id: string) => {
        return http.get<RestResponse<WorkShift>>(
            API_PATH.MANAGER.WORKSHIFT.GET_BY_ID(id)
        );
    },

    // POST create
    create: (data: CreateWorkShiftRequest) => {
        return http.post<RestResponse<WorkShift>>(
            API_PATH.MANAGER.WORKSHIFT.POST,
            data
        );
    },

    // PUT update
    update: (id: string, data: UpdateWorkShiftRequest) => {
        return http.put<RestResponse<WorkShift>>(
            API_PATH.MANAGER.WORKSHIFT.PUT(id),
            data
        );
    },

    // DELETE
    delete: (id: string) => {
        return http.delete<RestResponse<object>>(
            API_PATH.MANAGER.WORKSHIFT.DELETE(id)
        );
    },
};
