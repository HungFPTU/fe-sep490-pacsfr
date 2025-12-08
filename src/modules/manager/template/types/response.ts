/**
 * Response types for Template API
 */

export type Template = {
    id: string;
    templateCode: string;
    templateName: string;
    filePath?: string;
    fileName?: string;
    fileSize?: number;
    description?: string;
    version?: string;
    docsTypeId: string;
    isActive: boolean;
    createdAt?: string | Date;
    createdBy?: string;
    modifiedAt?: string | Date;
    modifiedBy?: string;
    $id?: string;

    // Populated fields (optional)
    docsTypeName?: string;
    docTypeName?: string;

    // Legacy field names (for backward compatibility with API)
    sampleCode?: string;
    sampleName?: string;
};

