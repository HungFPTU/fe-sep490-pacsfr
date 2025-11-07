/**
 * Validation helpers for Service Procedure module
 */

const MAX_TEXT_LENGTH = 255;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_NOTES_LENGTH = 1000;

export const validateTemplateId = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Vui lòng chọn mẫu biểu';
    }
    return undefined;
};

export const validateServiceId = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Vui lòng chọn dịch vụ';
    }
    return undefined;
};

export const validateStepNumber = (value: number): string | undefined => {
    if (value === null || value === undefined || Number.isNaN(value)) {
        return 'Vui lòng nhập thứ tự bước';
    }
    if (!Number.isInteger(value) || value <= 0) {
        return 'Thứ tự bước phải là số nguyên dương';
    }
    return undefined;
};

export const validateStepName = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Vui lòng nhập tên bước';
    }
    if (value.trim().length > MAX_TEXT_LENGTH) {
        return `Tên bước không được vượt quá ${MAX_TEXT_LENGTH} ký tự`;
    }
    return undefined;
};

export const validateResponsibleUnit = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Vui lòng nhập đơn vị chịu trách nhiệm';
    }
    if (value.trim().length > MAX_TEXT_LENGTH) {
        return `Đơn vị chịu trách nhiệm không được vượt quá ${MAX_TEXT_LENGTH} ký tự`;
    }
    return undefined;
};

export const validateProcessingTime = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Vui lòng nhập thời gian xử lý';
    }
    if (value.trim().length > MAX_TEXT_LENGTH) {
        return `Thời gian xử lý không được vượt quá ${MAX_TEXT_LENGTH} ký tự`;
    }
    return undefined;
};

export const validateStepDescription = (value?: string): string | undefined => {
    if (value && value.length > MAX_DESCRIPTION_LENGTH) {
        return `Mô tả không được vượt quá ${MAX_DESCRIPTION_LENGTH} ký tự`;
    }
    return undefined;
};

export const validateNotes = (value?: string): string | undefined => {
    if (value && value.length > MAX_NOTES_LENGTH) {
        return `Ghi chú không được vượt quá ${MAX_NOTES_LENGTH} ký tự`;
    }
    return undefined;
};
