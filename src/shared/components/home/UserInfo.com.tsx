'use client';

import Link from 'next/link';
import { useAuth } from '@/modules/auth/hooks';
import { UserRole } from '@/modules/auth/enums';
import {
    User,
    Settings,
    LogOut,
    LayoutDashboard,
    Briefcase,
    ChevronDown
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/components/manager/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/manager/ui/avatar';
import { Button } from '@/shared/components/ui/button.ui';
import { cn } from '@/shared/lib/utils';

/**
 * UserInfo - Component to display logged-in user information and navigation
 * 
 * Features:
 * - Shows user avatar, name, and email
 * - Role-based navigation links (Manager, Staff)
 * - Profile and settings links
 * - Logout functionality
 * 
 * @component
 */
export function UserInfo() {
    const { user, role, isAuthenticated, logout } = useAuth();

    if (!isAuthenticated || !user) {
        return null;
    }

    const handleLogout = async () => {
        try {
            await logout();
            // Redirect to home after logout
            window.location.href = '/';
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const getRoleLabel = (userRole: UserRole | null | undefined): string => {
        switch (userRole) {
            case UserRole.MANAGER:
                return 'Quản lý';
            case UserRole.STAFF:
                return 'Nhân viên';
            case UserRole.GUEST:
                return 'Khách';
            default:
                return 'Người dùng';
        }
    };

    const getRoleBadgeColor = (userRole: UserRole | null | undefined): string => {
        switch (userRole) {
            case UserRole.MANAGER:
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case UserRole.STAFF:
                return 'bg-green-100 text-green-700 border-green-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getDashboardUrl = (userRole: UserRole | null | undefined): string => {
        switch (userRole) {
            case UserRole.MANAGER:
                return '/manager';
            case UserRole.STAFF:
                return '/staff/dashboard';
            default:
                return '/';
        }
    };

    const getProfileUrl = (userRole: UserRole | null | undefined): string => {
        switch (userRole) {
            case UserRole.MANAGER:
                return '/manager/profile';
            case UserRole.STAFF:
                return '/staff/profile';
            default:
                return '/profile';
        }
    };

    const userInitials = user.fullName
        ? user.fullName
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : user.email?.[0]?.toUpperCase() || 'U';

    return (
        <div className="flex items-center gap-3">
            {/* User Info Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2 h-auto py-2 px-3 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <Avatar className="h-9 w-9 border-2 border-white">
                            <AvatarImage
                                src={user.avatar}
                                alt={user.fullName || user.email || 'User'}
                            />
                            <AvatarFallback className="bg-red-100 text-red-700 font-semibold">
                                {userInitials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="hidden md:flex flex-col items-start text-left">
                            <span className="text-sm font-semibold text-gray-800 leading-tight">
                                {user.fullName || user.email || 'Người dùng'}
                            </span>
                            <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full border font-medium",
                                getRoleBadgeColor(role)
                            )}>
                                {getRoleLabel(role)}
                            </span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-gray-600 hidden md:block" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="w-64 rounded-lg shadow-lg border border-gray-200"
                >
                    <DropdownMenuLabel className="p-0">
                        <div className="flex items-center gap-3 px-3 py-3 border-b border-gray-100">
                            <Avatar className="h-12 w-12">
                                <AvatarImage
                                    src={user.avatar}
                                    alt={user.fullName || user.email || 'User'}
                                />
                                <AvatarFallback className="bg-red-100 text-red-700 font-semibold">
                                    {userInitials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                    {user.fullName || 'Người dùng'}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user.email}
                                </p>
                                <span className={cn(
                                    "inline-block mt-1 text-xs px-2 py-0.5 rounded-full border font-medium",
                                    getRoleBadgeColor(role)
                                )}>
                                    {getRoleLabel(role)}
                                </span>
                            </div>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    {/* Navigation Links based on Role */}
                    {(role === UserRole.MANAGER || role === UserRole.STAFF) && (
                        <>
                            <DropdownMenuItem asChild>
                                <Link
                                    href={getDashboardUrl(role)}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    {role === UserRole.MANAGER ? (
                                        <LayoutDashboard className="h-4 w-4" />
                                    ) : (
                                        <Briefcase className="h-4 w-4" />
                                    )}
                                    <span>
                                        {role === UserRole.MANAGER
                                            ? 'Bảng điều khiển Quản lý'
                                            : 'Bảng điều khiển Nhân viên'}
                                    </span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </>
                    )}

                    {/* Profile Link */}
                    <DropdownMenuItem asChild>
                        <Link
                            href={getProfileUrl(role)}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <User className="h-4 w-4" />
                            <span>Thông tin cá nhân</span>
                        </Link>
                    </DropdownMenuItem>

                    {/* Settings Link */}

                    <DropdownMenuSeparator />

                    {/* Logout */}
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 focus:text-red-700 focus:bg-red-50 cursor-pointer"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Đăng xuất</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

