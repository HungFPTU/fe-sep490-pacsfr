/**
 * Validation utilities
 * Centralized validation functions and schemas
 */

import { VALIDATION_RULES } from '../config/constants';

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

export interface FormValidationErrors {
    [field: string]: string;
}

/**
 * Email validation
 */
export function validateEmail(email: string): ValidationResult {
    if (!email.trim()) {
        return { isValid: false, error: "Email là bắt buộc" };
    }

    if (!VALIDATION_RULES.EMAIL_PATTERN.test(email)) {
        return { isValid: false, error: "Email không hợp lệ" };
    }

    return { isValid: true };
}

/**
 * Password validation
 */
export function validatePassword(password: string): ValidationResult {
    if (!password) {
        return { isValid: false, error: "Mật khẩu là bắt buộc" };
    }

    if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
        return { isValid: false, error: `Mật khẩu phải có ít nhất ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} ký tự` };
    }

    return { isValid: true };
}

/**
 * Password confirmation validation
 */
export function validatePasswordConfirmation(password: string, confirmPassword: string): ValidationResult {
    if (!confirmPassword) {
        return { isValid: false, error: "Xác nhận mật khẩu là bắt buộc" };
    }

    if (password !== confirmPassword) {
        return { isValid: false, error: "Mật khẩu xác nhận không khớp" };
    }

    return { isValid: true };
}

/**
 * Username validation
 */
export function validateUsername(username: string): ValidationResult {
    if (!username.trim()) {
        return { isValid: false, error: "Tên đăng nhập là bắt buộc" };
    }

    if (username.length < VALIDATION_RULES.USERNAME_MIN_LENGTH) {
        return { isValid: false, error: `Tên đăng nhập phải có ít nhất ${VALIDATION_RULES.USERNAME_MIN_LENGTH} ký tự` };
    }

    return { isValid: true };
}

/**
 * Phone number validation
 */
export function validatePhone(phone: string): ValidationResult {
    if (!phone.trim()) {
        return { isValid: false, error: "Số điện thoại là bắt buộc" };
    }

    const cleanPhone = phone.replace(/\s/g, "");
    if (!VALIDATION_RULES.PHONE_PATTERN.test(cleanPhone)) {
        return { isValid: false, error: "Số điện thoại không hợp lệ (10 chữ số)" };
    }

    return { isValid: true };
}

/**
 * ID Card number validation
 */
export function validateIdCard(idCard: string): ValidationResult {
    if (!idCard.trim()) {
        return { isValid: false, error: "Số CCCD là bắt buộc" };
    }

    const cleanIdCard = idCard.replace(/\s/g, "");
    if (!VALIDATION_RULES.ID_CARD_PATTERN.test(cleanIdCard)) {
        return { isValid: false, error: "Số CCCD phải có đúng 12 chữ số" };
    }

    return { isValid: true };
}

/**
 * Full name validation
 */
export function validateFullName(fullName: string): ValidationResult {
    if (!fullName.trim()) {
        return { isValid: false, error: "Họ tên là bắt buộc" };
    }

    if (fullName.trim().length < 2) {
        return { isValid: false, error: "Họ tên phải có ít nhất 2 ký tự" };
    }

    return { isValid: true };
}

/**
 * Date of birth validation
 */
export function validateDateOfBirth(dateString: string): ValidationResult {
    if (!dateString) {
        return { isValid: false, error: "Ngày sinh là bắt buộc" };
    }

    // Handle dd/mm/yyyy format from DatePicker
    let birthDate: Date;

    if (dateString.includes('/')) {
        // Parse dd/mm/yyyy format
        const parts = dateString.split('/');
        if (parts.length !== 3) {
            return { isValid: false, error: "Định dạng ngày sinh không hợp lệ" };
        }

        const [day, month, year] = parts.map(p => parseInt(p, 10));

        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            return { isValid: false, error: "Ngày sinh không hợp lệ" };
        }

        // Create Date object (month is 0-indexed)
        birthDate = new Date(year, month - 1, day);

        // Verify the date is what we expect (handles invalid dates like 31/02)
        if (birthDate.getDate() !== day || birthDate.getMonth() !== month - 1 || birthDate.getFullYear() !== year) {
            return { isValid: false, error: "Ngày sinh không tồn tại" };
        }
    } else {
        // Handle ISO string format (fallback)
        birthDate = new Date(dateString);
    }

    const today = new Date();

    if (isNaN(birthDate.getTime())) {
        return { isValid: false, error: "Ngày sinh không hợp lệ" };
    }

    if (birthDate > today) {
        return { isValid: false, error: "Ngày sinh không được là ngày tương lai" };
    }

    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

    if (actualAge < 16) {
        return { isValid: false, error: "Bạn phải đủ 16 tuổi để đăng ký" };
    }

    if (actualAge > 100) {
        return { isValid: false, error: "Ngày sinh không hợp lệ (quá 100 tuổi)" };
    }

    return { isValid: true };
}

/**
 * Generic form validation helper
 */
export function validateForm<T extends Record<string, unknown>>(
    data: T,
    validators: Record<keyof T, (value: unknown) => ValidationResult>
): { isValid: boolean; errors: FormValidationErrors } {
    const errors: FormValidationErrors = {};
    let isValid = true;

    for (const [field, validator] of Object.entries(validators)) {
        const result = validator(data[field]);
        if (!result.isValid) {
            errors[field] = result.error!;
            isValid = false;
        }
    }

    return { isValid, errors };
}
