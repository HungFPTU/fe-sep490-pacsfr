import { caseClientApi } from "../api/case.api";
import type {
    CaseProgressApiResponse,
    CaseProgressRequest,
    CaseProgressResult,
    CaseProgressSummary,
    CaseProgressTimelineStep,
    CaseProgressRaw,
} from "../types";

const toPlainObject = (input: unknown): Record<string, unknown> | null => {
    if (!input || typeof input !== "object" || Array.isArray(input)) {
        return null;
    }
    return input as Record<string, unknown>;
};

const extractCaseData = (response: CaseProgressApiResponse): CaseProgressRaw | null => {
    const candidates: Array<unknown> = [
        response?.data,
        (response as { result?: unknown }).result,
        (response as { payload?: unknown }).payload,
    ];

    for (const candidate of candidates) {
        if (!candidate) continue;
        if (typeof candidate === "string") {
            try {
                const parsed = JSON.parse(candidate) as unknown;
                const plain = toPlainObject(parsed);
                if (plain) return plain as CaseProgressRaw;
            } catch {
                continue;
            }
        }

        const plain = toPlainObject(candidate);
        if (plain) {
            if ("data" in plain && plain.data && typeof plain.data === "object") {
                const nested = toPlainObject(plain.data);
                if (nested) return nested as CaseProgressRaw;
            }
            return plain as CaseProgressRaw;
        }
    }

    const plainResponse = toPlainObject(response);
    if (plainResponse && !("success" in plainResponse) && !("message" in plainResponse)) {
        return plainResponse as CaseProgressRaw;
    }

    return null;
};

const normalizeSummary = (raw: CaseProgressRaw | null, fallbackCode: string): CaseProgressSummary => {
    if (!raw) {
        return {
            caseCode: fallbackCode,
        };
    }

    const summary: CaseProgressSummary = {
        caseCode:
            (typeof raw.caseCode === "string" && raw.caseCode.trim()) ||
            (typeof raw.code === "string" && raw.code.trim()) ||
            fallbackCode,
        serviceName:
            (typeof raw.serviceName === "string" && raw.serviceName) ||
            (typeof raw.service === "string" && raw.service) ||
            undefined,
        applicantName:
            (typeof raw.guestName === "string" && raw.guestName) ||
            (typeof raw.applicantName === "string" && raw.applicantName) ||
            (typeof raw.citizenName === "string" && raw.citizenName) ||
            undefined,
        status:
            (typeof raw.statusName === "string" && raw.statusName) ||
            (typeof raw.status === "string" && raw.status) ||
            undefined,
        statusNote:
            (typeof raw.statusDescription === "string" && raw.statusDescription) ||
            (typeof raw.note === "string" && raw.note) ||
            undefined,
        submittedAt:
            (typeof raw.submitDate === "string" && raw.submitDate) ||
            (typeof raw.createdAt === "string" && raw.createdAt) ||
            (typeof raw.createdDate === "string" && raw.createdDate) ||
            undefined,
        updatedAt:
            (typeof raw.updatedAt === "string" && raw.updatedAt) ||
            (typeof raw.lastUpdated === "string" && raw.lastUpdated) ||
            undefined,
        processingAgency:
            (typeof raw.processingAgency === "string" && raw.processingAgency) ||
            (typeof raw.departmentName === "string" && raw.departmentName) ||
            (typeof raw.organizationName === "string" && raw.organizationName) ||
            undefined,
        estimatedCompletionDate:
            (typeof raw.estimatedCompletionDate === "string" && raw.estimatedCompletionDate) ||
            (typeof raw.expectedCompletion === "string" && raw.expectedCompletion) ||
            undefined,
        receivedChannel:
            (typeof raw.receivedChannel === "string" && raw.receivedChannel) || undefined,
    };

    return summary;
};

const extractStepsArray = (raw: CaseProgressRaw | null): Array<Record<string, unknown>> => {
    if (!raw) return [];

    const candidateKeys = ["steps", "progressSteps", "histories", "timeline", "processSteps"];

    for (const key of candidateKeys) {
        const value = raw[key];
        if (Array.isArray(value)) {
            return value.filter((item): item is Record<string, unknown> => !!item && typeof item === "object");
        }
    }

    return [];
};

