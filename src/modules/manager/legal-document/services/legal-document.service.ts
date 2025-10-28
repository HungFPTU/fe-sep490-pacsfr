import { legalDocumentApi } from '../api/legal-document.api';
import { DOCUMENT_TYPE_OPTIONS, DOCUMENT_STATUS_OPTIONS } from '../constant';
import { DocumentType, DocumentStatus } from '../enums';
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

    // Create new legal document
    static async createLegalDocument(data: CreateLegalDocumentRequest) {
        try {
            const response = await legalDocumentApi.create(data);
            return response.data;
        } catch (error) {
            console.error("Error creating legal document:", error);
            throw error;
        }
    }

    // Update legal document
    static async updateLegalDocument(id: string, data: UpdateLegalDocumentRequest) {
        try {
            const response = await legalDocumentApi.update(id, data);
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
        const typeMap: Record<string, string> = {
            [DocumentType.LAW]: "Luật",
            [DocumentType.DECREE]: "Nghị định",
            [DocumentType.CIRCULAR]: "Thông tư",
            [DocumentType.DECISION]: "Quyết định",
            [DocumentType.DIRECTIVE]: "Chỉ thị",
            [DocumentType.NOTIFICATION]: "Thông báo",
            [DocumentType.OTHER]: "Khác"
        };
        return typeMap[type] || type;
    }

    // Format document status for display
    static formatDocumentStatus(status: string): string {
        const statusMap: Record<string, string> = {
            [DocumentStatus.DRAFT]: "Nháp",
            [DocumentStatus.PUBLISHED]: "Đã công bố",
            [DocumentStatus.EFFECTIVE]: "Có hiệu lực",
            [DocumentStatus.EXPIRED]: "Hết hiệu lực",
            [DocumentStatus.CANCELLED]: "Đã hủy"
        };
        return statusMap[status] || status;
    }

    // Get status color for UI
    static getStatusColor(status: string): string {
        const colorMap: Record<string, string> = {
            [DocumentStatus.DRAFT]: "warning",
            [DocumentStatus.PUBLISHED]: "primary",
            [DocumentStatus.EFFECTIVE]: "success",
            [DocumentStatus.EXPIRED]: "danger",
            [DocumentStatus.CANCELLED]: "default"
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
        return DOCUMENT_TYPE_OPTIONS;
    }

    // Get document status options
    static getDocumentStatusOptions() {
        return DOCUMENT_STATUS_OPTIONS;
    }
}
