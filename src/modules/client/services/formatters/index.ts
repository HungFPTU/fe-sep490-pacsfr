/**
 * Formatters Module
 * 
 * Centralized formatting functions for service-related data.
 * Follows Single Responsibility Principle - each formatter handles one type of data.
 */

// Currency formatting
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(amount);
};

// Date formatting
export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// DateTime formatting
export const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

// Processing time formatting
export const formatProcessingTime = (timeString?: string): string => {
    if (!timeString) return '';
    try {
        const date = new Date(timeString);
        return date.toLocaleDateString('vi-VN');
    } catch {
        return timeString;
    }
};

// Service type formatting
export const formatServiceType = (serviceType?: string): string => {
    if (!serviceType) return '';
    const typeMap: Record<string, string> = {
        'ADMINISTRATIVE': 'Hành chính',
        'PUBLIC_SERVICE': 'Dịch vụ công',
        'ONLINE': 'Trực tuyến',
        'DIRECT': 'Trực tiếp',
        'Mức độ 1': 'Mức độ 1',
        'Mức độ 2': 'Mức độ 2',
        'Mức độ 3': 'Mức độ 3',
        'Mức độ 4': 'Mức độ 4',
    };
    return typeMap[serviceType] || serviceType;
};

// Execution level formatting
export const formatExecutionLevel = (level?: string): string => {
    if (!level) return '';
    const levelMap: Record<string, string> = {
        'NATIONAL': 'Quốc gia',
        'PROVINCIAL': 'Cấp Tỉnh',
        'DISTRICT': 'Cấp Huyện',
        'WARD': 'Cấp Xã',
        'Cấp Bộ': 'Cấp Bộ',
        'Cấp Tỉnh': 'Cấp Tỉnh',
    };
    return levelMap[level] || level;
};

// Field formatting
export const formatField = (field?: string): string => {
    if (!field) return '';
    const fieldMap: Record<string, string> = {
        'CIVIL_REGISTRATION': 'Hộ tịch',
        'RESIDENCE': 'Cư trú',
        'LAND': 'Đất đai',
        'CONSTRUCTION': 'Xây dựng',
        'BUSINESS': 'Kinh doanh',
        'TAX': 'Thuế',
        'SOCIAL_INSURANCE': 'Bảo hiểm xã hội',
        'HEALTHCARE': 'Y tế',
        'EDUCATION': 'Giáo dục',
        'OTHER': 'Khác',
    };
    return fieldMap[field] || field;
};

// Document type formatting
export const formatDocumentType = (docType?: string): string => {
    if (!docType) return '';
    const typeMap: Record<string, string> = {
        'CIRCULAR': 'Thông tư',
        'DECREE': 'Nghị định',
        'LAW': 'Luật',
        'RESOLUTION': 'Nghị quyết',
        'DIRECTIVE': 'Chỉ thị',
    };
    return typeMap[docType] || docType;
};

// Status formatting
export const formatStatus = (status?: string): string => {
    if (!status) return '';
    const statusMap: Record<string, string> = {
        'Active': 'Đang hiệu lực',
        'Inactive': 'Hết hiệu lực',
        'Pending': 'Chờ hiệu lực',
    };
    return statusMap[status] || status;
};

