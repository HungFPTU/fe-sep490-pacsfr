'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '../../../manager/ui/sidebar';

/**
 * SidebarBrand - Application branding in sidebar for Staff
 * 
 * Features:
 * - Application logo and name
 * - Link to dashboard
 * - Collapsible design
 * 
 * @component
 */
export function SidebarBrand() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    asChild
                >
                    <Link href="/">
                        <div className="relative w-8 h-8">
                            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                PASCS Staff
                            </span>
                            <span className="truncate text-xs text-slate-500">
                                Hệ thống nhân viên
                            </span>
                        </div>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

