/**
 * FAQ Service Layer
 * Business logic and data transformation
 */

import type { RestPaged } from '@/types/rest';
import { faqApi } from '../api/faq.api';
import type { Faq } from '../types/response';
import type { CreateFaqRequest, UpdateFaqRequest, FaqFilters } from '../types/request';

export const faqService = {
    /**
     * Get FAQs list with filters
     */
    async getFaqs(filters: FaqFilters): Promise<RestPaged<Faq>> {
        const response = await faqApi.getList(filters);
        return response.data;
    },

    /**
     * Get FAQ by ID
     */
    async getFaqById(id: string): Promise<Faq | null> {
        const response = await faqApi.getById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        return response.data.data as Faq;
    },

    /**
     * Create new FAQ
     */
    async createFaq(data: CreateFaqRequest): Promise<Faq> {
        const response = await faqApi.create(data);
        const apiResponse = response.data;

        // Check if request was successful
        if (!apiResponse?.success) {
            const errorMessage = (apiResponse as { message?: string })?.message || 'Failed to create FAQ';
            throw new Error(errorMessage);
        }

        // API returns success: true but no data field
        // Return the data from request as the created FAQ
        // The actual FAQ object will be fetched from the list if needed
        return {
            id: '', // Will be populated after creation
            serviceId: data.serviceId,
            faqCategoryId: data.faqCategoryId,
            question: data.question,
            answer: data.answer,
            isActive: data.isActive,
            createdAt: new Date(),
        } as Faq;
    },

    /**
     * Update existing FAQ
     */
    async updateFaq(id: string, data: UpdateFaqRequest): Promise<Faq> {
        const response = await faqApi.update(id, data);
        const apiResponse = response.data;

        // Check if request was successful
        if (!apiResponse?.success) {
            const errorMessage = (apiResponse as { message?: string })?.message || 'Failed to update FAQ';
            throw new Error(errorMessage);
        }

        // API returns success: true but no data field
        // Return the updated data from request
        // The actual FAQ object will be fetched from the list if needed
        return {
            id: data.id,
            serviceId: data.serviceId,
            faqCategoryId: data.faqCategoryId,
            question: data.question,
            answer: data.answer,
            isActive: data.isActive,
            createdAt: new Date(),
            modifiedAt: new Date(),
        } as Faq;
    },

    /**
     * Delete FAQ
     */
    async deleteFaq(id: string): Promise<void> {
        await faqApi.delete(id);
    },
};

