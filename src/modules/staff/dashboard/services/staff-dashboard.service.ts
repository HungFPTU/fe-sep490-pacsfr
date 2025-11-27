import { staffDashboardApi } from "../api/staff-dashboard.api";
import type {
    CitizenProfile,
    Document,
    CitizenFeedback,
    StatusUpdateRequest,
    WaitingListFilters,
    HistoryFilters,
    Notification,
    DashboardStats,
    QueueStatus,
    CallNextResponse,
    CreateCaseRequest,
    CaseResponse
} from "../types";

export const staffDashboardService = {
    // Get waiting list with enhanced filtering
    async getWaitingList(filters?: WaitingListFilters): Promise<CitizenProfile[]> {
        try {
            const citizens = await staffDashboardApi.getWaitingList(filters);

            // Sort by priority and request time
            return citizens.sort((a, b) => {
                if (a.priority !== b.priority) {
                    return a.priority ? -1 : 1;
                }
                return new Date(a.requestedAt).getTime() - new Date(b.requestedAt).getTime();
            });
        } catch (error) {
            console.error('Error fetching waiting list:', error);
            throw error;
        }
    },

    // Get citizen profile with error handling
    async getCitizenProfile(citizenId: string): Promise<CitizenProfile> {
        try {
            return await staffDashboardApi.getCitizenProfile(citizenId);
        } catch (error) {
            console.error('Error fetching citizen profile:', error);
            throw error;
        }
    },

    // Update citizen status with validation
    async updateCitizenStatus(request: StatusUpdateRequest): Promise<CitizenProfile> {
        try {
            // Validate status transition
            const validStatuses = ['waiting', 'processing', 'need_supplement', 'completed', 'cancelled'];
            if (!validStatuses.includes(request.status)) {
                throw new Error('Invalid status provided');
            }

            return await staffDashboardApi.updateCitizenStatus(request);
        } catch (error) {
            console.error('Error updating citizen status:', error);
            throw error;
        }
    },

    // Get citizen documents
    async getCitizenDocuments(citizenId: string): Promise<Document[]> {
        try {
            return await staffDashboardApi.getCitizenDocuments(citizenId);
        } catch (error) {
            console.error('Error fetching citizen documents:', error);
            throw error;
        }
    },

    // Upload document with file validation
    async uploadDocument(citizenId: string, file: File, description?: string): Promise<Document> {
        try {
            // Validate file size (max 10MB)
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                throw new Error('File size exceeds 10MB limit');
            }

            // Validate file type
            const allowedTypes = [
                'application/pdf',
                'image/jpeg',
                'image/png',
                'image/gif',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];
            if (!allowedTypes.includes(file.type)) {
                throw new Error('File type not supported');
            }

            return await staffDashboardApi.uploadDocument(citizenId, file, description);
        } catch (error) {
            console.error('Error uploading document:', error);
            throw error;
        }
    },

    // Download document
    async downloadDocument(documentId: string, fileName: string): Promise<void> {
        try {
            const blob = await staffDashboardApi.downloadDocument(documentId);

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading document:', error);
            throw error;
        }
    },

    // Submit citizen feedback
    async submitFeedback(feedback: Omit<CitizenFeedback, 'id' | 'submittedAt'>): Promise<CitizenFeedback> {
        try {
            // Validate rating
            if (feedback.rating < 1 || feedback.rating > 5) {
                throw new Error('Rating must be between 1 and 5');
            }

            return await staffDashboardApi.submitFeedback(feedback);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            throw error;
        }
    },

    // Get completed appointments history
    async getHistory(filters?: HistoryFilters): Promise<CitizenProfile[]> {
        try {
            const history = await staffDashboardApi.getHistory(filters);

            // Sort by completion date (most recent first)
            return history.sort((a, b) => {
                if (!a.completedAt || !b.completedAt) return 0;
                return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
            });
        } catch (error) {
            console.error('Error fetching history:', error);
            throw error;
        }
    },

    // Get notifications
    async getNotifications(): Promise<Notification[]> {
        try {
            return await staffDashboardApi.getNotifications();
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw error;
        }
    },

    // Mark notification as read
    async markNotificationAsRead(notificationId: string): Promise<void> {
        try {
            return await staffDashboardApi.markNotificationAsRead(notificationId);
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    },

    // Get dashboard statistics
    async getDashboardStats(): Promise<DashboardStats> {
        try {
            return await staffDashboardApi.getDashboardStats();
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            throw error;
        }
    },

    // Format file size for display
    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // Calculate wait time
    calculateWaitTime(requestedAt: string, startedAt?: string): number {
        const startTime = startedAt ? new Date(startedAt) : new Date();
        const requestTime = new Date(requestedAt);
        return Math.floor((startTime.getTime() - requestTime.getTime()) / 1000 / 60); // minutes
    },

    // Get status color for UI
    getStatusColor(status: CitizenProfile['status']): string {
        switch (status) {
            case 'waiting':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'need_supplement':
                return 'bg-orange-100 text-orange-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    },

    // Get status text in Vietnamese
    getStatusText(status: CitizenProfile['status']): string {
        switch (status) {
            case 'waiting':
                return 'Đang chờ';
            case 'processing':
                return 'Đang xử lý';
            case 'need_supplement':
                return 'Cần bổ sung';
            case 'completed':
                return 'Hoàn thành';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return status;
        }
    },

    // Get queue status
    async getQueueStatus(queueId: string): Promise<QueueStatus> {
        try {
            const response = await staffDashboardApi.getQueueStatus(queueId);
            if (response.success && response.data) {
                return response.data;
            }
            throw new Error('Failed to get queue status');
        } catch (error) {
            console.error('Error fetching queue status:', error);
            throw error;
        }
    },

    // Call next ticket in queue
    async callNext(queueId: string): Promise<CallNextResponse> {
        try {
            const response = await staffDashboardApi.callNext(queueId);
            return response;
        } catch (error) {
            console.error('Error calling next ticket:', error);
            // Check if error is about no tickets in queue
            if (error instanceof Error && error.message.includes('No tickets in queue')) {
                throw new Error('Không có số nào trong hàng đợi');
            }
            throw error;
        }
    },

    // Get ticket detail
    async getTicketDetail(ticketNumber: string): Promise<import('../types').TicketDetail> {
        try {
            return await staffDashboardApi.getTicketDetail(ticketNumber);
        } catch (error) {
            console.error('Error fetching ticket detail:', error);
            throw error;
        }
    },

    // Create new case with validation
    async createCase(request: CreateCaseRequest): Promise<CaseResponse> {
        try {
            // Validate required fields
            if (!request.guestId || !request.guestId.trim()) {
                throw new Error('Guest ID là bắt buộc');
            }
            if (!request.serviceId || !request.serviceId.trim()) {
                throw new Error('Service ID là bắt buộc');
            }
            if (!request.submissionMethodId || !request.submissionMethodId.trim()) {
                throw new Error('Phương thức nộp là bắt buộc');
            }
            if (!request.createdBy || !request.createdBy.trim()) {
                throw new Error('Người tạo là bắt buộc');
            }

            // Validate priority level
            if (request.priorityLevel < 0 || request.priorityLevel > 10) {
                throw new Error('Mức độ ưu tiên phải từ 0 đến 10');
            }

            const response = await staffDashboardApi.createCase(request);
            
            if (response.success && response.data) {
                return response.data;
            }
            
            throw new Error(response.message || 'Failed to create case');
        } catch (error) {
            console.error('Error creating case:', error);
            throw error;
        }
    },

    // Get priority level text in Vietnamese
    getPriorityLevelText(level: number): string {
        if (level === 0) return 'Bình thường';
        if (level >= 1 && level <= 3) return 'Ưu tiên thấp';
        if (level >= 4 && level <= 6) return 'Ưu tiên trung bình';
        if (level >= 7 && level <= 9) return 'Ưu tiên cao';
        if (level === 10) return 'Khẩn cấp';
        return 'Không xác định';
    },

    // Get priority level color for UI
    getPriorityLevelColor(level: number): string {
        if (level === 0) return 'bg-gray-100 text-gray-800';
        if (level >= 1 && level <= 3) return 'bg-blue-100 text-blue-800';
        if (level >= 4 && level <= 6) return 'bg-yellow-100 text-yellow-800';
        if (level >= 7 && level <= 9) return 'bg-orange-100 text-orange-800';
        if (level === 10) return 'bg-red-100 text-red-800';
        return 'bg-gray-100 text-gray-800';
    },

    // Get service groups
    async getServiceGroups(filters?: import('../types').ServiceGroupFilters): Promise<import('../types').ServiceGroup[]> {
        try {
            const response = await staffDashboardApi.getServiceGroups(filters);
            
            if (response.success && response.data) {
                return response.data.items.$values || [];
            }
            
            throw new Error(response.message || 'Failed to fetch service groups');
        } catch (error) {
            console.error('Error fetching service groups:', error);
            throw error;
        }
    },

    // Update ticket status
    async updateTicketStatus(ticketNumber: string, status: string): Promise<import('../types').TicketDetail> {
        try {
            const response = await staffDashboardApi.updateTicketStatus(ticketNumber, status, { 
                status: status as 'Waiting' | 'Processing' | 'Calling' | 'Completed' | 'Skipped' | 'Cancelled' | 'NoShow'
            });
            
            if (!response.success) {
                throw new Error(response.message || 'Failed to update ticket status');
            }

            // Fetch updated ticket details
            return await this.getTicketDetail(ticketNumber);
        } catch (error) {
            console.error('Error updating ticket status:', error);
            throw error;
        }
    },

    // Get ticket status text in Vietnamese
    getTicketStatusText(status: string): string {
        const statusMap: Record<string, string> = {
            'Waiting': 'Đang chờ',
            'Processing': 'Đang xử lý',
            'Calling': 'Đang gọi',
            'Completed': 'Hoàn thành',
            'Skipped': 'Bỏ qua',
            'Cancelled': 'Đã hủy',
            'NoShow': 'Vắng mặt'
        };
        return statusMap[status] || status;
    },

    // Get ticket status color for UI
    getTicketStatusColor(status: string): string {
        const colorMap: Record<string, string> = {
            'Waiting': 'bg-yellow-100 text-yellow-800',
            'Processing': 'bg-blue-100 text-blue-800',
            'Calling': 'bg-purple-100 text-purple-800',
            'Completed': 'bg-green-100 text-green-800',
            'Skipped': 'bg-gray-100 text-gray-800',
            'Cancelled': 'bg-red-100 text-red-800',
            'NoShow': 'bg-orange-100 text-orange-800'
        };
        return colorMap[status] || 'bg-gray-100 text-gray-800';
    },
};
   
