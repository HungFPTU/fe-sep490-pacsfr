/**
 * SubmissionMethod API Layer
 * Raw HTTP calls to the backend
 */

import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestPaged } from '@/types/rest';
import type { SubmissionMethod } from '../types/response';
import type { CreateSubmissionMethodRequest, UpdateSubmissionMethodRequest, SubmissionMethodFilters } from '../types/request';

export const submissionMethodApi = {
    /**
     * Get all submission methods with filters and pagination
     */
    getList: (filters: SubmissionMethodFilters) => {
        return http.get<RestPaged<SubmissionMethod>>(
            API_PATH.MANAGER.SUBMISSION_METHOD.GET_ALL(
                filters.keyword || '',
                filters.isActive ?? true,
                filters.page,
                filters.size
            )
        );
    },

    /**
     * Get submission method by ID
     */
    getById: (id: string) => {
        return http.get<RestResponse<SubmissionMethod>>(
            API_PATH.MANAGER.SUBMISSION_METHOD.GET_BY_ID(id)
        );
    },

    /**
     * Create new submission method
     */
    create: (data: CreateSubmissionMethodRequest) => {
        return http.post<RestResponse<SubmissionMethod>>(
            API_PATH.MANAGER.SUBMISSION_METHOD.POST,
            data
        );
    },

    /**
     * Update existing submission method
     */
    update: (id: string, data: UpdateSubmissionMethodRequest) => {
        return http.put<RestResponse<SubmissionMethod>>(
            API_PATH.MANAGER.SUBMISSION_METHOD.PUT(id),
            data
        );
    },

    /**
     * Delete submission method (soft delete)
     */
    delete: (id: string) => {
        return http.delete<RestResponse<{ success: boolean }>>(
            API_PATH.MANAGER.SUBMISSION_METHOD.DELETE(id)
        );
    },
};

