/**
 * Validation functions for Department form
 */

export const validateServiceGroupId = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Nhóm dịch vụ là bắt buộc';
    }
    return undefined;
};

export const validateCode = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Mã phòng ban là bắt buộc';
    }
    // Code format: alphanumeric, underscore, dash, max 20 chars
    const codeRegex = /^[A-Za-z0-9_-]+$/;
    if (!codeRegex.test(value.trim())) {
        return 'Mã phòng ban chỉ được chứa chữ cái, số, dấu gạch dưới và dấu gạch ngang';
    }
    if (value.trim().length > 20) {
        return 'Mã phòng ban không được vượt quá 20 ký tự';
    }
    return undefined;
};

export const validateName = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Tên phòng ban là bắt buộc';
    }
    if (value.trim().length < 2) {
        return 'Tên phòng ban phải có ít nhất 2 ký tự';
    }
    if (value.trim().length > 255) {
        return 'Tên phòng ban không được vượt quá 255 ký tự';
    }
    return undefined;
};

export const validateDescription = (value: string | undefined): string | undefined => {
    if (value && value.trim().length > 1000) {
        return 'Mô tả không được vượt quá 1000 ký tự';
    }
    return undefined;
};

export const validateLevelOrder = (value: number | string | undefined): string | undefined => {
    if (value === undefined || value === null || value === '') {
        return 'Cấp độ là bắt buộc';
    }
    const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
    if (isNaN(numValue) || numValue < 1) {
        return 'Cấp độ phải là số nguyên dương';
    }
    return undefined;
};

