/**
 * Case Service Layer
 * 
 * Business logic layer for case operations.
 * Follows Service Layer pattern - encapsulates business logic and coordinates between Repository and Domain.
 * 
 * Responsibilities:
 * - Input validation
 * - Business rule enforcement
 * - Error handling and transformation
 * - Orchestrating data flow (Repository -> Mapper -> Domain)
 */

import { caseRepository } from '../repositories';
import { extractCaseData } from '../utils/parsers';
import { mapToSummary, mapToSteps } from '../mappers';
import type {
    CaseProgressRequest,
    CaseProgressResult,
    CaseProgressApiResponse,
    CaseFeedbackRequest,
    CaseFeedbackResponse,
    CaseFeedback,
} from '../types';

/**
 * Build result from API response
 * Orchestrates data transformation: API Response -> Raw Data -> Domain Models
 */
const buildResult = (
    response: CaseProgressApiResponse,
    fallbackCode: string,
): CaseProgressResult => {
    const rawData = extractCaseData(response);
    const summary = mapToSummary(rawData, fallbackCode);
    const steps = mapToSteps(rawData);

    return {
        success: response?.success ?? !!rawData,
        message: typeof response?.message === "string" ? response.message : undefined,
        summary,
        steps,
        rawData,
    };
};

/**
 * Validate case progress request payload
 */
const validateRequest = (payload: CaseProgressRequest): void => {
    if (!payload.caseCode || typeof payload.caseCode !== "string" || payload.caseCode.trim().length === 0) {
        throw new Error("Mã số hồ sơ không hợp lệ.");
    }

    if (!payload.captchaToken || typeof payload.captchaToken !== "string" || payload.captchaToken.trim().length === 0) {
        throw new Error("Token reCAPTCHA không hợp lệ. Vui lòng thử lại.");
    }
};

/**
 * Normalize and transform error messages
 */
const normalizeError = (error: unknown): Error => {
    if (!(error instanceof Error)) {
        return new Error("Đã xảy ra lỗi khi tra cứu hồ sơ. Vui lòng thử lại.");
    }

    // Try to parse JSON error message
    try {
        const errorData = JSON.parse(error.message);
        if (errorData && typeof errorData === "object") {
            const apiMessage =
                errorData.message ||
                errorData.error ||
                errorData.errorMessage ||
                error.message;

            if (apiMessage) {
                const messageLower = String(apiMessage).toLowerCase();
                if (messageLower.includes("captcha") || messageLower.includes("verification")) {
                    return new Error("Xác thực CAPTCHA thất bại. Vui lòng thử lại sau vài giây.");
                }
                return new Error(String(apiMessage));
            }
        }
    } catch {
        // Not JSON, continue with original error message
    }

    // Check for CAPTCHA-related errors
    const errorMessage = error.message.toLowerCase();
    if (errorMessage.includes("captcha") || errorMessage.includes("verification")) {
        return new Error("Xác thực CAPTCHA thất bại. Vui lòng thử lại sau vài giây.");
    }

    // Check for HTTP status errors
    if (error.message.includes("400") || error.message.includes("Bad Request")) {
        return new Error("Yêu cầu không hợp lệ. Vui lòng kiểm tra lại thông tin và thử lại.");
    }

    return error;
};

const validateFeedbackRequest = (payload: CaseFeedbackRequest): void => {
    if (!payload.caseId || typeof payload.caseId !== "string" || payload.caseId.trim().length === 0) {
        throw new Error("Không xác định được hồ sơ cần đánh giá.");
    }

    if (!Number.isFinite(payload.rating) || payload.rating < 1 || payload.rating > 5) {
        throw new Error("Vui lòng chọn mức đánh giá hợp lệ (1-5 sao).");
    }

    if (!payload.comment || payload.comment.trim().length < 10) {
        throw new Error("Nội dung góp ý cần tối thiểu 10 ký tự.");
    }

    if (!payload.isAnonymous) {
        if (!payload.guestName || payload.guestName.trim().length === 0) {
            throw new Error("Vui lòng nhập họ và tên.");
        }

        if (payload.guestPhone && payload.guestPhone.trim().length < 9) {
            throw new Error("Số điện thoại không hợp lệ.");
        }
    }
};

/**
 * Case Client Service
 * Main service class following Service Layer pattern
 */
export class CaseClientService {
    /**
     * Lookup case progress
     * Orchestrates the entire flow: Validation -> Repository -> Mapping -> Result
     */
    async lookupCaseProgress(payload: CaseProgressRequest): Promise<CaseProgressResult> {
        // Step 1: Validate input
        validateRequest(payload);

        try {
            // Step 2: Call repository (data access layer)
            const response = await caseRepository.lookupProgress({
                caseCode: payload.caseCode.trim(),
                captchaToken: payload.captchaToken.trim(),
            });

            // Step 3: Transform and build result
            const result = buildResult(response, payload.caseCode.trim());

            // Step 4: Handle business logic - check success status
            if (!result.success) {
                const message = result.message || "Yêu cầu không thành công. Vui lòng thử lại.";
                const messageLower = message.toLowerCase();

                // Business rule: CAPTCHA errors need special handling
                if (messageLower.includes("captcha") || messageLower.includes("verification")) {
                    const translatedMessage = message.includes("CAPTCHA verification failed")
                        ? "Xác thực CAPTCHA thất bại. Vui lòng thử lại."
                        : message;
                    throw new Error(translatedMessage);
                }

                throw new Error(message);
            }

            return result;
        } catch (error) {
            console.error("[CaseService] Error details:", error);
            throw normalizeError(error);
        }
    }

    async submitFeedback(payload: CaseFeedbackRequest): Promise<CaseFeedbackResponse> {
        validateFeedbackRequest(payload);

        try {
            const normalizedPayload: CaseFeedbackRequest = {
                caseId: payload.caseId.trim(),
                rating: Math.round(payload.rating),
                comment: payload.comment.trim(),
                isAnonymous: payload.isAnonymous,
                guestName: payload.isAnonymous ? undefined : payload.guestName?.trim(),
                guestPhone: payload.isAnonymous ? undefined : payload.guestPhone?.trim(),
            };

            const response = await caseRepository.submitFeedback(normalizedPayload);

            if (response?.success === false) {
                throw new Error(response?.message || "Không thể gửi phản hồi. Vui lòng thử lại.");
            }

            return response ?? { success: true };
        } catch (error) {
            throw normalizeError(error);
        }
    }

    async getFeedbackByCase(caseId: string): Promise<CaseFeedback | null> {
        if (!caseId) {
            return null;
        }
        try {
            return await caseRepository.getFeedbackByCase(caseId);
        } catch (error) {
            console.error("[CaseService] Failed to fetch feedback by case:", error);
            return null;
        }
    }
}

/**
 * Default service instance (Singleton pattern)
 */
export const caseClientService = new CaseClientService();

