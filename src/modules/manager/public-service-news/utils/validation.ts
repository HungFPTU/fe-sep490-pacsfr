/**
 * Validation functions for Public Service News form
 */

export const validateTitle = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Tiêu đề là bắt buộc';
    }
    if (value.trim().length < 5) {
        return 'Tiêu đề phải có ít nhất 5 ký tự';
    }
    if (value.trim().length > 255) {
        return 'Tiêu đề không được vượt quá 255 ký tự';
    }
    return undefined;
};

export const validateContent = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Nội dung là bắt buộc';
    }
    if (value.trim().length < 10) {
        return 'Nội dung phải có ít nhất 10 ký tự';
    }
    return undefined;
};

export const validateSummary = (value: string | undefined): string | undefined => {
    if (value && value.trim().length > 500) {
        return 'Tóm tắt không được vượt quá 500 ký tự';
    }
    return undefined;
};

export const validateThumbnailUrl = (value: string | undefined): string | undefined => {
    if (value && value.trim()) {
        try {
            new URL(value.trim());
        } catch {
            return 'URL hình ảnh không hợp lệ';
        }
    }
    return undefined;
};

export const validateServiceId = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Dịch vụ là bắt buộc';
    }
    return undefined;
};

export const validateNewsCategoryId = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Danh mục tin tức là bắt buộc';
    }
    return undefined;
};

export const validateStaffId = (_value: string): string | undefined => {
    return undefined;
};

