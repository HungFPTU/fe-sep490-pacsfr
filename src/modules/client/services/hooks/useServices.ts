"use client";

import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { ServiceService } from "../services/service.service";
import { extractServiceFromDetail } from "../mappers";
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from "../constants";
import type { ServiceFilters } from "../types/req";

// Use constants for query keys
export const serviceKeys = QUERY_KEYS;

// Hook for getting services with filters
export const useServices = (filters: ServiceFilters) => {
    return useQuery({
        queryKey: serviceKeys.SERVICE_LIST(filters),
        queryFn: () => ServiceService.getServices(filters),
        staleTime: STALE_TIME.MEDIUM,
        gcTime: CACHE_TIME.LONG,
    });
};

// Hook for getting service by ID
export const useService = (id: string) => {
    return useQuery({
        queryKey: serviceKeys.SERVICE_DETAIL(id),
        queryFn: () => {
            console.log('[useService] Fetching service with id:', id);
            return ServiceService.getServiceById(id);
        },
        enabled: !!id && id.length > 0,
        staleTime: STALE_TIME.MEDIUM,
        gcTime: CACHE_TIME.LONG,
    });
};

// Hook for featured services (homepage)
export const useFeaturedServices = (limit: number = 6) => {
    return useQuery({
        queryKey: [...serviceKeys.FEATURED_SERVICES(), limit],
        queryFn: () => ServiceService.getFeaturedServices(limit),
        staleTime: STALE_TIME.LONG,
        gcTime: CACHE_TIME.VERY_LONG,
    });
};

// Hook for searching services
export const useSearchServices = (keyword: string, page: number = 1, size: number = 10) => {
    return useQuery({
        queryKey: serviceKeys.SEARCH_SERVICES(keyword, page, size),
        queryFn: () => ServiceService.searchServices(keyword, page, size),
        enabled: !!keyword && keyword.length > 0,
        staleTime: STALE_TIME.SHORT,
        gcTime: CACHE_TIME.MEDIUM,
    });
};

// Hook for service filters state management
export const useServiceFilters = (initialFilters: Partial<ServiceFilters> = {}) => {
    const [filters, setFilters] = useState<ServiceFilters>({
        keyword: "",
        serviceGroupId: "",
        legalBasisId: "",
        isActive: null,
        page: 1,
        size: 10,
        implementingAgency: "",
        field: "",
        implementationLevel: "",
        targetAudience: "",
        searchBy: "department",
        ...initialFilters,
    });

    const updateFilter = useCallback((key: keyof ServiceFilters, value: string | boolean | null) => {
        setFilters(prev => ({
            ...prev,
            [key]: value as string | boolean | null,
            page: key !== "page" ? 1 : (value as unknown as number), // Reset to page 1 when other filters change
        }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({
            keyword: "",
            serviceGroupId: "",
            legalBasisId: "",
            isActive: null,
            page: 1,
            size: 10,
            implementingAgency: "",
            field: "",
            implementationLevel: "",
            targetAudience: "",
            searchBy: "department",
        });
    }, []);

    const setPage = useCallback((page: number) => {
        setFilters(prev => ({ ...prev, page }));
    }, []);

    return {
        filters,
        updateFilter,
        resetFilters,
        setPage,
    };
};

// Hook for service groups (for filter dropdown)
export const useServiceGroups = () => {
    return useQuery({
        queryKey: serviceKeys.SERVICE_GROUPS(),
        queryFn: ServiceService.getServiceGroups,
        staleTime: STALE_TIME.VERY_LONG,
        gcTime: CACHE_TIME.VERY_LONG,
    });
};

// Hook for legal basis (for filter dropdown)
export const useLegalBasis = () => {
    return useQuery({
        queryKey: serviceKeys.LEGAL_BASIS(),
        queryFn: ServiceService.getLegalBasis,
        staleTime: STALE_TIME.VERY_LONG,
        gcTime: CACHE_TIME.VERY_LONG,
    });
};
