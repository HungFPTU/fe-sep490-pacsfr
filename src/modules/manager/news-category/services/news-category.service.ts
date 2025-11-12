/**
 * News Category Service Layer
 * Business logic and data transformation
 */

import type { RestPaged } from '@/types/rest';
import { newsCategoryApi } from '../api/news-category.api';
import type { NewsCategory } from '../types/response';
import type { CreateNewsCategoryRequest, UpdateNewsCategoryRequest, NewsCategoryFilters } from '../types/request';

export const newsCategoryService = {
    /**
     * Get news categories list with filters
     */
    async getNewsCategories(filters: NewsCategoryFilters): Promise<RestPaged<NewsCategory>> {
        const response = await newsCategoryApi.getList(filters);
        return response.data;
    },

    /**
     * Get news category by ID
     */
    async getNewsCategoryById(id: string): Promise<NewsCategory | null> {
        const response = await newsCategoryApi.getById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        return response.data.data as NewsCategory;
    },

    /**
     * Create new news category
     */
    async createNewsCategory(data: CreateNewsCategoryRequest): Promise<NewsCategory> {
        const response = await newsCategoryApi.create(data);
        if (!response.data?.success || !response.data?.data) {
            // Extract message from API response if available (message is at root level)
            const apiResponse = response.data as { message?: string; success: boolean };
            const errorMessage = apiResponse?.message || 'Failed to create news category';
            throw new Error(errorMessage);
        }
        return response.data.data as NewsCategory;
    },

    /**
     * Update existing news category
     */
    async updateNewsCategory(id: string, data: UpdateNewsCategoryRequest): Promise<NewsCategory> {
        const response = await newsCategoryApi.update(id, data);
        if (!response.data?.success || !response.data?.data) {
            // Extract message from API response if available (message is at root level)
            const apiResponse = response.data as { message?: string; success: boolean };
            const errorMessage = apiResponse?.message || 'Failed to update news category';
            throw new Error(errorMessage);
        }
        return response.data.data as NewsCategory;
    },

    /**
     * Delete news category
     */
    async deleteNewsCategory(id: string): Promise<void> {
        await newsCategoryApi.delete(id);
    },
};

