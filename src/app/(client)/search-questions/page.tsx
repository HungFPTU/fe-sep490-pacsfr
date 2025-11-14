export default function SearchQuestionsPage() {
    const questions = [
        {
            id: 1,
            title: "Đăng ký tài khoản dịch vụ công",
            category: "Tài khoản",
            date: "15/10/2025",
            views: 1250
        },
        {
            id: 2,
            title: "Hướng dẫn nộp hồ sơ trực tuyến",
            category: "Thủ tục",
            date: "12/10/2025",
            views: 980
        },
        {
            id: 3,
            title: "Tra cứu tiến độ xử lý hồ sơ",
            category: "Tra cứu",
            date: "10/10/2025",
            views: 756
        },
        {
            id: 4,
            title: "Thanh toán lệ phí trực tuyến",
            category: "Thanh toán",
            date: "08/10/2025",
            views: 634
        },
        {
            id: 5,
            title: "Cấp thẻ căn cước công dân",
            category: "Giấy tờ",
            date: "05/10/2025",
            views: 892
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-blue-800">
                                Tra cứu câu hỏi
                            </h1>
                        </div>
                        <p className="text-gray-600">
                            Tìm kiếm câu hỏi và câu trả lời từ cộng đồng người dùng
                        </p>
                    </div>

                    {/* Search Form */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-8">
                        <form className="space-y-4">
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Từ khóa
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nhập từ khóa tìm kiếm"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Danh mục
                                    </label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                                        <option value="">Tất cả danh mục</option>
                                        <option value="account">Tài khoản</option>
                                        <option value="procedure">Thủ tục</option>
                                        <option value="search">Tra cứu</option>
                                        <option value="payment">Thanh toán</option>
                                        <option value="document">Giấy tờ</option>
                                    </select>
                                </div>
                                <div className="flex items-end">
                                    <button
                                        type="submit"
                                        className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Tìm kiếm
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Results */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Kết quả tìm kiếm
                            </h2>
                            <span className="text-sm text-gray-600">
                                Tìm thấy {questions.length} câu hỏi
                            </span>
                        </div>

                        {questions.map((question) => (
                            <div key={question.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-red-600 cursor-pointer">
                                            {question.title}
                                        </h3>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                            <span className="flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                                {question.category}
                                            </span>
                                            <span className="flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {question.date}
                                            </span>
                                            <span className="flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                {question.views} lượt xem
                                            </span>
                                        </div>
                                    </div>
                                    <button className="ml-4 text-red-600 hover:text-red-700 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8 flex justify-center">
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Trang đầu
                            </button>
                            <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                «
                            </button>
                            <button className="px-3 py-2 bg-red-600 text-white rounded text-sm">
                                1
                            </button>
                            <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                                2
                            </button>
                            <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                                »
                            </button>
                            <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                                Trang cuối
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
