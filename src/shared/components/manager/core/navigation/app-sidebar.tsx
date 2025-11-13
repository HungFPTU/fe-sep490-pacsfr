"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  MonitorDot,
  BarChart3,
  ListChecks,
  FileText,
  HelpCircle,
  Newspaper,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../../ui/sidebar"
import { SidebarBrand } from "./SidebarBrand"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { useAuth } from "@/modules/auth/hooks"
import { User } from "@/modules/auth/types";

// Navigation data
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/manager/",
      icon: LayoutDashboard,
      items: [
        {
          title: "Bảng điều khiển",
          url: "/manager",
        },
      ],
    },
    {
      title: "Quản lý nhân sự",
      url: "",
      icon: Users,
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
      url: "",
      icon: Briefcase,
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
          title: "Tài liệu yêu cầu",
          url: "/manager/tai-lieu-yeu-cau",
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
        {
          title: "Phương thức nộp hồ sơ",
          url: "/manager/phuong-thuc-nop-ho-so",
        },
        {
          title: "Quy trình dịch vụ",
          url: "/manager/quy-trinh-dich-vu",
        },
      ],
    },
    {
      title: "Quản lý phòng ban",
      url: "",
      icon: Building2,
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
          url: "/manager/operation/counter",
        },
      ],
    },
    {
      title: "Giám sát thời gian thực",
      url: "",
      icon: MonitorDot,
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
      icon: BarChart3,
    },
    {
      title: "Quản lý hàng đợi",
      url: "",
      icon: ListChecks,
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
    {
      title: "Quản lý văn bản pháp luật",
      url: "",
      icon: FileText,
      items: [
        {
          title: "Danh sách văn bản",
          url: "/manager/van-ban-phap-luat",
        },
        {
          title: "Nhóm văn bản",
          url: "/manager/van-ban-phap-luat/nhom-van-ban",
        },
        {
          title: "Loại văn bản",
          url: "/manager/van-ban-phap-luat/loai-van-ban",
        },
        {
          title: "Mẫu văn bản",
          url: "/manager/van-ban-phap-luat/mau-van-ban",
        },
        {
          title: "Phân loại văn bản",
          url: "/manager/van-ban-phap-luat/phan-loai",
        },
        {
          title: "Báo cáo văn bản",
          url: "/manager/van-ban-phap-luat/bao-cao",
        },
      ],
    },
    {
      title: "Quản lý FAQ",
      url: "",
      icon: HelpCircle,
      items: [
        {
          title: "Danh mục câu hỏi thường gặp",
          url: "/manager/danh-muc-cau-hoi",
        },
        {
          title: "Câu hỏi thường gặp",
          url: "/manager/cau-hoi-thuong-gap",
        },
      ],
    },
    {
      title: "Quản lý tin tức",
      url: "",
      icon: Newspaper,
      items: [
        {
          title: "Danh mục tin tức",
          url: "/manager/danh-muc-tin-tuc",
        },
        {
          title: "Tin tức dịch vụ công",
          url: "/manager/tin-tuc-dich-vu",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()

  // Create user data for NavUser component
  const userData = {
    fullName: user?.fullName || "Manager",
    email: user?.email || "manager@pascs.com",
    avatar: user?.avatar || "/avatars/manager.jpg",
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
