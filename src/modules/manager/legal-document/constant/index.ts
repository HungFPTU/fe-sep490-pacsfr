import { DocumentType, DocumentStatus } from '../enums';

// Document Type Options
export const DOCUMENT_TYPE_OPTIONS = [
    { value: DocumentType.LAW, label: "Luật" },
    { value: DocumentType.DECREE, label: "Nghị định" },
    { value: DocumentType.CIRCULAR, label: "Thông tư" },
    { value: DocumentType.DECISION, label: "Quyết định" },
    { value: DocumentType.DIRECTIVE, label: "Chỉ thị" },
    { value: DocumentType.NOTIFICATION, label: "Thông báo" },
    { value: DocumentType.OTHER, label: "Khác" }
];

// Document Status Options
export const DOCUMENT_STATUS_OPTIONS = [
    { value: DocumentStatus.DRAFT, label: "Nháp" },
    { value: DocumentStatus.PUBLISHED, label: "Đã công bố" },
    { value: DocumentStatus.EFFECTIVE, label: "Có hiệu lực" },
    { value: DocumentStatus.EXPIRED, label: "Hết hiệu lực" },
    { value: DocumentStatus.CANCELLED, label: "Đã hủy" }
];

// File Upload Configuration
export const FILE_UPLOAD_CONFIG = {
    ACCEPTED_TYPES: ['.pdf', '.doc', '.docx', '.txt'],
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_MIME_TYPES: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
    ]
};

// Pagination Defaults
export const PAGINATION_DEFAULTS = {
    PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
    MAX_PAGES_DISPLAYED: 5
};

// Table Configuration
export const TABLE_CONFIG = {
    DEFAULT_SORT_FIELD: 'createdAt',
    DEFAULT_SORT_ORDER: 'desc' as const,
    ROWS_PER_PAGE: 10
};
