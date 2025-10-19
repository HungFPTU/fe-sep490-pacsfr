export type CitizenProfile = {
    id: string;
    queueNumber: string;
    fullName: string;
    dateOfBirth: string;
    phoneNumber: string;
    email?: string;
    address: string;
    serviceType: string;
    serviceId: string;
    status: 'waiting' | 'processing' | 'need_supplement' | 'completed' | 'cancelled';
    priority: boolean;
    requestedAt: string;
    startedServingAt?: string;
    completedAt?: string;
    notes?: string;
    documents: Document[];
    feedback?: CitizenFeedback;
};

export type Document = {
    id: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    uploadedAt: string;
    uploadedBy: string;
    description?: string;
    url: string;
};

export type CitizenFeedback = {
    id: string;
    citizenId: string;
    rating: 1 | 2 | 3 | 4 | 5;
    comment?: string;
    submittedAt: string;
    staffId: string;
};

export type StatusUpdateRequest = {
    citizenId: string;
    status: CitizenProfile['status'];
    notes?: string;
};

export type WaitingListFilters = {
    searchQuery?: string;
    serviceType?: string;
    status?: CitizenProfile['status'];
    priority?: boolean;
};

export type HistoryFilters = {
    dateFrom?: string;
    dateTo?: string;
    serviceType?: string;
    status?: CitizenProfile['status'];
    searchQuery?: string;
};

export type NotificationType = 'new_citizen' | 'turn_ready' | 'status_update' | 'document_uploaded';

export type Notification = {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    citizenId?: string;
    queueNumber?: string;
    timestamp: string;
    isRead: boolean;
};

export type DashboardStats = {
    totalWaiting: number;
    totalProcessing: number;
    totalCompletedToday: number;
    averageWaitTime: number;
    averageServiceTime: number;
};

// Queue management types
export type QueueStatus = {
    queueName: string;
    messageCount: number;
    consumerCount: number;
};

export type QueueStatusResponse = {
    $id?: string;
    success: boolean;
    data: QueueStatus;
};

export type CallNextResponse = {
    $id?: string;
    success: boolean;
    message?: string;
    data?: {
        ticketNumber?: string;
        citizenName?: string;
        serviceType?: string;
    };
};

// Case management types
export type CreateCaseRequest = {
    guestId: string;
    serviceId: string;
    priorityLevel: number;
    submissionMethod: string;
    notes?: string;
    createdBy: string;
};

export type CaseResponse = {
    $id?: string;
    id: string;
    guestId: string;
    serviceId: string;
    priorityLevel: number;
    submissionMethod: string;
    notes?: string;
    createdBy: string;
    createdAt: string;
    status: string;
};

export type CreateCaseApiResponse = {
    $id?: string;
    success: boolean;
    message?: string;
    data?: CaseResponse;
};

// Service types
export type ServiceDocument = {
    $id?: string;
    id: string;
    serviceId: string;
    docTypeId: string;
    docTypeName: string;
    description: string;
    isDeleted: boolean;
    createdAt: string;
};

export type Service = {
    $id?: string;
    id: string;
    serviceGroupId: string;
    legalBasisId: string;
    serviceName: string;
    serviceCode: string;
    description: string;
    serviceType: string;
    processingTime: string;
    feeAmount: number;
    resultDocument: string;
    isOnlineAvailable: boolean;
    isActive: boolean;
    requiredDocuments: {
        $id?: string;
        $values: ServiceDocument[];
    };
    createdAt: string;
};

export type PaginatedData<T> = {
    $id?: string;
    size: number;
    page: number;
    total: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    items: {
        $id?: string;
        $values: T[];
    };
};

export type ServiceListResponse = {
    $id?: string;
    success: boolean;
    message?: string;
    data: PaginatedData<Service>;
    timestamp: string;
};

export type ServiceFilters = {
    keyword?: string;
    serviceGroupId?: string;
    legalBasisId?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
};