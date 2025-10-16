export function StatisticsSection() {
  const monthlyStats = [
    {
      month: "Tháng 8/2025",
      onTimeRate: "96,45%",
      resolved: 1256789,
      onTime: 1212345
    },
    {
      month: "Tháng 7/2025",
      onTimeRate: "95,78%",
      resolved: 1189456,
      onTime: 1138901
    },
    {
      month: "Tháng 6/2025",
      onTimeRate: "94,23%",
      resolved: 1098765,
      onTime: 1035432
    },
    {
      month: "Tháng 5/2025",
      onTimeRate: "93,67%",
      resolved: 1123456,
      onTime: 1052345
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Thống kê số lượng hồ sơ dịch vụ công trực tuyến quốc gia
          </h2>
          <p className="text-lg text-gray-600">Năm 2025</p>
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
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="8"
                    strokeDasharray={`${94.12 * 2.51} 251.2`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">94,12%</div>
                    <div className="text-sm text-gray-600">đúng hạn</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">12,456,789</div>
                <div className="text-gray-600">Tổng hồ sơ nộp</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">11,890,456</div>
                <div className="text-gray-600">Giải quyết hồ sơ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">11,156,789</div>
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
                        {stat.resolved.toLocaleString()} hồ sơ
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Đúng hạn</div>
                      <div className="font-semibold text-red-600">
                        {stat.onTime.toLocaleString()} hồ sơ
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
