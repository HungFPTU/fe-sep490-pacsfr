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
            GET_ALL: (Keyword: string, ServiceGroupId: string, legalBasisId: string, isActive: boolean, Page: number, Size: number) => `/Service?keyword=${Keyword}&serviceGroupId=${ServiceGroupId}&legalBasisId=${legalBasisId}&isActive=${isActive}&Page=${Page}&Size=${Size}`,
            GET_BY_ID: (id: string) => `/Service/${id}`,
            POST: "/Service",
            PUT: (id: string) => `/Service/${id}`,
            DELETE: (id: string) => `/Service/${id}`,
            GET_ALL_GROUP: (Keyword: string, isActive: boolean, Page: number, Size: number) => `/ServiceGroup?isActive=${isActive}&Page=${Page}&Size=${Size}`,
       },
        ACCOUNTS: {
            GET_ALL: "/Staff",
            GET_BY_ID: (id: string) => `/Staff/${id}`,
            POST: "/Staff",
            ASSIGN: (staffId: string) => `/Staff/${staffId}/assign-department`,
            PUT: (id: string) => `/Staff/${id}`,
            DELETE: (id: string) => `/Staff/${id}`,
            PERMISSIONS: "/Staff/permissions",
            BY_ID: (id: string) => `/Staff/${id}`,
        },
        QUEUES: {
            ALL: "/queues",
            STATUS: "/queues/status",
            STATISTICS: "/queues/statistics",
        },
        DEPARTMENTS: {
            GET_ALL: (Keyword: string, IsActive: boolean, Page: number, PageSize: number) => `/Department?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
        },
        ORGUNITS: {
            GET_ALL: (Keyword: string, IsActive: boolean, Page: number, PageSize: number) => `/OrgUnit/get-all?isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
        },
        LEGALBASIS: {
            GET_ALL: (Keyword: string, isActive: boolean, Page: number, Size: number) => `/LegalBasis?keyword=${Keyword}&isActive=${isActive}&Page=${Page}&Size=${Size}`,
            GET_BY_ID: (id: string) => `/LegalBasis/${id}`,
        }
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

