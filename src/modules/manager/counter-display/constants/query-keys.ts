/**
 * Query Keys for Counter Display
 * Centralized query keys for React Query cache management
 */

export const COUNTER_DISPLAY_QUERY_KEYS = {
    BASE: ['counter-display'] as const,
    CURRENT_WORKSHIFT: ['counter-display', 'current-workshift'] as const,
    WORKSHIFT_OVERVIEW: (workShiftId: string) => 
        ['counter-display', 'workshift-overview', workShiftId] as const,
};

// Cache and stale time configuration
export const CACHE_TIME = 5 * 60 * 1000; // 5 minutes
export const STALE_TIME = 30 * 1000; // 30 seconds - refresh frequently for live display
export const REFETCH_INTERVAL = 5000; // 5 seconds auto-refresh
