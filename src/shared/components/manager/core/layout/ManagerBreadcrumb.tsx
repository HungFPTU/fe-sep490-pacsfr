'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

// Map paths to readable labels based on sidebar navigation
const pathLabels: Record<string, string> = {
    // Main sections
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

    // Thống kê & Báo cáo
    reporting: 'Thống kê & Báo cáo',

    // Quản lý hàng đợi
    queue: 'Quản lý hàng đợi',
    statistics: 'Thống kê hàng đợi',
    status: 'Tình trạng hàng chờ',

    // Quản lý văn bản pháp luật
    'van-ban-phap-luat': 'Danh sách văn bản',
    'nhom-van-ban': 'Nhóm văn bản',
    'loai-van-ban': 'Loại văn bản',
    'mau-van-ban': 'Mẫu văn bản',
    'phan-loai': 'Phân loại văn bản',
    'bao-cao': 'Báo cáo văn bản',
};

/**
 * ManagerBreadcrumb - Auto-generated breadcrumb navigation
 * 
 * Features:
 * - Auto-generates breadcrumbs from current URL
 * - Supports navigation between pages
 * - Home icon with link
 * - Responsive design
 * 
 * @component
 */
export function ManagerBreadcrumb() {
    const pathname = usePathname();

    const generateBreadcrumbs = (): BreadcrumbItem[] => {
        const paths = pathname.split('/').filter(Boolean);
        const breadcrumbs: BreadcrumbItem[] = [];

        let currentPath = '';
        paths.forEach((path, index) => {
            currentPath += `/${path}`;
            const label = pathLabels[path] || path.charAt(0).toUpperCase() + path.slice(1);

            // Don't add link for the last item
            if (index === paths.length - 1) {
                breadcrumbs.push({ label });
            } else {
                breadcrumbs.push({ label, href: currentPath });
            }
        });

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    // Don't show breadcrumb on homepage
    if (pathname === '/manager' || pathname === '/manager/') {
        return null;
    }

    return (
        <nav className="flex items-center gap-2 px-4 py-3 text-sm" aria-label="Breadcrumb">
            <Link
                href="/manager"
                className="flex items-center gap-1 text-slate-600 transition-colors hover:text-slate-900"
            >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Trang chủ</span>
            </Link>

            {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="text-slate-600 transition-colors hover:text-slate-900"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-medium text-slate-900" aria-current="page">
                            {item.label}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
}

