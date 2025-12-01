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
    CASE: {
      PROGRESS: "/Case/progress",
    },
    FEEDBACK: {
      SUBMIT: "/Feedback",
      BY_CASE: (caseId: string) => `/Feedback/case/${caseId}`,
    },
    FAQ: {
      ALL: (
        keyword: string,
        serviceId: string,
        faqCategoryId: string,
        isActive: boolean,
        page: number,
        size: number
      ) =>
        `/FAQ?keyword=${keyword}&serviceId=${serviceId}&faqCategoryId=${faqCategoryId}&isActive=${isActive}&Page=${page}&Size=${size}`,
      BY_ID: (id: string) => `/FAQ/${id}`,
    },
    FAQ_CATEGORY: {
      ALL: (keyword: string, isActive: boolean, page: number, size: number) =>
        `/FAQCategory?keyword=${keyword}&isActive=${isActive}&Page=${page}&Size=${size}`,
      BY_ID: (id: string) => `/FAQCategory/${id}`,
    },
    LEGAL_BASIS: {
      ALL: "/LegalBasis",
      BY_ID: (id: string) => `/LegalBasis/${id}`,
    },
    SERVICE_GROUPS: {
      ALL: "/ServiceGroup",
      BY_ID: (id: string) => `/ServiceGroup/${id}`,
    },
    PUBLIC_SERVICE_NEWS: {
      ALL: (
        keyword: string,
        serviceId: string,
        newsCategoryId: string,
        isPublished: boolean,
        page: number,
        size: number
      ) =>
        `/PublicServiceNews?keyword=${keyword}&serviceId=${serviceId}&newsCategoryId=${newsCategoryId}&isPublished=${isPublished}&Page=${page}&Size=${size}`,
      BY_ID: (id: string) => `/PublicServiceNews/${id}`,
    },
    ORG_UNIT: {
      LIST: (keyword: string, isActive: boolean, page: number, size: number) =>
        `/OrgUnit/get-all?keyword=${keyword}&isActive=${isActive}&Page=${page}&Size=${size}`,
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
    PAKN: {
        SUBMIT: "/PAKN/submit",
        LIST: (keyword: string, status: string, categoryId: string, page: number, size: number) => `/PAKN?keyword=${keyword}&status=${status}&categoryId=${categoryId}&Page=${page}&Size=${size}`,
        GET_BY_ID: (id: string) => `/PAKN/${id}`,
        FILES: (id: string) => `/PAKN/${id}/files`,
        
    },
    PAKN_CATEGORY: {
        LIST: (keyword: string, isActive: boolean, page: number, size: number) => `/PAKNCategory?keyword=${keyword}&isActive=${isActive}&Page=${page}&Size=${size}`,
        BY_ID: (id: string) => `/PAKNCategory/${id}`,
    },
    MANAGER: {
      SERVICES: {
        GET_ALL: (
          Keyword: string,
          ServiceGroupId: string,
          legalBasisId: string,
          isActive: boolean,
          Page: number,
          Size: number
        ) =>
          `/Service?keyword=${Keyword}&serviceGroupId=${ServiceGroupId}&legalBasisId=${legalBasisId}&isActive=${isActive}&Page=${Page}&Size=${Size}`,
        GET_BY_ID: (id: string) => `/Service/${id}`,
        POST: "/Service",
        PUT: (id: string) => `/Service/${id}`,
        DELETE: (id: string) => `/Service/${id}`,
        GET_ALL_GROUP: (
          Keyword: string,
          isActive: boolean,
          Page: number,
          Size: number
        ) => `/ServiceGroup?isActive=${isActive}&Page=${Page}&Size=${Size}`,
        ASSIGN_SUBMISSION_METHODS: "/Service/assign-submission-methods",
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
        GET_ALL: (
          Keyword: string,
          IsActive: boolean,
          Page: number,
          PageSize: number
        ) =>
          `/Department?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
        GET_BY_ID: (id: string) => `/Department/${id}`,
        POST: "/Department",
        PUT: (id: string) => `/Department/${id}`,
        DELETE: (id: string) => `/Department/${id}`,
      },
      ORG_UNIT: {
        GET_ALL: (
          Keyword: string,
          IsActive: boolean,
          Page: number,
          PageSize: number
        ) =>
          `/OrgUnit/get-all?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
        GET_BY_ID: (id: string) => `/OrgUnit/${id}`,
        POST: "/OrgUnit/create",
        PUT: (id: string) => `/OrgUnit/${id}`,
        DELETE: (id: string) => `/OrgUnit/delete/${id}`,
      },
      LEGALBASIS: {
        GET_ALL: (
          Keyword: string,
          isActive: boolean,
          Page: number,
          Size: number
        ) =>
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
          Size: number
        ) =>
          `/LegislationDocument?keyword=${Keyword}&documentType=${DocumentType}&status=${Status}&isActive=${isActive}&Page=${Page}&Size=${Size}`,
        GET_BY_ID: (id: string) => `/LegislationDocument/${id}`,
        POST: "/LegislationDocument/with-services",
        PUT: (id: string) => `/LegislationDocument/${id}`,
        DELETE: (id: string) => `/LegislationDocument/${id}`,
        UPLOAD_FILE: (id: string) => `/LegislationDocument/${id}/upload`,
        DOWNLOAD_FILE: (id: string) => `/LegislationDocument/${id}/download`,
      },
      SERVICE_GROUP: {
        GET_ALL: (
          Keyword: string,
          IsActive: boolean,
          Page: number,
          PageSize: number
        ) =>
          `/ServiceGroup?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
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
        ASSIGN_DEPARTMENT: (staffId: string) =>
          `/Staff/${staffId}/assign-department`,
        GET_SERVICE_GROUPS: "/ServiceGroup",
        ASSIGN_SERVICE_GROUPS: (staffId: string) =>
          `/Staff/${staffId}/service-groups`,
      },
      WORKSHIFT: {
        GET_ALL: (
          keyword: string,
          isActive: boolean,
          Page: number,
          Size: number,
          staffId?: string
        ) =>
          `/WorkShift?keyword=${keyword}&isActive=${isActive}&Page=${Page}&Size=${Size}${
            staffId ? `&staffId=${staffId}` : ""
          }`,
        GET_BY_ID: (id: string) => `/WorkShift/${id}`,
        POST: "/WorkShift",
        PUT: (id: string) => `/WorkShift/${id}`,
        DELETE: (id: string) => `/WorkShift/${id}`,
        MY_SHIFTS: "/WorkShift",
      },
      COUNTER: {
        GET_BY_ID: (id: string) => `/Counter/${id}`,
      },
    },
  },
  QUEUE: {
    COUNTERS: "/queue/counters",
    OVERVIEW: "/queue/overview",
    STAFF: {
      DASHBOARD: {
        WAITING_LIST: "/staff/dashboard/waiting",
        CITIZEN_PROFILE: (id: string) => `/staff/dashboard/citizen/${id}`,
        UPDATE_STATUS: "/staff/dashboard/citizen/status",
        DOCUMENTS: {
          UPLOAD: "/staff/dashboard/documents/upload",
          DOWNLOAD: (id: string) => `/staff/dashboard/documents/${id}/download`,
          LIST: (citizenId: string) =>
            `/staff/dashboard/citizen/${citizenId}/documents`,
        },
        FEEDBACK: "/staff/dashboard/feedback",
        HISTORY: "/staff/dashboard/history",
        NOTIFICATIONS: "/staff/dashboard/notifications",
        QUEUE_STATUS: (serviceGroupId: string) =>
          `/Queue/status/${serviceGroupId}`,
        CALL_NEXT: (serviceGroupId: string) =>
          `/Queue/${serviceGroupId}/call-next`,
        GET_TICKET_DETAIL: (ticketNumber: string) =>
          `/Queue/ticket/${ticketNumber}`,
        UPDATE_TICKET_STATUS: (ticketNumber: string, status: string) =>
          `/Queue/ticket/${ticketNumber}/status?status=${status}`,
        CREATE_GUEST: "/Guests",
        GET_GUESTS: "/Guests",
        CREATE_CASE: "/Case",
        GET_SERVICES: "/Service",
        GET_SERVICE_SUBMISSION_METHODS: (serviceId: string) =>
          `/Service/${serviceId}/submission-methods`,
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
        MY_SHIFTS: "/WorkShift",
      },
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
        ASSIGN_SUBMISSION_METHODS: "/Service/assign-submission-methods",
    },
    QUEUES: {
      ALL: "/queues",
      STATUS: "/queues/status",
      STATISTICS: "/queues/statistics",
    },
    DEPARTMENT: {
      GET_ALL: (
        Keyword: string,
        IsActive: boolean,
        Page: number,
        PageSize: number
      ) =>
        `/Department?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
      GET_BY_ID: (id: string) => `/Department/${id}`,
      POST: "/Department",
      PUT: (id: string) => `/Department/${id}`,
      DELETE: (id: string) => `/Department/${id}`,
    },
    ORG_UNIT: {
      GET_ALL: (
        Keyword: string,
        IsActive: boolean,
        Page: number,
        PageSize: number
      ) =>
        `/OrgUnit/get-all?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
      GET_BY_ID: (id: string) => `/OrgUnit/${id}`,
      POST: "/OrgUnit/create",
      PUT: (id: string) => `/OrgUnit/${id}`,
      DELETE: (id: string) => `/OrgUnit/delete/${id}`,
    },
    LEGALBASIS: {
      GET_ALL: (
        Keyword: string,
        isActive: boolean,
        Page: number,
        Size: number
      ) =>
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
        Size: number
      ) =>
        `/LegislationDocument?keyword=${Keyword}&documentType=${DocumentType}&status=${Status}&isActive=${isActive}&Page=${Page}&Size=${Size}`,
      GET_BY_ID: (id: string) => `/LegislationDocument/${id}`,
      POST: "/LegislationDocument",
      PUT: (id: string) => `/LegislationDocument/${id}`,
      DELETE: (id: string) => `/LegislationDocument/${id}`,
      UPLOAD_FILE: (id: string) => `/LegislationDocument/${id}/upload`,
      DOWNLOAD_FILE: (id: string) => `/LegislationDocument/${id}/download`,
    },
    SERVICE_GROUP: {
      GET_ALL: (
        Keyword: string,
        IsActive: boolean,
        Page: number,
        PageSize: number
      ) =>
        `/ServiceGroup?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
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
      ASSIGN_DEPARTMENT: (staffId: string) =>
        `/Staff/${staffId}/assign-department`,
      GET_SERVICE_GROUPS: "/ServiceGroup",
      ASSIGN_SERVICE_GROUPS: (staffId: string) =>
        `/Staff/${staffId}/service-groups`,
      UPLOAD_AVATAR: (staffId: string) => `/Staff/${staffId}/upload-avatar`,
    },
    WORKSHIFT: {
      GET_ALL: (
        keyword: string,
        isActive: boolean,
        Page: number,
        Size: number
      ) =>
        `/WorkShift?keyword=${keyword}&isActive=${isActive}&Page=${Page}&Size=${Size}`,
      GET_BY_ID: (id: string) => `/WorkShift/${id}`,
      POST: "/WorkShift",
      PUT: (id: string) => `/WorkShift/${id}`,
      DELETE: (id: string) => `/WorkShift/${id}`,
      MY_SHIFTS: "/WorkShift",
      GET_ACTIVE_COUNTERS: "/Counter/active",
      GET_STAFF_LIST: "/Staff",
      ASSIGN_STAFF: "/StaffWorkShift",
      GET_STAFF_WORKSHIFTS: "/StaffWorkShift",
      DELETE_STAFF_WORKSHIFT: (id: string) => `/StaffWorkShift/${id}`,
    },
    COUNTER: {
      GET_ALL_ACTIVE: () => `/Counter/active`,
      GET_BY_ID: (id: string) => `/Counter/${id}`,
      POST: "/Counter",
      PUT: (id: string) => `/Counter/${id}`,
      DELETE: (id: string) => `/Counter/${id}`,
      GET_ALL_SERVICE_GROUPS: "/ServiceGroup",
      ASSIGN_SERVICE_GROUP: (counterId: string) =>
        `/Counter/${counterId}/assign-service-group`,
    },
    DOCS_TYPE_GROUP: {
      GET_ALL: (
        Keyword: string,
        IsActive: boolean,
        Page: number,
        PageSize: number
      ) =>
        `/DocsTypeGroup?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
      GET_BY_ID: (id: string) => `/DocsTypeGroup/${id}`,
      POST: "/DocsTypeGroup",
      PUT: (id: string) => `/DocsTypeGroup/${id}`,
      DELETE: (id: string) => `/DocsTypeGroup/${id}`,
    },
    DOCS_TYPE: {
      GET_ALL: (
        Keyword: string,
        GroupId: string,
        IsActive: boolean,
        Page: number,
        PageSize: number
      ) =>
        `/DocsType?keyword=${Keyword}&groupId=${GroupId}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
      GET_BY_ID: (id: string) => `/DocsType/${id}`,
      POST: "/DocsType",
      PUT: (id: string) => `/DocsType/${id}`,
      DELETE: (id: string) => `/DocsType/${id}`,
    },
    TEMPLATE: {
      GET_ALL: (
        Keyword: string,
        DocsTypeId: string,
        IsActive: boolean,
        Page: number,
        PageSize: number
      ) =>
        `/Template?keyword=${Keyword}&docsTypeId=${DocsTypeId}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
      GET_BY_ID: (id: string) => `/Template/${id}`,
      POST: "/Template",
      PUT: (id: string) => `/Template/${id}`,
      DELETE: (id: string) => `/Template/${id}`,
    },
    REQUIRED_DOCUMENT: {
      GET_ALL: (
        keyword: string,
        serviceId: string,
        docTypeId: string,
        isActive: boolean,
        page: number,
        size: number
      ) =>
        `/RequiredDocument?keyword=${keyword}&serviceId=${serviceId}&docTypeId=${docTypeId}&isActive=${isActive}&Page=${page}&Size=${size}`,
      GET_BY_ID: (id: string) => `/RequiredDocument/${id}`,
      POST: "/RequiredDocument",
      PUT: (id: string) => `/RequiredDocument/${id}`,
      DELETE: (id: string) => `/RequiredDocument/${id}`,
    },
    SERVICE_PROCEDURE: {
      GET_ALL: (
        keyword: string,
        serviceId: string,
        isActive: boolean,
        page: number,
        size: number
      ) =>
        `/ServiceProcedure?keyword=${keyword}&serviceId=${serviceId}&isActive=${isActive}&Page=${page}&Size=${size}`,
      GET_BY_ID: (id: string) => `/ServiceProcedure/${id}`,
      POST: "/ServiceProcedure",
      PUT: (id: string) => `/ServiceProcedure/${id}`,
      DELETE: (id: string) => `/ServiceProcedure/${id}`,
    },
    SUBMISSION_METHOD: {
      GET_ALL: (
        Keyword: string,
        IsActive: boolean,
        Page: number,
        PageSize: number
      ) =>
        `/SubmissionMethod?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
      GET_BY_ID: (id: string) => `/SubmissionMethod/${id}`,
      POST: "/SubmissionMethod",
      PUT: (id: string) => `/SubmissionMethod/${id}`,
      DELETE: (id: string) => `/SubmissionMethod/${id}`,
    },
    FAQ_CATEGORY: {
      GET_ALL: (
        Keyword: string,
        IsActive: boolean,
        Page: number,
        PageSize: number
      ) =>
        `/FAQCategory?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
      GET_BY_ID: (id: string) => `/FAQCategory/${id}`,
      POST: "/FAQCategory",
      PUT: (id: string) => `/FAQCategory/${id}`,
      DELETE: (id: string) => `/FAQCategory/${id}`,
    },
    FAQ: {
      GET_ALL: (
        Keyword: string,
        ServiceId: string,
        FaqCategoryId: string,
        IsActive: boolean,
        Page: number,
        PageSize: number
      ) =>
        `/FAQ?keyword=${Keyword}&serviceId=${ServiceId}&faqCategoryId=${FaqCategoryId}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
      GET_BY_ID: (id: string) => `/FAQ/${id}`,
      POST: "/FAQ",
      PUT: (id: string) => `/FAQ/${id}`,
      DELETE: (id: string) => `/FAQ/${id}`,
    },
    NEWS_CATEGORY: {
      GET_ALL: (
        Keyword: string,
        IsActive: boolean,
        Page: number,
        PageSize: number
      ) =>
        `/NewsCategory?keyword=${Keyword}&isActive=${IsActive}&Page=${Page}&Size=${PageSize}`,
      GET_BY_ID: (id: string) => `/NewsCategory/${id}`,
      POST: "/NewsCategory",
      PUT: (id: string) => `/NewsCategory/${id}`,
      DELETE: (id: string) => `/NewsCategory/${id}`,
    },
    PUBLIC_SERVICE_NEWS: {
      GET_ALL: (
        Keyword: string,
        ServiceId: string,
        NewsCategoryId: string,
        StaffId: string,
        IsPublished: boolean,
        Page: number,
        PageSize: number
      ) =>
        `/PublicServiceNew?keyword=${Keyword}&serviceId=${ServiceId}&newsCategoryId=${NewsCategoryId}&staffId=${StaffId}&isPublished=${IsPublished}&Page=${Page}&Size=${PageSize}`,
      GET_BY_ID: (id: string) => `/PublicServiceNew/${id}`,
      POST: "/PublicServiceNew",
      PUT: (id: string) => `/PublicServiceNew/${id}`,
      DELETE: (id: string) => `/PublicServiceNew/${id}`,
    },
    PAKN: {
      GET_ALL: (
        keyword: string,
        status: string,
        categoryId: string,
        page: number,
        size: number
      ) =>
        `/PAKN?keyword=${keyword}&status=${status}&categoryId=${categoryId}&Page=${page}&Size=${size}`,
      GET_BY_ID: (id: string) => `/PAKN/${id}`,
      POST: "/PAKN",
      PUT: (id: string) => `/PAKN/${id}`,
      DELETE: (id: string) => `/PAKN/${id}`,
      ASSIGN_STAFF: "/PAKN/assign-staff",
      UPDATE_STATUS: "/PAKN/update-status",
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
        LIST: (citizenId: string) =>
          `/staff/dashboard/citizen/${citizenId}/documents`,
      },
      FEEDBACK: "/staff/dashboard/feedback",
      HISTORY: "/staff/dashboard/history",
      NOTIFICATIONS: "/staff/dashboard/notifications",
      QUEUE_STATUS: (serviceGroupId: string) =>
        `/Queue/status/${serviceGroupId}`,
      CALL_NEXT: (serviceGroupId: string) =>
        `/Queue/${serviceGroupId}/call-next`,
      GET_TICKET_DETAIL: (ticketNumber: string) =>
        `/Queue/ticket/${ticketNumber}`,
      UPDATE_TICKET_STATUS: (ticketNumber: string, status: string) =>
        `/Queue/ticket/${ticketNumber}/status?status=${status}`,
      CREATE_GUEST: "/Guests",
      GET_GUESTS: "/Guests",
      CREATE_CASE: "/Case",
      GET_SERVICES: "/Service",
      GET_SERVICE_SUBMISSION_METHODS: (serviceId: string) =>
        `/Service/${serviceId}/submission-methods`,
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
    PAKN_CATEGORY: {
      GET_ALL: (
        keyword: string,
        isActive: boolean | null,
        page: number,
        size: number
      ) =>
        `/PAKNCategory?keyword=${keyword}&isActive=${
          isActive ?? ""
        }&Page=${page}&Size=${size}`,
      GET_BY_ID: (id: string) => `/PAKNCategory/${id}`,
      POST: "/PAKNCategory",
      PUT: (id: string) => `/PAKNCategory/${id}`,
      DELETE: (id: string) => `/PAKNCategory/${id}`,
    },
    WORKSHIFT: {
      MY_SHIFTS: "/WorkShift",
    },
  },

  CHATBOT: {
    SEND_MESSAGE: "/Chatbox/message",
    GET_CONVERSATION: (conversationId: string) =>
      `/Chatbox/conversation/${conversationId}`,
  },

  MANAGER_DASHBOARD: {
    GET_COMPREHENSIVE_REPORT: (fromDate?: string, toDate?: string) => {
      const params = new URLSearchParams();
      if (fromDate) params.append("fromDate", fromDate);
      if (toDate) params.append("toDate", toDate);
      const queryString = params.toString();
      return `/ManagerDashboard/comprehensive-report${
        queryString ? `?${queryString}` : ""
      }`;
    },
    GET_LINE_CHART: (month?: number, year?: number) => {
      const params = new URLSearchParams();
      if (month !== undefined) params.append("month", month.toString());
      if (year !== undefined) params.append("year", year.toString());
      const queryString = params.toString();
      return `/Dashboard/case-processing-line-chart${
        queryString ? `?${queryString}` : ""
      }`;
    },
    GET_PIE_CHART: (startDate?: string, endDate?: string) => {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      const queryString = params.toString();
      return `/Dashboard/service-usage-pie-chart${
        queryString ? `?${queryString}` : ""
      }`;
    },
    GET_BAR_CHART: (startDate?: string, endDate?: string) => {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      const queryString = params.toString();
      return `/Dashboard/queue-by-hour-bar-chart${
        queryString ? `?${queryString}` : ""
      }`;
    },
    QUEUE_MONITORING: "/ManagerDashboard/queue-monitoring",
    PRIORITY_MONITORING: "/ManagerDashboard/priority-monitoring",
    UPDATE_PRIORITY: "/ManagerDashboard/priority-access",
  },

  CASE: {
    GET_ALL: "/Case",
  },

  PAYMENT: {
    CREATE: "/Payment/create",
    GET_BY_CASE_CODE: (caseCode: string) => `/Payment/by-case-code/${caseCode}`,
  },

  FILE: {
    UPLOAD_IMAGE: "/FileUpload/image",
  },

  SUBMISSION_METHOD: {
    GET_ALL: "/SubmissionMethod",
  },

  CASE_STATUS: {
    GET_ALL: "/CaseStatus",
  },
};
