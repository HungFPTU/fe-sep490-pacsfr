/**
 * Request types for Template API
 */

export type CreateTemplateRequest = {
    templateCode: string;
    templateName: string;
    filePath?: string;
    fileName?: string;
    fileSize?: number;
    description?: string;
    version?: string;
    docsTypeId: string;
    isActive: boolean;
};

export type UpdateTemplateRequest = {
    id: string;
    sampleCode?: string;
    sampleName?: string;
    templateCode?: string;
    templateName?: string;
    filePath?: string;
    fileName?: string;
    fileSize?: number | undefined;
    description?: string | undefined;
    version?: string | undefined;
    docsTypeId: string;
    isActive: boolean;
};

export type TemplateFilters = {
    keyword?: string;
    docsTypeId?: string;
    isActive?: boolean;
    page: number;
    size: number;
};

