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
    SYSTEM: {
        SERVICES: {
            ALL: "/system/services",
            BY_ID: (id: string) => `/system/services/${id}`,
        },
        ACCOUNTS: {
            ALL: "/system/accounts",
            PERMISSIONS: "/system/accounts/permissions",
            BY_ID: (id: string) => `/system/accounts/${id}`,
        },
        QUEUES: {
            ALL: "/system/queues",
            STATUS: "/system/queues/status",
            STATISTICS: "/system/queues/statistics",
        },
    },
};

