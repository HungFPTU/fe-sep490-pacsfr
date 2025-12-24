'use client';

import { useStatistics } from '../../hooks';
import { ChartBarIcon } from '@heroicons/react/24/outline';

/**
 * Statistics Section View Component
 * Displays dashboard statistics with donut chart and monthly data
 */
export function StatisticsSectionView() {
  const currentYear = new Date().getFullYear();
  const { data: stats, isLoading } = useStatistics(currentYear);

  // Mock data for now (will be replaced when backend updates auth)
  const monthlyStats = [
    { month: `Tháng 12/${currentYear}`, onTimeRate: '96,45%', resolved: 1256789, onTime: 1212345 },
    { month: `Tháng 11/${currentYear}`, onTimeRate: '95,78%', resolved: 1189456, onTime: 1138901 },
    { month: `Tháng 10/${currentYear}`, onTimeRate: '94,23%', resolved: 1098765, onTime: 1035432 },
    { month: `Tháng 9/${currentYear}`, onTimeRate: '93,67%', resolved: 1123456, onTime: 1052345 },
  ];

  // Use API data if available, otherwise use mock
  const overallData = stats ?? {
    totalSubmitted: 12456789,
    totalResolved: 11890456,
    onTimeCount: 11156789,
    onTimeRate: 94.12,
  };

  const onTimePercentage = (overallData as any).onTimeRate ?? 94.12;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChartBarIcon className="w-8 h-8 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Thống kê số lượng hồ sơ dịch vụ công trực tuyến quốc gia
            </h2>
          </div>
          <p className="text-lg text-gray-600">Năm {currentYear}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Overall Statistics */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Tổng quan
            </h3>

            <div className="flex items-center justify-center mb-6">
              {/* Donut Chart */}
              <div className="relative w-48 h-48">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="8"
                    strokeDasharray={`${onTimePercentage * 2.51} 251.2`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {onTimePercentage.toFixed(2).replace('.', ',')}%
                    </div>
                    <div className="text-sm text-gray-600">đúng hạn</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {((overallData as any).totalSubmitted ?? 0).toLocaleString('vi-VN')}
                </div>
                <div className="text-gray-600">Tổng hồ sơ nộp</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {((overallData as any).totalResolved ?? 0).toLocaleString('vi-VN')}
                </div>
                <div className="text-gray-600">Giải quyết hồ sơ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {((overallData as any).onTimeCount ?? 0).toLocaleString('vi-VN')}
                </div>
                <div className="text-gray-600">Đúng hạn hồ sơ</div>
              </div>
            </div>
          </div>

          {/* Monthly Statistics */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Tình hình xử lý hồ sơ theo tháng
            </h3>

            <div className="space-y-6 max-h-96 overflow-y-auto">
              {monthlyStats.map((stat, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{stat.month}</h4>
                    <div className="text-lg font-bold text-red-600">
                      {stat.onTimeRate} Đúng hạn
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Giải quyết</div>
                      <div className="font-semibold text-gray-800">
                        {stat.resolved.toLocaleString('vi-VN')} hồ sơ
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Đúng hạn</div>
                      <div className="font-semibold text-red-600">
                        {stat.onTime.toLocaleString('vi-VN')} hồ sơ
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