const normalizeSteps = (raw: CaseProgressRaw | null): CaseProgressTimelineStep[] => {
    const records = extractStepsArray(raw);

    return records.map((record, index) => {
        const stepTitle =
            (typeof record.title === "string" && record.title) ||
            (typeof record.name === "string" && record.name) ||
            (typeof record.stepName === "string" && record.stepName) ||
            (typeof record.stage === "string" && record.stage) ||
            `Bước ${index + 1}`;

        const status =
            (typeof record.statusName === "string" && record.statusName) ||
            (typeof record.status === "string" && record.status) ||
            (typeof record.state === "string" && record.state) ||
            undefined;

        const description =
            (typeof record.description === "string" && record.description) ||
            (typeof record.note === "string" && record.note) ||
            (typeof record.detail === "string" && record.detail) ||
            undefined;

        const processedAt =
            (typeof record.processedAt === "string" && record.processedAt) ||
            (typeof record.updatedAt === "string" && record.updatedAt) ||
            (typeof record.completedAt === "string" && record.completedAt) ||
            (typeof record.timestamp === "string" && record.timestamp) ||
            (typeof record.time === "string" && record.time) ||
            undefined;

        const handler =
            (typeof record.handlerName === "string" && record.handlerName) ||
            (typeof record.staffName === "string" && record.staffName) ||
            (typeof record.processor === "string" && record.processor) ||
            (typeof record.processorName === "string" && record.processorName) ||
            undefined;

        const order =
            typeof record.order === "number"
                ? record.order
                : typeof record.step === "number"
                    ? record.step
                    : index + 1;

        return {
            order,
            title: stepTitle,
            status,
            description,
            processedAt,
            handlerName: handler,
            note: typeof record.note === "string" ? record.note : undefined,
        };
    });
};

const buildResult = (
    response: CaseProgressApiResponse,
    fallbackCode: string,
): CaseProgressResult => {
    const rawData = extractCaseData(response);

    const summary = normalizeSummary(rawData, fallbackCode);
    const steps = normalizeSteps(rawData);

    return {
        success: response?.success ?? !!rawData,
        message: typeof response?.message === "string" ? response.message : undefined,
        summary,
        steps,
        rawData,
    };
};

export const caseClientService = {
    async lookupCaseProgress(payload: CaseProgressRequest): Promise<CaseProgressResult> {
        // Validate payload
        if (!payload.caseCode || typeof payload.caseCode !== "string" || payload.caseCode.trim().length === 0) {
            throw new Error("Mã số hồ sơ không hợp lệ.");
        }

        if (!payload.captchaToken || typeof payload.captchaToken !== "string" || payload.captchaToken.trim().length === 0) {
            throw new Error("Token reCAPTCHA không hợp lệ. Vui lòng thử lại.");
        }

        try {
            const response = await caseClientApi.progress({
                caseCode: payload.caseCode.trim(),
                captchaToken: payload.captchaToken.trim(),
            });

            const result = buildResult(response.data, payload.caseCode.trim());

            // If API returns success: false, check the message
            if (!result.success) {
                const message = result.message || "Yêu cầu không thành công. Vui lòng thử lại.";
                const messageLower = message.toLowerCase();

                // If it's a CAPTCHA error, throw with specific message
                if (messageLower.includes("captcha") || messageLower.includes("verification")) {
                    // Preserve original message from backend but translate if needed
                    const translatedMessage = message.includes("CAPTCHA verification failed")
                        ? "Xác thực CAPTCHA thất bại. Vui lòng thử lại."
                        : message;
                    throw new Error(translatedMessage);
                }

                // For other errors, throw with original message
                throw new Error(message);
            }

            return result;
        } catch (error) {
            console.error("[CaseService] Error details:", error);

            // Try to extract error message from HTTP error response
            if (error instanceof Error) {
                // Check if error message contains JSON (from HTTP client error handling)
                try {
                    const errorData = JSON.parse(error.message);
                    if (errorData && typeof errorData === "object") {
                        // Extract message from error response
                        const apiMessage =
                            errorData.message ||
                            errorData.error ||
                            errorData.errorMessage ||
                            error.message;

                        if (apiMessage) {
                            const messageLower = String(apiMessage).toLowerCase();
                            if (messageLower.includes("captcha") || messageLower.includes("verification")) {
                                throw new Error("Xác thực CAPTCHA thất bại. Vui lòng thử lại sau vài giây.");
                            }
                            throw new Error(String(apiMessage));
                        }
                    }
                } catch {
                    // Not JSON, continue with original error message
                }

                // Check if it's a CAPTCHA-related error
                const errorMessage = error.message.toLowerCase();
                if (errorMessage.includes("captcha") || errorMessage.includes("verification")) {
                    throw new Error("Xác thực CAPTCHA thất bại. Vui lòng thử lại sau vài giây.");
                }

                // Check for HTTP status errors
                if (error.message.includes("400") || error.message.includes("Bad Request")) {
                    throw new Error("Yêu cầu không hợp lệ. Vui lòng kiểm tra lại thông tin và thử lại.");
                }

                throw error;
            }
            throw new Error("Đã xảy ra lỗi khi tra cứu hồ sơ. Vui lòng thử lại.");
        }
    },
};

