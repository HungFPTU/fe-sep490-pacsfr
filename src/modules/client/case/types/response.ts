export interface CaseProgressTimelineStep {
    order?: number;
    title?: string;
    description?: string;
    status?: string;
    processedAt?: string;
    handlerName?: string;
    note?: string;
}

export interface CaseProgressSummary {
    caseCode?: string;
    serviceName?: string;
    applicantName?: string;
    status?: string;
    statusNote?: string;
    submittedAt?: string;
    updatedAt?: string;
    processingAgency?: string;
    estimatedCompletionDate?: string;
    receivedChannel?: string;
}

export interface CaseProgressRaw {
    caseCode?: string;
    code?: string;
    serviceName?: string;
    service?: string;
    guestName?: string;
    applicantName?: string;
    citizenName?: string;
    status?: string;
    statusName?: string;
    statusDescription?: string;
    submitDate?: string;
    createdAt?: string;
    createdDate?: string;
    updatedAt?: string;
    lastUpdated?: string;
    estimatedCompletionDate?: string;
    expectedCompletion?: string;
    processingAgency?: string;
    departmentName?: string;
    organizationName?: string;
    receivedChannel?: string;
    progressSteps?: unknown;
    steps?: unknown;
    histories?: unknown;
    timeline?: unknown;
    [key: string]: unknown;
}

export interface CaseProgressResult {
    success: boolean;
    message?: string;
    summary: CaseProgressSummary;
    steps: CaseProgressTimelineStep[];
    rawData: CaseProgressRaw | null;
}

export interface CaseProgressApiResponse {
    success?: boolean;
    message?: string;
    data?: unknown;
    result?: unknown;
    [key: string]: unknown;
}

