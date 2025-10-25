"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/modules/auth/hooks";
import { ProtectedRoute } from "@/modules/auth/components/authorization/ProtectedRoute";
import { UserRole } from "@/modules/auth/enums";

interface NavigationItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    current: boolean;
}

const navigation: NavigationItem[] = [
    {
        name: "Bảng điều khiển",
        href: "/staff/dashboard",
        icon: ({ className }) => (
            <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
        ),
        current: false,
    },
    {
        name: "Lịch làm việc",
        href: "/staff/workshift",
        icon: ({ className }) => (
            <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
        ),
        current: false,
    },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function StaffLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    // Check if current page is login page
    const isLoginPage = pathname === "/staff/login";

    // Update current navigation item based on pathname
    const currentNavigation = navigation.map((item) => ({
        ...item,
        current: pathname === item.href || pathname.startsWith(item.href + "/"),
    }));

    // If it's login page, render without sidebar
    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <ProtectedRoute allowedRoles={[UserRole.STAFF]} redirectTo="/login">
            <div className="min-h-screen bg-gray-100">
                {/* Sidebar */}
                <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
                    <div className="flex h-full flex-col">
                        {/* Logo */}
                        <div className="flex h-16 shrink-0 items-center px-6 border-b">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-gray-900">PASCS</div>
                                    <div className="text-xs text-gray-500">Nhân viên</div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 px-4 py-6 space-y-2">
                            {currentNavigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                            ? "bg-red-50 text-red-700 border-red-200"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                                        "group flex items-center px-3 py-2 text-sm font-medium rounded-lg border border-transparent transition-colors"
                                    )}
                                >
                                    <item.icon
                                        className={classNames(
                                            item.current ? "text-red-500" : "text-gray-400 group-hover:text-gray-500",
                                            "mr-3 h-5 w-5 flex-shrink-0"
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* User info and logout */}
                        <div className="border-t p-4">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-medium text-red-600">
                                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {user?.name || "User"}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user?.role === "Staff" ? "Nhân viên" : "Quản trị viên"}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                            >
                                <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="pl-64">
                    <main className="py-6">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
