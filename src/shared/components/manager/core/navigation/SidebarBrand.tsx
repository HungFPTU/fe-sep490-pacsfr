'use client';

import * as React from 'react';
import Link from 'next/link';
import { Building2, ChevronDown, Check } from 'lucide-react';
import Image from 'next/image';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '../../ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

interface Organization {
    id: string;
    name: string;
    plan?: string;
}

interface SidebarBrandProps {
    /** List of organizations (optional) */
    organizations?: Organization[];
    /** Currently active organization */
    activeOrg?: Organization;
    /** Callback when organization changes */
    onOrgChange?: (org: Organization) => void;
}

/**
 * SidebarBrand - Application branding in sidebar
 * 
 * Features:
 * - Application logo and name
 * - Organization selector (optional)
 * - Collapsible design
 * - Link to dashboard
 * 
 * @component
 */
export function SidebarBrand({
    organizations,
    activeOrg,
    onOrgChange
}: SidebarBrandProps) {
    const [selectedOrg, setSelectedOrg] = React.useState<Organization | undefined>(activeOrg);

    const handleOrgChange = (org: Organization) => {
        setSelectedOrg(org);
        onOrgChange?.(org);
    };

    // If no organizations provided, show simple brand
    if (!organizations || organizations.length === 0) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        asChild
                    >
                        <Link href="/manager">
                            <div className="relative w-8 h-8">
                                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    PASCS Manager
                                </span>
                                <span className="truncate text-xs text-slate-500">
                                    Hệ thống quản lý
                                </span>
                            </div>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    // Show brand with organization selector
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                                <Building2 className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {selectedOrg?.name || 'PACSFR Manager'}
                                </span>
                                <span className="truncate text-xs text-slate-500">
                                    {selectedOrg?.plan || 'Hệ thống quản lý'}
                                </span>
                            </div>
                            <ChevronDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side="bottom"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Tổ chức
                        </DropdownMenuLabel>
                        {organizations.map((org) => (
                            <DropdownMenuItem
                                key={org.id}
                                onClick={() => handleOrgChange(org)}
                                className="gap-2 p-2"
                            >
                                <div className="flex size-6 items-center justify-center rounded-sm border bg-gradient-to-br from-blue-600 to-blue-700">
                                    <Building2 className="size-4 shrink-0 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">{org.name}</div>
                                    {org.plan && (
                                        <div className="text-xs text-muted-foreground">{org.plan}</div>
                                    )}
                                </div>
                                {selectedOrg?.id === org.id && (
                                    <Check className="size-4 text-blue-600" />
                                )}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                <Building2 className="size-4" />
                            </div>
                            <div className="font-medium text-muted-foreground">
                                Thêm tổ chức...
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
