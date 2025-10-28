import type { DocumentType, DocumentStatus } from '../enums';

// Re-export types for external use
export type { DocumentType, DocumentStatus };

// Base Legal Document
export interface LegalDocument {
    id: string;
    documentNumber: string;
    documentType: DocumentType;
    name: string;
    issueDate: string | Date;
    issueBody: string;
    effectiveDate: string | Date;
    status: DocumentStatus;
    isActive: boolean;
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    createdAt: string | Date;
    updatedAt: string | Date;
    createdBy?: string;
    updatedBy?: string;
}

// Form Data
export interface LegalDocumentFormData {
    documentNumber: string;
    documentType: string;
    name: string;
    issueDate: string;
    issueBody: string;
    effectiveDate: string;
    status: string;
    isActive: boolean;
    file?: File;
}

// API Request Types
export interface CreateLegalDocumentRequest {
    documentNumber: string;
    documentType: DocumentType;
    name: string;
    issueDate: Date;
    issueBody: string;
    effectiveDate: Date;
    status: DocumentStatus;
    isActive: boolean;
    file?: File;
}

export interface UpdateLegalDocumentRequest {
    id: string;
    documentNumber: string;
    documentType: DocumentType;
    name: string;
    issueDate: Date;
    issueBody: string;
    effectiveDate: Date;
    status: DocumentStatus;
    isActive: boolean;
    file?: File;
}

// Filters
export interface LegalDocumentFilters {
    keyword?: string;
    documentType?: string;
    status?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

// API Response Types
export interface LegalDocumentListResponse {
    data: LegalDocument[];
    pagination: {
        page: number;
        size: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}

export interface LegalDocumentDetailResponse {
    data: LegalDocument;
}

// Service Options
export interface DocumentTypeOption {
    value: string;
    label: string;
}

export interface DocumentStatusOption {
    value: string;
    label: string;
}