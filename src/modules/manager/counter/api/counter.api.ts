import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestPaged } from '@/types/rest';
import type { Counter, CreateCounterRequest, UpdateCounterRequest, ServiceGroupOption, AssignServiceGroupRequest } from '../types';

export const counterApi = {
    getAllActive: () => {
        return http.get<RestResponse<{ $values?: Counter[] }>>(
            API_PATH.MANAGER.COUNTER.GET_ALL_ACTIVE()
        );
    },

    getById: (id: string) => {
        return http.get<RestResponse<Counter>>(
            API_PATH.MANAGER.COUNTER.GET_BY_ID(id)
        );
    },

    create: (data: CreateCounterRequest) => {
        return http.post<RestResponse<Counter>>(
            API_PATH.MANAGER.COUNTER.POST,
            data
        );
    },

    update: (id: string, data: UpdateCounterRequest) => {
        return http.put<RestResponse<Counter>>(
            API_PATH.MANAGER.COUNTER.PUT(id),
            data
        );
    },

    getAllServiceGroups: () => {
        return http.get<RestPaged<ServiceGroupOption>>(
            API_PATH.MANAGER.COUNTER.GET_ALL_SERVICE_GROUPS
        );
    },

    assignServiceGroup: (counterId: string, data: AssignServiceGroupRequest) => {
        return http.post<RestResponse<Record<string, never>>>(
            API_PATH.MANAGER.COUNTER.ASSIGN_SERVICE_GROUP(counterId),
            data
        );
    },

    delete: (id: string) => {
        return http.delete<RestResponse<Record<string, never>>>(
            API_PATH.MANAGER.COUNTER.DELETE(id)
        );
    },
};
