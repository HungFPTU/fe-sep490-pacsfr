export const API_PATH = {
    AUTH: {
        LOGIN: "/Auth/login",
        REGISTER: "/Auth/register",
        LOGOUT: "/auth/logout",
        ME: "/auth/me",
        UPDATE_PROFILE: "/auth/profile",
        REFRESH_TOKEN: "/auth/refresh",
    },
    QUEUE: {
        COUNTERS: "/queue/counters",
        OVERVIEW: "/queue/overview",
        STAFF: {
            CURRENT: "/staff/queue/current",
            NEXT: "/staff/queue/next",
            COMPLETE: "/staff/queue/complete",
            SKIP: "/staff/queue/skip",
        },
    },
    MANAGER: {
        SERVICES: {
            ALL: "/manager/services",
            BY_ID: (id: string) => `/manager/services/${id}`,
        },
        ACCOUNTS: {
            ALL: "/manager/accounts",
            PERMISSIONS: "/manager/accounts/permissions",
            BY_ID: (id: string) => `/manager/accounts/${id}`,
        },
        QUEUES: {
            ALL: "/manager/queues",
            STATUS: "/manager/queues/status",
            STATISTICS: "/manager/queues/statistics",
        },
    },
    STAFF: {
        DASHBOARD: {
            WAITING_LIST: "/staff/dashboard/waiting",
            CITIZEN_PROFILE: (id: string) => `/staff/dashboard/citizen/${id}`,
            UPDATE_STATUS: "/staff/dashboard/citizen/status",
            DOCUMENTS: {
                UPLOAD: "/staff/dashboard/documents/upload",
                DOWNLOAD: (id: string) => `/staff/dashboard/documents/${id}/download`,
                LIST: (citizenId: string) => `/staff/dashboard/citizen/${citizenId}/documents`,
            },
            FEEDBACK: "/staff/dashboard/feedback",
            HISTORY: "/staff/dashboard/history",
            NOTIFICATIONS: "/staff/dashboard/notifications",
        },
        WORKSHIFT: {
            MY_SHIFTS: "/WorkShift/my-shifts",
        },
    },

};

