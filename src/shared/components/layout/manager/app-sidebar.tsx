"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { useAuth } from "@/modules/auth/hooks"

// This is sample data.
const data = {
  teams: [
    {
      name: "Viet Dung",
      logo: GalleryVerticalEnd,
      plan: "Dev",
    },
    {
      name: "Dan Huy",
      logo: AudioWaveform,
      plan: "Dev",
    },
    {
      name: "Hung FPTU",
      logo: Command,
      plan: "Dev",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/manager/",
      icon: SquareTerminal,
      items: [
        {
          title: "Bảng điều khiển",
          url: "/manager",
        },
      ],
    },
    {
      title: "Quản lý nhân sự",
      url: "/manager/account",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Quản lý nhân viên",
          url: "/manager/quan-ly-nhan-vien",
        },
        {
          title: "Quản lý ca làm việc",
          url: "/manager/ca-lam-viec",
        },
        {
          title: "Danh sách nhân sự",
          url: "/manager/account/list",
        },
        {
          title: "Phân quyền & Vai trò",
          url: "/manager/account/roles",
        },
        {
          title: "Hiệu suất làm việc",
          url: "/manager/account/performance",
        },
      ],
    },
    {
      title: "Quản lý dịch vụ",
      url: "/manager/service",
      icon: Bot,
      items: [
        {
          title: "Danh sách dịch vụ",
          url: "/manager/dich-vu",
        },
        {
          title: "Nhóm dịch vụ",
          url: "/manager/nhom-dich-vu",
        },
        {
          title: "Phân loại dịch vụ",
          url: "/manager/service/list",
        },
        {
          title: "Cấu hình quy trình phục vụ",
          url: "/manager/service/config",
        },
        {
          title: "Quy tắc xếp hàng",
          url: "/manager/service/queue",
        },
      ],
    },
    {
      title: "Quản lý phòng ban",
      url: "/manager/operation",
      icon: BookOpen,
      items: [
        {
          title: "Quản lý phòng ban",
          url: "/manager/phong-ban",
        },
        {
          title: "Quản lý cơ quan",
          url: "/manager/co-quan",
        },
        {
          title: "Giờ làm việc",
          url: "/manager/operation/hours",
        },
        {
          title: "Giới hạn số lượng hàng chờ",
          url: "/manager/operation/limits",
        },
        {
          title: "Quầy phục vụ",
          url: "/manager/quan-li-quay",
        },
      ],
    },
    {
      title: "Giám sát thời gian thực",
      url: "/manager/monitoring",
      icon: Settings2,
      items: [
        {
          title: "Tình trạng hàng chờ",
          url: "/manager/monitoring/queue",
        },
        {
          title: "Tải hệ thống",
          url: "/manager/monitoring/manager",
        },
        {
          title: "Quản lý hồ sơ & Ưu tiên",
          url: "/manager/monitoring/special",
        },
      ],
    },
    {
      title: "Thống kê & Báo cáo",
      url: "/manager/reporting",
      icon: Settings2,
    },
    {
      title: "Quản lý hàng đợi",
      url: "/manager/queue",
      icon: Settings2,
      items: [
        {
          title: "Tình trạng hàng chờ",
          url: "/manager/queue/status",
        },
        {
          title: "Thống kê hàng đợi",
          url: "/manager/queue/statistics",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  // Create user data for NavUser component
  const userData = {
    name: user?.fullName || "Manager",
    email: user?.email || "manager@pascs.com",
    avatar: user?.avatar || "/avatars/manager.jpg",
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={userData} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <TeamSwitcher teams={data.teams} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
