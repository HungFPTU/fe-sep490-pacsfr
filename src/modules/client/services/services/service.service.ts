import { serviceApi } from "../api/service.api";
import { API_ENDPOINTS, UI_CONSTANTS } from "../constants";
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
    // Get services with search and filter
    static async getServices(filters: ServiceFilters): Promise<ServiceListResponse> {
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

    // Get service by ID
    static async getServiceById(id: string): Promise<ServiceDetailResponse> {
        try {
            return await serviceApi.getServiceById(id);
        } catch (error) {
            console.error("Error fetching service detail:", error);
            throw error;
        }
    }

    // Get featured services for homepage
    static async getFeaturedServices(limit: number = UI_CONSTANTS.MAX_FEATURED_SERVICES): Promise<Service[]> {
        try {
            const response = await serviceApi.getServices({
                isActive: true,
                size: limit,
                page: 1,
            });
            return response.data.items.$values;
        } catch (error) {
            console.error("Error fetching featured services:", error);
            throw error;
        }
    }

    // Search services by keyword
    static async searchServices(keyword: string, page: number = 1, size: number = 10): Promise<ServiceListResponse> {
        try {
            return await serviceApi.getServices({
                keyword,
                isActive: true,
                page,
                size,
            });
        } catch (error) {
            console.error("Error searching services:", error);
            throw error;
        }
    }

    // Get service groups for filter
    static async getServiceGroups(): Promise<ServiceGroupListResponse> {
        try {
            return await serviceApi.getServiceGroups();
        } catch (error) {
            console.error("Error fetching service groups:", error);
            throw error;
        }
    }

    // Get legal basis for filter
    static async getLegalBasis(): Promise<LegalBasisListResponse> {
        try {
            return await serviceApi.getLegalBasis();
        } catch (error) {
            console.error("Error fetching legal basis:", error);
            throw error;
        }
    }

    // Format fee amount for display
    static formatFeeAmount(amount: number): string {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    }

    // Format processing time for display
    static formatProcessingTime(time: string): string {
        return time;
    }

    // Get service type badge color
    static getServiceTypeColor(type: string): string {
        switch (type) {
            case "Trực tuyến":
                return "bg-green-100 text-green-800";
            case "Trực tiếp":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    }
}
