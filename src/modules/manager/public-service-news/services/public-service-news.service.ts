/**
 * Public Service News Service Layer
 * Business logic and data transformation
 */

import type { RestPaged } from '@/types/rest';
import { publicServiceNewsApi } from '../api/public-service-news.api';
import type { PublicServiceNews } from '../types/response';
import type { CreatePublicServiceNewsRequest, UpdatePublicServiceNewsRequest, PublicServiceNewsFilters } from '../types/request';

export const publicServiceNewsService = {
    /**
     * Get public service news list with filters
     */
    async getPublicServiceNewsList(filters: PublicServiceNewsFilters): Promise<RestPaged<PublicServiceNews>> {
        const response = await publicServiceNewsApi.getList(filters);
        return response.data;
    },

    /**
     * Get public service news by ID
     */
    async getPublicServiceNewsById(id: string): Promise<PublicServiceNews | null> {
        const response = await publicServiceNewsApi.getById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        return response.data.data as PublicServiceNews;
    },

    /**
     * Create new public service news
     */
    async createPublicServiceNews(data: CreatePublicServiceNewsRequest): Promise<PublicServiceNews> {
        const response = await publicServiceNewsApi.create(data);
        const apiResponse = response.data;

        if (!apiResponse?.success) {
            const errorMessage = (apiResponse as { message?: string })?.message || 'Failed to create public service news';
            throw new Error(errorMessage);
        }

        // Handle case where API returns success but no data field
        if (!apiResponse.data) {
            return {
                id: '',
                serviceId: data.serviceId,
                newsCategoryId: data.newsCategoryId,
                title: data.title,
                thumbnailUrl: data.thumbnailUrl,
                content: data.content,
                summary: data.summary,
                isPublished: data.isPublished,
                createdAt: new Date(),
                staffId: data.staffId,
            } as PublicServiceNews;
        }

        return apiResponse.data as PublicServiceNews;
    },

    /**
     * Update existing public service news
     */
    async updatePublicServiceNews(id: string, data: UpdatePublicServiceNewsRequest): Promise<PublicServiceNews> {
        const response = await publicServiceNewsApi.update(id, data);
        const apiResponse = response.data;

        if (!apiResponse?.success) {
            const errorMessage = (apiResponse as { message?: string })?.message || 'Failed to update public service news';
            throw new Error(errorMessage);
        }

        // Handle case where API returns success but no data field
        if (!apiResponse.data) {
            return {
                id: data.id,
                serviceId: data.serviceId,
                newsCategoryId: data.newsCategoryId,
                title: data.title,
                thumbnailUrl: data.thumbnailUrl,
                content: data.content,
                summary: data.summary,
                isPublished: data.isPublished,
                createdAt: new Date(),
                modifiedAt: new Date(),
                staffId: data.staffId,
            } as PublicServiceNews;
        }

        return apiResponse.data as PublicServiceNews;
    },

    /**
     * Delete public service news
     */
    async deletePublicServiceNews(id: string): Promise<void> {
        await publicServiceNewsApi.delete(id);
    },
};

