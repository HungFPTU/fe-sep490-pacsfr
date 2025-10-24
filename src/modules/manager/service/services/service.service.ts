import { serviceApi } from '../api/service.api';
import type { CreateServiceRequest, UpdateServiceRequest, ServiceFilters } from '../types';

export const serviceService = {
    getServiceList: async (filters: ServiceFilters) => {
        const response = await serviceApi.getAll(filters);
        return response.data;
    },

    getServiceById: async (id: string) => {
        const response = await serviceApi.getById(id);
        return response.data;
    },

    createService: async (data: CreateServiceRequest) => {
        const response = await serviceApi.create(data);
        return response.data;
    },

    updateService: async (id: string, data: UpdateServiceRequest) => {
        const response = await serviceApi.update(id, data);
        return response.data;
    },

    deleteService: async (id: string) => {
        const response = await serviceApi.delete(id);
        return response.data;
    },
};

