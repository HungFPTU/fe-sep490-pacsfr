import { workshiftApi } from "../api/workshift.api";
import type { WorkShift, CalendarShift } from "../types";

export const workshiftService = {
    async getMyShifts() {
        const response = await workshiftApi.getMyShifts();
        return response.data;
    },

    /**
     * Transform workshift data for calendar display
     */
    transformShiftsForCalendar(shifts: WorkShift[]): CalendarShift[] {
        const calendarShifts = new Map<string, WorkShift[]>();

        // Group shifts by date
        shifts.forEach(shift => {
            const date = shift.shiftDate.split('T')[0]; // Get YYYY-MM-DD part
            if (!calendarShifts.has(date)) {
                calendarShifts.set(date, []);
            }
            calendarShifts.get(date)!.push(shift);
        });

        // Convert to array and sort by date
        return Array.from(calendarShifts.entries())
            .map(([date, shifts]) => ({ date, shifts }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    },

    /**
     * Get shifts for a specific date
     */
    getShiftsForDate(shifts: WorkShift[], date: string): WorkShift[] {
        return shifts.filter(shift => shift.shiftDate.startsWith(date));
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
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
};
