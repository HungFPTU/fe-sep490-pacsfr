/**
 * Date utility functions for Leave Request module
 */

/**
 * Format date string to Vietnamese locale format (DD/MM/YYYY)
 */
export const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';

    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';

        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    } catch (error) {
        return 'Invalid Date';
    }
};

/**
 * Format date string to Vietnamese locale format with weekday
 */
export const formatDateWithWeekday = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';

    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';

        return date.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch (error) {
        return 'Invalid Date';
    }
};

/**
 * Format date string to Vietnamese locale format with time
 */
export const formatDateTime = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';

    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';

        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch (error) {
        return 'Invalid Date';
    }
};

/**
 * Calculate number of days between two dates (inclusive)
 */
export const calculateDays = (from: string | undefined, to: string | undefined): number => {
    if (!from || !to) return 0;

    try {
        const fromTime = new Date(from).getTime();
        const toTime = new Date(to).getTime();

        if (isNaN(fromTime) || isNaN(toTime)) return 0;

        return Math.ceil((toTime - fromTime) / (1000 * 60 * 60 * 24)) + 1;
    } catch (error) {
        return 0;
    }
};

/**
 * Get date fields from leave request (support both fromDate/toDate and startDate/endDate)
 */
export const getLeaveRequestDates = (request: {
    startDate?: string;
    endDate?: string;
    fromDate?: string;
    toDate?: string;
}): { fromDate: string | undefined; toDate: string | undefined } => {
    return {
        fromDate: request.startDate || request.fromDate,
        toDate: request.endDate || request.toDate,
    };
};

