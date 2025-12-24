/**
 * Counter Display API Layer
 * Following Dependency Inversion Principle - abstracts HTTP calls
 */

import { httpNoLoading } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { WorkShiftOverviewResponse } from '../types/response';

export const counterDisplayApi = {
    /**
     * Get current workshift overview
     * @returns Promise with current workshift data
     */
    getCurrentWorkShift: () => {
        return httpNoLoading.get<WorkShiftOverviewResponse>(
            API_PATH.QUEUE.WORKSHIFT_OVERVIEW.CURRENT
        );
    },

    /**
     * Get workshift overview by ID
     * @param workShiftId - The workshift ID to fetch
     * @returns Promise with workshift data
     */
    getWorkShiftOverview: (workShiftId: string) => {
        return httpNoLoading.get<WorkShiftOverviewResponse>(
            API_PATH.QUEUE.WORKSHIFT_OVERVIEW.BY_ID(workShiftId)
        );
    },
};
