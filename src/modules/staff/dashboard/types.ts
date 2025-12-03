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
        fullName?: string;
        status?: string;
        calledAt?: string;
        citizenName?: string;
        serviceType?: string;
    };
    timestamp?: string;
};

export type TicketDetail = {
    $id?: string;
    ticketNumber: string;
    caseId: string;
    counterId: string;
    counterName: string;
    serviceGroupId: string;
    fullName: string;
    status: 'Waiting' | 'Processing' | 'Calling' | 'Completed' | 'Skipped' | 'Cancelled' | 'NoShow';
    estimatedWaitTime: number;
    createdAt: string;
    updatedAt: string;
    servedAt?: string;
    completedAt?: string;
};

export type GetTicketDetailResponse = {
    $id?: string;
    success: boolean;
    message?: string;
    data: TicketDetail;
    timestamp?: string;
};

export type UpdateTicketStatusRequest = {
    status: 'Waiting' | 'Processing' | 'Calling' | 'Completed' | 'Skipped' | 'Cancelled' | 'NoShow';
};

export type UpdateTicketStatusResponse = {
    $id?: string;
    success: boolean;
    message?: string;
    timestamp?: string;
};

// Case management types
export type CreateCaseRequest = {
    guestId: string;
    serviceId: string;
    priorityLevel: number;
    submissionMethodId: string;
    notes?: string;
    estimatedCompletionDate?: string; // yyyy-mm-dd
    createdBy: string;
};

export type CaseResponse = {
    $id?: string;
    id: string;
    guestId: string;
    serviceId: string;
    priorityLevel: number;
    submissionMethodId: string;
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

// Service Group Types
export type ServiceGroup = {
    $id?: string;
    id: string;
    groupCode: string;
    departmentId: string;
    groupName: string;
    serviceType: string;
    description: string;
    isActive: boolean;
    createdAt: string;
};

export type ServiceGroupListResponse = {
    $id?: string;
    success: boolean;
    message?: string;
    data: PaginatedData<ServiceGroup>;
    timestamp: string;
};

export type ServiceGroupFilters = {
    keyword?: string;
    departmentId?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
};

// Guest Types
export type Guest = {
    $id?: string;
    id: string;
    guestCode: string;
    fullName: string;
    idNumber: string;
    idType: string;
    idIssueDate: string;
    idIssuePlace: string;
    phone: string;
    email: string;
    birthDate: string;
    gender: string;
    occupation: string;
    organization: string;
    guestType: string;
    notes?: string;
    isActive: boolean;
    address: string;
    ward: string;
    city: string;
    country: string;
};

export type CreateGuestRequest = {
    fullName: string;
    idNumber: string;
    idType: string;
    idIssueDate: string; // yyyy-mm-dd
    idIssuePlace: string;
    phone: string;
    email: string;
    birthDate: string; // yyyy-mm-dd
    gender: string;
    occupation: string;
    organization: string;
    guestType: string;
    notes: string;
    address: string;
    ward: string;
    city: string;
    country: string;
};

export type CreateGuestResponse = {
    $id?: string;
    success: boolean;
    message: string;
    data: string; // guestId
    timestamp: string;
};

export type GetGuestsResponse = {
    $id?: string;
    success: boolean;
    message: string;
    data: {
        $id?: string;
        $values: Guest[];
    };
    timestamp: string;
};

export type GuestSearchFilters = {
    keyword?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
};

export type SubmissionMethod = {
    $id?: string;
    submissionMethodId: string;
    submissionMethodName: string;
    processingTime: string;
    fee: number;
    description: string;
};

export type SubmissionMethodsResponse = {
    $id?: string;
    success: boolean;
    message?: string;
    data: {
        $id?: string;
        $values: SubmissionMethod[];
    };
    timestamp?: string;
};