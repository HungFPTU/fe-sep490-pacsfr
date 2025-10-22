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
            QUEUE_STATUS: (serviceGroupId: string) => `/Queue/status/${serviceGroupId}`,
            CALL_NEXT: (serviceGroupId: string) => `/Queue/${serviceGroupId}/call-next`,
            CREATE_GUEST: "/Guests",
            GET_GUESTS: "/Guests",
            CREATE_CASE: "/Case",
            GET_SERVICES: "/Service",
            GET_SERVICE_GROUPS: "/ServiceGroup",
        },
        WORKSHIFT: {
            MY_SHIFTS: "/WorkShift/my-shifts",
        },
    },

};

