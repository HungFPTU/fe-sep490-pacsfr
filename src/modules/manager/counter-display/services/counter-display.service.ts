/**
 * Counter Display Service Layer
 * Following Interface Segregation Principle - focused business logic methods
 */

import { counterDisplayApi } from '../api/counter-display.api';
import type { WorkShiftOverview } from '../types/response';

export const counterDisplayService = {
    /**
     * Get current workshift overview
     * @returns WorkShiftOverview or null if no current shift
     */
    async getCurrentWorkShiftOverview(): Promise<WorkShiftOverview | null> {
        try {
            const response = await counterDisplayApi.getCurrentWorkShift();
            
            if (!response.data?.success || !response.data?.data) {
                return null;
            }
            
            return response.data.data;
        } catch (error) {
            console.error('[counterDisplayService] Error fetching current workshift:', error);
            return null;
        }
    },

    /**
     * Get workshift overview by ID
     * @param workShiftId - The workshift ID
     * @returns WorkShiftOverview or null if not found
     */
    async getWorkShiftOverviewById(workShiftId: string): Promise<WorkShiftOverview | null> {
        try {
            const response = await counterDisplayApi.getWorkShiftOverview(workShiftId);
            
            if (!response.data?.success || !response.data?.data) {
                return null;
            }
            
            return response.data.data;
        } catch (error) {
            console.error('[counterDisplayService] Error fetching workshift overview:', error);
            return null;
        }
    },
};
