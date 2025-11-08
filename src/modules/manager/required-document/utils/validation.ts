/**
 * Validation helpers for Required Document forms
 */

export const validateServiceId = (value: string): string | undefined => {
    if (!value || value.trim().length === 0) {
        return 'Vui lòng chọn dịch vụ áp dụng.';
    }
    return undefined;
};

export const validateDocTypeId = (value: string): string | undefined => {
    if (!value || value.trim().length === 0) {
        return 'Vui lòng chọn loại giấy tờ.';
    }
    return undefined;
};

export const validateDescription = (value: string): string | undefined => {
    if (!value || value.trim().length === 0) {
        return 'Vui lòng nhập mô tả tài liệu.';
    }
    if (value.trim().length > 500) {
        return 'Mô tả tối đa 500 ký tự.';
    }
    return undefined;
};

const isNonNegativeInteger = (value: number): boolean => Number.isInteger(value) && value >= 0;

export const validateQuantityOriginal = (value: number): string | undefined => {
    if (!isNonNegativeInteger(value)) {
        return 'Số bản gốc phải là số nguyên không âm.';
    }
    return undefined;
};

export const validateQuantityCopy = (value: number): string | undefined => {
    if (!isNonNegativeInteger(value)) {
        return 'Số bản sao phải là số nguyên không âm.';
    }
    return undefined;
};

