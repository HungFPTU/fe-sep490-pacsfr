'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card.ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs.ui"
import { 
  BarChart3, 
  PieChart, 
  Calendar,
  Clock
} from "lucide-react"
import { useState } from "react"

// Mock chart data - sẽ được thay thế bằng Recharts hoặc Chart.js
const mockChartData = {
  dailyStats: [
    { name: 'T2', value: 45 },
    { name: 'T3', value: 52 },
    { name: 'T4', value: 38 },
    { name: 'T5', value: 61 },
    { name: 'T6', value: 55 },
    { name: 'T7', value: 42 },
    { name: 'CN', value: 28 }
  ],
  serviceStats: [
    { name: 'Cấp giấy phép lái xe', value: 35, color: '#3B82F6' },
    { name: 'Đăng ký kết hôn', value: 25, color: '#10B981' },
    { name: 'Cấp CCCD', value: 20, color: '#F59E0B' },
    { name: 'Cấp hộ chiếu', value: 15, color: '#EF4444' },
    { name: 'Khác', value: 5, color: '#8B5CF6' }
  ],
  hourlyStats: [
    { hour: '8:00', requests: 12 },
    { hour: '9:00', requests: 28 },
    { hour: '10:00', requests: 45 },
    { hour: '11:00', requests: 38 },
    { hour: '14:00', requests: 52 },
    { hour: '15:00', requests: 41 },
    { hour: '16:00', requests: 33 },
    { hour: '17:00', requests: 19 }
  ]
}

function SimpleBarChart({ data, title }: { data: Array<{name: string, value: number}>, title: string }) {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">{title}</h4>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-12 text-xs text-gray-600">{item.name}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
              <div 
                className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              >
                <span className="text-xs text-white font-medium">{item.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SimplePieChart({ data }: { data: Array<{name: string, value: number, color: string}> }) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">Phân bố dịch vụ</h4>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">{item.name}</span>
                <span className="font-medium">{item.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="h-2 rounded-full"
                  style={{ 
                    width: `${item.value}%`,
                    backgroundColor: item.color 
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SimpleLineChart({ data, title }: { data: Array<{hour: string, requests: number}>, title: string }) {
  const maxValue = Math.max(...data.map(d => d.requests))
  
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">{title}</h4>
      <div className="h-32 flex items-end space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center space-y-1">
            <div 
              className="w-full bg-blue-500 rounded-t"
              style={{ height: `${(item.requests / maxValue) * 100}%` }}
            />
            <span className="text-xs text-gray-600">{item.hour}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartsSection() {
  const [activeTab, setActiveTab] = useState("daily")

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Thống kê & Phân tích</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily" className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Hàng ngày</span>
            </TabsTrigger>
            <TabsTrigger value="service" className="flex items-center space-x-1">
              <PieChart className="h-4 w-4" />
              <span>Dịch vụ</span>
            </TabsTrigger>
            <TabsTrigger value="hourly" className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Theo giờ</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="mt-6">
            <SimpleBarChart 
              data={mockChartData.dailyStats} 
              title="Số lượng yêu cầu theo ngày trong tuần"
            />
          </TabsContent>
          
          <TabsContent value="service" className="mt-6">
            <SimplePieChart data={mockChartData.serviceStats} />
          </TabsContent>
          
          <TabsContent value="hourly" className="mt-6">
            <SimpleLineChart 
              data={mockChartData.hourlyStats} 
              title="Lưu lượng yêu cầu theo giờ"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
