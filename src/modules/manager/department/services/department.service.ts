import { departmentApi } from '../api/department.api';
import type { CreateDepartmentRequest, UpdateDepartmentRequest, DepartmentFilters } from '../types';

export const departmentService = {
    async getDepartmentList(filters: DepartmentFilters) {
        const response = await departmentApi.getList(filters);
        return response.data;
    },

    async getDepartmentById(id: string) {
        const response = await departmentApi.getById(id);
        return response.data;
    },

    async createDepartment(data: CreateDepartmentRequest) {
        const response = await departmentApi.create(data);
        if (!response.data?.success || !response.data?.data) {
            // Extract message from API response if available (message is at root level)
            const apiResponse = response.data as { message?: string; success: boolean };
            const errorMessage = apiResponse?.message || 'Failed to create department';
            throw new Error(errorMessage);
        }
        return response.data;
    },

    async updateDepartment(id: string, data: UpdateDepartmentRequest) {
        const response = await departmentApi.update(id, data);
        if (!response.data?.success || !response.data?.data) {
            // Extract message from API response if available (message is at root level)
            const apiResponse = response.data as { message?: string; success: boolean };
            const errorMessage = apiResponse?.message || 'Failed to update department';
            throw new Error(errorMessage);
        }
        return response.data;
    },

    async deleteDepartment(id: string) {
        const response = await departmentApi.delete(id);
        return response.data;
    },
};

