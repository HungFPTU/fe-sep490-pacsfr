'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card.ui"
import { Badge } from "@/shared/components/ui/badge.ui"
import { Button } from "@/shared/components/ui/button.ui"
import { 
  Activity, 
  User, 
  Clock, 
  AlertTriangle,
  FileText,
  Settings,
  Bell
} from "lucide-react"
import { useState } from "react"

interface ActivityItem {
  id: string
  type: 'user' | 'system' | 'service' | 'queue' | 'alert'
  title: string
  description: string
  timestamp: string
  status: 'success' | 'warning' | 'error' | 'info'
  user?: string
}

export function RecentActivities() {
  const [activities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'user',
      title: 'Nhân viên mới đăng ký',
      description: 'Nguyễn Thị E đã được thêm vào hệ thống với vai trò Staff',
      timestamp: '2 phút trước',
      status: 'success',
      user: 'Admin'
    },
    {
      id: '2',
      type: 'service',
      title: 'Dịch vụ được cập nhật',
      description: 'Cấp giấy phép lái xe - Thời gian xử lý đã được điều chỉnh từ 30 phút xuống 25 phút',
      timestamp: '15 phút trước',
      status: 'info',
      user: 'Manager'
    },
    {
      id: '3',
      type: 'queue',
      title: 'Hàng đợi quá tải',
      description: 'Quầy A1 - Cấp giấy phép lái xe có 25 người chờ, vượt quá giới hạn',
      timestamp: '23 phút trước',
      status: 'warning',
      user: 'System'
    },
    {
      id: '4',
      type: 'system',
      title: 'Báo cáo hàng ngày',
      description: 'Báo cáo thống kê ngày 15/12/2024 đã được tạo tự động',
      timestamp: '1 giờ trước',
      status: 'success',
      user: 'System'
    },
    {
      id: '5',
      type: 'alert',
      title: 'Cảnh báo hệ thống',
      description: 'Server response time cao hơn bình thường (>2s)',
      timestamp: '2 giờ trước',
      status: 'error',
      user: 'System'
    },
    {
      id: '6',
      type: 'user',
      title: 'Đăng nhập thành công',
      description: 'Trần Văn F đã đăng nhập vào hệ thống từ IP 192.168.1.100',
      timestamp: '3 giờ trước',
      status: 'info',
      user: 'Trần Văn F'
    }
  ])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <User className="h-4 w-4" />
      case 'system': return <Settings className="h-4 w-4" />
      case 'service': return <FileText className="h-4 w-4" />
      case 'queue': return <Clock className="h-4 w-4" />
      case 'alert': return <AlertTriangle className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'info': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Thành công'
      case 'warning': return 'Cảnh báo'
      case 'error': return 'Lỗi'
      case 'info': return 'Thông tin'
      default: return 'Không xác định'
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Hoạt động gần đây</span>
        </CardTitle>
        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4 mr-1" />
          Xem tất cả
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </h4>
                  <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                    {getStatusText(activity.status)}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {activity.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{activity.timestamp}</span>
                  {activity.user && (
                    <span className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {activity.user}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full">
            Tải thêm hoạt động
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
