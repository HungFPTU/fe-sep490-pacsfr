import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse, RestMany } from '@/types/rest';
import type {
    LegalDocument,
    CreateLegalDocumentRequest,
    UpdateLegalDocumentRequest,
    LegalDocumentFilters
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

    // POST create - Always use JSON (no file in this step)
    create: (data: CreateLegalDocumentRequest) => {
        console.log('[LegalDocument API] Creating JSON request:', data);

        // Always use JSON request for document creation
        return http.post<RestResponse<LegalDocument>>(
            API_PATH.MANAGER.LEGAL_DOCUMENT.POST,
            {
                documentNumber: data.documentNumber,
                documentType: data.documentType,
                name: data.name,
                issueDate: data.issueDate,
                issueBody: data.issueBody,
                effectiveDate: data.effectiveDate,
                status: data.status,
                isActive: data.isActive,
                // Note: file will be uploaded separately
            }
        );
    },

    // PUT update - Always use JSON (no file in this step)
    update: (id: string, data: UpdateLegalDocumentRequest) => {
        console.log('[LegalDocument API] Updating JSON request:', { id, data });

        // Always use JSON request for document update
        return http.put<RestResponse<LegalDocument>>(
            API_PATH.MANAGER.LEGAL_DOCUMENT.PUT(id),
            {
                id: data.id,
                documentNumber: data.documentNumber,
                documentType: data.documentType,
                name: data.name,
                issueDate: data.issueDate,
                issueBody: data.issueBody,
                effectiveDate: data.effectiveDate,
                status: data.status,
                isActive: data.isActive,
                // Note: file will be uploaded separately if needed
            }
        );
    },

    // DELETE
    delete: (id: string) => {
        return http.delete<RestResponse<object>>(
            API_PATH.MANAGER.LEGAL_DOCUMENT.DELETE(id)
        );
    },

    // Upload file - Separate step after document creation/update
    uploadFile: (id: string, file: File) => {
        console.log('[LegalDocument API] Uploading file:', { id, fileName: file.name, fileSize: file.size, fileType: file.type });

        const formData = new FormData();
        formData.append('file', file);

        // Debug FormData contents
        console.log('[LegalDocument API] FormData entries:');
        for (const [key, value] of formData.entries()) {
            console.log(`  ${key}:`, value);
        }

        return http.post<RestResponse<object>>(
            API_PATH.MANAGER.LEGAL_DOCUMENT.UPLOAD_FILE(id),
            formData
            // Don't set Content-Type manually - let browser set it with boundary
        );
    },

    // Download file
    downloadFile: (id: string) => {
        return http.get(
            API_PATH.MANAGER.LEGAL_DOCUMENT.DOWNLOAD_FILE(id)
            // Note: responseType is handled by the HTTP client automatically for blob responses
        );
    },
};
