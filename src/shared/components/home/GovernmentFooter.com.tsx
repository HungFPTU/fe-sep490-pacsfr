export function GovernmentFooter() {
  return (
    <footer className="bg-red-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side */}
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Cơ quan chủ quản: BỘ THÔNG TIN VÀ TRUYỀN THÔNG
              </h3>
              <p className="text-sm opacity-90">
                Khi sử dụng lại thông tin, đề nghị ghi rõ nguồn &quot;Cổng Dịch vụ công quốc gia&quot;
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Đã kết nối EMC</span>
            </div>
          </div>

          {/* Right side - Certification */}
          <div className="flex justify-end">
            <div className="bg-white text-gray-800 rounded-lg p-4 max-w-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold text-blue-600">CƠ BẢN</div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xs">NCA</span>
                </div>
                <div>
                  <div className="text-xs font-semibold">Website đạt chứng nhận</div>
                  <div className="text-xs text-blue-600 font-semibold">TÍN NHIỆM MẠNG</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
