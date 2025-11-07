/**
 * Request types for Docs Type Group API
 */

export type CreateDocsTypeGroupRequest = {
    groupCode: string;
    groupName: string;
    description: string;
    isActive: boolean;
};

export type UpdateDocsTypeGroupRequest = {
    id: string;
    groupCode: string;
    groupName: string;
    description: string;
    isActive: boolean;
};

export type DocsTypeGroupFilters = {
    keyword?: string;
    isActive?: boolean;
    page: number;
    size: number;
};

