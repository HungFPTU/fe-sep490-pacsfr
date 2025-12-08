import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestPaged, RestResponse } from '@/types/rest';
import type { PaknCategory } from '../types/response';
import type {
    CreatePaknCategoryRequest,
    UpdatePaknCategoryRequest,
    PaknCategoryFilters,
} from '../types/request';

export const paknCategoryApi = {
    getList: (filters: PaknCategoryFilters) => {
        const keyword = filters.keyword?.trim() ?? '';
        return http.get<RestPaged<PaknCategory>>(
            API_PATH.MANAGER.PAKN_CATEGORY.GET_ALL(keyword, filters.isActive, filters.page, filters.size),
        );
    },

    getById: (id: string) => {
        return http.get<RestResponse<PaknCategory>>(API_PATH.MANAGER.PAKN_CATEGORY.GET_BY_ID(id));
    },

    create: (data: CreatePaknCategoryRequest) => {
        return http.post<RestResponse<PaknCategory>>(API_PATH.MANAGER.PAKN_CATEGORY.POST, data);
    },

    update: (id: string, data: UpdatePaknCategoryRequest) => {
        return http.put<RestResponse<PaknCategory>>(API_PATH.MANAGER.PAKN_CATEGORY.PUT(id), data);
    },

    delete: (id: string) => {
        return http.delete(API_PATH.MANAGER.PAKN_CATEGORY.DELETE(id));
    },
};

