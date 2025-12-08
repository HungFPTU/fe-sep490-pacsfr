"use client"

import * as React from "react"
import {
    LayoutDashboard,
    Search,
    Calendar,
    Clock,
    FilePlus,
    CreditCard,
    Megaphone,
    MessageSquare,
    FileText,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "../../../manager/ui/sidebar"
import { SidebarBrand } from "./SidebarBrand"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { useAuth } from "@/modules/auth/hooks"
import { User } from "@/modules/auth/types";

// Navigation data for Staff
const data = {
    navMain: [
        {
            title: "Bảng điều khiển",
            url: "/staff/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Tra cứu hồ sơ",
            url: "/staff/case",
            icon: Search,
        },
        {
            title: "Tạo hồ sơ mới",
            url: "/staff/create-case",
            icon: FilePlus,
        },
        {
            title: "Lịch làm việc",
            url: "/staff/workshift",
            icon: Calendar,
        },
        {
            title: "Đơn xin nghỉ",
            url: "/staff/don-nghi",
            icon: FileText,
        },
        {
            title: "Đổi ca làm việc",
            url: "/staff/doi-ca",
            icon: Clock,
        },
        // {
        //     title: "Thanh toán",
        //     url: "/staff/payment",
        //     icon: CreditCard,
        // },
        {
            title: "Phản ánh kiến nghị",
            url: "/staff/pakn-category",
            icon: Megaphone,
            items: [
                {
                    title: "Danh mục phản ánh kiến nghị",
                    url: "/staff/pakn-category",
                },
                {
                    title: "Phản ánh kiến nghị",
                    url: "/staff/pakn",
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useAuth()

    // Create user data for NavUser component
    const userData = {
        fullName: user?.fullName || user?.name || "Staff",
        email: user?.email || "staff@pascs.com",
        avatar: user?.avatar || "/avatars/staff.jpg",
    } satisfies Omit<User, 'id' | 'username' | 'role' | 'isActive' | 'createdAt' | 'updatedAt' | 'phone' | 'name'>;

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarBrand />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={userData} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

