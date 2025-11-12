import { useQuery, useQueries } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';
import { QUERY_KEYS, CACHE_TIME, STALE_TIME } from '../constants';
import type { DashboardFilters, ChartFilters } from '../types';

export const useComprehensiveReport = (filters?: DashboardFilters) => {
    return useQuery({
        queryKey: [...QUERY_KEYS.DASHBOARD_STATS, filters],
        queryFn: () => dashboardService.getComprehensiveReport(filters),
        gcTime: CACHE_TIME,
        staleTime: STALE_TIME,
    });
};

export const useChartsData = (filters?: ChartFilters) => {
    const lineChartFilters = { month: filters?.month, year: filters?.year };
    const dateRangeFilters = { startDate: filters?.startDate, endDate: filters?.endDate };

    const queries = useQueries({
        queries: [
            {
                queryKey: [...QUERY_KEYS.DASHBOARD_LINE_CHART, lineChartFilters],
                queryFn: () => dashboardService.getLineChart(lineChartFilters),
                gcTime: CACHE_TIME,
                staleTime: STALE_TIME,
            },
            {
                queryKey: [...QUERY_KEYS.DASHBOARD_PIE_CHART, dateRangeFilters],
                queryFn: () => dashboardService.getPieChart(dateRangeFilters),
                gcTime: CACHE_TIME,
                staleTime: STALE_TIME,
            },
            {
                queryKey: [...QUERY_KEYS.DASHBOARD_BAR_CHART, dateRangeFilters],
                queryFn: () => dashboardService.getBarChart(dateRangeFilters),
                gcTime: CACHE_TIME,
                staleTime: STALE_TIME,
            },
        ],
    });

    return {
        lineChart: {
            data: queries[0].data,
            isLoading: queries[0].isLoading,
            error: queries[0].error,
        },
        pieChart: {
            data: queries[1].data,
            isLoading: queries[1].isLoading,
            error: queries[1].error,
        },
        barChart: {
            data: queries[2].data,
            isLoading: queries[2].isLoading,
            error: queries[2].error,
        },
        isLoading: queries.some((q) => q.isLoading),
        refetch: () => {
            queries.forEach((q) => q.refetch());
        },
    };
};

