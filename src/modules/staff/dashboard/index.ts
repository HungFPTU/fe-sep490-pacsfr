export { StaffDashboard } from './components/StaffDashboard';
export { CitizenProfileModal } from './components/CitizenProfileModal';
export { CitizenDocumentsModal } from './components/CitizenDocumentsModal';
export { DocumentList } from './components/DocumentList';
export { DocumentUpload } from './components/DocumentUpload';
export { FeedbackForm } from './components/FeedbackForm';
export { NotificationPanel } from './components/NotificationPanel';
export { HistoryPage } from './components/HistoryPage';

export { staffDashboardApi } from './api/staff-dashboard.api';
export { staffDashboardService } from './services/staff-dashboard.service';
export { useStaffDashboardStore } from './stores/useStaffDashboardStore';

export type {
    CitizenProfile,
    Document,
    CitizenFeedback,
    StatusUpdateRequest,
    WaitingListFilters,
    HistoryFilters,
    Notification,
    DashboardStats
} from './types';

export {
    MOCK_CITIZENS,
    MOCK_HISTORY,
    MOCK_STATS,
    MOCK_NOTIFICATIONS,
    SERVICE_TYPES,
    getMockCitizenById,
    getMockDocumentsByCitizenId,
    getMockWaitingList,
    getMockHistory
} from './consts';
