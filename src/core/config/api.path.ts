export const API_PATH = {
    AUTH: {
        LOGIN: '/Auth/login',
        REGISTER: '/Auth/register',
        LOGOUT: '/auth/logout',
        ME: '/auth/me',
        UPDATE_PROFILE: '/auth/profile',
        REFRESH_TOKEN: '/auth/refresh',
    },
    CLIENT: {
        SERVICES: {
            ALL: '/Service',
            BY_ID: (id: string) => `/Service/${id}`,
        },
        LEGAL_BASIS: {
            ALL: '/LegalBasis',
            BY_ID: (id: string) => `/LegalBasis/${id}`,
        },
        SERVICE_GROUPS: {
            ALL: '/ServiceGroup',
            BY_ID: (id: string) => `/ServiceGroup/${id}`,
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
            DEPARTMENT: {
                GET_ALL: (Keyword: string, IsActive: boolean, Page: number, PageSize: number) => `/Department?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
                GET_BY_ID: (id: string) => `/Department/${id}`,
                POST: "/Department",
                PUT: (id: string) => `/Department/${id}`,
                DELETE: (id: string) => `/Department/${id}`,
            },
            ORG_UNIT: {
                GET_ALL: (Keyword: string, IsActive: boolean, Page: number, PageSize: number) => `/OrgUnit/get-all?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
                GET_BY_ID: (id: string) => `/OrgUnit/${id}`,
                POST: "/OrgUnit/create",
                PUT: (id: string) => `/OrgUnit/${id}`,
                DELETE: (id: string) => `/OrgUnit/delete/${id}`,
            },
            LEGALBASIS: {
                GET_ALL: (Keyword: string, isActive: boolean, Page: number, Size: number) => `/LegalBasis?keyword=${Keyword}&isActive=${isActive}&Page=${Page}&Size=${Size}`,
                GET_BY_ID: (id: string) => `/LegalBasis/${id}`,
            },
            LEGAL_DOCUMENT: {
                GET_ALL: (Keyword: string, DocumentType: string, Status: string, isActive: boolean, Page: number, Size: number) => `/LegislationDocument?keyword=${Keyword}&documentType=${DocumentType}&status=${Status}&isActive=${isActive}&Page=${Page}&Size=${Size}`,
                GET_BY_ID: (id: string) => `/LegislationDocument/${id}`,
                POST: "/LegislationDocument/with-services",
                PUT: (id: string) => `/LegislationDocument/${id}`,
                DELETE: (id: string) => `/LegislationDocument/${id}`,
                UPLOAD_FILE: (id: string) => `/LegislationDocument/${id}/upload`,
                DOWNLOAD_FILE: (id: string) => `/LegislationDocument/${id}/download`,
            },
            SERVICE_GROUP: {
                GET_ALL: (Keyword: string, IsActive: boolean, Page: number, PageSize: number) => `/ServiceGroup?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
                GET_BY_ID: (id: string) => `/ServiceGroup/${id}`,
                POST: "/ServiceGroup",
                PUT: (id: string) => `/ServiceGroup/${id}`,
                DELETE: (id: string) => `/ServiceGroup/${id}`,
            },
            STAFF_MANAGEMENT: {
                BASE: "/Staff",
                GET_BY_ID: (id: string) => `/Staff/${id}`,
                CREATE: "/Staff",
                UPDATE: (id: string) => `/Staff/${id}`,
                DELETE: (id: string) => `/Staff/${id}`,
                ASSIGN_DEPARTMENT: (staffId: string) => `/Staff/${staffId}/assign-department`,
                ASSIGN_WORKSHIFT: (staffId: string) => `/Staff/${staffId}/assign-workshift`,
            },
            WORKSHIFT: {
                GET_ALL: (keyword: string, isActive: boolean, Page: number, Size: number, staffId?: string) => `/WorkShift?keyword=${keyword}&isActive=${isActive}&Page=${Page}&Size=${Size}${staffId ? `&staffId=${staffId}` : ''}`,
                GET_BY_ID: (id: string) => `/WorkShift/${id}`,
                POST: "/WorkShift",
                PUT: (id: string) => `/WorkShift/${id}`,
                DELETE: (id: string) => `/WorkShift/${id}`,
                MY_SHIFTS: "/WorkShift/my-shifts",
            },
            COUNTER: {
                GET_BY_ID: (id: string) => `/Counter/${id}`,
            },
        },
    },
    QUEUE: {
        COUNTERS: '/queue/counters',
        OVERVIEW: '/queue/overview',
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
                CASE_LOOKUP: (caseId: string) => `/Case/${caseId}`,
                CASE_LIST: "/Case",
            },
            CASE: {
                LIST: "/Case",
                DETAIL: "/Case",
                LOOKUP: (caseId: string) => `/Case/${caseId}`,
                UPDATE: (caseId: string) => `/Case/${caseId}`,
                UPDATE_STATUS: (caseId: string) => `/Case/${caseId}/status`,
                UPDATE_PAYMENT: (caseId: string) => `/Case/${caseId}/payment`,
            },
            WORKSHIFT: {
                MY_SHIFTS: "/WorkShift/my-shifts",
            },
        },
    },
    MANAGER: {
        SERVICES: {
            GET_ALL: (
                Keyword: string,
                ServiceGroupId: string,
                legalBasisId: string,
                isActive: boolean,
                Page: number,
                Size: number,
            ) =>
                `/Service?keyword=${Keyword}&serviceGroupId=${ServiceGroupId}&legalBasisId=${legalBasisId}&isActive=${isActive}&Page=${Page}&Size=${Size}`,
            GET_BY_ID: (id: string) => `/Service/${id}`,
            POST: '/Service',
            PUT: (id: string) => `/Service/${id}`,
            DELETE: (id: string) => `/Service/${id}`,
            GET_ALL_GROUP: (Keyword: string, isActive: boolean, Page: number, Size: number) =>
                `/ServiceGroup?isActive=${isActive}&Page=${Page}&Size=${Size}`,
        },
        ACCOUNTS: {
            GET_ALL: '/Staff',
            GET_BY_ID: (id: string) => `/Staff/${id}`,
            POST: '/Staff',
            ASSIGN: (staffId: string) => `/Staff/${staffId}/assign-department`,
            PUT: (id: string) => `/Staff/${id}`,
            DELETE: (id: string) => `/Staff/${id}`,
            PERMISSIONS: '/Staff/permissions',
            BY_ID: (id: string) => `/Staff/${id}`,
        },
        QUEUES: {
            ALL: '/queues',
            STATUS: '/queues/status',
            STATISTICS: '/queues/statistics',
        },
        DEPARTMENT: {
            GET_ALL: (Keyword: string, IsActive: boolean, Page: number, PageSize: number) =>
                `/Department?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
            GET_BY_ID: (id: string) => `/Department/${id}`,
            POST: '/Department',
            PUT: (id: string) => `/Department/${id}`,
            DELETE: (id: string) => `/Department/${id}`,
        },
        ORG_UNIT: {
            GET_ALL: (Keyword: string, IsActive: boolean, Page: number, PageSize: number) =>
                `/OrgUnit/get-all?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
            GET_BY_ID: (id: string) => `/OrgUnit/${id}`,
            POST: '/OrgUnit/create',
            PUT: (id: string) => `/OrgUnit/${id}`,
            DELETE: (id: string) => `/OrgUnit/delete/${id}`,
        },
        LEGALBASIS: {
            GET_ALL: (Keyword: string, isActive: boolean, Page: number, Size: number) =>
                `/LegalBasis?keyword=${Keyword}&isActive=${isActive}&Page=${Page}&Size=${Size}`,
            GET_BY_ID: (id: string) => `/LegalBasis/${id}`,
        },
        LEGAL_DOCUMENT: {
            GET_ALL: (
                Keyword: string,
                DocumentType: string,
                Status: string,
                isActive: boolean,
                Page: number,
                Size: number,
            ) =>
                `/LegislationDocument?keyword=${Keyword}&documentType=${DocumentType}&status=${Status}&isActive=${isActive}&Page=${Page}&Size=${Size}`,
            GET_BY_ID: (id: string) => `/LegislationDocument/${id}`,
            POST: '/LegislationDocument',
            PUT: (id: string) => `/LegislationDocument/${id}`,
            DELETE: (id: string) => `/LegislationDocument/${id}`,
            UPLOAD_FILE: (id: string) => `/LegislationDocument/${id}/upload`,
            DOWNLOAD_FILE: (id: string) => `/LegislationDocument/${id}/download`,
        },
        SERVICE_GROUP: {
            GET_ALL: (Keyword: string, IsActive: boolean, Page: number, PageSize: number) =>
                `/ServiceGroup?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
            GET_BY_ID: (id: string) => `/ServiceGroup/${id}`,
            POST: '/ServiceGroup',
            PUT: (id: string) => `/ServiceGroup/${id}`,
            DELETE: (id: string) => `/ServiceGroup/${id}`,
        },
        STAFF_MANAGEMENT: {
            BASE: '/Staff',
            GET_BY_ID: (id: string) => `/Staff/${id}`,
            CREATE: '/Staff',
            UPDATE: (id: string) => `/Staff/${id}`,
            DELETE: (id: string) => `/Staff/${id}`,
            ASSIGN_DEPARTMENT: (staffId: string) => `/Staff/${staffId}/assign-department`,
            ASSIGN_WORKSHIFT: (staffId: string) => `/Staff/${staffId}/assign-workshift`,
        },
        WORKSHIFT: {
            GET_ALL: (keyword: string, isActive: boolean, Page: number, Size: number) =>
                `/WorkShift?keyword=${keyword}&isActive=${isActive}&Page=${Page}&Size=${Size}`,
            GET_BY_ID: (id: string) => `/WorkShift/${id}`,
            POST: '/WorkShift',
            PUT: (id: string) => `/WorkShift/${id}`,
            DELETE: (id: string) => `/WorkShift/${id}`,
            MY_SHIFTS: '/WorkShift/my-shifts',
            GET_ACTIVE_COUNTERS: '/Counter/active',
            GET_STAFF_LIST: '/Staff',
        },
        COUNTER: {
            GET_ALL_ACTIVE: () => `/Counter/active`,
            GET_BY_ID: (id: string) => `/Counter/${id}`,
        },
        DOCS_TYPE_GROUP: {
            GET_ALL: (Keyword: string, IsActive: boolean, Page: number, PageSize: number) =>
                `/DocsTypeGroup?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
            GET_BY_ID: (id: string) => `/DocsTypeGroup/${id}`,
            POST: '/DocsTypeGroup',
            PUT: (id: string) => `/DocsTypeGroup/${id}`,
            DELETE: (id: string) => `/DocsTypeGroup/${id}`,
        },
        DOCS_TYPE: {
            GET_ALL: (Keyword: string, GroupId: string, IsActive: boolean, Page: number, PageSize: number) =>
                `/DocsType?keyword=${Keyword}&groupId=${GroupId}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
            GET_BY_ID: (id: string) => `/DocsType/${id}`,
            POST: '/DocsType',
            PUT: (id: string) => `/DocsType/${id}`,
            DELETE: (id: string) => `/DocsType/${id}`,
        },
        TEMPLATE: {
            GET_ALL: (Keyword: string, DocsTypeId: string, IsActive: boolean, Page: number, PageSize: number) =>
                `/Template?keyword=${Keyword}&docsTypeId=${DocsTypeId}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
            GET_BY_ID: (id: string) => `/Template/${id}`,
            POST: '/Template',
            PUT: (id: string) => `/Template/${id}`,
            DELETE: (id: string) => `/Template/${id}`,
        },
    },
    STAFF: {
        DASHBOARD: {
            WAITING_LIST: '/staff/dashboard/waiting',
            CITIZEN_PROFILE: (id: string) => `/staff/dashboard/citizen/${id}`,
            UPDATE_STATUS: '/staff/dashboard/citizen/status',
            DOCUMENTS: {
                UPLOAD: '/staff/dashboard/documents/upload',
                DOWNLOAD: (id: string) => `/staff/dashboard/documents/${id}/download`,
                LIST: (citizenId: string) => `/staff/dashboard/citizen/${citizenId}/documents`,
            },
            FEEDBACK: '/staff/dashboard/feedback',
            HISTORY: '/staff/dashboard/history',
            NOTIFICATIONS: '/staff/dashboard/notifications',
            QUEUE_STATUS: (serviceGroupId: string) => `/Queue/status/${serviceGroupId}`,
            CALL_NEXT: (serviceGroupId: string) => `/Queue/${serviceGroupId}/call-next`,
            CREATE_GUEST: '/Guests',
            GET_GUESTS: '/Guests',
            CREATE_CASE: '/Case',
            GET_SERVICES: '/Service',
            GET_SERVICE_GROUPS: '/ServiceGroup',
            CASE_LOOKUP: (caseId: string) => `/Case/${caseId}`,
            CASE_LIST: '/Case',
        },
        CASE: {
            LIST: "/Case",
            DETAIL: "/Case",
            LOOKUP: (caseId: string) => `/Case/${caseId}`,
            UPDATE: (caseId: string) => `/Case/${caseId}`,
            UPDATE_STATUS: (caseId: string) => `/Case/${caseId}/status`,
            UPDATE_PAYMENT: (caseId: string) => `/Case/${caseId}/payment`,
        },
        WORKSHIFT: {
            MY_SHIFTS: '/WorkShift/my-shifts',
        },
    },

    CHATBOT: {
        SEND_MESSAGE: '/Chatbox/message',
        GET_CONVERSATION: (conversationId: string) => `/Chatbox/conversation/${conversationId}`
    },

  FILE: {
    UPLOAD_IMAGE: '/FileUpload/image',
  },

  SUBMISSION_METHOD: {
    GET_ALL: '/SubmissionMethod',
  },

  CASE_STATUS: {
    GET_ALL: '/CaseStatus',
  },

};
