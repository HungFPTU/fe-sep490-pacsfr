/**
 * Validation functions for FAQ form
 */

export const validateQuestion = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Câu hỏi là bắt buộc';
    }
    if (value.trim().length < 5) {
        return 'Câu hỏi phải có ít nhất 5 ký tự';
    }
    if (value.trim().length > 500) {
        return 'Câu hỏi không được vượt quá 500 ký tự';
    }
    return undefined;
};

export const validateAnswer = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Câu trả lời là bắt buộc';
    }
    if (value.trim().length < 10) {
        return 'Câu trả lời phải có ít nhất 10 ký tự';
    }
    if (value.trim().length > 2000) {
        return 'Câu trả lời không được vượt quá 2000 ký tự';
    }
    return undefined;
};

export const validateServiceId = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Dịch vụ là bắt buộc';
    }
    return undefined;
};

export const validateFaqCategoryId = (value: string): string | undefined => {
    if (!value || !value.trim()) {
        return 'Danh mục câu hỏi thường gặp là bắt buộc';
    }
    return undefined;
};

