import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import type { DashboardFilters } from '../types';

export const useComprehensiveReport = (filters?: DashboardFilters) => {
    return useQuery({
        queryKey: [...QUERY_KEYS.DASHBOARD_STATS, filters],
        queryFn: () => dashboardService.getComprehensiveReport(filters),
        gcTime: CACHE_TIME,
        staleTime: STALE_TIME,
    });
};

