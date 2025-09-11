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

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"

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
          title: "Danh mục dịch vụ",
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
      title: "Thiết lập hoạt động",
      url: "/manager/operation",
      icon: BookOpen,
      items: [
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
          url: "/manager/operation/counter",
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
          title: "Ưu tiên nhóm đặc biệt",
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
  //projects: [
  //  {
  //    name: "Design Engineering",
  //    url: "#",
  //    icon: Frame,
  //  },
  //  {
  //    name: "Sales & Marketing",
  //    url: "#",
  //    icon: PieChart,
  //  },
  //  {
  //    name: "Travel",
  //    url: "#",
  //    icon: Map,
  //  },
  //],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/*<NavProjects projects={data.projects} />*/}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
