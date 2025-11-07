/**
 * SubmissionMethod Service Layer
 * Business logic and data transformation
 */

import type { RestPaged } from '@/types/rest';
import { submissionMethodApi } from '../api/submission-method.api';
import type { SubmissionMethod } from '../types/response';
import type { CreateSubmissionMethodRequest, UpdateSubmissionMethodRequest, SubmissionMethodFilters } from '../types/request';

export const submissionMethodService = {
    /**
     * Get submission methods list with filters
     */
    async getSubmissionMethods(filters: SubmissionMethodFilters): Promise<RestPaged<SubmissionMethod>> {
        const response = await submissionMethodApi.getList(filters);
        return response.data;
    },

    /**
     * Get submission method by ID
     */
    async getSubmissionMethodById(id: string): Promise<SubmissionMethod | null> {
        const response = await submissionMethodApi.getById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        return response.data.data as SubmissionMethod;
    },

    /**
     * Create new submission method
     */
    async createSubmissionMethod(data: CreateSubmissionMethodRequest): Promise<SubmissionMethod> {
        const response = await submissionMethodApi.create(data);
        if (!response.data?.success || !response.data?.data) {
            // Extract message from API response if available
            const apiResponse = response.data as { message?: string; success: boolean };
            const errorMessage = apiResponse?.message || 'Failed to create submission method';
            throw new Error(errorMessage);
        }
        return response.data.data as SubmissionMethod;
    },

    /**
     * Update existing submission method
     */
    async updateSubmissionMethod(id: string, data: UpdateSubmissionMethodRequest): Promise<SubmissionMethod> {
        const response = await submissionMethodApi.update(id, data);
        if (!response.data?.success || !response.data?.data) {
            // Extract message from API response if available
            const apiResponse = response.data as { message?: string; success: boolean };
            const errorMessage = apiResponse?.message || 'Failed to update submission method';
            throw new Error(errorMessage);
        }
        return response.data.data as SubmissionMethod;
    },

    /**
     * Delete submission method (soft delete)
     */
    async deleteSubmissionMethod(id: string): Promise<void> {
        await submissionMethodApi.delete(id);
    },
};

