import type { CitizenProfile, Document, Notification, DashboardStats, WaitingListFilters, HistoryFilters } from "./types";

// Mock data for development and testing
export const MOCK_CITIZENS: CitizenProfile[] = [
    {
        id: "cit_001",
        queueNumber: "A001",
        fullName: "Nguyễn Văn An",
        dateOfBirth: "1990-05-15",
        phoneNumber: "0123456789",
        email: "nguyenvanan@email.com",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        serviceType: "Đăng ký khai sinh",
        serviceId: "svc_001",
        status: "waiting",
        priority: false,
        requestedAt: "2024-09-11T08:00:00Z",
        notes: "Người dân có mang theo CMND",
        documents: [
            {
                id: "doc_001",
                fileName: "cmnd_nguyen_van_an.jpg",
                fileType: "image/jpeg",
                fileSize: 2048576,
                uploadedAt: "2024-09-11T08:05:00Z",
                uploadedBy: "System",
                description: "CMND/CCCD của công dân",
                url: "/mock/cmnd_nguyen_van_an.jpg"
            }
        ]
    },
    {
        id: "cit_002",
        queueNumber: "A002",
        fullName: "Trần Thị Bình",
        dateOfBirth: "1985-12-20",
        phoneNumber: "0987654321",
        email: "tranthibinh@email.com",
        address: "456 Đường XYZ, Quận 3, TP.HCM",
        serviceType: "Cấp đổi giấy phép lái xe",
        serviceId: "svc_002",
        status: "processing",
        priority: true,
        requestedAt: "2024-09-11T08:15:00Z",
        startedServingAt: "2024-09-11T09:00:00Z",
        notes: "Khẩn cấp - cần đổi GPLX trong ngày",
        documents: [
            {
                id: "doc_002",
                fileName: "giay_phep_lai_xe.pdf",
                fileType: "application/pdf",
                fileSize: 1536000,
                uploadedAt: "2024-09-11T08:20:00Z",
                uploadedBy: "Staff Counter 1",
                description: "Giấy phép lái xe cũ",
                url: "/mock/giay_phep_lai_xe.pdf"
            }
        ]
    },
    {
        id: "cit_003",
        queueNumber: "A003",
        fullName: "Lê Văn Cường",
        dateOfBirth: "1978-03-10",
        phoneNumber: "0912345678",
        address: "789 Đường DEF, Quận 7, TP.HCM",
        serviceType: "Đăng ký kết hôn",
        serviceId: "svc_003",
        status: "need_supplement",
        priority: false,
        requestedAt: "2024-09-11T08:30:00Z",
        startedServingAt: "2024-09-11T09:15:00Z",
        notes: "Thiếu giấy tờ của vợ/chồng",
        documents: [
            {
                id: "doc_003",
                fileName: "don_dang_ky_ket_hon.docx",
                fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                fileSize: 512000,
                uploadedAt: "2024-09-11T08:35:00Z",
                uploadedBy: "Citizen",
                description: "Đơn đăng ký kết hôn",
                url: "/mock/don_dang_ky_ket_hon.docx"
            }
        ]
    },
    {
        id: "cit_004",
        queueNumber: "A004",
        fullName: "Phạm Thị Dung",
        dateOfBirth: "1995-08-25",
        phoneNumber: "0934567890",
        email: "phamthidung@email.com",
        address: "321 Đường GHI, Quận 10, TP.HCM",
        serviceType: "Cấp lại thẻ căn cước",
        serviceId: "svc_004",
        status: "waiting",
        priority: false,
        requestedAt: "2024-09-11T09:00:00Z",
        notes: "Mất thẻ CCCD, cần cấp lại khẩn cấp",
        documents: []
    },
    {
        id: "cit_005",
        queueNumber: "A005",
        fullName: "Hoàng Văn Em",
        dateOfBirth: "1982-11-30",
        phoneNumber: "0945678901",
        address: "654 Đường JKL, Quận 2, TP.HCM",
        serviceType: "Đăng ký hộ khẩu",
        serviceId: "svc_005",
        status: "completed",
        priority: false,
        requestedAt: "2024-09-11T07:30:00Z",
        startedServingAt: "2024-09-11T08:45:00Z",
        completedAt: "2024-09-11T09:30:00Z",
        notes: "Hoàn thành đăng ký hộ khẩu",
        documents: [
            {
                id: "doc_004",
                fileName: "giay_dang_ky_ho_khau.pdf",
                fileType: "application/pdf",
                fileSize: 1024000,
                uploadedAt: "2024-09-11T08:50:00Z",
                uploadedBy: "Staff Counter 2",
                description: "Giấy đăng ký hộ khẩu",
                url: "/mock/giay_dang_ky_ho_khau.pdf"
            }
        ],
        feedback: {
            id: "fb_001",
            citizenId: "cit_005",
            rating: 5,
            comment: "Nhân viên phục vụ tận tình, thủ tục nhanh chóng",
            submittedAt: "2024-09-11T09:35:00Z",
            staffId: "staff_001"
        }
    }
];

