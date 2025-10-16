export function UncleHoTeachings() {
  const principles = [
    "Dịch vụ công trực tuyến 24/7, tiện lợi mọi lúc mọi nơi",
    "Thủ tục đơn giản, nhanh chóng, minh bạch",
    "Bảo mật thông tin cá nhân tuyệt đối",
    "Hỗ trợ người dân tận tình, chu đáo",
    "Công khai, minh bạch trong mọi quy trình",
    "Không ngừng cải tiến, nâng cao chất lượng dịch vụ"
  ];

  return (
    <div className="relative py-8" style={{
      backgroundImage: "url('/assets/image/background/sen.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      {/* Overlay để đảm bảo text dễ đọc */}
      <div className="absolute inset-0 bg-white bg-opacity-80"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Panel - Principles */}
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-6">
              6 NGUYÊN TẮC DỊCH VỤ CÔNG QUỐC GIA
            </h2>
            <div className="space-y-3">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-800 leading-relaxed">{principle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Search */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Tìm kiếm dịch vụ công
            </h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Nhập từ khoá tìm kiếm"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Tìm kiếm nâng cao
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
