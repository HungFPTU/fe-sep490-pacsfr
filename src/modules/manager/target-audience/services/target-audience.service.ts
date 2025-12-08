/**
 * TargetAudience Service Layer
 * Business logic and data transformation
 */

import type { RestPaged } from '@/types/rest';
import { targetAudienceApi } from '../api/target-audience.api';
import type { TargetAudience } from '../types/response';
import type { CreateTargetAudienceRequest, UpdateTargetAudienceRequest, TargetAudienceFilters } from '../types/request';

export const targetAudienceService = {
    /**
     * Get TargetAudiences list with filters
     */
    async getTargetAudiences(filters: TargetAudienceFilters): Promise<RestPaged<TargetAudience>> {
        const response = await targetAudienceApi.getList(filters);
        return response.data;
    },

    /**
     * Get TargetAudience by ID
     */
    async getTargetAudienceById(id: string): Promise<TargetAudience | null> {
        const response = await targetAudienceApi.getById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        return response.data.data as TargetAudience;
    },

    /**
     * Create new TargetAudience
     */
    async createTargetAudience(data: CreateTargetAudienceRequest): Promise<TargetAudience> {
        const response = await targetAudienceApi.create(data);
        const apiResponse = response.data;

        // Check if request was successful
        if (!apiResponse?.success) {
            const errorMessage = (apiResponse as { message?: string })?.message || 'Failed to create TargetAudience';
            throw new Error(errorMessage);
        }

        // API returns success: true but no data field
        // Return the data from request as the created TargetAudience
        return {
            id: '', // Will be populated after creation
            name: data.name,
            description: data.description,
            isActive: data.isActive,
            createdAt: new Date(),
        } as TargetAudience;
    },

    /**
     * Update existing TargetAudience
     */
    async updateTargetAudience(id: string, data: UpdateTargetAudienceRequest): Promise<TargetAudience> {
        const response = await targetAudienceApi.update(id, data);
        const apiResponse = response.data;

        // Check if request was successful
        if (!apiResponse?.success) {
            const errorMessage = (apiResponse as { message?: string })?.message || 'Failed to update TargetAudience';
            throw new Error(errorMessage);
        }

        // API returns success: true but no data field
        // Return the updated data from request
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            isActive: data.isActive,
            createdAt: new Date(),
            modifiedAt: new Date(),
        } as TargetAudience;
    },

    /**
     * Delete TargetAudience
     */
    async deleteTargetAudience(id: string): Promise<void> {
        await targetAudienceApi.delete(id);
    },
};

