import { legalDocumentApi } from '../api/legal-document.api';
import { DOCUMENT_TYPE_LABELS, DOCUMENT_STATUS_LABELS } from '../constants';
import { FileUploadService } from '@/core/services/file-upload.service';
import type {
    CreateLegalDocumentRequest,
    UpdateLegalDocumentRequest,
    LegalDocumentFilters
} from '../types';

export class LegalDocumentService {
    // Get legal documents list with filters
    static async getLegalDocuments(filters: LegalDocumentFilters) {
        try {
            const response = await legalDocumentApi.getList(filters);
            return response.data;
        } catch (error) {
            console.error("Error fetching legal documents:", error);
            throw error;
        }
    }

    // Get legal document by ID
    static async getLegalDocumentById(id: string) {
        try {
            const response = await legalDocumentApi.getById(id);
            return response.data;
        } catch (error) {
            console.error("Error fetching legal document detail:", error);
            throw error;
        }
    }

    // Create new legal document (two-step process)
    static async createLegalDocument(data: CreateLegalDocumentRequest) {
        try {
            console.log('[LegalDocument Service] Creating document:', data);

            // Step 1: Upload file first if exists
            let fileUrl = data.fileUrl || '';
            console.log('[LegalDocument Service] File check:', {
                hasFile: !!data.file,
                hasFileUrl: !!data.fileUrl,
                fileUrl: data.fileUrl
            });

            if (data.file) {
                console.log('[LegalDocument Service] Uploading new file...');
                const uploadResult = await FileUploadService.uploadFile(data.file, 'legal_documents');
                fileUrl = uploadResult.data.fileUrl;
                console.log('[LegalDocument Service] File uploaded, URL:', fileUrl);
            } else if (data.fileUrl) {
                console.log('[LegalDocument Service] Using existing fileUrl (no upload needed):', data.fileUrl);
                fileUrl = data.fileUrl;
            } else {
                console.log('[LegalDocument Service] No file provided');
            }

            // Step 2: Create document with fileUrl
            const documentData = {
                ...data,
                fileUrl,
                file: undefined, // Remove file from data
            };

            const response = await legalDocumentApi.create(documentData);
            console.log('[LegalDocument Service] Document created:', response.data);

            return response.data;
        } catch (error) {
            console.error("Error creating legal document:", error);
            throw error;
        }
    }

    // Update legal document (two-step process)
    static async updateLegalDocument(id: string, data: UpdateLegalDocumentRequest) {
        try {
            console.log('[LegalDocument Service] Updating document:', { id, data });

            // Step 1: Upload file first if exists
            let fileUrl = data.fileUrl || '';
            console.log('[LegalDocument Service] File check:', {
                hasFile: !!data.file,
                hasFileUrl: !!data.fileUrl,
                fileUrl: data.fileUrl
            });

            if (data.file) {
                console.log('[LegalDocument Service] Uploading new file...');
                const uploadResult = await FileUploadService.uploadFile(data.file, 'legal_documents');
                fileUrl = uploadResult.data.fileUrl;
                console.log('[LegalDocument Service] File uploaded, URL:', fileUrl);
            } else if (data.fileUrl) {
                console.log('[LegalDocument Service] Using existing fileUrl (no upload needed):', data.fileUrl);
                fileUrl = data.fileUrl;
            } else {
                console.log('[LegalDocument Service] No file provided');
            }

            // Step 2: Update document with fileUrl
            const documentData = {
                ...data,
                fileUrl,
                file: undefined, // Remove file from data
            };

            const response = await legalDocumentApi.update(id, documentData);
            console.log('[LegalDocument Service] Document updated:', response.data);

            return response.data;
        } catch (error) {
            console.error("Error updating legal document:", error);
            throw error;
        }
    }

    // Delete legal document
    static async deleteLegalDocument(id: string) {
        try {
            const response = await legalDocumentApi.delete(id);
            return response.data;
        } catch (error) {
            console.error("Error deleting legal document:", error);
            throw error;
        }
    }

    // Upload file for legal document
    static async uploadFile(id: string, file: File) {
        try {
            const response = await legalDocumentApi.uploadFile(id, file);
            return response.data;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    }

    // Download file for legal document
    static async downloadFile(id: string) {
        try {
            const response = await legalDocumentApi.downloadFile(id);
            return response;
        } catch (error) {
            console.error("Error downloading file:", error);
            throw error;
        }
    }

    // Format document type for display
    static formatDocumentType(type: string): string {
        return DOCUMENT_TYPE_LABELS[type as keyof typeof DOCUMENT_TYPE_LABELS] || type;
    }

    // Format document status for display
    static formatDocumentStatus(status: string): string {
        return DOCUMENT_STATUS_LABELS[status as keyof typeof DOCUMENT_STATUS_LABELS] || status;
    }

    // Get status color for UI
    static getStatusColor(status: string): string {
        const colorMap: Record<string, string> = {
            'DRAFT': "warning",
            'PUBLISHED': "primary",
            'EFFECTIVE': "success",
            'EXPIRED': "danger",
            'CANCELLED': "default"
        };
        return colorMap[status] || "default";
    }

    // Format date for display
    static formatDate(date: string | Date): string {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleDateString('vi-VN');
    }

    // Format file size for display
    static formatFileSize(bytes?: number): string {
        if (!bytes) return "";
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    // Validate document number format
    static validateDocumentNumber(documentNumber: string): boolean {
        // Basic validation - can be enhanced based on requirements
        return documentNumber.trim().length > 0;
    }

    // Validate date range
    static validateDateRange(issueDate: string | Date, effectiveDate: string | Date): boolean {
        const issue = new Date(issueDate);
        const effective = new Date(effectiveDate);
        return effective >= issue;
    }

    // Get document type options
    static getDocumentTypeOptions() {
        return Object.entries(DOCUMENT_TYPE_LABELS).map(([value, label]) => ({
            value,
            label,
        }));
    }

    // Get document status options
    static getDocumentStatusOptions() {
        return Object.entries(DOCUMENT_STATUS_LABELS).map(([value, label]) => ({
            value,
            label,
        }));
    }
}

export const legalDocumentService = new LegalDocumentService();
