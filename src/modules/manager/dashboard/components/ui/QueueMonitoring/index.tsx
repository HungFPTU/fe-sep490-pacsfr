'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card.ui"
import { Badge } from "@/shared/components/ui/badge.ui"
import { Button } from "@/shared/components/ui/button.ui"
import { 
  Clock, 
  Users, 
  AlertCircle, 
  CheckCircle2,
  RefreshCw,
  Eye
} from "lucide-react"
import { useState, useEffect } from "react"

interface QueueData {
  id: string
  serviceName: string
  counterName: string
  totalTicket: number
  pendingTicket: number
  currentTicket: string
  completeTicket: number
  employeeName: string
  status: 'active' | 'busy' | 'offline'
  avgWaitTime: number
}

export function QueueMonitoring() {
  const [queues, setQueues] = useState<QueueData[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Mock data - sẽ được thay thế bằng API calls
  useEffect(() => {
    const mockQueues: QueueData[] = [
      {
        id: '1',
        serviceName: 'Cấp giấy phép lái xe',
        counterName: 'Quầy A1',
        totalTicket: 45,
        pendingTicket: 12,
        currentTicket: 'A001',
        completeTicket: 33,
        employeeName: 'Nguyễn Văn A',
        status: 'active',
        avgWaitTime: 15
      },
      {
        id: '2',
        serviceName: 'Đăng ký kết hôn',
        counterName: 'Quầy B1',
        totalTicket: 28,
        pendingTicket: 8,
        currentTicket: 'B002',
        completeTicket: 20,
        employeeName: 'Trần Thị B',
        status: 'busy',
        avgWaitTime: 25
      },
      {
        id: '3',
        serviceName: 'Cấp CCCD',
        counterName: 'Quầy C1',
        totalTicket: 67,
        pendingTicket: 23,
        currentTicket: 'C003',
        completeTicket: 44,
        employeeName: 'Lê Văn C',
        status: 'active',
        avgWaitTime: 20
      },
      {
        id: '4',
        serviceName: 'Cấp hộ chiếu',
        counterName: 'Quầy D1',
        totalTicket: 34,
        pendingTicket: 4,
        currentTicket: 'D004',
        completeTicket: 30,
        employeeName: 'Phạm Thị D',
        status: 'offline',
        avgWaitTime: 0
      }
    ]
    setQueues(mockQueues)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'busy': return 'bg-yellow-100 text-yellow-800'
      case 'offline': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Hoạt động'
      case 'busy': return 'Bận'
      case 'offline': return 'Nghỉ'
      default: return 'Không xác định'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle2 className="h-3 w-3" />
      case 'busy': return <Clock className="h-3 w-3" />
      case 'offline': return <AlertCircle className="h-3 w-3" />
      default: return <AlertCircle className="h-3 w-3" />
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Giám sát hàng đợi</CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Eye className="h-4 w-4 mr-1" />
            Xem tất cả
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {queues.map((queue) => (
          <div key={queue.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">{queue.serviceName}</h4>
                <p className="text-sm text-gray-600">{queue.counterName} - {queue.employeeName}</p>
              </div>
              <Badge className={getStatusColor(queue.status)}>
                <span className="flex items-center">
                  {getStatusIcon(queue.status)}
                  <span className="ml-1">{getStatusText(queue.status)}</span>
                </span>
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-gray-600">Đang chờ:</span>
                <span className="font-medium">{queue.pendingTicket}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-600">Đã hoàn thành:</span>
                <span className="font-medium">{queue.completeTicket}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span className="text-gray-600">Vé hiện tại:</span>
                <span className="font-medium">{queue.currentTicket}</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-purple-500 flex-shrink-0" />
                <span className="text-gray-600">Thời gian chờ TB:</span>
                <span className="font-medium">{queue.avgWaitTime} phút</span>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Tiến độ xử lý</span>
                <span>{Math.round((queue.completeTicket / queue.totalTicket) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(queue.completeTicket / queue.totalTicket) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
