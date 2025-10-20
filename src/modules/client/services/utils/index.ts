import { SERVICE_TYPE_COLORS, SERVICE_TYPE_CHIP_COLORS } from "../constants";
import type { Service, ServiceFilters } from "../types";

// Format currency for Vietnamese locale
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(amount);
};

// Format processing time
export const formatProcessingTime = (time: string): string => {
    return time;
};

// Get service type color class
export const getServiceTypeColor = (type: string): string => {
    return SERVICE_TYPE_COLORS[type as keyof typeof SERVICE_TYPE_COLORS] || "bg-gray-100 text-gray-800 border-gray-200";
};

// Get service type chip color for HeroUI
export const getServiceTypeChipColor = (type: string): "success" | "primary" | "default" => {
    return SERVICE_TYPE_CHIP_COLORS[type as keyof typeof SERVICE_TYPE_CHIP_COLORS] || "default";
};

// Format date for display
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// Format date time for display
export const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
};

// Generate service URL
export const generateServiceUrl = (serviceId: string): string => {
    return `/services/${serviceId}`;
};

// Generate search URL with params
export const generateSearchUrl = (params: Record<string, string | number | boolean | null | undefined>): string => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
            searchParams.append(key, value.toString());
        }
    });

    const queryString = searchParams.toString();
    return `/search${queryString ? `?${queryString}` : ""}`;
};

// Validate service filters
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

// Debounce function for search
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

// Check if service is available online
export const isServiceOnlineAvailable = (service: Service): boolean => {
    return service.isOnlineAvailable && service.isActive;
};

// Check if service is active
export const isServiceActive = (service: Service): boolean => {
    return service.isActive;
};

// Get service status text
export const getServiceStatusText = (isActive: boolean): string => {
    return isActive ? "Đang hoạt động" : "Không hoạt động";
};

// Get service status color
export const getServiceStatusColor = (isActive: boolean): "success" | "danger" => {
    return isActive ? "success" : "danger";
};
