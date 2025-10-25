'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card.ui"
import { Button } from "@/shared/components/ui/button.ui"
import { 
  Plus, 
  Users, 
  Building2, 
  // Clock, 
  Settings,
  // FileText,
  // BarChart3,
  // Bell,
  // Download,
  Upload,
  RefreshCw,
  Building
} from "lucide-react"
import { useRouter } from "next/navigation"

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  href?: string
  onClick?: () => void
}

export function QuickActions() {
  const router = useRouter()

  const quickActions: QuickAction[] = [
    {
      id: 'add-staff',
      title: 'Thêm nhân viên',
      description: 'Tạo tài khoản nhân sự',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => router.push('/manager/staff-management')
    },
    {
      id: 'add-service',
      title: 'Thêm dịch vụ',
      description: 'Tạo dịch vụ công mới',
      icon: <Building2 className="h-5 w-5" />,
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => router.push('/manager/dich-vu')
    },
    {
      id: 'group-services',
      title: 'Thêm nhóm dịch vụ',
      description: 'Tạo mới nhóm dịch vụ',
      icon: <Building2 className="h-5 w-5" />,
      color: 'bg-orange-500 hover:bg-orange-600',
      onClick: () => router.push('/manager/nhom-dich-vu')
    },
    {
      id: 'org-unit',
      title: 'Quản lý phòng ban',
      description: 'Tạo mới phòng ban',
      icon: <Settings className="h-5 w-5" />,
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => console.log('/manager/phong-ban')
    },
    {
      id: 'department',
      title: 'Quản lý cơ quan',
      description: 'Tạo mới cơ quan',
      icon: <Building className="h-5 w-5" />,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      onClick: () => console.log('/manager/co-quan')
    },
    // {
    //   id: 'view-analytics',
    //   title: 'Xem phân tích',
    //   description: 'Phân tích chi tiết hiệu suất',
    //   icon: <BarChart3 className="h-5 w-5" />,
    //   color: 'bg-pink-500 hover:bg-pink-600',
    //   onClick: () => console.log('View analytics')
    // },
    // {
    //   id: 'send-notification',
    //   title: 'Gửi thông báo',
    //   description: 'Thông báo đến nhân viên',
    //   icon: <Bell className="h-5 w-5" />,
    //   color: 'bg-red-500 hover:bg-red-600',
    //   onClick: () => console.log('Send notification')
    // },
    // {
    //   id: 'backup-data',
    //   title: 'Sao lưu dữ liệu',
    //   description: 'Tạo bản sao lưu hệ thống',
    //   icon: <Download className="h-5 w-5" />,
    //   color: 'bg-teal-500 hover:bg-teal-600',
    //   onClick: () => console.log('Backup data')
    // }
  ]

  const systemActions = [
    {
      id: 'refresh-data',
      title: 'Làm mới dữ liệu',
      icon: <RefreshCw className="h-4 w-4" />,
      onClick: () => window.location.reload()
    },
    {
      id: 'export-data',
      title: 'Xuất dữ liệu',
      icon: <Upload className="h-4 w-4" />,
      onClick: () => console.log('Export data')
    }
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Hành động nhanh</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                className={`h-auto p-4 flex flex-col items-center space-y-2 ${action.color} text-white border-0 hover:shadow-lg transition-all duration-200`}
                onClick={action.onClick}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                  {action.icon}
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>

          {/* System Actions */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Hành động hệ thống</h4>
            <div className="flex space-x-2">
              {systemActions.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={action.onClick}
                >
                  {action.icon}
                  <span className="ml-2">{action.title}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Thống kê nhanh</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-blue-50 p-2 md:p-3 rounded-lg">
                <div className="text-blue-600 font-medium text-sm md:text-base">156</div>
                <div className="text-blue-500 text-xs">Nhân viên</div>
              </div>
              <div className="bg-green-50 p-2 md:p-3 rounded-lg">
                <div className="text-green-600 font-medium text-sm md:text-base">24</div>
                <div className="text-green-500 text-xs">Dịch vụ</div>
              </div>
              <div className="bg-orange-50 p-2 md:p-3 rounded-lg">
                <div className="text-orange-600 font-medium text-sm md:text-base">47</div>
                <div className="text-orange-500 text-xs">Đang chờ</div>
              </div>
              <div className="bg-purple-50 p-2 md:p-3 rounded-lg">
                <div className="text-purple-600 font-medium text-sm md:text-base">98.5%</div>
                <div className="text-purple-500 text-xs">Hiệu suất</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
