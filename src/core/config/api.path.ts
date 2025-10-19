export const API_PATH = {
    AUTH: {
        LOGIN: "/Auth/login",
        REGISTER: "/Auth/register",
        LOGOUT: "/auth/logout",
        ME: "/auth/me",
        UPDATE_PROFILE: "/auth/profile",
        REFRESH_TOKEN: "/auth/refresh",
    },
    CLIENT: {
        SERVICES: {
            ALL: "/Service",
            BY_ID: (id: string) => `/Service/${id}`,
        },
        SERVICE_GROUPS: {
            ALL: "/ServiceGroup",
            BY_ID: (id: string) => `/ServiceGroup/${id}`,
        },
        LEGAL_BASIS: {
            ALL: "/LegalBasis",
            BY_ID: (id: string) => `/LegalBasis/${id}`,
        },
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
            QUEUE_STATUS: (queueId: string) => `/Queue/status/${queueId}`,
            CALL_NEXT: (queueId: string) => `/Queue/${queueId}/call-next`,
            CREATE_CASE: "/Case",
            GET_SERVICES: "/Service",
        },
        WORKSHIFT: {
            MY_SHIFTS: "/WorkShift/my-shifts",
        },
    },

};

