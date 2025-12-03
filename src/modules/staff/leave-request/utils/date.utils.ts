/**
 * Date utility functions for Staff Leave Request module
 */

/**
 * Convert date string (YYYY-MM-DD) to ISO datetime format with milliseconds and Z
 * Fix: Use UTC timezone to avoid date shift when converting to ISO
 * 
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns ISO datetime string in format YYYY-MM-DDTHH:mm:ss.SSSZ
 */
export const convertToISODateTime = (dateString: string): string => {
    if (!dateString) return '';

    // Parse date string (YYYY-MM-DD)
    const [year, month, day] = dateString.split('-').map(Number);
    
    // Validate parsed values
    if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) {
        return '';
    }

    // Create Date object at midnight UTC to avoid timezone shift
    // This ensures the date sent to API matches the date selected by user
    const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));

    // Validate created date
    if (isNaN(date.getTime())) {
        return '';
    }

    // Convert to ISO string with milliseconds and Z timezone
    // Format: YYYY-MM-DDTHH:mm:ss.SSSZ (e.g., 2025-12-04T00:00:00.000Z)
    return date.toISOString();
};

