'use client'

import { StatsCards } from './StatsCards'
import { QueueMonitoring } from './QueueMonitoring'
import { ChartsSection } from './ChartsSection'
import { RecentActivities } from './RecentActivities'
import { SystemAlerts } from './SystemAlerts'
import { 
  TrendingUp, 
  Clock
} from "lucide-react"
import { QuickActions } from './QickAction'

export default function Page() {
  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Quản Trị</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">
            Tổng quan hệ thống và quản lý hoạt động
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span className="hidden sm:inline">Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}</span>
          <span className="sm:hidden">{new Date().toLocaleTimeString('vi-VN')}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-6">
        <StatsCards />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:gap-6 xl:grid-cols-3">
        {/* Left Column - 2/3 width */}
        <div className="xl:col-span-2 space-y-4 md:space-y-6">
          {/* Charts Section */}
          <ChartsSection />
          
          {/* Queue Monitoring */}
          <QueueMonitoring />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-4 md:space-y-6">
          {/* Quick Actions */}
          <QuickActions />
          
          {/* System Alerts */}
          <SystemAlerts />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-4 md:gap-6 xl:grid-cols-2">
        {/* Recent Activities */}
        <RecentActivities />
        
        {/* Additional Info Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4 md:p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-500 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Hiệu suất hệ thống</h3>
              <p className="text-sm text-gray-600">Tổng quan hiệu suất tuần này</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Thời gian phản hồi trung bình</span>
              <span className="font-semibold text-green-600">1.2s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tỷ lệ thành công</span>
              <span className="font-semibold text-green-600">99.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Số yêu cầu xử lý</span>
              <span className="font-semibold text-blue-600">1,247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Thời gian hoạt động</span>
              <span className="font-semibold text-green-600">99.9%</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Trạng thái hệ thống</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-600">Hoạt động bình thường</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
