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
