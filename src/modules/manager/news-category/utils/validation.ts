/**
 * Validation functions for News Category form
 */

export const validateCategoryCode = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Mã danh mục là bắt buộc';
    }
    // Code format: alphanumeric, underscore, dash, max 20 chars
    const codeRegex = /^[A-Za-z0-9_-]+$/;
    if (!codeRegex.test(value.trim())) {
        return 'Mã danh mục chỉ được chứa chữ cái, số, dấu gạch dưới và dấu gạch ngang';
    }
    if (value.trim().length > 20) {
        return 'Mã danh mục không được vượt quá 20 ký tự';
    }
    return undefined;
};

export const validateCategoryName = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Tên danh mục là bắt buộc';
    }
    if (value.trim().length < 2) {
        return 'Tên danh mục phải có ít nhất 2 ký tự';
    }
    if (value.trim().length > 255) {
        return 'Tên danh mục không được vượt quá 255 ký tự';
    }
    return undefined;
};

export const validateCategoryDescription = (value: string | undefined): string | undefined => {
    if (value && value.trim().length > 1000) {
        return 'Mô tả không được vượt quá 1000 ký tự';
    }
    return undefined;
};

