/**
 * Required Document service layer
 */

import type { RestPaged } from '@/types/rest';
import { requiredDocumentApi } from '../api/required-document.api';
import type { RequiredDocument } from '../types/response';
import type {
    CreateRequiredDocumentRequest,
    UpdateRequiredDocumentRequest,
    RequiredDocumentFilters,
} from '../types/request';

export const requiredDocumentService = {
    async getRequiredDocuments(filters: RequiredDocumentFilters): Promise<RestPaged<RequiredDocument>> {
        const response = await requiredDocumentApi.getList(filters);
        return response.data;
    },

    async getRequiredDocumentById(id: string): Promise<RequiredDocument | null> {
        const response = await requiredDocumentApi.getById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        return response.data.data as RequiredDocument;
    },

    async createRequiredDocument(data: CreateRequiredDocumentRequest): Promise<RequiredDocument> {
        const response = await requiredDocumentApi.create(data);
        if (!response.data?.success || !response.data?.data) {
            const apiResponse = response.data as { message?: string } | undefined;
            throw new Error(apiResponse?.message || 'Tạo tài liệu yêu cầu thất bại');
        }
        return response.data.data as RequiredDocument;
    },

    async updateRequiredDocument(id: string, data: UpdateRequiredDocumentRequest): Promise<RequiredDocument> {
        const response = await requiredDocumentApi.update(id, data);
        if (!response.data?.success || !response.data?.data) {
            const apiResponse = response.data as { message?: string } | undefined;
            throw new Error(apiResponse?.message || 'Cập nhật tài liệu yêu cầu thất bại');
        }
        return response.data.data as RequiredDocument;
    },

    async deleteRequiredDocument(id: string): Promise<void> {
        await requiredDocumentApi.delete(id);
    },
};

