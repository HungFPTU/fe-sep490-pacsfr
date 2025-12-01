import { httpNoLoading } from '@/core/http/client';
import { API_PATH } from '@/core/config/api.path';
import type { PublicServiceNewsFilters, PublicServiceNews } from '../types';
import type { RestPaged, RestResponse } from '@/types/rest';

export const publicServiceNewsClientApi = {
    getList: async (filters: PublicServiceNewsFilters = {}): Promise<RestPaged<PublicServiceNews>> => {
        const response = await httpNoLoading.get<RestPaged<PublicServiceNews>>(
            API_PATH.CLIENT.PUBLIC_SERVICE_NEWS.ALL(
                filters.keyword ?? '',
                filters.serviceId ?? '',
                filters.newsCategoryId ?? '',
                filters.isPublished ?? true,
                filters.page ?? 1,
                filters.size ?? 6,
            )
        );
        return response.data;
    },

    getById: async (id: string): Promise<RestResponse<PublicServiceNews>> => {
        const response = await httpNoLoading.get<RestResponse<PublicServiceNews>>(
            API_PATH.CLIENT.PUBLIC_SERVICE_NEWS.BY_ID(id)
        );
        return response.data;
    },
};

