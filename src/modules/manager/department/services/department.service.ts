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
        return response.data;
    },

    async updateDepartment(id: string, data: UpdateDepartmentRequest) {
        const response = await departmentApi.update(id, data);
        return response.data;
    },

    async deleteDepartment(id: string) {
        const response = await departmentApi.delete(id);
        return response.data;
    },
};

