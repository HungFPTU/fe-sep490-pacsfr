"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Viet Dung",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
      title: "Quản lý nhân sự",
      url: "/system/account",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Danh sách nhân sự",
          url: "/system/account/list",
        },
        {
          title: "Phân quyền & Vai trò",
          url: "/system/account/roles",
        },
        {
          title: "Hiệu suất làm việc",
          url: "/system/account/performance",
        },
      ],
    },
    {
      title: "Quản lý dịch vụ",
      url: "/system/services",
      icon: Bot,
      items: [
        {
          title: "Danh mục dịch vụ",
          url: "/system/services/list",
        },
        {
          title: "Cấu hình quy trình phục vụ",
          url: "/system/services/config",
        },
        {
          title: "Quy tắc xếp hàng",
          url: "/system/services/queue",
        },
      ],
    },
    {
      title: "Thiết lập hoạt động",
      url: "/system/operation",
      icon: BookOpen,
      items: [
        {
          title: "Giờ làm việc",
          url: "/system/operation/hours",
        },
        {
          title: "Giới hạn số lượng hàng chờ",
          url: "/system/operation/limits",
        },
        {
          title: "Quầy phục vụ",
          url: "/system/operation/counter",
        },
      ],
    },
    {
      title: "Giám sát thời gian thực",
      url: "/system/monitoring",
      icon: Settings2,
      items: [
        {
          title: "Tình trạng hàng chờ",
          url: "/system/monitoring/queue",
        },
        {
          title: "Tải hệ thống",
          url: "/system/monitoring/system",
        },
        {
          title: "Ưu tiên nhóm đặc biệt",
          url: "/system/monitoring/special",
        },
      ],
    },
    {
      title: "Thống kê & Báo cáo",
      url: "/system/reporting",
      icon: Settings2,
    },
    {
      title: "Quản lý hàng đợi",
      url: "/system/queue",
      icon: Settings2,
      items: [
        {
          title: "Tình trạng hàng chờ",
          url: "/system/queue/status",
        },
        {
          title: "Thống kê hàng đợi",
          url: "/system/queue/statistics",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
