/**
 * Request types for Docs Type API
 */

export type CreateDocsTypeRequest = {
    docTypeCode?: string;
    docTypeName: string;
    description: string;
    groupId: string;
    isActive: boolean;
    fileFormat: string;
    maxFileSize: number;
    isRequired: boolean;
};

export type UpdateDocsTypeRequest = {
    id: string;
    docTypeCode?: string;
    docTypeName: string;
    description: string;
    groupId: string;
    isActive: boolean;
    fileFormat: string;
    maxFileSize: number;
    isRequired: boolean;
};

export type DocsTypeFilters = {
    keyword?: string;
    groupId?: string;
    isActive?: boolean;
    page: number;
    size: number;
};

