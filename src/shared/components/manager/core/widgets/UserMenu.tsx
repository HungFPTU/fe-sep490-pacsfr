'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/modules/auth/stores/useAuthStore';
import { getUserInitials } from '@/modules/auth/utils/role.utils';
import { User, LogOut, Settings, HelpCircle, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * UserMenu - User profile dropdown menu
 * 
 * Features:
 * - User avatar with initials
 * - User info display (name, email, role)
 * - Profile, Settings, Help menu items
 * - Logout functionality
 * - Click outside to close
 * - Smooth animations
 * 
 * @component
 */
export function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { user, clearCredentials } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleLogout = () => {
        clearCredentials();
        router.push('/manager-login');
    };

    const initials = user ? getUserInitials({ name: user.fullName, username: user.username }) : 'U';

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-semibold text-white shadow-sm">
                    {initials}
                </div>
                <div className="hidden text-left md:block">
                    <div className="text-sm font-medium text-slate-900">
                        {user?.fullName || user?.username || 'User'}
                    </div>
                    <div className="text-xs text-slate-500">
                        {user?.role || 'Manager'}
                    </div>
                </div>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border border-slate-200 bg-white shadow-lg z-50">
                    {/* User info */}
                    <div className="border-b border-slate-100 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-lg font-semibold text-white">
                                {initials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="truncate font-medium text-slate-900">
                                    {user?.fullName || user?.username}
                                </div>
                                <div className="truncate text-sm text-slate-500">
                                    {user?.email || 'manager@example.com'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Menu items */}
                    <div className="p-2">
                        <button
                            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                            onClick={() => {
                                setIsOpen(false);
                                // Navigate to profile
                            }}
                        >
                            <User className="h-4 w-4" />
                            <span>Hồ sơ của tôi</span>
                        </button>

                    </div>

                    {/* Logout */}
                    <div className="border-t border-slate-100 p-2">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Đăng xuất</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

