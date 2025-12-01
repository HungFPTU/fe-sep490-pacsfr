/**
 * Filter params for fetching public service news on client
 */

export type PublicServiceNewsFilters = {
    keyword?: string;
    serviceId?: string;
    newsCategoryId?: string;
    isPublished?: boolean;
    isActive?: boolean;
    page?: number;
    size?: number;
};

