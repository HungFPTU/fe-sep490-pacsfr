import { DOCUMENT_TYPES, DOCUMENT_STATUS } from '../constants';

export type DocumentType = typeof DOCUMENT_TYPES[keyof typeof DOCUMENT_TYPES];
export type DocumentStatus = typeof DOCUMENT_STATUS[keyof typeof DOCUMENT_STATUS];

export enum DocumentTypeEnum {
    LAW = 'LAW',
    DECREE = 'DECREE',
    CIRCULAR = 'CIRCULAR',
    DECISION = 'DECISION',
    NOTIFICATION = 'NOTIFICATION',
    DIRECTIVE = 'DIRECTIVE',
    RESOLUTION = 'RESOLUTION',
    OTHER = 'OTHER',
}

export enum DocumentStatusEnum {
    DRAFT = 'Draft',
    ACTIVE = 'Active',
    EXPIRED = 'Expired',
    REPLACED = 'Replaced',
    CANCELLED = 'Cancelled',
}