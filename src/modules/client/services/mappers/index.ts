/**
 * Mappers Module
 * 
 * Maps API response data to domain models and vice versa.
 * Follows Data Transfer Object (DTO) pattern.
 */

import type { Service, ServiceListResponse, ServiceDetailResponse } from '../types';

/**
 * Extract services from paginated response
 */
export const extractServicesFromPage = (response: ServiceListResponse): Service[] => {
    if (!response?.data?.items?.$values) {
        return [];
    }
    return response.data.items.$values;
};

/**
 * Extract service from detail response
 */
export const extractServiceFromDetail = (response: ServiceDetailResponse): Service | null => {
    if (!response || !response.data) {
        return null;
    }
    return response.data as Service;
};

