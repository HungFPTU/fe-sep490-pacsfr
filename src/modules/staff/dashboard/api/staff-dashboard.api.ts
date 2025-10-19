import { http } from "@core/http/client";
import { API_PATH } from "@core/config/api.path";
import type {
    CitizenProfile,
    Document,
    CitizenFeedback,
    StatusUpdateRequest,
    WaitingListFilters,
    HistoryFilters,
    Notification,
    DashboardStats,
    QueueStatusResponse,
    CallNextResponse,
    CreateCaseRequest,
    CreateCaseApiResponse,
    ServiceListResponse,
    ServiceFilters
} from "../types";

export const staffDashboardApi = {
    // Get waiting list with filters
    async getWaitingList(filters?: WaitingListFilters): Promise<CitizenProfile[]> {
        const params = new URLSearchParams();
        if (filters?.searchQuery) params.append('search', filters.searchQuery);
        if (filters?.serviceType) params.append('serviceType', filters.serviceType);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.priority !== undefined) params.append('priority', filters.priority.toString());

        const query = params.toString();
        const url = `${API_PATH.STAFF.DASHBOARD.WAITING_LIST}${query ? '?' + query : ''}`;

        const response = await http.get<CitizenProfile[]>(url);
        return response.data;
    },

    // Get citizen profile by ID
    async getCitizenProfile(citizenId: string): Promise<CitizenProfile> {
        const response = await http.get<CitizenProfile>(API_PATH.STAFF.DASHBOARD.CITIZEN_PROFILE(citizenId));
        return response.data;
    },

    // Update citizen status
    async updateCitizenStatus(request: StatusUpdateRequest): Promise<CitizenProfile> {
        const response = await http.put<CitizenProfile>(API_PATH.STAFF.DASHBOARD.UPDATE_STATUS, request);
        return response.data;
    },

    // Get citizen documents
    async getCitizenDocuments(citizenId: string): Promise<Document[]> {
        const response = await http.get<Document[]>(API_PATH.STAFF.DASHBOARD.DOCUMENTS.LIST(citizenId));
        return response.data;
    },

    // Upload document
    async uploadDocument(citizenId: string, file: File, description?: string): Promise<Document> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('citizenId', citizenId);
        if (description) formData.append('description', description);

        const response = await http.post<Document>(API_PATH.STAFF.DASHBOARD.DOCUMENTS.UPLOAD, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Download document
    async downloadDocument(documentId: string): Promise<Blob> {
        const response = await http.get<Blob>(API_PATH.STAFF.DASHBOARD.DOCUMENTS.DOWNLOAD(documentId));
        return response.data;
    },

    // Submit citizen feedback
    async submitFeedback(feedback: Omit<CitizenFeedback, 'id' | 'submittedAt'>): Promise<CitizenFeedback> {
        const response = await http.post<CitizenFeedback>(API_PATH.STAFF.DASHBOARD.FEEDBACK, feedback);
        return response.data;
    },

    // Get completed appointments history
    async getHistory(filters?: HistoryFilters): Promise<CitizenProfile[]> {
        const params = new URLSearchParams();
        if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters?.dateTo) params.append('dateTo', filters.dateTo);
        if (filters?.serviceType) params.append('serviceType', filters.serviceType);
        if (filters?.status) params.append('status', filters.status);
        if (filters?.searchQuery) params.append('search', filters.searchQuery);

        const query = params.toString();
        const url = `${API_PATH.STAFF.DASHBOARD.HISTORY}${query ? '?' + query : ''}`;

        const response = await http.get<CitizenProfile[]>(url);
        return response.data;
    },

    // Get notifications
    async getNotifications(): Promise<Notification[]> {
        const response = await http.get<Notification[]>(API_PATH.STAFF.DASHBOARD.NOTIFICATIONS);
        return response.data;
    },

    // Mark notification as read
    async markNotificationAsRead(notificationId: string): Promise<void> {
        await http.put(`${API_PATH.STAFF.DASHBOARD.NOTIFICATIONS}/${notificationId}/read`);
    },

    // Get dashboard statistics
    async getDashboardStats(): Promise<DashboardStats> {
        const response = await http.get<DashboardStats>(`${API_PATH.STAFF.DASHBOARD.WAITING_LIST}/stats`);
        return response.data;
    },

    // Get queue status by queueId
    async getQueueStatus(queueId: string): Promise<QueueStatusResponse> {
        const response = await http.get<QueueStatusResponse>(API_PATH.STAFF.DASHBOARD.QUEUE_STATUS(queueId));
        return response.data;
    },

    // Call next ticket in queue
    async callNext(queueId: string): Promise<CallNextResponse> {
        const response = await http.post<CallNextResponse>(API_PATH.STAFF.DASHBOARD.CALL_NEXT(queueId), {});
        return response.data;
    },

    // Create new case
    async createCase(request: CreateCaseRequest): Promise<CreateCaseApiResponse> {
        const response = await http.post<CreateCaseApiResponse>(API_PATH.STAFF.DASHBOARD.CREATE_CASE, request);
        return response.data;
    },

    // Get services with pagination and filters
    async getServices(filters?: ServiceFilters): Promise<ServiceListResponse> {
        const params = new URLSearchParams();
        
        if (filters?.keyword) params.append('Keyword', filters.keyword);
        if (filters?.serviceGroupId) params.append('ServiceGroupId', filters.serviceGroupId);
        if (filters?.legalBasisId) params.append('LegalBasisId', filters.legalBasisId);
        if (filters?.isActive !== undefined) params.append('IsActive', filters.isActive.toString());
        if (filters?.page) params.append('Page', filters.page.toString());
        if (filters?.size) params.append('Size', filters.size.toString());

        const query = params.toString();
        const url = `${API_PATH.STAFF.DASHBOARD.GET_SERVICES}${query ? '?' + query : ''}`;

        const response = await http.get<ServiceListResponse>(url);
        return response.data;
    },
};
