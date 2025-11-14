/**
 * Public Service News response types for client module
 */

export type PublicServiceNews = {
    id: string;
    serviceId?: string;
    newsCategoryId?: string;
    title: string;
    slug?: string;
    thumbnailUrl?: string;
    content: string;
    summary: string;
    isPublished: boolean;
    createdAt: string | Date;
    createdBy?: string;
    modifiedAt?: string | Date;
    modifiedBy?: string;
    $id?: string;

    // Optional populated fields
    serviceName?: string;
    newsCategoryName?: string;
    staffName?: string;
};

