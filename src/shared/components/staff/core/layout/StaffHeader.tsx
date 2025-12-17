'use client';

import React from 'react';
import { SidebarTrigger } from '../../../manager/ui/sidebar';
import { Separator } from '../../../manager/ui/separator';
import { Search, Settings } from 'lucide-react';
import { UserMenu } from '../../../manager/core/widgets/UserMenu';
import { NotificationsMenu } from '../../../manager/core/widgets/NotificationsMenu';

/**
 * StaffHeader - Main header component for staff interface
 * 
 * Features:
 * - Sidebar toggle
 * - Global search
 * - Settings button
 * - Notifications dropdown
 * - User profile menu
 * 
 * @component
 */
export function StaffHeader() {
    return (
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex w-full items-center justify-between px-4">
                {/* Left side - Sidebar trigger */}
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1 hover:bg-slate-100 rounded-md" />
                    <Separator orientation="vertical" className="mr-2 h-6" />

                    {/* Search bar */}
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="h-9 w-64 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center gap-2">      

                    <Separator orientation="vertical" className="mx-2 h-6" />

                    {/* User menu */}
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}

