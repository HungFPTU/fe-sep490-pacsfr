'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

// Map paths to readable labels
const pathLabels: Record<string, string> = {
    manager: 'Quản lý',
    'staff-management': 'Quản lý nhân viên',
    'co-quan': 'Cơ quan',
    'phong-ban': 'Phòng ban',
    'nhom-dich-vu': 'Nhóm dịch vụ',
    'dich-vu': 'Dịch vụ',
    queue: 'Hàng đợi',
    status: 'Trạng thái',
    account: 'Tài khoản',
    service: 'Dịch vụ',
};

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
        <nav className="flex items-center gap-2 px-4 py-3 text-sm">
            <Link
                href="/manager"
                className="flex items-center gap-1 text-slate-600 transition-colors hover:text-slate-900"
            >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Trang chủ</span>
            </Link>

            {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="text-slate-600 transition-colors hover:text-slate-900"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-medium text-slate-900">{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
}

