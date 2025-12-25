'use client';

import { useMemo } from 'react';
import { useStatistics } from '../../hooks';
import { 
  ChartBarIcon, 
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import type { DailyStatistic, ServiceStatistic } from '../../types';

/**
 * Statistics Section View Component
 * Displays comprehensive dashboard statistics from API
 */
export function StatisticsSectionView() {
  const currentYear = new Date().getFullYear();
  const { data: stats, isLoading } = useStatistics(currentYear);

  // Extract system statistics from API response
  const systemStats = stats?.systemStatistics;
  const dailyStats: DailyStatistic[] = systemStats?.dailyStatistics?.$values || [];
  const serviceStats: ServiceStatistic[] = systemStats?.serviceStatistics?.$values || [];

  // Calculate overall statistics
  const overallData = useMemo(() => {
    if (!systemStats) return null;
    
    const totalCases = systemStats.totalCases || 0;
    const completedCases = systemStats.completedCases || 0;
    const completionRate = totalCases > 0 ? ((completedCases / totalCases) * 100) : 0;
    
    return {
      totalCases,
      completedCases,
      inProgressCases: systemStats.inProgressCases || 0,
      pendingCases: systemStats.pendingCases || 0,
      canceledCases: systemStats.canceledCases || 0,
      todayCases: systemStats.todayCases || 0,
      thisWeekCases: systemStats.thisWeekCases || 0,
      thisMonthCases: systemStats.thisMonthCases || 0,
      averageProcessingTime: systemStats.averageProcessingTime || 0,
      completionRate,
    };
  }, [systemStats]);

  // Get last 30 days of daily stats
  const recentDailyStats = useMemo(() => {
    if (!dailyStats.length) return [];
    
    return [...dailyStats]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 30)
      .map((day) => {
        const date = new Date(day.date);
        const onTimeRate = day.totalCases > 0 ? ((day.completedCases / day.totalCases) * 100) : 0;
        return {
          ...day,
          dateFormatted: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
          onTimeRate,
        };
      });
  }, [dailyStats]);

  const completionRate = overallData?.completionRate ?? 0;

  // Loading State
  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <ArrowPathIcon className="w-8 h-8 animate-spin text-red-600" />
            <span className="ml-2 text-gray-600">Đang tải thống kê...</span>
          </div>
        </div>
      </section>
    );
  }

  // Empty State
  if (!overallData) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 py-12">
            Không có dữ liệu thống kê
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChartBarIcon className="w-8 h-8 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Thống kê số lượng hồ sơ dịch vụ công trực tuyến
            </h2>
          </div>
          <p className="text-lg text-gray-600">Năm {currentYear}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Overall Statistics Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Tổng quan
            </h3>

            {/* Donut Chart */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40" fill="none" stroke="#dc2626" strokeWidth="8"
                    strokeDasharray={`${completionRate * 2.51} 251.2`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {completionRate.toFixed(1).replace('.', ',')}%
                    </div>
                    <div className="text-sm text-gray-600">hoàn thành</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard value={overallData.totalCases} label="Tổng hồ sơ" bgColor="bg-gray-50" textColor="text-gray-800" />
              <StatCard value={overallData.completedCases} label="Hoàn thành" bgColor="bg-green-50" textColor="text-green-600" />
              <StatCard value={overallData.inProgressCases} label="Đang xử lý" bgColor="bg-blue-50" textColor="text-blue-600" />
              <StatCard value={overallData.pendingCases} label="Chờ xử lý" bgColor="bg-yellow-50" textColor="text-yellow-600" />
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
              <QuickStat value={overallData.todayCases} label="Hôm nay" />
              <QuickStat value={overallData.thisWeekCases} label="Tuần này" />
              <QuickStat value={overallData.thisMonthCases} label="Tháng này" />
            </div>
          </div>

          {/* Daily Statistics Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Tình hình xử lý theo ngày
            </h3>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentDailyStats.length > 0 ? (
                recentDailyStats.map((stat, index) => (
                  <DailyStatRow key={index} stat={stat} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Không có dữ liệu thống kê theo ngày
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Service Statistics */}
        {serviceStats.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Thống kê theo dịch vụ
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {serviceStats.map((service, index) => (
                <ServiceStatCard key={index} service={service} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ====================
// Sub-components (Single Responsibility)
// ====================

function StatCard({ value, label, bgColor, textColor }: { 
  value: number; label: string; bgColor: string; textColor: string;
}) {
  return (
    <div className={`text-center p-3 ${bgColor} rounded-lg`}>
      <div className={`text-2xl font-bold ${textColor}`}>
        {value.toLocaleString('vi-VN')}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

function QuickStat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="text-lg font-bold text-red-600">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

function DailyStatRow({ stat }: { stat: DailyStatistic & { dateFormatted: string; onTimeRate: number } }) {
  return (
    <div className="border-b border-gray-200 pb-3 last:border-b-0">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800">{stat.dateFormatted}</h4>
        <div className="text-sm font-bold text-red-600">
          {stat.onTimeRate.toFixed(0)}% hoàn thành
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <div className="text-gray-500">Tổng</div>
          <div className="font-semibold text-gray-800">{stat.totalCases}</div>
        </div>
        <div>
          <div className="text-gray-500">Hoàn thành</div>
          <div className="font-semibold text-green-600">{stat.completedCases}</div>
        </div>
        <div>
          <div className="text-gray-500">Đang xử lý</div>
          <div className="font-semibold text-blue-600">{stat.inProgressCases}</div>
        </div>
      </div>
    </div>
  );
}

function ServiceStatCard({ service }: { service: ServiceStatistic }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <h4 className="font-semibold text-gray-800 text-sm mb-3 line-clamp-2" title={service.serviceName}>
        {service.serviceName}
      </h4>
      <div className="text-2xl font-bold text-red-600 mb-1">{service.totalCases}</div>
      <div className="text-xs text-gray-500 mb-2">hồ sơ</div>
      <div className="flex justify-center gap-3 text-xs">
        <span className="flex items-center gap-1 text-green-600">
          <CheckCircleIcon className="w-3 h-3" /> {service.completedCases}
        </span>
        <span className="flex items-center gap-1 text-blue-600">
          <ClockIcon className="w-3 h-3" /> {service.inProgressCases}
        </span>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Tỷ lệ: {(service.completionRate ?? 0).toFixed(1)}%
      </div>
    </div>
  );
}
