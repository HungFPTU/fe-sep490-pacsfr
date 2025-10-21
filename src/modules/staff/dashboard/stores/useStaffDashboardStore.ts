import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {
    CitizenProfile,
    WaitingListFilters,
    HistoryFilters,
    Notification,
    DashboardStats,
    QueueStatus
} from '../types';

interface StaffDashboardState {
    // Data
    waitingList: CitizenProfile[];
    currentCitizen: CitizenProfile | null;
    history: CitizenProfile[];
    notifications: Notification[];
    stats: DashboardStats | null;
    
    // Queue management
    serviceGroupId: string | null;
    queueStatus: QueueStatus | null;
    isLoadingQueueStatus: boolean;
    isCallingNext: boolean;

    // Filters
    waitingListFilters: WaitingListFilters;
    historyFilters: HistoryFilters;

    // Loading states
    isLoadingWaitingList: boolean;
    isLoadingHistory: boolean;
    isLoadingStats: boolean;
    isUpdatingStatus: boolean;

    // UI states
    selectedCitizenId: string | null;
    showProfileModal: boolean;
    showFeedbackModal: boolean;
    showDocumentUploadModal: boolean;

    // Actions
    setWaitingList: (citizens: CitizenProfile[]) => void;
    setCurrentCitizen: (citizen: CitizenProfile | null) => void;
    setHistory: (history: CitizenProfile[]) => void;
    setNotifications: (notifications: Notification[]) => void;
    setStats: (stats: DashboardStats) => void;
    
    // Queue management actions
    setServiceGroupId: (serviceGroupId: string | null) => void;
    setQueueStatus: (status: QueueStatus | null) => void;
    setLoadingQueueStatus: (loading: boolean) => void;
    setCallingNext: (calling: boolean) => void;

    setWaitingListFilters: (filters: WaitingListFilters) => void;
    setHistoryFilters: (filters: HistoryFilters) => void;

    setLoadingWaitingList: (loading: boolean) => void;
    setLoadingHistory: (loading: boolean) => void;
    setLoadingStats: (loading: boolean) => void;
    setUpdatingStatus: (updating: boolean) => void;

    setSelectedCitizenId: (id: string | null) => void;
    setShowProfileModal: (show: boolean) => void;
    setShowFeedbackModal: (show: boolean) => void;
    setShowDocumentUploadModal: (show: boolean) => void;

    // Utility actions
    addNotification: (notification: Notification) => void;
    markNotificationAsRead: (notificationId: string) => void;
    updateCitizenInList: (citizen: CitizenProfile) => void;
    clearFilters: () => void;
    reset: () => void;
}

export const useStaffDashboardStore = create<StaffDashboardState>()(
    devtools(
        persist(
            (set) => ({
                // Initial state
                waitingList: [],
                currentCitizen: null,
                history: [],
                notifications: [],
                stats: null,
                
                // Queue management
                serviceGroupId: null,
                queueStatus: null,
                isLoadingQueueStatus: false,
                isCallingNext: false,

                waitingListFilters: {},
                historyFilters: {},

                isLoadingWaitingList: false,
                isLoadingHistory: false,
                isLoadingStats: false,
                isUpdatingStatus: false,

                selectedCitizenId: null,
                showProfileModal: false,
                showFeedbackModal: false,
                showDocumentUploadModal: false,

                // Actions
                setWaitingList: (citizens) => set({ waitingList: citizens }),
                setCurrentCitizen: (citizen) => set({ currentCitizen: citizen }),
                setHistory: (history) => set({ history }),
                setNotifications: (notifications) => set({ notifications }),
                setStats: (stats) => set({ stats }),
                
                // Queue management actions
                setServiceGroupId: (serviceGroupId) => set({ serviceGroupId }),
                setQueueStatus: (status) => set({ queueStatus: status }),
                setLoadingQueueStatus: (loading) => set({ isLoadingQueueStatus: loading }),
                setCallingNext: (calling) => set({ isCallingNext: calling }),

                setWaitingListFilters: (filters) => set({ waitingListFilters: filters }),
                setHistoryFilters: (filters) => set({ historyFilters: filters }),

                setLoadingWaitingList: (loading) => set({ isLoadingWaitingList: loading }),
                setLoadingHistory: (loading) => set({ isLoadingHistory: loading }),
                setLoadingStats: (loading) => set({ isLoadingStats: loading }),
                setUpdatingStatus: (updating) => set({ isUpdatingStatus: updating }),

                setSelectedCitizenId: (id) => set({ selectedCitizenId: id }),
                setShowProfileModal: (show) => set({ showProfileModal: show }),
                setShowFeedbackModal: (show) => set({ showFeedbackModal: show }),
                setShowDocumentUploadModal: (show) => set({ showDocumentUploadModal: show }),

                // Utility actions
                addNotification: (notification) =>
                    set((state) => ({
                        notifications: [notification, ...state.notifications]
                    })),

                markNotificationAsRead: (notificationId) =>
                    set((state) => ({
                        notifications: state.notifications.map(n =>
                            n.id === notificationId ? { ...n, isRead: true } : n
                        )
                    })),

                updateCitizenInList: (updatedCitizen) =>
                    set((state) => ({
                        waitingList: state.waitingList.map(c =>
                            c.id === updatedCitizen.id ? updatedCitizen : c
                        ),
                        currentCitizen: state.currentCitizen?.id === updatedCitizen.id
                            ? updatedCitizen
                            : state.currentCitizen
                    })),

                clearFilters: () =>
                    set({
                        waitingListFilters: {},
                        historyFilters: {}
                    }),

                reset: () =>
                    set({
                        waitingList: [],
                        currentCitizen: null,
                        history: [],
                        notifications: [],
                        stats: null,
                        serviceGroupId: null,
                        queueStatus: null,
                        isLoadingQueueStatus: false,
                        isCallingNext: false,
                        waitingListFilters: {},
                        historyFilters: {},
                        isLoadingWaitingList: false,
                        isLoadingHistory: false,
                        isLoadingStats: false,
                        isUpdatingStatus: false,
                        selectedCitizenId: null,
                        showProfileModal: false,
                        showFeedbackModal: false,
                        showDocumentUploadModal: false,
                    }),
            }),
            {
                name: 'staff-dashboard-storage',
                partialize: (state) => ({
                    serviceGroupId: state.serviceGroupId,
                }),
            }
        ),
        { name: 'staff-dashboard-store' }
    )
);
