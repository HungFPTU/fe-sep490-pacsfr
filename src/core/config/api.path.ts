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
    USERS: {
        LIST: "/admin/users",
        CREATE: "/admin/users",
        DETAIL: (id: string) => `/admin/users/${id}`,
        UPDATE: (id: string) => `/admin/users/${id}`,
        DELETE: (id: string) => `/admin/users/${id}`,
        ROLES: "/admin/roles",
    },
};

