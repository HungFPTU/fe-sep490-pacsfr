import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse } from '@/types/rest';
import type { 
    ComprehensiveReport, 
    DashboardFilters, 
    LineChartData,
    PieChartData,
    BarChartData
} from '../types';

export const dashboardApi = {
    getComprehensiveReport: (filters?: DashboardFilters) => {
        return http.get<RestResponse<ComprehensiveReport>>(
            API_PATH.MANAGER_DASHBOARD.GET_COMPREHENSIVE_REPORT(
                filters?.fromDate,
                filters?.toDate
            )
        );
    },

    getLineChart: (filters?: { month?: number; year?: number }) => {
        return http.get<RestResponse<LineChartData>>(
            API_PATH.MANAGER_DASHBOARD.GET_LINE_CHART(
                filters?.month,
                filters?.year
            )
        );
    },

    getPieChart: (filters?: { startDate?: string; endDate?: string }) => {
        return http.get<RestResponse<PieChartData>>(
            API_PATH.MANAGER_DASHBOARD.GET_PIE_CHART(
                filters?.startDate,
                filters?.endDate
            )
        );
    },

    getBarChart: (filters?: { startDate?: string; endDate?: string }) => {
        return http.get<RestResponse<BarChartData>>(
            API_PATH.MANAGER_DASHBOARD.GET_BAR_CHART(
                filters?.startDate,
                filters?.endDate
            )
        );
    },
};

