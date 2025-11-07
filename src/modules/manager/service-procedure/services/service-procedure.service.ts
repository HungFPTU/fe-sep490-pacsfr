/**
 * Service Procedure Service Layer
 */

import type { RestPaged } from '@/types/rest';
import { serviceProcedureApi } from '../api/service-procedure.api';
import type { ServiceProcedure } from '../types/response';
import type {
    CreateServiceProcedureRequest,
    UpdateServiceProcedureRequest,
    ServiceProcedureFilters,
} from '../types/request';

export const serviceProcedureService = {
    async getServiceProcedures(filters: ServiceProcedureFilters): Promise<RestPaged<ServiceProcedure>> {
        const response = await serviceProcedureApi.getList(filters);
        return response.data;
    },

    async getServiceProcedureById(id: string): Promise<ServiceProcedure | null> {
        const response = await serviceProcedureApi.getById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        return response.data.data as ServiceProcedure;
    },

    async createServiceProcedure(data: CreateServiceProcedureRequest): Promise<ServiceProcedure> {
        const response = await serviceProcedureApi.create(data);
        if (!response.data?.success || !response.data?.data) {
            const apiResponse = response.data as { message?: string } | undefined;
            throw new Error(apiResponse?.message || 'Tạo quy trình dịch vụ thất bại');
        }
        return response.data.data as ServiceProcedure;
    },

    async updateServiceProcedure(id: string, data: UpdateServiceProcedureRequest): Promise<ServiceProcedure> {
        const response = await serviceProcedureApi.update(id, data);
        if (!response.data?.success || !response.data?.data) {
            const apiResponse = response.data as { message?: string } | undefined;
            throw new Error(apiResponse?.message || 'Cập nhật quy trình dịch vụ thất bại');
        }
        return response.data.data as ServiceProcedure;
    },

    async deleteServiceProcedure(id: string): Promise<void> {
        await serviceProcedureApi.delete(id);
    },
};
