/**
 * Response types for Docs Type Group API
 */

export type DocsTypeGroup = {
    id: string;
    groupCode: string;
    groupName: string;
    description: string;
    isActive: boolean;
    createdAt: string | Date;
    createdBy?: string;
    modifiedAt?: string | Date;
    modifiedBy?: string;
    $id?: string;
};

