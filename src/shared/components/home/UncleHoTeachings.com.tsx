import Image from 'next/image';

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
    <div className="relative py-12 min-h-[400px] border-b border-red-500 bg-gradient-to-b from-yellow-100 to-yellow-50">
      {/* Overlay để đảm bảo text dễ đọc */}
      <div className="absolute inset-0 bg-yellow-50 bg-opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Panel - Uncle Ho Teachings */}
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-6">
              6 NGUYÊN TẮC DỊCH VỤ CÔNG QUỐC GIA
            </h2>
            <div className="space-y-3">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0 mt-2"></div>
                  <p className="text-gray-800 leading-relaxed">{principle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Search */}
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center bg-white rounded-lg">
                <input
                  type="text"
                  placeholder="Nhập từ khoá tìm kiếm"
                  className="flex-1 text-gray-900 font-medium px-4 py-2 border border-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center">
                  <span>Tìm kiếm nâng cao</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hoa sen trang trí ở cuối */}
      <div className="absolute bottom-0 left-0 right-0 h-full overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-full">
          <Image
            src="/assets/image/background/sen.jpg"
            alt="Hoa sen"
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>
      </div>
    </div>
  );
}
