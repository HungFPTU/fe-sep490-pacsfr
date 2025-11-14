/**
 * Formatters Module
 * 
 * Data formatting utilities for case module.
 * Follows Single Responsibility Principle - only handles data formatting.
 */

/**
 * Format date to Vietnamese locale with time
 */
export const formatDateToVietnamese = (dateString?: string): string | undefined => {
    if (!dateString) return undefined;

    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;

        return date.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return dateString;
    }
};

/**
 * Format date only (without time) to Vietnamese locale
 */
export const formatDateOnlyToVietnamese = (dateString?: string): string | undefined => {
    if (!dateString) return undefined;

    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;

        return date.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    } catch {
        return dateString;
    }
};

