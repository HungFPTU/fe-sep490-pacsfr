/**
 * Template Service Layer
 * Business logic and data transformation
 */

import type { RestPaged } from '@/types/rest';
import { templateApi } from '../api/template.api';
import type { Template } from '../types/response';
import type { CreateTemplateRequest, UpdateTemplateRequest, TemplateFilters } from '../types/request';

export const templateService = {
    /**
     * Get templates list with filters
     */
    async getTemplates(filters: TemplateFilters): Promise<RestPaged<Template>> {
        const response = await templateApi.getList(filters);
        return response.data;
    },

    /**
     * Get template by ID
     */
    async getTemplateById(id: string): Promise<Template | null> {
        const response = await templateApi.getById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        const data = response.data.data;
        // Map API response fields (sampleCode/sampleName) to Template type (templateCode/templateName)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const apiData = data as any;
        return {
            ...apiData,
            templateCode: apiData.templateCode ?? apiData.sampleCode ?? '',
            templateName: apiData.templateName ?? apiData.sampleName ?? '',
        } as Template;
    },

    /**
     * Create new template
     */
    async createTemplate(data: CreateTemplateRequest): Promise<Template> {
        const response = await templateApi.create(data);
        if (!response.data?.success || !response.data?.data) {
            // Extract message from API response if available
            const apiResponse = response.data as { message?: string; success: boolean };
            const errorMessage = apiResponse?.message || 'Failed to create template';
            throw new Error(errorMessage);
        }
        return response.data.data as Template;
    },

    /**
     * Update existing template
     */
    async updateTemplate(id: string, data: UpdateTemplateRequest): Promise<Template> {
        const response = await templateApi.update(id, data);
        if (!response.data?.success || !response.data?.data) {
            // Extract message from API response if available
            const apiResponse = response.data as { message?: string; success: boolean };
            const errorMessage = apiResponse?.message || 'Failed to update template';
            throw new Error(errorMessage);
        }
        return response.data.data as Template;
    },

    /**
     * Delete template
     */
    async deleteTemplate(id: string): Promise<void> {
        await templateApi.delete(id);
    },
};

