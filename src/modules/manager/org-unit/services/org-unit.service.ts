import { orgUnitApi } from '../api/org-unit.api';
import type { CreateOrgUnitRequest, UpdateOrgUnitRequest, OrgUnitFilters } from '../types';

export const orgUnitService = {
    // Wrapper methods với business logic
    async getOrgUnitList(filters: OrgUnitFilters) {
        const response = await orgUnitApi.getList(filters);
        return response.data;
    },

    async getOrgUnitById(id: string) {
        const response = await orgUnitApi.getById(id);
        return response.data;
    },

    async createOrgUnit(data: CreateOrgUnitRequest) {
        const response = await orgUnitApi.create(data);
        if (!response.data?.success || !response.data?.data) {
            // Extract message from API response if available (message is at root level)
            const apiResponse = response.data as { message?: string; success: boolean };
            const errorMessage = apiResponse?.message || 'Failed to create org unit';
            throw new Error(errorMessage);
        }
        return response.data;
    },

    async updateOrgUnit(id: string, data: UpdateOrgUnitRequest) {
        const response = await orgUnitApi.update(id, data);
        if (!response.data?.success || !response.data?.data) {
            // Extract message from API response if available (message is at root level)
            const apiResponse = response.data as { message?: string; success: boolean };
            const errorMessage = apiResponse?.message || 'Failed to update org unit';
            throw new Error(errorMessage);
        }
        return response.data;
    },

    async deleteOrgUnit(id: string) {
        const response = await orgUnitApi.delete(id);
        return response.data;
    },
};

