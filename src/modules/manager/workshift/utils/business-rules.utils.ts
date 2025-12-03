/**
 * Business Rules Utilities for WorkShift Module
 */

import { MAX_SHIFTS_PER_WEEK, MAX_SHIFTS_PER_MONTH } from '../constants';
import type { StaffWorkShift } from '../types';

/**
 * Get week range (Monday to Saturday) for a given date
 * Returns start and end dates of the week
 */
export const getWeekRange = (date: Date | string): { start: Date; end: Date } => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const day = d.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Calculate days to subtract to get to Monday (1)
    // If Sunday (0), go back 6 days; if Monday (1), go back 0 days, etc.
    const daysToMonday = day === 0 ? 6 : day - 1;

    const start = new Date(d);
    start.setDate(d.getDate() - daysToMonday);
    start.setHours(0, 0, 0, 0);

    // Saturday is 6 days after Monday
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

    return { start, end };
};

/**
 * Get month range for a given date
 */
export const getMonthRange = (date: Date | string): { start: Date; end: Date } => {
    const d = typeof date === 'string' ? new Date(date) : date;

    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);

    return { start, end };
};

/**
 * Check if a date is within a date range
 */
export const isDateInRange = (date: Date | string, start: Date, end: Date): boolean => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d >= start && d <= end;
};

/**
 * Count shifts for a staff in a specific week
 * @param staffShifts - Array of staff work shifts
 * @param targetDate - Date to check week for
 * @returns Number of shifts in that week
 */
export const countShiftsInWeek = (
    staffShifts: StaffWorkShift[],
    targetDate: Date | string
): number => {
    const { start, end } = getWeekRange(targetDate);

    return staffShifts.filter((shift) => {
        const shiftDate = typeof shift.workDate === 'string' ? new Date(shift.workDate) : shift.workDate;
        return isDateInRange(shiftDate, start, end) && !shift.isDeleted;
    }).length;
};

/**
 * Count shifts for a staff in a specific month
 */
export const countShiftsInMonth = (
    staffShifts: StaffWorkShift[],
    targetDate: Date | string
): number => {
    const { start, end } = getMonthRange(targetDate);

    return staffShifts.filter((shift) => {
        const shiftDate = typeof shift.workDate === 'string' ? new Date(shift.workDate) : shift.workDate;
        return isDateInRange(shiftDate, start, end) && !shift.isDeleted;
    }).length;
};

/**
 * Validate if staff can be assigned to a shift (max shifts per week rule)
 * @param staffShifts - Existing shifts for the staff
 * @param newShiftDate - Date of the new shift to assign
 * @returns Object with isValid and error message
 */
export const validateMaxShiftsPerWeek = (
    staffShifts: StaffWorkShift[],
    newShiftDate: Date | string
): { isValid: boolean; error?: string } => {
    const currentCount = countShiftsInWeek(staffShifts, newShiftDate);
    const newCount = currentCount + 1;

    if (newCount > MAX_SHIFTS_PER_WEEK) {
        return {
            isValid: false,
            error: `Nhân viên đã có ${currentCount} ca trong tuần này. Tối đa ${MAX_SHIFTS_PER_WEEK} ca/tuần.`,
        };
    }

    return { isValid: true };
};

/**
 * Validate if staff can be assigned to a shift (max shifts per month rule)
 * @param staffShifts - Existing shifts for the staff
 * @param newShiftDate - Date of the new shift to assign
 * @returns Object with isValid and error message
 */
export const validateMaxShiftsPerMonth = (
    staffShifts: StaffWorkShift[],
    newShiftDate: Date | string
): { isValid: boolean; error?: string } => {
    const currentCount = countShiftsInMonth(staffShifts, newShiftDate);
    const newCount = currentCount + 1;

    if (newCount > MAX_SHIFTS_PER_MONTH) {
        return {
            isValid: false,
            error: `Nhân viên đã có ${currentCount} ca trong tháng này. Tối đa ${MAX_SHIFTS_PER_MONTH} ca/tháng.`,
        };
    }

    return { isValid: true };
};


