"use client";

import { GovernmentHeader } from "@/shared/components/home/GovernmentHeader.com";
import { useState } from "react";

export default function GuidePage() {
    const breadcrumbItems = [
        { label: "Trang chủ", href: "/" },
        { label: "Hỗ trợ", href: "#" },
        { label: "Tài liệu hướng dẫn công dân" }
    ];

    const [searchTitle, setSearchTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("---Tất cả---");
    const [currentPage, setCurrentPage] = useState(1);

    const categories = [
        "---Tất cả---",
        "Hướng dẫn đăng ký",
        "Hướng dẫn nộp hồ sơ",
        "Hướng dẫn tra cứu",
        "Hướng dẫn thanh toán",
        "Hướng dẫn kỹ thuật"
    ];

    const documents = [
        {
            id: 1,
            title: "Đăng ký tài khoản dịch vụ công",
            fileName: "HD_tao_tai_khoan_DVCTT_ND_69_ver240701b_upload_1722425231.pdf",
            type: "Hướng dẫn bằng file"
        },
        {
            id: 2,
            title: "Hướng dẫn Nộp hồ sơ trực tuyến",
            fileName: "Tailieuhuongdancongdannophosotructuyen_1716280855.pdf",
            type: "Hướng dẫn bằng file"
        },
        {
            id: 3,
            title: "Hướng dẫn Tra cứu hồ sơ trực tuyến",
            fileName: "HD_tra_cuu_ho_so_truc_tuyen_2025.pdf",
            type: "Hướng dẫn bằng file"
        },
        {
            id: 4,
            title: "Hướng dẫn Thanh toán lệ phí trực tuyến",
            fileName: "HD_thanh_toan_le_phi_2025.pdf",
            type: "Hướng dẫn bằng file"
        },
        {
            id: 5,
            title: "Hướng dẫn sử dụng ứng dụng di động",
            fileName: "HD_su_dung_app_mobile_2025.pdf",
            type: "Hướng dẫn bằng file"
        }
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching:", { searchTitle, selectedCategory });
    };

    const handleRefresh = () => {
        setSearchTitle("");
        setSelectedCategory("---Tất cả---");
        setCurrentPage(1);
    };

    const filteredDocuments = documents.filter(doc => {
        const matchesTitle = searchTitle === "" || doc.title.toLowerCase().includes(searchTitle.toLowerCase());
        const matchesCategory = selectedCategory === "---Tất cả---" || doc.type.includes(selectedCategory);
        return matchesTitle && matchesCategory;
    });

    const totalPages = Math.ceil(filteredDocuments.length / 10);
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const currentDocuments = filteredDocuments.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-white">
            <GovernmentHeader
                showBreadcrumb={true}
                breadcrumbItems={breadcrumbItems}
                currentPage="guide"
            />

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
                                Tài liệu hướng dẫn công dân
                            </h1>
                        </div>
                    </div>

                    {/* Search Form */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-8">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={searchTitle}
                                    onChange={(e) => setSearchTitle(e.target.value)}
                                    placeholder="Nhập Tiêu đề"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            <div className="flex-1">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Tìm kiếm
                                </button>

                                <button
                                    type="button"
                                    onClick={handleRefresh}
                                    className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Làm mới
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Results Count */}
                    <div className="mb-4">
                        <p className="text-gray-600">
                            Tìm thấy {filteredDocuments.length} dòng
                        </p>
                    </div>

                    {/* Documents Table */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                        STT
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                        Tiêu đề
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                        File hướng dẫn
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                        Loại hướng dẫn
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentDocuments.map((doc, index) => (
                                    <tr key={doc.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {startIndex + index + 1}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <a
                                                href="#"
                                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                {doc.title}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <a
                                                href="#"
                                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                {doc.fileName}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {doc.type}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex justify-center">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Trang đầu
                            </button>

                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                &lt;&lt;
                            </button>

                            <button
                                className="px-3 py-2 text-sm bg-blue-600 text-white rounded"
                            >
                                1
                            </button>

                            {totalPages > 1 && (
                                <button
                                    onClick={() => setCurrentPage(2)}
                                    className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                                >
                                    2
                                </button>
                            )}

                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                &gt;&gt;
                            </button>

                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Trang cuối
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
