/**
 * Utility functions for chatbot module
 */

/**
 * Format date to readable string
 */
export const formatChatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} ngày trước`;
    }
    if (hours > 0) {
        return `${hours} giờ trước`;
    }
    if (minutes > 0) {
        return `${minutes} phút trước`;
    }
    return 'Vừa xong';
};

/**
 * Sanitize user input
 */
export const sanitizeInput = (input: string): string => {
    return input.trim().replace(/\s+/g, ' ');
};

/**
 * Check if message is empty
 */
export const isEmptyMessage = (content: string): boolean => {
    return !content || content.trim().length === 0;
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
};

