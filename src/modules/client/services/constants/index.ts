import { PageSize, SortField, SortOrder } from "../enums";
import type { ServiceFilters } from "../types";

// Default pagination settings
export const DEFAULT_PAGE_SIZE = PageSize.SMALL;
export const DEFAULT_PAGE = 1;

// Default sort settings
export const DEFAULT_SORT_FIELD = SortField.NAME;
export const DEFAULT_SORT_ORDER = SortOrder.ASC;

// API endpoints
export const API_ENDPOINTS = {
    SERVICES: "/Service",
    SERVICE_GROUPS: "/ServiceGroup",
    LEGAL_BASIS: "/LegalBasis",
} as const;

// Query keys for React Query
export const QUERY_KEYS = {
    SERVICES: ["services"] as const,
    SERVICE_LISTS: () => [...QUERY_KEYS.SERVICES, "list"] as const,
    SERVICE_LIST: (filters: ServiceFilters) => [...QUERY_KEYS.SERVICE_LISTS(), filters] as const,
    SERVICE_DETAILS: () => [...QUERY_KEYS.SERVICES, "detail"] as const,
    SERVICE_DETAIL: (id: string) => [...QUERY_KEYS.SERVICE_DETAILS(), id] as const,
    FEATURED_SERVICES: () => [...QUERY_KEYS.SERVICES, "featured"] as const,
    SEARCH_SERVICES: (keyword: string, page: number, size: number) =>
        [...QUERY_KEYS.SERVICES, "search", keyword, page, size] as const,
    SERVICE_GROUPS: () => [...QUERY_KEYS.SERVICES, "groups"] as const,
    LEGAL_BASIS: () => [...QUERY_KEYS.SERVICES, "legalBasis"] as const,
} as const;

// Cache time settings (in milliseconds)
export const CACHE_TIME = {
    SHORT: 2 * 60 * 1000, // 2 minutes
    MEDIUM: 5 * 60 * 1000, // 5 minutes
    LONG: 10 * 60 * 1000, // 10 minutes
    VERY_LONG: 30 * 60 * 1000, // 30 minutes
} as const;

// Stale time settings (in milliseconds)
export const STALE_TIME = {
    SHORT: 1 * 60 * 1000, // 1 minute
    MEDIUM: 2 * 60 * 1000, // 2 minutes
    LONG: 5 * 60 * 1000, // 5 minutes
    VERY_LONG: 10 * 60 * 1000, // 10 minutes
} as const;

// UI constants
export const UI_CONSTANTS = {
    MAX_FEATURED_SERVICES: 6,
    MAX_SEARCH_RESULTS: 100,
    DEBOUNCE_DELAY: 300, // milliseconds
} as const;

// Service type colors
export const SERVICE_TYPE_COLORS = {
    "Trực tuyến": "bg-green-100 text-green-800 border-green-200",
    "Trực tiếp": "bg-blue-100 text-blue-800 border-blue-200",
} as const;

// Service type chip colors for HeroUI
export const SERVICE_TYPE_CHIP_COLORS = {
    "Trực tuyến": "success",
    "Trực tiếp": "primary",
} as const;
