/**
 * Validation functions for Legal Document form
 */

export const validateDocumentNumber = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Số quyết định là bắt buộc';
    }

    const trimmedValue = value.trim();

    // Validate format: NUMBER/YEAR/CODE (e.g., 15/2025/TT-BCA)
    const documentNumberRegex = /^(\d+)\/(\d{4})\/([A-Z0-9-]+)$/;

    if (!documentNumberRegex.test(trimmedValue)) {
        return 'Số quyết định phải có định dạng: SỐ/NĂM/MÃ (ví dụ: 15/2025/TT-BCA)';
    }

    // Extract parts
    const parts = trimmedValue.split('/');
    const number = parts[0];
    const year = parts[1];
    const code = parts[2];

    // Validate number (must be positive integer)
    const numberValue = parseInt(number, 10);
    if (isNaN(numberValue) || numberValue <= 0) {
        return 'Phần số phải là số nguyên dương';
    }

    // Validate year (must be 4 digits and reasonable range)
    const yearValue = parseInt(year, 10);
    if (isNaN(yearValue)) {
        return 'Năm phải là số hợp lệ';
    }

    const currentYear = new Date().getFullYear();
    const minYear = 1900;
    const maxYear = currentYear + 10; // Allow up to 10 years in the future

    if (yearValue < minYear || yearValue > maxYear) {
        return `Năm phải trong khoảng ${minYear} đến ${maxYear}`;
    }

    // Validate code (alphanumeric, uppercase, with hyphens, 2-20 characters)
    const codeRegex = /^[A-Z0-9-]{2,20}$/;
    if (!codeRegex.test(code)) {
        return 'Mã phải là chữ in hoa, số và dấu gạch ngang, từ 2-20 ký tự';
    }

    // Validate total length
    if (trimmedValue.length > 50) {
        return 'Số quyết định không được vượt quá 50 ký tự';
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

export const validateIssueDate = (value: string, effectiveDate?: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Ngày ban hành là bắt buộc';
    }

    // Validate date format
    const date = new Date(value);
    if (isNaN(date.getTime())) {
        return 'Ngày ban hành không hợp lệ';
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value.trim())) {
        return 'Ngày ban hành phải có định dạng YYYY-MM-DD';
    }

    // Issue date không được là tương lai (không thể ban hành trong tương lai)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const issueDate = new Date(value);
    issueDate.setHours(0, 0, 0, 0);

    if (issueDate > today) {
        return 'Ngày ban hành không được là tương lai';
    }

    // Issue date không được quá xa trong quá khứ (ví dụ: không quá 100 năm)
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    if (issueDate < minDate) {
        return 'Ngày ban hành không được quá 100 năm trong quá khứ';
    }

    // Cross-validation: Issue date phải <= Effective date (nếu effective date đã được nhập)
    if (effectiveDate && effectiveDate.trim()) {
        const effectiveDateObj = new Date(effectiveDate);
        effectiveDateObj.setHours(0, 0, 0, 0);

        if (issueDate > effectiveDateObj) {
            return 'Ngày ban hành không được sau ngày có hiệu lực';
        }
    }

    return undefined;
};

export const validateEffectiveDate = (value: string, issueDate?: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Ngày có hiệu lực là bắt buộc';
    }

    // Validate date format
    const date = new Date(value);
    if (isNaN(date.getTime())) {
        return 'Ngày có hiệu lực không hợp lệ';
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value.trim())) {
        return 'Ngày có hiệu lực phải có định dạng YYYY-MM-DD';
    }

    // Effective date không được quá xa trong quá khứ (ví dụ: không quá 100 năm)
    const effectiveDate = new Date(value);
    effectiveDate.setHours(0, 0, 0, 0);
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    if (effectiveDate < minDate) {
        return 'Ngày có hiệu lực không được quá 100 năm trong quá khứ';
    }

    // Cross-validation: Effective date phải >= Issue date (nếu issue date đã được nhập)
    if (issueDate && issueDate.trim()) {
        const issueDateObj = new Date(issueDate);
        issueDateObj.setHours(0, 0, 0, 0);

        if (effectiveDate < issueDateObj) {
            return 'Ngày có hiệu lực không được trước ngày ban hành';
        }
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

