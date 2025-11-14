export default function TinTucPage() {
    const newsItems = [
        {
            id: 1,
            title: "Cổng Dịch vụ công quốc gia nâng cấp hệ thống mới",
            summary: "Hệ thống PASCS đã được nâng cấp với nhiều tính năng mới, giúp người dân dễ dàng tiếp cận các dịch vụ công trực tuyến.",
            date: "15/10/2025",
            category: "Công nghệ"
        },
        {
            id: 2,
            title: "Thêm 5 dịch vụ công mới được số hóa hoàn toàn",
            summary: "Bộ Thông tin và Truyền thông vừa công bố thêm 5 dịch vụ công mới được số hóa hoàn toàn, bao gồm đăng ký khai sinh, kết hôn, và các thủ tục hành chính khác.",
            date: "10/10/2025",
            category: "Dịch vụ"
        },
        {
            id: 3,
            title: "Hướng dẫn sử dụng dịch vụ công trực tuyến mới",
            summary: "Video hướng dẫn chi tiết cách sử dụng các dịch vụ công trực tuyến trên Cổng Dịch vụ công quốc gia PASCS.",
            date: "05/10/2025",
            category: "Hướng dẫn"
        },
        {
            id: 4,
            title: "Thống kê số lượng hồ sơ xử lý trong tháng 9/2025",
            summary: "Tổng số hồ sơ được xử lý trong tháng 9/2025 đạt 1,2 triệu hồ sơ, tăng 15% so với tháng trước.",
            date: "01/10/2025",
            category: "Thống kê"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Tin tức dịch vụ công
                    </h1>

                    <div className="space-y-6">
                        {newsItems.map((item) => (
                            <article key={item.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-3">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        {item.category}
                                    </span>
                                    <time className="text-sm text-gray-500">
                                        {item.date}
                                    </time>
                                </div>

                                <h2 className="text-xl font-semibold text-gray-800 mb-3 hover:text-red-600 cursor-pointer">
                                    {item.title}
                                </h2>

                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {item.summary}
                                </p>

                                <div className="flex items-center justify-between">
                                    <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                                        Đọc thêm →
                                    </button>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <span>👁️ 1,234 lượt xem</span>
                                        <span>💬 12 bình luận</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8 flex justify-center">
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Trước
                            </button>
                            <button className="px-3 py-2 text-sm bg-red-600 text-white rounded">
                                1
                            </button>
                            <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                2
                            </button>
                            <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                3
                            </button>
                            <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                Sau
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
