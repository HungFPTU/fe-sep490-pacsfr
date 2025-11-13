/**
 * Service Service Layer
 * 
 * Business logic layer for service operations.
 * Follows Service Layer pattern - encapsulates business logic and coordinates between API and domain.
 */

import { serviceApi } from "../api/service.api";
import { UI_CONSTANTS } from "../constants";
import { extractServicesFromPage } from "../mappers";
import { validateServiceFilters } from "../helpers";
import type {
    Service,
    ServiceListResponse,
    ServiceDetailResponse,
    ServiceSearchRequest,
    ServiceFilters,
    ServiceGroupListResponse,
    LegalBasisListResponse,
} from "../types";

export class ServiceService {
    /**
     * Get services with search and filter
     * Validates filters before making API call
     */
    static async getServices(filters: ServiceFilters): Promise<ServiceListResponse> {
        // Validate filters
        if (!validateServiceFilters(filters)) {
            throw new Error("Invalid service filters");
        }

        try {
            const params: ServiceSearchRequest = {
                keyword: filters.keyword || undefined,
                serviceGroupId: filters.serviceGroupId || undefined,
                legalBasisId: filters.legalBasisId || undefined,
                isActive: filters.isActive !== null ? filters.isActive : undefined,
                page: filters.page,
                size: filters.size,
            };

            return await serviceApi.getServices(params);
        } catch (error) {
            console.error("Error fetching services:", error);
            throw error;
        }
    }

    /**
     * Get service by ID
     */
    static async getServiceById(id: string): Promise<ServiceDetailResponse> {
        if (!id || id.trim() === '') {
            throw new Error("Service ID is required");
        }

        try {
            return await serviceApi.getServiceById(id);
        } catch (error) {
            console.error("Error fetching service detail:", error);
            throw error;
        }
    }

    /**
     * Get featured services for homepage
     */
    static async getFeaturedServices(limit: number = UI_CONSTANTS.MAX_FEATURED_SERVICES): Promise<Service[]> {
        try {
            const response = await serviceApi.getServices({
                isActive: true,
                size: limit,
                page: 1,
            });
            return extractServicesFromPage(response);
        } catch (error) {
            console.error("Error fetching featured services:", error);
            throw error;
        }
    }

    /**
     * Search services by keyword
     */
    static async searchServices(keyword: string, page: number = 1, size: number = 10): Promise<ServiceListResponse> {
        if (!keyword || keyword.trim() === '') {
            throw new Error("Search keyword is required");
        }

        try {
            return await serviceApi.getServices({
                keyword: keyword.trim(),
                isActive: true,
                page,
                size,
            });
        } catch (error) {
            console.error("Error searching services:", error);
            throw error;
        }
    }

    /**
     * Get service groups for filter
     */
    static async getServiceGroups(): Promise<ServiceGroupListResponse> {
        try {
            return await serviceApi.getServiceGroups();
        } catch (error) {
            console.error("Error fetching service groups:", error);
            throw error;
        }
    }

    /**
     * Get legal basis for filter
     */
    static async getLegalBasis(): Promise<LegalBasisListResponse> {
        try {
            return await serviceApi.getLegalBasis();
        } catch (error) {
            console.error("Error fetching legal basis:", error);
            throw error;
        }
    }
}
