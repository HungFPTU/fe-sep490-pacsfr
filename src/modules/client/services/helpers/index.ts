/**
 * Helpers Module
 * 
 * Utility functions for service-related operations.
 * Includes validation, transformation, and business logic helpers.
 */

import type { Service, ServiceFilters } from '../types';

/**
 * Validate service filters
 */
export const validateServiceFilters = (filters: ServiceFilters): boolean => {
    if (!filters) return false;

    // Check if page is valid
    if (filters.page && (filters.page < 1 || !Number.isInteger(filters.page))) {
        return false;
    }

    // Check if size is valid
    if (filters.size && (filters.size < 1 || filters.size > 100 || !Number.isInteger(filters.size))) {
        return false;
    }

    return true;
};

/**
 * Check if service is available online
 */
export const isServiceOnlineAvailable = (service: Service): boolean => {
    return service.isOnlineAvailable === true && service.isActive === true;
};

/**
 * Check if service is active
 */
export const isServiceActive = (service: Service): boolean => {
    return service.isActive === true;
};

/**
 * Get service status text
 */
export const getServiceStatusText = (isActive: boolean): string => {
    return isActive ? "Đang hoạt động" : "Không hoạt động";
};

/**
 * Get service status color
 */
export const getServiceStatusColor = (isActive: boolean): "success" | "danger" => {
    return isActive ? "success" : "danger";
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
};

/**
 * Generate service URL
 */
export const generateServiceUrl = (serviceId: string): string => {
    return `/thu-tuc-hanh-chinh/${serviceId}`;
};

/**
 * Generate search URL with params
 */
export const generateSearchUrl = (params: Record<string, string | number | boolean | null | undefined>): string => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
            searchParams.append(key, value.toString());
        }
    });

    const queryString = searchParams.toString();
    return `/thu-tuc-hanh-chinh${queryString ? `?${queryString}` : ""}`;
};

/**
 * Debounce function for search
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

