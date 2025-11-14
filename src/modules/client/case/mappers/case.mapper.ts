/**
 * Case Mapper Module
 * 
 * Data transformation layer (DTO mapping).
 * Follows DTO Pattern - transforms raw API data to domain models.
 */

import type {
    CaseProgressRaw,
    CaseProgressSummary,
    CaseProgressTimelineStep,
} from '../types';
import { formatDateToVietnamese, formatDateOnlyToVietnamese } from '../utils/formatters';

/**
 * Extract steps array from raw data
 * Handles various formats: statusHistory.$values, statusHistory array, steps, etc.
 */
export const extractStepsArray = (raw: CaseProgressRaw | null): Array<Record<string, unknown>> => {
    if (!raw) return [];

    // Check statusHistory first (new API format with $values)
    const statusHistory = raw.statusHistory as { $values?: Array<Record<string, unknown>> } | undefined;
    if (statusHistory?.$values && Array.isArray(statusHistory.$values)) {
        return statusHistory.$values.filter(
            (item): item is Record<string, unknown> => !!item && typeof item === "object"
        );
    }

    // Check if statusHistory is directly an array
    if (Array.isArray(raw.statusHistory)) {
        return raw.statusHistory.filter(
            (item): item is Record<string, unknown> => !!item && typeof item === "object"
        );
    }

    // Fallback to other keys
    const candidateKeys = ["steps", "progressSteps", "histories", "timeline", "processSteps"];

    for (const key of candidateKeys) {
        const value = raw[key];
        if (Array.isArray(value)) {
            return value.filter(
                (item): item is Record<string, unknown> => !!item && typeof item === "object"
            );
        }
    }

    return [];
};

/**
 * Map raw data to CaseProgressSummary (DTO transformation)
 */
export const mapToSummary = (raw: CaseProgressRaw | null, fallbackCode: string): CaseProgressSummary => {
    if (!raw) {
        return {
            caseCode: fallbackCode,
        };
    }

    return {
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
            (typeof raw.currentStatus === "string" && raw.currentStatus) ||
            (typeof raw.statusName === "string" && raw.statusName) ||
            (typeof raw.status === "string" && raw.status) ||
            undefined,
        statusNote:
            (typeof raw.statusDescription === "string" && raw.statusDescription) ||
            (typeof raw.note === "string" && raw.note) ||
            undefined,
        submittedAt: formatDateToVietnamese(
            (typeof raw.submitDate === "string" && raw.submitDate) ||
            (typeof raw.createdAt === "string" && raw.createdAt) ||
            (typeof raw.createdDate === "string" && raw.createdDate) ||
            undefined
        ),
        updatedAt: formatDateToVietnamese(
            (typeof raw.updatedAt === "string" && raw.updatedAt) ||
            (typeof raw.lastUpdated === "string" && raw.lastUpdated) ||
            undefined
        ),
        processingAgency:
            (typeof raw.assignedStaffName === "string" && raw.assignedStaffName) ||
            (typeof raw.processingAgency === "string" && raw.processingAgency) ||
            (typeof raw.departmentName === "string" && raw.departmentName) ||
            (typeof raw.organizationName === "string" && raw.organizationName) ||
            undefined,
        estimatedCompletionDate: formatDateOnlyToVietnamese(
            (typeof raw.estimatedCompletionDate === "string" && raw.estimatedCompletionDate) ||
            (typeof raw.expectedCompletion === "string" && raw.expectedCompletion) ||
            undefined
        ),
        receivedChannel:
            (typeof raw.receivedChannel === "string" && raw.receivedChannel) || undefined,
        progressPercentage:
            typeof raw.progressPercentage === "number" ? raw.progressPercentage : undefined,
    };
};

/**
 * Map raw data to CaseProgressTimelineStep array (DTO transformation)
 */
export const mapToSteps = (raw: CaseProgressRaw | null): CaseProgressTimelineStep[] => {
    const records = extractStepsArray(raw);

    return records.map((record, index) => {
        // Map from statusHistory format: fromStatus, toStatus, description, createdAt, updatedBy
        const stepTitle =
            (typeof record.toStatus === "string" && record.toStatus.trim() && `Chuyển sang: ${record.toStatus}`) ||
            (typeof record.fromStatus === "string" && record.fromStatus.trim() && `Từ: ${record.fromStatus}`) ||
            (typeof record.title === "string" && record.title) ||
            (typeof record.name === "string" && record.name) ||
            (typeof record.stepName === "string" && record.stepName) ||
            (typeof record.stage === "string" && record.stage) ||
            `Bước ${index + 1}`;

        const status =
            (typeof record.toStatus === "string" && record.toStatus.trim()) ||
            (typeof record.statusName === "string" && record.statusName) ||
            (typeof record.status === "string" && record.status) ||
            (typeof record.state === "string" && record.state) ||
            undefined;

        const description =
            (typeof record.description === "string" && record.description.trim()) ||
            (typeof record.note === "string" && record.note) ||
            (typeof record.detail === "string" && record.detail) ||
            undefined;

        const processedAt = formatDateToVietnamese(
            (typeof record.createdAt === "string" && record.createdAt) ||
            (typeof record.processedAt === "string" && record.processedAt) ||
            (typeof record.updatedAt === "string" && record.updatedAt) ||
            (typeof record.completedAt === "string" && record.completedAt) ||
            (typeof record.timestamp === "string" && record.timestamp) ||
            (typeof record.time === "string" && record.time) ||
            undefined
        );

        const handler =
            (typeof record.updatedBy === "string" && record.updatedBy) ||
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

