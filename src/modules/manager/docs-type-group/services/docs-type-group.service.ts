/**
 * Docs Type Group Service Layer
 * Business logic and data transformation
 */

import type { RestPaged } from '@/types/rest';
import { docsTypeGroupApi } from '../api/docs-type-group.api';
import type { DocsTypeGroup } from '../types/response';
import type { CreateDocsTypeGroupRequest, UpdateDocsTypeGroupRequest, DocsTypeGroupFilters } from '../types/request';

export const docsTypeGroupService = {
    /**
     * Get docs type groups list with filters
     */
    async getDocsTypeGroups(filters: DocsTypeGroupFilters): Promise<RestPaged<DocsTypeGroup>> {
        const response = await docsTypeGroupApi.getList(filters);
        return response.data;
    },

    /**
     * Get docs type group by ID
     */
    async getDocsTypeGroupById(id: string): Promise<DocsTypeGroup | null> {
        const response = await docsTypeGroupApi.getById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        return response.data.data as DocsTypeGroup;
    },

    /**
     * Create new docs type group
     */
    async createDocsTypeGroup(data: CreateDocsTypeGroupRequest): Promise<DocsTypeGroup> {
        const response = await docsTypeGroupApi.create(data);
        if (!response.data?.success || !response.data?.data) {
            // Extract message from API response if available (message is at root level)
            const apiResponse = response.data as { message?: string; success: boolean };
            const errorMessage = apiResponse?.message || 'Failed to create docs type group';
            throw new Error(errorMessage);
        }
        return response.data.data as DocsTypeGroup;
    },

    /**
     * Update existing docs type group
     */
    async updateDocsTypeGroup(id: string, data: UpdateDocsTypeGroupRequest): Promise<DocsTypeGroup> {
        const response = await docsTypeGroupApi.update(id, data);
        if (!response.data?.success || !response.data?.data) {
            // Extract message from API response if available (message is at root level)
            const apiResponse = response.data as { message?: string; success: boolean };
            const errorMessage = apiResponse?.message || 'Failed to update docs type group';
            throw new Error(errorMessage);
        }
        return response.data.data as DocsTypeGroup;
    },

    /**
     * Delete docs type group
     */
    async deleteDocsTypeGroup(id: string): Promise<void> {
        await docsTypeGroupApi.delete(id);
    },
};

