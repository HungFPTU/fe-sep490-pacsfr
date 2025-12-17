import type { RestPaged } from '@/types/rest';
import { paknCategoryApi } from '../api/pakn-category.api';
import type {
    CreatePaknCategoryRequest,
    UpdatePaknCategoryRequest,
    PaknCategoryFilters,
} from '../types/request';
import type { PaknCategory } from '../types/response';

export const paknCategoryService = {
    async getCategories(filters: PaknCategoryFilters): Promise<RestPaged<PaknCategory>> {
        const response = await paknCategoryApi.getList(filters);
        return response.data;
    },

    async getCategoryById(id: string): Promise<PaknCategory | null> {
        const response = await paknCategoryApi.getById(id);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        return response.data.data as PaknCategory;
    },

    async createCategory(data: CreatePaknCategoryRequest): Promise<PaknCategory> {
        const response = await paknCategoryApi.create(data);
        if (!response.data?.success || !response.data?.data) {
            const apiResponse = response.data as { message?: string };
            throw new Error(apiResponse?.message || 'Không thể tạo danh mục');
        }
        return response.data.data as PaknCategory;
    },

    async updateCategory(id: string, data: UpdatePaknCategoryRequest): Promise<PaknCategory> {
        const response = await paknCategoryApi.update(id, data);
        if (!response.data?.success || !response.data?.data) {
            const apiResponse = response.data as { message?: string };
            throw new Error(apiResponse?.message || 'Không thể cập nhật danh mục');
        }
        return response.data.data as PaknCategory;
    },

    async deleteCategory(id: string): Promise<void> {
        await paknCategoryApi.delete(id);
    },
};

