// View Components
export { StaffDashboardView, CreateCasePageView } from './components/view';

// UI Components
export * from './components/ui';

// Other Components (Legacy/Utility)

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
    DashboardStats,
    QueueStatus,
    QueueStatusResponse,
    CallNextResponse,
    CreateCaseRequest,
    CaseResponse,
    CreateCaseApiResponse,
    Service,
    ServiceDocument,
    ServiceListResponse,
    ServiceFilters,
    ServiceGroup,
    ServiceGroupListResponse,
    ServiceGroupFilters,
    Guest,
    CreateGuestRequest,
    CreateGuestResponse,
    GetGuestsResponse,
    GuestSearchFilters,
    PaginatedData
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
