import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestMany } from '@/types/rest';
import type { Department, CreateDepartmentRequest, UpdateDepartmentRequest, DepartmentFilters } from '../types';

export const departmentApi = {
    // GET list với filters
    getList: (filters: DepartmentFilters) => {
        return http.get<RestMany<Department>>(
            API_PATH.MANAGER.DEPARTMENT.GET_ALL(
                filters.keyword || '',
                filters.isActive ?? true,
                filters.page || 1,
                filters.size || 10
            )
        );
    },

    // GET detail by ID
    getById: (id: string) => {
        return http.get<RestResponse<Department>>(
            API_PATH.MANAGER.DEPARTMENT.GET_BY_ID(id)
        );
    },

    // POST create
    create: (data: CreateDepartmentRequest) => {
        return http.post<RestResponse<Department>>(
            API_PATH.MANAGER.DEPARTMENT.POST,
            data
        );
    },

    // PUT update
    update: (id: string, data: UpdateDepartmentRequest) => {
        return http.put<RestResponse<Department>>(
            API_PATH.MANAGER.DEPARTMENT.PUT(id),
            data
        );
    },

    // DELETE
    delete: (id: string) => {
        return http.delete<RestResponse<object>>(
            API_PATH.MANAGER.DEPARTMENT.DELETE(id)
        );
    },
};

