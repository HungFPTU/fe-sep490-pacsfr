import { API_PATH } from '@/core/config/api.path';
import { http } from '@core/http/client';
import { RestResponse } from '@/types/rest';
import {
    FastInputCheckResponse,
    CreateLegislationDocumentRequest,
    CreateDocsTypeRequest,
    CreateSubmissionMethodRequest,
    CreateServiceAgencyRequest,
    FastInputCreateServiceRequest
} from '../types/fast-input.types';

export const fastInputService = {
    checkDocx: async (file: File): Promise<FastInputCheckResponse> => {
        const formData = new FormData();
        formData.append('file', file);

        // Assuming the API returns RestResponse<FastInputCheckResponse>
        const response = await http.post<RestResponse<FastInputCheckResponse>>(API_PATH.MANAGER.FAST_INPUT.CHECK_DOCX, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.data && (response.data as any).data) {
            return (response.data as any).data;
        }

        // Fallback or explicit type cast if structure matches
        return response.data as unknown as FastInputCheckResponse;
    },

    createLegislationDocument: async (data: CreateLegislationDocumentRequest) => {
        const response = await http.post<RestResponse<any>>(API_PATH.MANAGER.FAST_INPUT.CREATE_LEGISLATION_DOCUMENT, data);
        return response.data;
    },

    createDocsType: async (data: CreateDocsTypeRequest) => {
        const response = await http.post<RestResponse<any>>(API_PATH.MANAGER.FAST_INPUT.CREATE_DOCS_TYPE, data);
        return response.data;
    },

    createSubmissionMethod: async (data: CreateSubmissionMethodRequest) => {
        const response = await http.post<RestResponse<any>>(API_PATH.MANAGER.FAST_INPUT.CREATE_SUBMISSION_METHOD, data);
        return response.data;
    },

    createServiceAgency: async (data: CreateServiceAgencyRequest) => {
        const response = await http.post<RestResponse<any>>(API_PATH.MANAGER.FAST_INPUT.CREATE_SERVICE_AGENCY, data);
        return response.data;
    },

    createService: async (data: FastInputCreateServiceRequest) => {
        const response = await http.post<RestResponse<any>>(API_PATH.MANAGER.FAST_INPUT.CREATE_SERVICE, data);
        return response.data;
    }
};
