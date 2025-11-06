/**
 * Service Group Service Layer
 * Business logic and data transformation
 */

import type { RestPaged } from '@/types/rest';
import { serviceGroupApi } from '../api/service-group.api';
import type { ServiceGroup } from '../types/response';
import type { CreateServiceGroupRequest, UpdateServiceGroupRequest, ServiceGroupFilters } from '../types/request';

export const serviceGroupService = {
    /**
     * Get service groups list with filters
     */
    async getServiceGroups(filters: ServiceGroupFilters): Promise<RestPaged<ServiceGroup>> {
        const response = await serviceGroupApi.getList(filters);
        return response.data;
    },

    /**
     * Get service group by ID
     */
    async getServiceGroupById(id: string): Promise<ServiceGroup | null> {
        const response = await serviceGroupApi.getById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        return response.data.data as ServiceGroup;
    },

    /**
     * Create new service group
     */
    async createServiceGroup(data: CreateServiceGroupRequest): Promise<ServiceGroup> {
        const response = await serviceGroupApi.create(data);
        if (!response.data?.success || !response.data?.data) {
            throw new Error('Failed to create service group');
        }
        return response.data.data as ServiceGroup;
    },

    /**
     * Update existing service group
     */
    async updateServiceGroup(id: string, data: UpdateServiceGroupRequest): Promise<ServiceGroup> {
        const response = await serviceGroupApi.update(id, data);
        if (!response.data?.success || !response.data?.data) {
            throw new Error('Failed to update service group');
        }
        return response.data.data as ServiceGroup;
    },

    /**
     * Delete service group
     */
    async deleteServiceGroup(id: string): Promise<void> {
        await serviceGroupApi.delete(id);
    },
};
