import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse } from '@/types/rest';
import type { Counter, CreateCounterRequest, ServiceGroupOption, StaffOption, AssignStaffRequest } from '../types';

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

    getAllServiceGroups: () => {
        return http.get<RestResponse<{ $values?: ServiceGroupOption[] }>>(
            API_PATH.MANAGER.COUNTER.GET_ALL_SERVICE_GROUPS
        );
    },

    getAllStaff: () => {
        return http.get<RestResponse<{ $values?: StaffOption[] }>>(
            API_PATH.MANAGER.COUNTER.GET_ALL_STAFF
        );
    },

    assignStaff: (counterId: string, data: AssignStaffRequest) => {
        return http.put<RestResponse<Record<string, never>>>(
            API_PATH.MANAGER.COUNTER.ASSIGN_STAFF(counterId),
            data
        );
    },
};
