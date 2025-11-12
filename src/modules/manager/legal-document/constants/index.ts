// Document Types
export const DOCUMENT_TYPES = {
    LAW: 'LAW',
    DECREE: 'DECREE',
    CIRCULAR: 'CIRCULAR',
    DECISION: 'DECISION',
    NOTIFICATION: 'NOTIFICATION',
    DIRECTIVE: 'DIRECTIVE',
    RESOLUTION: 'RESOLUTION',
    OTHER: 'OTHER',
} as const;

// Document Status
export const DOCUMENT_STATUS = {
    DRAFT: 'Draft',
    ACTIVE: 'Active',
    EXPIRED: 'Expired',
    REPLACED: 'Replaced',
    CANCELLED: 'Cancelled',
} as const;

// Document Type Labels
export const DOCUMENT_TYPE_LABELS = {
    [DOCUMENT_TYPES.LAW]: 'Luật',
    [DOCUMENT_TYPES.DECREE]: 'Nghị định',
    [DOCUMENT_TYPES.CIRCULAR]: 'Thông tư',
    [DOCUMENT_TYPES.DECISION]: 'Quyết định',
    [DOCUMENT_TYPES.NOTIFICATION]: 'Thông báo',
    [DOCUMENT_TYPES.DIRECTIVE]: 'Chỉ thị',
    [DOCUMENT_TYPES.RESOLUTION]: 'Nghị quyết',
    [DOCUMENT_TYPES.OTHER]: 'Khác',
} as const;

// Document Status Labels
export const DOCUMENT_STATUS_LABELS = {
    [DOCUMENT_STATUS.DRAFT]: 'Nháp',
    [DOCUMENT_STATUS.ACTIVE]: 'Đã ban hành',
    [DOCUMENT_STATUS.EXPIRED]: 'Có hiệu lực',
    [DOCUMENT_STATUS.REPLACED]: 'Hết hiệu lực',
    [DOCUMENT_STATUS.CANCELLED]: 'Hủy bỏ',
} as const;

// File Upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = ['.pdf', '.doc', '.docx', '.txt'];

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];

export { CACHE_TIME, STALE_TIME } from '@/shared/constants/react-query';