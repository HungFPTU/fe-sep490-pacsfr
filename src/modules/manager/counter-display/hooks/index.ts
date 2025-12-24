/**
 * Counter Display Hooks
 * Following Open/Closed Principle - hooks can be extended without modification
 */

import { useQuery } from '@tanstack/react-query';
import { counterDisplayService } from '../services/counter-display.service';
import { 
    COUNTER_DISPLAY_QUERY_KEYS, 
    CACHE_TIME, 
    STALE_TIME,
    REFETCH_INTERVAL,
} from '../constants/query-keys';

/**
 * Hook to fetch current workshift overview
 * Auto-refreshes every 5 seconds for live display
 */
export const useCurrentWorkShift = () => {
    return useQuery({
        queryKey: COUNTER_DISPLAY_QUERY_KEYS.CURRENT_WORKSHIFT,
        queryFn: () => counterDisplayService.getCurrentWorkShiftOverview(),
        gcTime: CACHE_TIME,
        staleTime: STALE_TIME,
        refetchInterval: REFETCH_INTERVAL,
        refetchIntervalInBackground: true,
    });
};

/**
 * Hook to fetch workshift overview by ID
 * @param workShiftId - The workshift ID to fetch
 */
export const useWorkShiftOverview = (workShiftId: string | null) => {
    return useQuery({
        queryKey: COUNTER_DISPLAY_QUERY_KEYS.WORKSHIFT_OVERVIEW(workShiftId || ''),
        queryFn: () => counterDisplayService.getWorkShiftOverviewById(workShiftId!),
        enabled: !!workShiftId,
        gcTime: CACHE_TIME,
        staleTime: STALE_TIME,
        refetchInterval: REFETCH_INTERVAL,
        refetchIntervalInBackground: true,
    });
};
