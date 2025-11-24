'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

// Map paths to readable labels for Staff
const pathLabels: Record<string, string> = {
    // Main sections
    staff: 'Nhân viên',

    // Staff pages
    dashboard: 'Bảng điều khiển',
    case: 'Tra cứu hồ sơ',
    'create-case': 'Tạo hồ sơ mới',
    workshift: 'Lịch làm việc',
    payment: 'Thanh toán',
};

/**
 * StaffBreadcrumb - Auto-generated breadcrumb navigation for Staff
 * 
 * Features:
 * - Auto-generates breadcrumbs from current URL
 * - Supports navigation between pages
 * - Home icon with link
 * - Responsive design
 * 
 * @component
 */
export function StaffBreadcrumb() {
    const pathname = usePathname();

    const generateBreadcrumbs = (): BreadcrumbItem[] => {
        const paths = pathname.split('/').filter(Boolean);
        const breadcrumbs: BreadcrumbItem[] = [];

        let currentPath = '';
        paths.forEach((path, index) => {
            currentPath += `/${path}`;
            
            // Skip the "staff" segment - don't display it in breadcrumb
            if (path === 'staff') {
                return;
            }
            
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

    // On dashboard, only show home icon without breadcrumbs
    if (pathname === '/staff/dashboard' || pathname === '/staff/dashboard/') {
        return (
            <nav className="flex items-center gap-2 px-4 py-3 text-sm" aria-label="Breadcrumb">
                <Link
                    href="/staff/dashboard"
                    className="flex items-center gap-1 text-slate-600 transition-colors hover:text-slate-900"
                >
                    <Home className="h-4 w-4" />
                    <span className="hidden sm:inline">Trang chủ</span>
                </Link>
            </nav>
        );
    }

    return (
        <nav className="flex items-center gap-2 px-4 py-3 text-sm" aria-label="Breadcrumb">
            <Link
                href="/staff/dashboard"
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

