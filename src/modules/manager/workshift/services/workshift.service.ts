import { workshiftApi } from '../api/workshift.api';
import type { CreateWorkShiftRequest, UpdateWorkShiftRequest, WorkShiftFilters } from '../types';

export const workshiftService = {
    async getWorkShiftList(filters: WorkShiftFilters) {
        const response = await workshiftApi.getList(filters);
        return response.data;
    },

    async getWorkShiftById(id: string) {
        const response = await workshiftApi.getById(id);
        return response.data;
    },

    async createWorkShift(data: CreateWorkShiftRequest) {
        const response = await workshiftApi.create(data);
        return response.data;
    },

    async updateWorkShift(id: string, data: UpdateWorkShiftRequest) {
        const response = await workshiftApi.update(id, data);
        return response.data;
    },

    async deleteWorkShift(id: string) {
        const response = await workshiftApi.delete(id);
        return response.data;
    },
};

