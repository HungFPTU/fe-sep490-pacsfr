/**
 * Validation functions for Docs Type form
 */

export const validateDocTypeCode = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Mã loại văn bản là bắt buộc';
    }
    // Code format: alphanumeric, underscore, dash, max 20 chars
    const codeRegex = /^[A-Za-z0-9_-]+$/;
    if (!codeRegex.test(value.trim())) {
        return 'Mã loại văn bản chỉ được chứa chữ cái, số, dấu gạch dưới và dấu gạch ngang';
    }
    if (value.trim().length > 20) {
        return 'Mã loại văn bản không được vượt quá 20 ký tự';
    }
    return undefined;
};

export const validateDocTypeName = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Tên loại văn bản là bắt buộc';
    }
    if (value.trim().length < 2) {
        return 'Tên loại văn bản phải có ít nhất 2 ký tự';
    }
    if (value.trim().length > 255) {
        return 'Tên loại văn bản không được vượt quá 255 ký tự';
    }
    return undefined;
};

export const validateDescription = (value: string | undefined): string | undefined => {
    if (value && value.trim().length > 1000) {
        return 'Mô tả không được vượt quá 1000 ký tự';
    }
    return undefined;
};

export const validateGroupId = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Nhóm hồ sơ là bắt buộc';
    }
    return undefined;
};

export const validateFileFormat = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Định dạng file là bắt buộc';
    }
    return undefined;
};

export const validateMaxFileSize = (value: number | undefined): string | undefined => {
    if (value === undefined || value === null) {
        return 'Kích thước file tối đa là bắt buộc';
    }
    if (value <= 0) {
        return 'Kích thước file tối đa phải lớn hơn 0';
    }
    if (value > 100) {
        return 'Kích thước file tối đa không được vượt quá 100 MB';
    }
    return undefined;
};

