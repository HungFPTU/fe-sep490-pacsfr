'use client';

import {
    LayoutDashboard,
    Users,
    Briefcase,
    Building2,
    MonitorDot,
    BarChart3,
    ListChecks,
    FileText,
    HelpCircle,
    Newspaper,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ManagerNavigationSubItem {
    title: string;
    url: string;
}

export interface ManagerNavigationItem {
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: ManagerNavigationSubItem[];
}

export const MANAGER_NAVIGATION_ITEMS: ManagerNavigationItem[] = [
    {
        title: 'Dashboard',
        url: '/manager/',
        icon: LayoutDashboard,
        items: [
            {
                title: 'Bảng điều khiển',
                url: '/manager',
            },
        ],
    },
    {
        title: 'Quản lý nhân sự',
        url: '',
        icon: Users,
        items: [
            {
                title: 'Quản lý nhân viên',
                url: '/manager/quan-ly-nhan-vien',
            },
            {
                title: 'Quản lý ca làm việc',
                url: '/manager/ca-lam-viec',
            },
            {
                title: 'Phân quyền & Vai trò',
                url: '/manager/account/roles',
            },
            {
                title: 'Hiệu suất làm việc',
                url: '/manager/account/performance',
            },
        ],
    },
    {
        title: 'Quản lý dịch vụ',
        url: '',
        icon: Briefcase,
        items: [
            {
                title: 'Danh sách dịch vụ',
                url: '/manager/dich-vu',
            },
            {
                title: 'Nhóm dịch vụ',
                url: '/manager/nhom-dich-vu',
            },
            {
                title: 'Tài liệu yêu cầu',
                url: '/manager/tai-lieu-yeu-cau',
            },
            {
                title: 'Phân loại dịch vụ',
                url: '/manager/service/list',
            },
            {
                title: 'Cấu hình quy trình phục vụ',
                url: '/manager/service/config',
            },
            {
                title: 'Quy tắc xếp hàng',
                url: '/manager/service/queue',
            },
            {
                title: 'Phương thức nộp hồ sơ',
                url: '/manager/phuong-thuc-nop-ho-so',
            },
            {
                title: 'Quy trình dịch vụ',
                url: '/manager/quy-trinh-dich-vu',
            },
        ],
    },
    {
        title: 'Quản lý phòng ban',
        url: '',
        icon: Building2,
        items: [
            {
                title: 'Quản lý phòng ban',
                url: '/manager/phong-ban',
            },
            {
                title: 'Quản lý cơ quan',
                url: '/manager/co-quan',
            },
            {
                title: 'Giờ làm việc',
                url: '/manager/operation/hours',
            },
            {
                title: 'Giới hạn số lượng hàng chờ',
                url: '/manager/operation/limits',
            },
            {
                title: 'Quầy phục vụ',
                url: '/manager/operation/counter',
            },
        ],
    },
    {
        title: 'Giám sát thời gian thực',
        url: '',
        icon: MonitorDot,
        items: [
            {
                title: 'Tình trạng hàng chờ',
                url: '/manager/monitoring/queue',
            },
            {
                title: 'Tải hệ thống',
                url: '/manager/monitoring/manager',
            },
            {
                title: 'Quản lý hồ sơ & Ưu tiên',
                url: '/manager/monitoring/special',
            },
        ],
    },
    {
        title: 'Thống kê & Báo cáo',
        url: '/manager/reporting',
        icon: BarChart3,
    },
    {
        title: 'Quản lý hàng đợi',
        url: '',
        icon: ListChecks,
        items: [
            {
                title: 'Tình trạng hàng chờ',
                url: '/manager/queue/status',
            },
            {
                title: 'Thống kê hàng đợi',
                url: '/manager/queue/statistics',
            },
        ],
    },
    {
        title: 'Quản lý văn bản pháp luật',
        url: '',
        icon: FileText,
        items: [
            {
                title: 'Danh sách văn bản',
                url: '/manager/van-ban-phap-luat',
            },
            {
                title: 'Nhóm văn bản',
                url: '/manager/van-ban-phap-luat/nhom-van-ban',
            },
            {
                title: 'Loại văn bản',
                url: '/manager/van-ban-phap-luat/loai-van-ban',
            },
            {
                title: 'Mẫu văn bản',
                url: '/manager/van-ban-phap-luat/mau-van-ban',
            },
            {
                title: 'Phân loại văn bản',
                url: '/manager/van-ban-phap-luat/phan-loai',
            },
            {
                title: 'Báo cáo văn bản',
                url: '/manager/van-ban-phap-luat/bao-cao',
            },
        ],
    },
    {
        title: 'Quản lý FAQ',
        url: '',
        icon: HelpCircle,
        items: [
            {
                title: 'Danh mục câu hỏi thường gặp',
                url: '/manager/danh-muc-cau-hoi',
            },
            {
                title: 'Câu hỏi thường gặp',
                url: '/manager/cau-hoi-thuong-gap',
            },
        ],
    },
    {
        title: 'Quản lý tin tức',
        url: '',
        icon: Newspaper,
        items: [
            {
                title: 'Danh mục tin tức',
                url: '/manager/danh-muc-tin-tuc',
            },
            {
                title: 'Tin tức dịch vụ công',
                url: '/manager/tin-tuc-dich-vu',
            },
        ],
    },
];

export const MANAGER_PATH_LABELS: Record<string, string> = {
    manager: 'Quản lý',

    // Quản lý nhân sự
    'quan-ly-nhan-vien': 'Quản lý nhân viên',
    'ca-lam-viec': 'Quản lý ca làm việc',
    account: 'Tài khoản',
    roles: 'Phân quyền & Vai trò',
    performance: 'Hiệu suất làm việc',

    // Quản lý dịch vụ
    'dich-vu': 'Danh sách dịch vụ',
    'nhom-dich-vu': 'Nhóm dịch vụ',
    service: 'Dịch vụ',
    list: 'Phân loại dịch vụ',
    config: 'Cấu hình quy trình phục vụ',
    'phuong-thuc-nop-ho-so': 'Phương thức nộp hồ sơ',
    'quy-trinh-dich-vu': 'Quy trình dịch vụ',
    'tai-lieu-yeu-cau': 'Tài liệu yêu cầu',
    queue: 'Quản lý hàng đợi',

    // Quản lý phòng ban
    'phong-ban': 'Quản lý phòng ban',
    'co-quan': 'Quản lý cơ quan',
    operation: 'Vận hành',
    hours: 'Giờ làm việc',
    limits: 'Giới hạn số lượng hàng chờ',
    counter: 'Quầy phục vụ',

    // Giám sát thời gian thực
    monitoring: 'Giám sát thời gian thực',
    special: 'Ưu tiên nhóm đặc biệt',
    status: 'Tình trạng hàng chờ',
    statistics: 'Thống kê hàng đợi',

    // Thống kê & Báo cáo
    reporting: 'Thống kê & Báo cáo',

    // Quản lý văn bản pháp luật
    'van-ban-phap-luat': 'Danh sách văn bản',
    'nhom-van-ban': 'Nhóm văn bản',
    'loai-van-ban': 'Loại văn bản',
    'mau-van-ban': 'Mẫu văn bản',
    'phan-loai': 'Phân loại văn bản',
    'bao-cao': 'Báo cáo văn bản',

    // Quản lý FAQ
    'danh-muc-cau-hoi': 'Danh mục câu hỏi thường gặp',
    'cau-hoi-thuong-gap': 'Câu hỏi thường gặp',

    // Quản lý tin tức
    'danh-muc-tin-tuc': 'Danh mục tin tức',
    'tin-tuc-dich-vu': 'Tin tức dịch vụ công',
};


