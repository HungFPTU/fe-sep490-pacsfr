/**
 * Required Document API layer
 */

import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestPaged, RestResponse } from '@/types/rest';
import type { RequiredDocument } from '../types/response';
import type {
    CreateRequiredDocumentRequest,
    UpdateRequiredDocumentRequest,
    RequiredDocumentFilters,
} from '../types/request';

export const requiredDocumentApi = {
    getList: (filters: RequiredDocumentFilters) => {
        return http.get<RestPaged<RequiredDocument>>(
            API_PATH.MANAGER.REQUIRED_DOCUMENT.GET_ALL(
                filters.keyword || '',
                filters.serviceId || '',
                filters.docTypeId || '',
                filters.isActive ?? true,
                filters.page,
                filters.size,
            ),
        );
    },

    getById: (id: string) => {
        return http.get<RestResponse<RequiredDocument>>(
            API_PATH.MANAGER.REQUIRED_DOCUMENT.GET_BY_ID(id),
        );
    },

    create: (data: CreateRequiredDocumentRequest) => {
        return http.post<RestResponse<RequiredDocument>>(
            API_PATH.MANAGER.REQUIRED_DOCUMENT.POST,
            data,
        );
    },

    update: (id: string, data: UpdateRequiredDocumentRequest) => {
        return http.put<RestResponse<RequiredDocument>>(
            API_PATH.MANAGER.REQUIRED_DOCUMENT.PUT(id),
            data,
        );
    },

    delete: (id: string) => {
        return http.delete<RestResponse<{ success: boolean }>>(
            API_PATH.MANAGER.REQUIRED_DOCUMENT.DELETE(id),
        );
    },
};

