/**
 * FAQ Constants
 */

// Query keys for React Query
export const FAQ_QUERY_KEYS = {
    FAQ_BASE: ['faq'] as const,
    FAQ_LIST: (filters: { keyword?: string; serviceId?: string; faqCategoryId?: string; isActive?: boolean; page: number; size: number }) =>
        [...FAQ_QUERY_KEYS.FAQ_BASE, 'list', filters] as const,
    FAQ_DETAIL: (id: string) => [...FAQ_QUERY_KEYS.FAQ_BASE, 'detail', id] as const,
    FAQ_CATEGORY_BASE: ['faq-category'] as const,
    FAQ_CATEGORY_LIST: (filters: { keyword?: string; isActive?: boolean; page: number; size: number }) =>
        [...FAQ_QUERY_KEYS.FAQ_CATEGORY_BASE, 'list', filters] as const,
    FAQ_CATEGORY_DETAIL: (id: string) => [...FAQ_QUERY_KEYS.FAQ_CATEGORY_BASE, 'detail', id] as const,
} as const;

// Cache time settings (in milliseconds)
export const CACHE_TIME = {
    SHORT: 2 * 60 * 1000, // 2 minutes
    MEDIUM: 5 * 60 * 1000, // 5 minutes
    LONG: 10 * 60 * 1000, // 10 minutes
} as const;

// Stale time settings (in milliseconds)
export const STALE_TIME = {
    SHORT: 1 * 60 * 1000, // 1 minute
    MEDIUM: 2 * 60 * 1000, // 2 minutes
    LONG: 5 * 60 * 1000, // 5 minutes
} as const;

// Default pagination
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