export const MOCK_HISTORY: CitizenProfile[] = [
    ...MOCK_CITIZENS.filter(c => c.status === 'completed'),
    {
        id: "cit_006",
        queueNumber: "A006",
        fullName: "Đỗ Thị Hoa",
        dateOfBirth: "1992-06-18",
        phoneNumber: "0967890123",
        email: "dothihoa@email.com",
        address: "987 Đường MNO, Quận 5, TP.HCM",
        serviceType: "Cấp đổi CMND",
        serviceId: "svc_006",
        status: "completed",
        priority: false,
        requestedAt: "2024-09-10T08:00:00Z",
        startedServingAt: "2024-09-10T09:00:00Z",
        completedAt: "2024-09-10T10:00:00Z",
        notes: "Hoàn thành cấp đổi CMND",
        documents: [],
        feedback: {
            id: "fb_002",
            citizenId: "cit_006",
            rating: 4,
            comment: "Thủ tục khá nhanh, nhân viên thân thiện",
            submittedAt: "2024-09-10T10:05:00Z",
            staffId: "staff_002"
        }
    }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: "notif_001",
        type: "new_citizen",
        title: "Công dân mới",
        message: "Nguyễn Văn An đã đăng ký dịch vụ Đăng ký khai sinh",
        citizenId: "cit_001",
        queueNumber: "A001",
        timestamp: "2024-09-11T08:00:00Z",
        isRead: false
    },
    {
        id: "notif_002",
        type: "turn_ready",
        title: "Đến lượt",
        message: "Đến lượt phục vụ số A002 - Trần Thị Bình",
        citizenId: "cit_002",
        queueNumber: "A002",
        timestamp: "2024-09-11T09:00:00Z",
        isRead: true
    },
    {
        id: "notif_003",
        type: "status_update",
        title: "Cập nhật trạng thái",
        message: "Hồ sơ A003 cần bổ sung thêm giấy tờ",
        citizenId: "cit_003",
        queueNumber: "A003",
        timestamp: "2024-09-11T09:20:00Z",
        isRead: false
    }
];

export const MOCK_STATS: DashboardStats = {
    totalWaiting: 2,
    totalProcessing: 1,
    totalCompletedToday: 3,
    averageWaitTime: 25, // minutes
    averageServiceTime: 45 // minutes
};

export const SERVICE_TYPES = [
    { id: "svc_001", name: "Đăng ký khai sinh", code: "KS" },
    { id: "svc_002", name: "Cấp đổi giấy phép lái xe", code: "GPLX" },
    { id: "svc_003", name: "Đăng ký kết hôn", code: "KH" },
    { id: "svc_004", name: "Cấp lại thẻ căn cước", code: "CCCD" },
    { id: "svc_005", name: "Đăng ký hộ khẩu", code: "HK" },
    { id: "svc_006", name: "Cấp đổi CMND", code: "CMND" },
    { id: "svc_007", name: "Đăng ký tạm trú", code: "TT" },
    { id: "svc_008", name: "Cấp giấy phép kinh doanh", code: "GPDK" }
];

// Utility functions for mock data
export const getMockCitizenById = (id: string): CitizenProfile | undefined => {
    return MOCK_CITIZENS.find(citizen => citizen.id === id);
};

export const getMockDocumentsByCitizenId = (citizenId: string): Document[] => {
    const citizen = getMockCitizenById(citizenId);
    return citizen?.documents || [];
};

export const getMockWaitingList = (filters?: WaitingListFilters): CitizenProfile[] => {
    let filtered = MOCK_CITIZENS.filter(c => c.status === 'waiting' || c.status === 'processing');

    if (filters?.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(c =>
            c.fullName.toLowerCase().includes(query) ||
            c.queueNumber.toLowerCase().includes(query) ||
            c.phoneNumber.includes(query)
        );
    }

    if (filters?.serviceType) {
        filtered = filtered.filter(c => c.serviceId === filters.serviceType);
    }

    if (filters?.status) {
        filtered = filtered.filter(c => c.status === filters.status);
    }

    if (filters?.priority !== undefined) {
        filtered = filtered.filter(c => c.priority === filters.priority);
    }

    return filtered;
};

export const getMockHistory = (filters?: HistoryFilters): CitizenProfile[] => {
    let filtered = MOCK_HISTORY;

    if (filters?.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(c =>
            c.fullName.toLowerCase().includes(query) ||
            c.queueNumber.toLowerCase().includes(query) ||
            c.phoneNumber.includes(query)
        );
    }

    if (filters?.serviceType) {
        filtered = filtered.filter(c => c.serviceId === filters.serviceType);
    }

    if (filters?.status) {
        filtered = filtered.filter(c => c.status === filters.status);
    }

    if (filters?.dateFrom) {
        const fromDate = new Date(filters.dateFrom);
        filtered = filtered.filter(c =>
            c.completedAt && new Date(c.completedAt) >= fromDate
        );
    }

    if (filters?.dateTo) {
        const toDate = new Date(filters.dateTo);
        filtered = filtered.filter(c =>
            c.completedAt && new Date(c.completedAt) <= toDate
        );
    }

    return filtered;
};