/**
 * Check if a shift overlaps with existing shifts (no duplicate shifts rule)
 * @param staffShifts - Existing shifts for the staff
 * @param newShiftDate - Date of the new shift
 * @param newWorkShiftId - WorkShift ID of the new shift
 * @returns Object with isValid and error message
 */
export const validateNoDuplicateShift = (
    staffShifts: StaffWorkShift[],
    newShiftDate: Date | string,
    newWorkShiftId: string
): { isValid: boolean; error?: string } => {
    const newDate = typeof newShiftDate === 'string' ? new Date(newShiftDate) : newShiftDate;
    const newDateStr = newDate.toISOString().split('T')[0];

    const duplicate = staffShifts.find((shift) => {
        if (shift.isDeleted) return false;

        const shiftDate = typeof shift.workDate === 'string' ? new Date(shift.workDate) : shift.workDate;
        const shiftDateStr = shiftDate.toISOString().split('T')[0];

        return shiftDateStr === newDateStr && shift.workShiftId === newWorkShiftId;
    });

    if (duplicate) {
        return {
            isValid: false,
            error: 'Nhân viên đã được phân công ca này rồi. Không thể trùng ca.',
        };
    }

    return { isValid: true };
};

/**
 * Check if shift type conflicts with existing shifts on the same day
 * Business Rules:
 * - "Cả ngày" conflicts with "Sáng" or "Chiều" on the same day
 * - "Sáng" or "Chiều" conflicts with "Cả ngày" on the same day
 * - "Sáng" and "Chiều" on the same day are allowed (no conflict)
 * @param staffShifts - Existing shifts for the staff
 * @param newShiftDate - Date of the new shift
 * @param newShiftType - Shift type of the new shift ("Sáng", "Chiều", "Cả ngày")
 * @returns Object with isValid and error message
 */
export const validateShiftTypeConflict = (
    staffShifts: StaffWorkShift[],
    newShiftDate: Date | string,
    newShiftType: string
): { isValid: boolean; error?: string } => {
    const newDate = typeof newShiftDate === 'string' ? new Date(newShiftDate) : newShiftDate;
    const newDateStr = newDate.toISOString().split('T')[0];

    // Find all shifts on the same date
    const sameDayShifts = staffShifts.filter((shift) => {
        if (shift.isDeleted) return false;

        const shiftDate = typeof shift.workDate === 'string' ? new Date(shift.workDate) : shift.workDate;
        const shiftDateStr = shiftDate.toISOString().split('T')[0];

        return shiftDateStr === newDateStr;
    });

    // Check for conflicts
    for (const existingShift of sameDayShifts) {
        const existingType = existingShift.shiftType;

        // Case 1: Trying to add "Cả ngày" when "Sáng" or "Chiều" exists
        if (newShiftType === 'Cả ngày' && (existingType === 'Sáng' || existingType === 'Chiều')) {
            return {
                isValid: false,
                error: `Không thể phân công ca "Cả ngày" vì nhân viên đã có ca "${existingType}" trong ngày này.`,
            };
        }

        // Case 2: Trying to add "Sáng" or "Chiều" when "Cả ngày" exists
        if ((newShiftType === 'Sáng' || newShiftType === 'Chiều') && existingType === 'Cả ngày') {
            return {
                isValid: false,
                error: `Không thể phân công ca "${newShiftType}" vì nhân viên đã có ca "Cả ngày" trong ngày này.`,
            };
        }

        // Note: "Sáng" + "Chiều" on same day is allowed (no conflict)
    }

    return { isValid: true };
};

/**
 * Filter out shifts that have been swapped (not available for assignment)
 * This should be called with shift swap requests data
 * @param availableShifts - Array of available shifts
 * @param swappedShiftIds - Array of StaffWorkShift IDs that have been swapped
 * @returns Filtered array of available shifts
 */
export const filterSwappedShifts = <T extends { id: string }>(
    availableShifts: T[],
    swappedShiftIds: string[]
): T[] => {
    if (!swappedShiftIds || swappedShiftIds.length === 0) {
        return availableShifts;
    }

    return availableShifts.filter((shift) => !swappedShiftIds.includes(shift.id));
};

