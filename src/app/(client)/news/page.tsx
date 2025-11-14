"use client";

import { useState } from "react";

export default function NewsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const newsItems = [
        {
            id: 1,
            title: "Thủ tục hành chính mới ban hành và được sửa đổi, bổ sung trong lĩnh vực quản lý xuất nhập cảnh",
            date: "15/10/2025",
            type: "Thủ tục mới"
        },
        {
            id: 2,
            title: "Công bố thủ tục hành chính mới lĩnh vực cấp, quản lý căn cước",
            date: "14/10/2025",
            type: "Thủ tục mới"
        },
        {
            id: 3,
            title: "Quy định công tác kiểm tra, kiểm soát và xử lý vi phạm pháp luật trong lĩnh vực giao thông đường sắt",
            date: "13/10/2025",
            type: "Quy định mới"
        },
        {
            id: 4,
            title: "Kiểm tra kiến thức pháp luật về trật tự, an toàn giao thông đường bộ để được phục hồi điểm giấy phép lái xe",
            date: "12/10/2025",
            type: "Hướng dẫn"
        },
        {
            id: 5,
            title: "Nghị định quy định chi tiết một số điều và biện pháp thi hành Luật Quản lý, sử dụng vũ khí, vật liệu nổ và công cụ hỗ trợ",
            date: "11/10/2025",
            type: "Nghị định"
        },
        {
            id: 6,
            title: "Sửa đổi, bổ sung một số quy định liên quan công tác phòng cháy, chữa cháy và cứu nạn, cứu hộ",
            date: "10/10/2025",
            type: "Sửa đổi"
        },
        {
            id: 7,
            title: "Quy định về cấp, thu hồi giấy phép, giấy xác nhận về công cụ hỗ trợ",
            date: "09/10/2025",
            type: "Quy định mới"
        },
        {
            id: 8,
            title: "Thủ tục đăng ký xe ô tô, xe máy trực tuyến",
            date: "08/10/2025",
            type: "Dịch vụ mới"
        },
        {
            id: 9,
            title: "Hướng dẫn đăng ký khai sinh trực tuyến",
            date: "07/10/2025",
            type: "Hướng dẫn"
        },
        {
            id: 10,
            title: "Quy định về cấp, đổi, cấp lại thẻ căn cước công dân",
            date: "06/10/2025",
            type: "Quy định mới"
        },
        {
            id: 11,
            title: "Thủ tục đăng ký kết hôn trực tuyến",
            date: "05/10/2025",
            type: "Dịch vụ mới"
        },
        {
            id: 12,
            title: "Hướng dẫn nộp hồ sơ trực tuyến cho các thủ tục hành chính",
            date: "04/10/2025",
            type: "Hướng dẫn"
        },
        {
            id: 13,
            title: "Quy định về cấp giấy phép lái xe",
            date: "03/10/2025",
            type: "Quy định mới"
        },
        {
            id: 14,
            title: "Thủ tục đăng ký khai tử trực tuyến",
            date: "02/10/2025",
            type: "Dịch vụ mới"
        },
        {
            id: 15,
            title: "Hướng dẫn tra cứu trạng thái hồ sơ trực tuyến",
            date: "01/10/2025",
            type: "Hướng dẫn"
        }
    ];

    const totalPages = Math.ceil(newsItems.length / itemsPerPage);
    const currentItems = newsItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Page Title */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-blue-800">
                                Giới thiệu thủ tục hành chính mới
                            </h1>
                        </div>
                    </div>

                    {/* News Items List */}
                    <div className="space-y-4">
                        {currentItems.map((item) => (
                            <div key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                                <div className="flex items-start space-x-4">
                                    {/* Document Icon */}
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                                {item.type}
                                            </span>
                                            <span>{item.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8 flex justify-center">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === i + 1
                                        ? 'z-10 bg-red-50 border-red-500 text-red-600'
                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </nav>
                    </div>

                    {/* Results Info */}
                    <div className="mt-4 text-center text-sm text-gray-600">
                        Hiển thị {currentItems.length} của {newsItems.length} tin tức
                    </div>
                </div>
            </main>
        </div>
    );
}
