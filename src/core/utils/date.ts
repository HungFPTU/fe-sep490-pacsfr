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
 * Format date with time in Vietnamese format (dd/mm/yyyy hh:mm:ss)
 */
export function formatDateTimeVN(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
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
 * Parse ISO date string (YYYY-MM-DD) to local Date object
 * Prevents timezone issues by treating the date as local time
 */
export function parseLocalDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

/**
 * Convert Date object to YYYY-MM-DD format in local timezone
 */
export function toLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Get today's date in YYYY-MM-DD format (local timezone)
 */
export function getTodayLocal(): string {
    return toLocalDateString(new Date());
}

/**
 * Format date string (YYYY-MM-DD) for display in Vietnamese locale
 */
export function formatLocalDate(dateString: string): string {
    const date = parseLocalDate(dateString);
    return date.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

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