/**
 * Calculate average shifts per staff for a week/month
 * Used for even distribution logic
 */
export const calculateAverageShifts = (
    totalShifts: number,
    totalStaff: number
): number => {
    if (totalStaff === 0) return 0;
    return Math.floor(totalShifts / totalStaff);
};

/**
 * Get staff with minimum shifts in a week (for even distribution)
 */
export const getStaffWithMinShifts = (
    staffShiftsMap: Map<string, StaffWorkShift[]>,
    targetDate: Date | string
): { staffId: string; shiftCount: number }[] => {
    const results: { staffId: string; shiftCount: number }[] = [];

    staffShiftsMap.forEach((shifts, staffId) => {
        const count = countShiftsInWeek(shifts, targetDate);
        results.push({ staffId, shiftCount: count });
    });

    // Sort by shift count ascending
    results.sort((a, b) => a.shiftCount - b.shiftCount);

    return results;
};

/**
 * Get staff with minimum shifts in a month (for even distribution)
 */
export const getStaffWithMinShiftsInMonth = (
    staffShiftsMap: Map<string, StaffWorkShift[]>,
    targetDate: Date | string
): { staffId: string; shiftCount: number }[] => {
    const results: { staffId: string; shiftCount: number }[] = [];

    staffShiftsMap.forEach((shifts, staffId) => {
        const count = countShiftsInMonth(shifts, targetDate);
        results.push({ staffId, shiftCount: count });
    });

    // Sort by shift count ascending
    results.sort((a, b) => a.shiftCount - b.shiftCount);

    return results;
};

/**
 * Validate all business rules before assigning a shift
 */
export const validateShiftAssignment = (
    staffShifts: StaffWorkShift[],
    newShiftDate: Date | string,
    newWorkShiftId: string,
    newShiftType?: string
): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Rule 1: Max shifts per week
    const maxShiftsCheck = validateMaxShiftsPerWeek(staffShifts, newShiftDate);
    if (!maxShiftsCheck.isValid && maxShiftsCheck.error) {
        errors.push(maxShiftsCheck.error);
    }

    // Rule 2: No duplicate shifts
    const duplicateCheck = validateNoDuplicateShift(staffShifts, newShiftDate, newWorkShiftId);
    if (!duplicateCheck.isValid && duplicateCheck.error) {
        errors.push(duplicateCheck.error);
    }

    // Rule 3: No shift type conflicts on the same day
    if (newShiftType) {
        const shiftTypeCheck = validateShiftTypeConflict(staffShifts, newShiftDate, newShiftType);
        if (!shiftTypeCheck.isValid && shiftTypeCheck.error) {
            errors.push(shiftTypeCheck.error);
        }
    }

    // Rule 4: Max shifts per month
    const maxShiftsMonthCheck = validateMaxShiftsPerMonth(staffShifts, newShiftDate);
    if (!maxShiftsMonthCheck.isValid && maxShiftsMonthCheck.error) {
        errors.push(maxShiftsMonthCheck.error);
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

/**
 * Suggest staff for even distribution (chia đều ca)
 * Returns staff IDs sorted by shift count (ascending) - staff with fewer shifts first
 */
export const suggestStaffForEvenDistribution = (
    staffShiftsMap: Map<string, StaffWorkShift[]>,
    targetDate: Date | string,
    viewMode: 'week' | 'month' = 'week'
): { staffId: string; shiftCount: number; priority: number }[] => {
    const results: { staffId: string; shiftCount: number; priority: number }[] = [];

    staffShiftsMap.forEach((shifts, staffId) => {
        const count = viewMode === 'week'
            ? countShiftsInWeek(shifts, targetDate)
            : countShiftsInMonth(shifts, targetDate);
        results.push({ staffId, shiftCount: count, priority: count });
    });

    // Sort by shift count ascending (fewer shifts = higher priority)
    results.sort((a, b) => a.priority - b.priority);

    return results;
};

