/**
 * Request types for Public Service News API
 */

export type CreatePublicServiceNewsRequest = {
    serviceId: string;
    newsCategoryId: string;
    staffId?: string;
    title: string;
    thumbnailUrl: string;
    content: string;
    summary: string;
    isPublished: boolean;
};

export type UpdatePublicServiceNewsRequest = {
    id: string;
    serviceId: string;
    newsCategoryId: string;
    staffId?: string;
    title: string;
    thumbnailUrl: string;
    content: string;
    summary: string;
    isPublished: boolean;
};

export type PublicServiceNewsFilters = {
    keyword?: string;
    serviceId?: string;
    newsCategoryId?: string;
    staffId?: string;
    isPublished?: boolean;
    page: number;
    size: number;
};

