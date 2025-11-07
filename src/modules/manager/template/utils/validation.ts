/**
 * Validation functions for Template form
 */

export const validateTemplateCode = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Mã template là bắt buộc';
    }
    // Code format: alphanumeric, underscore, dash, max 50 chars
    const codeRegex = /^[A-Za-z0-9_-]+$/;
    if (!codeRegex.test(value.trim())) {
        return 'Mã template chỉ được chứa chữ cái, số, dấu gạch dưới và dấu gạch ngang';
    }
    if (value.trim().length < 2) {
        return 'Mã template phải có ít nhất 2 ký tự';
    }
    if (value.trim().length > 50) {
        return 'Mã template không được vượt quá 50 ký tự';
    }
    return undefined;
};

export const validateTemplateName = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Tên template là bắt buộc';
    }
    if (value.trim().length < 2) {
        return 'Tên template phải có ít nhất 2 ký tự';
    }
    if (value.trim().length > 255) {
        return 'Tên template không được vượt quá 255 ký tự';
    }
    return undefined;
};

export const validateDescription = (value: string | undefined): string | undefined => {
    if (value && value.trim().length > 1000) {
        return 'Mô tả không được vượt quá 1000 ký tự';
    }
    return undefined;
};

export const validateDocsTypeId = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Loại văn bản là bắt buộc';
    }
    return undefined;
};

export const validateVersion = (value: string | undefined): string | undefined => {
    if (value && value.trim()) {
        // Version format: semantic versioning or simple version (e.g., 1.0.0, v1.0, 1.0)
        const versionRegex = /^[vV]?(\d+)(\.\d+)?(\.\d+)?(-[a-zA-Z0-9]+)?$/;
        if (!versionRegex.test(value.trim())) {
            return 'Phiên bản không hợp lệ (ví dụ: 1.0.0, v1.0, 1.0.0-beta)';
        }
        if (value.trim().length > 20) {
            return 'Phiên bản không được vượt quá 20 ký tự';
        }
    }
    return undefined;
};

export const validateFileName = (value: string | undefined): string | undefined => {
    if (value && value.trim()) {
        if (value.trim().length > 255) {
            return 'Tên file không được vượt quá 255 ký tự';
        }
        // Basic filename validation (no invalid characters)
        const invalidChars = /[<>:"|?*]/;
        if (invalidChars.test(value.trim())) {
            return 'Tên file không được chứa các ký tự: < > : " | ? *';
        }
    }
    return undefined;
};

export const validateFileSize = (value: number | undefined): string | undefined => {
    if (value !== undefined && value !== null) {
        if (value < 0) {
            return 'Kích thước file phải lớn hơn hoặc bằng 0';
        }
        // Max file size: 100MB (100 * 1024 * 1024 bytes)
        const maxSizeBytes = 100 * 1024 * 1024;
        if (value > maxSizeBytes) {
            return 'Kích thước file không được vượt quá 100 MB';
        }
    }
    return undefined;
};

/**
 * Map file format string to MIME types for validation
 */
export const getMimeTypesFromFileFormat = (fileFormat: string): string[] => {
    const formatMap: Record<string, string[]> = {
        'PDF': ['application/pdf'],
        'DOC': ['application/msword'],
        'DOCX': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        'XLS': ['application/vnd.ms-excel'],
        'XLSX': ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        'TXT': ['text/plain'],
        'IMAGE': ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        'OTHER': [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp'
        ],
    };

    return formatMap[fileFormat] || formatMap['OTHER'];
};

