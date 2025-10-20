'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card.ui"
import { 
  Users, 
  Building2, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity
} from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'increase' | 'decrease' | 'neutral'
  icon: React.ReactNode
  description?: string
}

function StatCard({ title, value, change, changeType = 'neutral', icon, description }: StatCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase': return 'text-green-600'
      case 'decrease': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase': return '↗'
      case 'decrease': return '↘'
      default: return '→'
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className="text-gray-400">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {change && (
          <div className={`flex items-center text-xs ${getChangeColor()}`}>
            <span className="mr-1">{getChangeIcon()}</span>
            <span>{change}</span>
          </div>
        )}
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  // Mock data - sẽ được thay thế bằng API calls
  const stats = [
    {
      title: "Tổng nhân viên",
      value: "156",
      change: "+12% so với tháng trước",
      changeType: "increase" as const,
      icon: <Users className="h-4 w-4" />,
      description: "Nhân viên đang hoạt động"
    },
    {
      title: "Dịch vụ đang cung cấp",
      value: "24",
      change: "+2 dịch vụ mới",
      changeType: "increase" as const,
      icon: <Building2 className="h-4 w-4" />,
      description: "Dịch vụ công trực tuyến"
    },
    {
      title: "Hàng đợi hiện tại",
      value: "47",
      change: "-8% so với hôm qua",
      changeType: "decrease" as const,
      icon: <Clock className="h-4 w-4" />,
      description: "Người đang chờ phục vụ"
    },
    {
      title: "Hiệu suất hệ thống",
      value: "98.5%",
      change: "+0.3% so với tuần trước",
      changeType: "increase" as const,
      icon: <TrendingUp className="h-4 w-4" />,
      description: "Thời gian hoạt động"
    },
    {
      title: "Cảnh báo hệ thống",
      value: "3",
      change: "2 cảnh báo mới",
      changeType: "neutral" as const,
      icon: <AlertTriangle className="h-4 w-4" />,
      description: "Cần xử lý ngay"
    },
    {
      title: "Hoàn thành hôm nay",
      value: "234",
      change: "+15% so với hôm qua",
      changeType: "increase" as const,
      icon: <CheckCircle className="h-4 w-4" />,
      description: "Yêu cầu đã xử lý"
    }
  ]

  return (
    <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          changeType={stat.changeType}
          icon={stat.icon}
          description={stat.description}
        />
      ))}
    </div>
  )
}
