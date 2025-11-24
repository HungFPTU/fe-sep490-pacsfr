import { workshiftApi } from "../api/workshift.api";
import type { WorkShift, CalendarShift } from "../types";
import { formatLocalDate, parseLocalDate } from "@/core/utils/date";

export const workshiftService = {
    async getMyShifts() {
        const response = await workshiftApi.getMyShifts();
        console.log('🔍 DEBUG - API Response:', response);
        console.log('🔍 DEBUG - data.items:', response.data?.items);
        console.log('🔍 DEBUG - data.items.$values:', response.data?.items?.$values);
        return response;
    },

    /**
     * Validate if shift is not a placeholder
     * Filter out shifts with date 0001-01-01 (placeholder date)
     */
    isValidShift(shift: WorkShift): boolean {
        return !shift.shiftDate.startsWith('0001-01-01');
    },

    /**
     * Transform workshift data for calendar display
     */
    transformShiftsForCalendar(shifts: WorkShift[]): CalendarShift[] {
        const calendarShifts = new Map<string, WorkShift[]>();

        // Filter out placeholder shifts and group by date
        shifts.forEach(shift => {
            // Only include valid shifts (exclude placeholder shifts with 0001-01-01 date)
            if (!this.isValidShift(shift)) {
                return;
            }

            const date = shift.shiftDate.split('T')[0]; // Get YYYY-MM-DD part
            if (!calendarShifts.has(date)) {
                calendarShifts.set(date, []);
            }
            calendarShifts.get(date)!.push(shift);
        });

        // Convert to array and sort by date
        return Array.from(calendarShifts.entries())
            .map(([date, shifts]) => ({ date, shifts }))
            .sort((a, b) => parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime());
    },

    /**
     * Get shifts for a specific date
     */
    getShiftsForDate(shifts: WorkShift[], date: string): WorkShift[] {
        return shifts.filter(shift => 
            this.isValidShift(shift) && shift.shiftDate.startsWith(date)
        );
    },

    /**
     * Format time for display
     */
    formatTime(timeString: string): string {
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
    },

    /**
     * Format date for display
     */
    formatDate(dateString: string): string {
        return formatLocalDate(dateString);
    },
};
