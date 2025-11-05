/**
 * Validation functions for Legal Document form
 */

export const validateDocumentNumber = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Số văn bản là bắt buộc';
    }
    if (value.trim().length < 3) {
        return 'Số văn bản phải có ít nhất 3 ký tự';
    }
    if (value.trim().length > 100) {
        return 'Số văn bản không được vượt quá 100 ký tự';
    }
    return undefined;
};

export const validateDocumentType = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Loại văn bản là bắt buộc';
    }
    return undefined;
};

export const validateName = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Tên văn bản là bắt buộc';
    }
    if (value.trim().length < 3) {
        return 'Tên văn bản phải có ít nhất 3 ký tự';
    }
    if (value.trim().length > 500) {
        return 'Tên văn bản không được vượt quá 500 ký tự';
    }
    return undefined;
};

export const validateIssueDate = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Ngày ban hành là bắt buộc';
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
        return 'Ngày ban hành không hợp lệ';
    }
    return undefined;
};

export const validateEffectiveDate = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Ngày có hiệu lực là bắt buộc';
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
        return 'Ngày có hiệu lực không hợp lệ';
    }
    return undefined;
};

export const validateIssueBody = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Cơ quan ban hành là bắt buộc';
    }
    if (value.trim().length < 3) {
        return 'Cơ quan ban hành phải có ít nhất 3 ký tự';
    }
    if (value.trim().length > 255) {
        return 'Cơ quan ban hành không được vượt quá 255 ký tự';
    }
    return undefined;
};

export const validateStatus = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Trạng thái là bắt buộc';
    }
    return undefined;
};

