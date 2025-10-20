'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card.ui"
import { Badge } from "@/shared/components/ui/badge.ui"
import { Button } from "@/shared/components/ui/button.ui"
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  X,
  Bell,
  Clock,
  Server,
  Database,
  Shield
} from "lucide-react"
import { useState } from "react"

interface Alert {
  id: string
  type: 'error' | 'warning' | 'info' | 'success'
  title: string
  description: string
  timestamp: string
  category: 'system' | 'security' | 'performance' | 'queue'
  isRead: boolean
  priority: 'high' | 'medium' | 'low'
}

export function SystemAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'error',
      title: 'Server Response Time Cao',
      description: 'Thời gian phản hồi server vượt quá 2 giây trong 5 phút qua',
      timestamp: '5 phút trước',
      category: 'performance',
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Hàng đợi quá tải',
      description: 'Quầy A1 có 25 người chờ, vượt quá giới hạn 20 người',
      timestamp: '12 phút trước',
      category: 'queue',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'info',
      title: 'Bảo trì hệ thống',
      description: 'Hệ thống sẽ được bảo trì vào 2:00 AM ngày mai',
      timestamp: '1 giờ trước',
      category: 'system',
      isRead: true,
      priority: 'low'
    },
    {
      id: '4',
      type: 'success',
      title: 'Sao lưu thành công',
      description: 'Dữ liệu đã được sao lưu tự động thành công',
      timestamp: '2 giờ trước',
      category: 'system',
      isRead: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'warning',
      title: 'Đăng nhập bất thường',
      description: 'Phát hiện đăng nhập từ IP lạ: 192.168.1.200',
      timestamp: '3 giờ trước',
      category: 'security',
      isRead: false,
      priority: 'high'
    }
  ])

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-4 w-4" />
      case 'warning': return <AlertTriangle className="h-4 w-4" />
      case 'info': return <Info className="h-4 w-4" />
      case 'success': return <CheckCircle className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'success': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'system': return <Server className="h-3 w-3" />
      case 'security': return <Shield className="h-3 w-3" />
      case 'performance': return <Database className="h-3 w-3" />
      case 'queue': return <Clock className="h-3 w-3" />
      default: return <Bell className="h-3 w-3" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ))
  }

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  const unreadCount = alerts.filter(alert => !alert.isRead).length

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Thông báo & Cảnh báo</span>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
        <Button variant="outline" size="sm">
          Xem tất cả
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-3 rounded-lg border transition-all duration-200 ${
                alert.isRead 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-white border-l-4 shadow-sm'
              } ${!alert.isRead ? 'border-l-red-500' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-1 rounded-full ${getAlertColor(alert.type)}`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {alert.title}
                      </h4>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(alert.priority)}`} />
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(alert.category)}
                        <span className="capitalize">{alert.category}</span>
                      </div>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 ml-2">
                  {!alert.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(alert.id)}
                      className="h-6 w-6 p-0"
                    >
                      <CheckCircle className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissAlert(alert.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {alerts.length === 0 && (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Không có thông báo nào</p>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full">
            Đánh dấu tất cả đã đọc
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
