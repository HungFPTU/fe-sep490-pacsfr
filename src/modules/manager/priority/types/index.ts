export type PriorityCase = {
    id: string;
    caseCode: string;
    guestId: string;
    guestName: string;
    serviceId: string;
    serviceName: string;
    priorityLevel: number;
    submissionMethod: string;
    estimatedCompletionDate: string;
    totalFee: number;
    isPayment: boolean;
    receivedBy: unknown[];
    staffName: string;
    currentStatus: string;
};

export type PriorityCaseFilters = {
    caseCode?: string;
    guestId?: string;
    serviceId?: string;
    staffId?: string;
    priorityLevel?: number;
    caseStatus?: string;
    fromDate?: string;
    toDate?: string;
    page: number;
    size: number;
};

export type PriorityCaseResponse = {
    page: number;
    size: number;
    total: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    items: PriorityCase[];
};

export type UpdatePriorityRequest = {
    caseId: string;
    priorityLevel: number;
    reason: string;
    expiryDate: string;
};

