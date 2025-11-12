/**
 * Response types for Public Service News API
 */

export type PublicServiceNews = {
    id: string;
    serviceId: string;
    newsCategoryId: string;
    staffId: string;
    title: string;
    slug?: string;
    thumbnailUrl: string;
    content: string;
    summary: string;
    isPublished: boolean;
    createdAt: string | Date;
    createdBy?: string;
    modifiedAt?: string | Date;
    modifiedBy?: string;
    $id?: string;

    // Populated fields (optional)
    serviceName?: string;
    categoryName?: string;
    newsCategoryName?: string;
    staffName?: string;
};

