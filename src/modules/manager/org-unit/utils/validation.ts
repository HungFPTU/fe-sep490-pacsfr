/**
 * Validation functions for Org Unit form
 */

export const validateDepartmentId = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Phòng ban là bắt buộc';
    }
    return undefined;
};

export const validateUnitCode = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Mã cơ quan là bắt buộc';
    }
    // Code format: alphanumeric, underscore, dash, max 20 chars
    const codeRegex = /^[A-Za-z0-9_-]+$/;
    if (!codeRegex.test(value.trim())) {
        return 'Mã cơ quan chỉ được chứa chữ cái, số, dấu gạch dưới và dấu gạch ngang';
    }
    if (value.trim().length > 20) {
        return 'Mã cơ quan không được vượt quá 20 ký tự';
    }
    return undefined;
};

export const validateUnitName = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Tên cơ quan là bắt buộc';
    }
    if (value.trim().length < 2) {
        return 'Tên cơ quan phải có ít nhất 2 ký tự';
    }
    if (value.trim().length > 255) {
        return 'Tên cơ quan không được vượt quá 255 ký tự';
    }
    return undefined;
};

export const validateUnitType = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Loại hình là bắt buộc';
    }
    return undefined;
};

export const validatePhone = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Số điện thoại là bắt buộc';
    }
    // Vietnamese phone number: 10-11 digits, must start with 0
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(value.trim())) {
        return 'Số điện thoại phải có 10-11 chữ số';
    }
    if (!value.trim().startsWith('0')) {
        return 'Số điện thoại phải bắt đầu bằng số 0';
    }
    return undefined;
};

export const validateEmail = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Email là bắt buộc';
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value.trim())) {
        return 'Email không hợp lệ';
    }
    if (value.trim().length > 100) {
        return 'Email không được vượt quá 100 ký tự';
    }
    return undefined;
};

export const validateAddress = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Địa chỉ là bắt buộc';
    }
    if (value.trim().length < 5) {
        return 'Địa chỉ phải có ít nhất 5 ký tự';
    }
    if (value.trim().length > 500) {
        return 'Địa chỉ không được vượt quá 500 ký tự';
    }
    return undefined;
};

