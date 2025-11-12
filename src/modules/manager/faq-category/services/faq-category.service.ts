/**
 * FAQ Category Service Layer
 * Business logic and data transformation
 */

import type { RestPaged } from '@/types/rest';
import { faqCategoryApi } from '../api/faq-category.api';
import type { FaqCategory } from '../types/response';
import type { CreateFaqCategoryRequest, UpdateFaqCategoryRequest, FaqCategoryFilters } from '../types/request';

export const faqCategoryService = {
    /**
     * Get FAQ categories list with filters
     */
    async getFaqCategories(filters: FaqCategoryFilters): Promise<RestPaged<FaqCategory>> {
        const response = await faqCategoryApi.getList(filters);
        return response.data;
    },

    /**
     * Get FAQ category by ID
     */
    async getFaqCategoryById(id: string): Promise<FaqCategory | null> {
        const response = await faqCategoryApi.getById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        return response.data.data as FaqCategory;
    },

    /**
     * Create new FAQ category
     */
    async createFaqCategory(data: CreateFaqCategoryRequest): Promise<FaqCategory> {
        const response = await faqCategoryApi.create(data);
        if (!response.data?.success || !response.data?.data) {
            // Extract message from API response if available (message is at root level)
            const apiResponse = response.data as { message?: string; success: boolean };
            const errorMessage = apiResponse?.message || 'Failed to create FAQ category';
            throw new Error(errorMessage);
        }
        return response.data.data as FaqCategory;
    },

    /**
     * Update existing FAQ category
     */
    async updateFaqCategory(id: string, data: UpdateFaqCategoryRequest): Promise<FaqCategory> {
        const response = await faqCategoryApi.update(id, data);
        if (!response.data?.success || !response.data?.data) {
            // Extract message from API response if available (message is at root level)
            const apiResponse = response.data as { message?: string; success: boolean };
            const errorMessage = apiResponse?.message || 'Failed to update FAQ category';
            throw new Error(errorMessage);
        }
        return response.data.data as FaqCategory;
    },

    /**
     * Delete FAQ category
     */
    async deleteFaqCategory(id: string): Promise<void> {
        await faqCategoryApi.delete(id);
    },
};

