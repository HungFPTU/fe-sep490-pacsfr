/**
 * Docs Type Service Layer
 * Business logic and data transformation
 */

import type { RestPaged } from '@/types/rest';
import { docsTypeApi } from '../api/docs-type.api';
import type { DocsType } from '../types/response';
import type { CreateDocsTypeRequest, UpdateDocsTypeRequest, DocsTypeFilters } from '../types/request';

export const docsTypeService = {
    /**
     * Get docs types list with filters
     */
    async getDocsTypes(filters: DocsTypeFilters): Promise<RestPaged<DocsType>> {
        const response = await docsTypeApi.getList(filters);
        return response.data;
    },

    /**
     * Get docs type by ID
     */
    async getDocsTypeById(id: string): Promise<DocsType | null> {
        const response = await docsTypeApi.getById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        return response.data.data as DocsType;
    },

    /**
     * Create new docs type
     */
    async createDocsType(data: CreateDocsTypeRequest): Promise<DocsType> {
        const response = await docsTypeApi.create(data);
        if (!response.data?.success || !response.data?.data) {
            // Extract message from API response if available (message is at root level)
            const apiResponse = response.data as { message?: string; success: boolean };
            const errorMessage = apiResponse?.message || 'Failed to create docs type';
            throw new Error(errorMessage);
        }
        return response.data.data as DocsType;
    },

    /**
     * Update existing docs type
     */
    async updateDocsType(id: string, data: UpdateDocsTypeRequest): Promise<DocsType> {
        const response = await docsTypeApi.update(id, data);
        if (!response.data?.success || !response.data?.data) {
            // Extract message from API response if available (message is at root level)
            const apiResponse = response.data as { message?: string; success: boolean };
            const errorMessage = apiResponse?.message || 'Failed to update docs type';
            throw new Error(errorMessage);
        }
        return response.data.data as DocsType;
    },

    /**
     * Delete docs type
     */
    async deleteDocsType(id: string): Promise<void> {
        await docsTypeApi.delete(id);
    },
};

