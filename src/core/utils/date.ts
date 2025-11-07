/**
 * Date utilities
 * Centralized date manipulation and formatting functions
 */

/**
 * Format date for input display (dd/mm/yyyy)
 */
export function formatDateInput(dateString: string): string {
    // Remove all non-digits
    const digits = dateString.replace(/\D/g, '');

    // Apply dd/mm/yyyy format
    if (digits.length >= 6) {
        return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    } else if (digits.length >= 4) {
        return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    } else if (digits.length >= 2) {
        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    return digits;
}

/**
 * Parse dd/mm/yyyy format to Date object
 */
export function parseDateFromInput(dateString: string): Date | null {
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

    const date = new Date(year, month, day);

    // Check if the date is valid
    if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
        return null;
    }

    return date;
}

/**
 * Validate dd/mm/yyyy format and date logic
 */
export function isValidDate(dateString: string): boolean {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dateString)) return false;

    const date = parseDateFromInput(dateString);
    return date !== null;
}

/**
 * Format date to Vietnamese locale
 */
export function formatDateVN(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';

    return dateObj.toLocaleDateString('vi-VN');
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayISO(): string {
    return new Date().toISOString().split('T')[0];
}

/**
 * Get date N years ago in YYYY-MM-DD format
 */
export function getDateYearsAgo(years: number): string {
    const date = new Date();
    date.setFullYear(date.getFullYear() - years);
    return date.toISOString().split('T')[0];
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dateOfBirth: Date | string): number {
    const birthDate = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth;
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

/**
 * Convert YYYY-MM-DD to ISO string with timezone
 * @param dateString - Date string in YYYY-MM-DD format
 * @param endOfDay - If true, set time to 23:59:59, otherwise 00:00:00
 * @returns ISO string with timezone (e.g., "2025-11-01T00:00:00.000Z")
 */
export function convertToISOString(dateString: string, endOfDay: boolean = false): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    if (endOfDay) {
        date.setHours(23, 59, 59, 999);
    } else {
        date.setHours(0, 0, 0, 0);
    }
    
    return date.toISOString();
}