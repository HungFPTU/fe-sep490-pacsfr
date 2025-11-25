import type { Service } from "../types";
import type { ServiceFilters } from "../types/req";

const normalize = (value?: string | null) =>
    value?.toString().trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "") ?? "";

export const hasAdvancedFilters = (filters: ServiceFilters): boolean => {
    return Boolean(
        filters.serviceType ||
        filters.field ||
        filters.executionLevel ||
        typeof filters.onlineAvailable === "boolean" ||
        typeof filters.isActive === "boolean"
    );
};

export const filterServicesByAdvancedFilters = (services: Service[], filters: ServiceFilters): Service[] => {
    if (!hasAdvancedFilters(filters)) {
        return services;
    }

    return services.filter((service) => {
        if (filters.serviceType && service.serviceType !== filters.serviceType) {
            return false;
        }

        if (filters.field && service.field !== filters.field) {
            return false;
        }

        if (filters.executionLevel && service.executionLevel !== filters.executionLevel) {
            return false;
        }

        if (typeof filters.onlineAvailable === "boolean" && service.isOnlineAvailable !== filters.onlineAvailable) {
            return false;
        }

        if (typeof filters.isActive === "boolean" && service.isActive !== filters.isActive) {
            return false;
        }

        return true;
    });
};


