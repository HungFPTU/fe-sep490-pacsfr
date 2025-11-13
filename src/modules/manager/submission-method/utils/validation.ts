/**
 * Validation functions for SubmissionMethod form
 */

import { SUBMISSION_METHOD_OPTIONS } from '../constants';

export const validateSubmissionMethodName = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Tên phương thức nộp hồ sơ là bắt buộc';
    }
    return undefined;
};

export const validateOtherMethodName = (value: string | undefined, selectedMethod: string): string | undefined => {
    if (selectedMethod === SUBMISSION_METHOD_OPTIONS.OTHER) {
        if (!value || !value.trim()) {
            return 'Vui lòng nhập tên phương thức khác';
        }
        if (value.trim().length < 2) {
            return 'Tên phương thức phải có ít nhất 2 ký tự';
        }
        if (value.trim().length > 255) {
            return 'Tên phương thức không được vượt quá 255 ký tự';
        }
    }
    return undefined;
};

export const validateProcessingTime = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Thời gian xử lý là bắt buộc';
    }

    // Check if it's a valid ISO 8601 date string
    const date = new Date(value);
    if (isNaN(date.getTime())) {
        return 'Thời gian xử lý không hợp lệ. Vui lòng chọn ngày và giờ';
    }

    // Check if date is in the future (optional business rule)
    const now = new Date();
    if (date < now) {
        return 'Thời gian xử lý không được ở quá khứ';
    }

    return undefined;
};

export const validateFee = (value: number | undefined): string | undefined => {
    if (value === undefined || value === null) {
        return 'Phí là bắt buộc';
    }
    if (typeof value !== 'number' || isNaN(value)) {
        return 'Phí phải là số hợp lệ';
    }
    if (value < 0) {
        return 'Phí không được nhỏ hơn 0';
    }
    // Max fee: 1 billion VND (reasonable limit)
    const maxFee = 1000000000;
    if (value > maxFee) {
        return `Phí không được vượt quá ${maxFee.toLocaleString('vi-VN')} VNĐ`;
    }
    return undefined;
};

export const validateDescription = (value: string | undefined): string | undefined => {
    if (value && value.trim().length > 1000) {
        return 'Mô tả không được vượt quá 1000 ký tự';
    }
    return undefined;
};

