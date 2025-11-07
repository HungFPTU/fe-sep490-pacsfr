import { http } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestResponse } from '@/types/rest';
import type { ComprehensiveReport, DashboardFilters } from '../types';

export const dashboardApi = {
    getComprehensiveReport: (filters?: DashboardFilters) => {
        return http.get<RestResponse<ComprehensiveReport>>(
            API_PATH.MANAGER_DASHBOARD.GET_COMPREHENSIVE_REPORT(
                filters?.fromDate,
                filters?.toDate
            )
        );
    },
};

