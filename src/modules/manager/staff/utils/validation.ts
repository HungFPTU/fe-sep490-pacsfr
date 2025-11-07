// ==================== Validation Functions ====================

export const validateOrgUnit = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Cơ quan là bắt buộc';
    }
    return undefined;
};

export const validateStaffCode = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Mã nhân viên là bắt buộc';
    }
    // Staff code format: alphanumeric, no spaces, max 20 chars
    const codeRegex = /^[A-Za-z0-9_-]+$/;
    if (!codeRegex.test(value.trim())) {
        return 'Mã nhân viên chỉ được chứa chữ cái, số, dấu gạch dưới và dấu gạch ngang';
    }
    if (value.trim().length > 20) {
        return 'Mã nhân viên không được vượt quá 20 ký tự';
    }
    return undefined;
};

export const validateFullName = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Họ tên là bắt buộc';
    }
    if (value.trim().length < 2) {
        return 'Họ tên phải có ít nhất 2 ký tự';
    }
    if (value.trim().length > 100) {
        return 'Họ tên không được vượt quá 100 ký tự';
    }
    return undefined;
};

export const validateUsername = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Tên đăng nhập là bắt buộc';
    }
    // Username format: alphanumeric, underscore, dash, min 3, max 30
    const usernameRegex = /^[A-Za-z0-9_-]+$/;
    if (!usernameRegex.test(value.trim())) {
        return 'Tên đăng nhập chỉ được chứa chữ cái, số, dấu gạch dưới và dấu gạch ngang';
    }
    if (value.trim().length < 3) {
        return 'Tên đăng nhập phải có ít nhất 3 ký tự';
    }
    if (value.trim().length > 30) {
        return 'Tên đăng nhập không được vượt quá 30 ký tự';
    }
    return undefined;
};

export const validatePassword = (value: string | undefined): string | undefined => {
    if (!value || !value.trim()) {
        return 'Mật khẩu là bắt buộc';
    }
    // Password: min 6, max 50
    if (value.trim().length < 6) {
        return 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    if (value.trim().length > 50) {
        return 'Mật khẩu không được vượt quá 50 ký tự';
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

export const validatePhone = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Số điện thoại là bắt buộc';
    }
    // Vietnamese phone number: 10-11 digits, can start with 0
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(value.trim())) {
        return 'Số điện thoại phải có 10-11 chữ số';
    }
    // Check if starts with 0 (Vietnamese format)
    if (!value.trim().startsWith('0')) {
        return 'Số điện thoại phải bắt đầu bằng số 0';
    }
    return undefined;
};

export const validatePosition = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Chức vụ là bắt buộc';
    }
    return undefined;
};

export const validateRoleType = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Vai trò là bắt buộc';
    }
    return undefined;
};

export const validateSpecialization = (value: string | undefined): string | undefined => {
    if (value && value.trim().length > 200) {
        return 'Chuyên môn không được vượt quá 200 ký tự';
    }
    return undefined;
};