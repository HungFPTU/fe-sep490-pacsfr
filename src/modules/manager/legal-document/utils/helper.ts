/**
 * Legal Document Utility Functions
 * Helper functions for legal document module
 */

// Document Type Color Utilities
export const getDocumentTypeStyle = (type: string): string => {
    switch (type) {
        case 'LAW': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'DECREE': return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'CIRCULAR': return 'bg-green-100 text-green-800 border-green-200';
        case 'DECISION': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'NOTIFICATION': return 'bg-gray-100 text-gray-800 border-gray-200';
        case 'DIRECTIVE': return 'bg-red-100 text-red-800 border-red-200';
        case 'RESOLUTION': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
        case 'OTHER': return 'bg-gray-100 text-gray-800 border-gray-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

// Document Status Color Utilities
export const getStatusStyle = (status: string): string => {
    switch (status) {
        case 'Draft': return 'bg-gray-100 text-gray-800 border-gray-200';
        case 'Active': return 'bg-green-100 text-green-800 border-green-200';
        case 'Expired': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'Replaced': return 'bg-red-100 text-red-800 border-red-200';
        case 'Cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

// Active Status Color Utilities
export const getActiveStatusStyle = (isActive: boolean): string => {
    return isActive
        ? 'bg-green-100 text-green-800 border-green-200'
        : 'bg-red-100 text-red-800 border-red-200';
};

// Common Badge Style
export const getBadgeStyle = (): string => {
    return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';
};

// Document Type Color (for Badge component)
export const getDocumentTypeColor = (type: string): string => {
    switch (type) {
        case 'LAW': return 'primary';
        case 'DECREE': return 'secondary';
        case 'CIRCULAR': return 'success';
        case 'DECISION': return 'warning';
        case 'NOTIFICATION': return 'default';
        case 'DIRECTIVE': return 'danger';
        case 'RESOLUTION': return 'primary';
        case 'OTHER': return 'default';
        default: return 'default';
    }
};

// Status Color (for Badge component)
export const getStatusColor = (status: string): string => {
    switch (status) {
        case 'Draft': return 'default';
        case 'Active': return 'success';
        case 'Expired': return 'warning';
        case 'Replaced': return 'danger';
        case 'Cancelled': return 'default';
        default: return 'default';
    }
};

// File Size Formatting
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Date Formatting
export const formatDateVN = (date: string | Date): string => {
    if (!date) return 'N/A';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('vi-VN');
};

// File Name Extraction from URL
export const extractFileNameFromUrl = (url: string): string => {
    if (!url) return 'Unknown file';
    return url.split('/').pop() || 'Unknown file';
};

// Validation Helpers
export const isValidDocumentType = (type: string): boolean => {
    const validTypes = ['LAW', 'DECREE', 'CIRCULAR', 'DECISION', 'NOTIFICATION', 'DIRECTIVE', 'RESOLUTION', 'OTHER'];
    return validTypes.includes(type);
};

export const isValidStatus = (status: string): boolean => {
    const validStatuses = ['Draft', 'Active', 'Expired', 'Replaced', 'Cancelled'];
    return validStatuses.includes(status);
};
