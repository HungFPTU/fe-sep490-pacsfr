import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestMany } from '@/types/rest';
import type {
    LegalDocument,
    CreateLegalDocumentRequest,
    UpdateLegalDocumentRequest,
    LegalDocumentFilters,
    LegalDocumentListResponse,
    LegalDocumentDetailResponse
} from '../types';

export const legalDocumentApi = {
    // GET list với filters
    getList: (filters: LegalDocumentFilters) => {
        return http.get<RestMany<LegalDocument>>(
            API_PATH.MANAGER.LEGAL_DOCUMENT.GET_ALL(
                filters.keyword || '',
                filters.documentType || '',
                filters.status || '',
                filters.isActive ?? true,
                filters.page || 1,
                filters.size || 10
            )
        );
    },

    // GET detail by ID
    getById: (id: string) => {
        return http.get<RestResponse<LegalDocument>>(
            API_PATH.MANAGER.LEGAL_DOCUMENT.GET_BY_ID(id)
        );
    },

    // POST create
    create: (data: CreateLegalDocumentRequest) => {
        const formData = new FormData();
        formData.append('DocumentNumber', data.documentNumber);
        formData.append('DocumentType', data.documentType);
        formData.append('Name', data.name);
        formData.append('IssueDate', data.issueDate.toString());
        formData.append('IssueBody', data.issueBody);
        formData.append('EffectiveDate', data.effectiveDate.toString());
        formData.append('Status', data.status);
        formData.append('IsActive', data.isActive.toString());

        if (data.file) {
            formData.append('File', data.file);
        }

        return http.post<RestResponse<LegalDocument>>(
            API_PATH.MANAGER.LEGAL_DOCUMENT.POST,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
    },

    // PUT update
    update: (id: string, data: UpdateLegalDocumentRequest) => {
        const formData = new FormData();
        formData.append('DocumentNumber', data.documentNumber);
        formData.append('DocumentType', data.documentType);
        formData.append('Name', data.name);
        formData.append('IssueDate', data.issueDate.toString());
        formData.append('IssueBody', data.issueBody);
        formData.append('EffectiveDate', data.effectiveDate.toString());
        formData.append('Status', data.status);
        formData.append('IsActive', data.isActive.toString());

        if (data.file) {
            formData.append('File', data.file);
        }

        return http.put<RestResponse<LegalDocument>>(
            API_PATH.MANAGER.LEGAL_DOCUMENT.PUT(id),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
    },

    // DELETE
    delete: (id: string) => {
        return http.delete<RestResponse<object>>(
            API_PATH.MANAGER.LEGAL_DOCUMENT.DELETE(id)
        );
    },

    // Upload file
    uploadFile: (id: string, file: File) => {
        const formData = new FormData();
        formData.append('File', file);

        return http.post<RestResponse<object>>(
            API_PATH.MANAGER.LEGAL_DOCUMENT.UPLOAD_FILE(id),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
    },

    // Download file
    downloadFile: (id: string) => {
        return http.get(
            API_PATH.MANAGER.LEGAL_DOCUMENT.DOWNLOAD_FILE(id),
            {
                responseType: 'blob',
            }
        );
    },
};
