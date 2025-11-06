/**
 * Response types for Docs Type API
 */

export type DocsType = {
    id: string;
    docTypeCode: string;
    docTypeName: string;
    description: string;
    groupId: string;
    isActive: boolean;
    fileFormat: string;
    maxFileSize: number;
    isRequired: boolean;
    createdAt: string | Date;
    createdBy?: string;
    modifiedAt?: string | Date;
    modifiedBy?: string;
    $id?: string;
    
    // Populated fields (optional)
    groupName?: string;
};

