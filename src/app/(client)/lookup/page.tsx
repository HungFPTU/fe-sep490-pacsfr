"use client";

import { GovernmentHeader } from "@/shared/components/home/GovernmentHeader.com";
import { useState } from "react";

export default function LookupPage() {
    const breadcrumbItems = [
        { label: "Trang chủ", href: "/" },
        { label: "Tra cứu hồ sơ" }
    ];

    const [caseNumber, setCaseNumber] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
    const [captcha, setCaptcha] = useState("kvnjy");
    const [searchResults, setSearchResults] = useState<Array<{
        id: number;
        fileNumber: string;
        procedure: string;
        submitter: string;
        status: string;
    }>>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        setHasSearched(true);

        // Simulate API call
        setTimeout(() => {
            // Mock search results
            const mockResults = [
                {
                    id: 1,
                    fileNumber: "HS-2025-001234",
                    procedure: "Đăng ký khai sinh",
                    submitter: "Nguyễn Văn A",
                    status: "Đang xử lý"
                },
                {
                    id: 2,
                    fileNumber: "HS-2025-001235",
                    procedure: "Cấp thẻ căn cước công dân",
                    submitter: "Trần Thị B",
                    status: "Hoàn thành"
                },
                {
                    id: 3,
                    fileNumber: "HS-2025-001236",
                    procedure: "Đăng ký kết hôn",
                    submitter: "Lê Văn C",
                    status: "Chờ bổ sung hồ sơ"
                }
            ];

            setSearchResults(mockResults);
            setIsSearching(false);
        }, 1500);
    };

    const refreshCaptcha = () => {
        // Generate new captcha
        const chars = "abcdefghijklmnopqrstuvwxyz";
        const newCaptcha = Array.from({ length: 5 }, () =>
            chars[Math.floor(Math.random() * chars.length)]
        ).join("");
        setCaptcha(newCaptcha);
    };

    return (
        <div className="min-h-screen bg-white">
            <GovernmentHeader
                showBreadcrumb={true}
                breadcrumbItems={breadcrumbItems}
                currentPage="lookup"
            />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-blue-800">
                                Tra cứu tiến độ xử lý
                            </h1>
                        </div>
                        <p className="text-lg text-blue-700 mb-2">
                            Tra cứu hồ sơ trực tuyến
                        </p>
                        <p className="text-gray-600">
                            * Nhập Mã số hồ sơ trên Giấy tiếp nhận hồ sơ và hẹn trả kết quả để tra cứu tiến độ xử lý
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
                        <form onSubmit={handleSearch} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mã số hồ sơ *
                                    </label>
                                    <input
                                        type="text"
                                        value={caseNumber}
                                        onChange={(e) => setCaseNumber(e.target.value)}
                                        placeholder="Nhập mã hồ sơ"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mã xác nhận *
                                    </label>
                                    <input
                                        type="text"
                                        value={confirmationCode}
                                        onChange={(e) => setConfirmationCode(e.target.value)}
                                        placeholder="Mã xác nhận"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-center space-x-4">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-100 border border-blue-300 rounded px-4 py-3 text-blue-800 font-mono text-lg">
                                        {captcha}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={refreshCaptcha}
                                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                                        title="Làm mới mã xác nhận"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSearching}
                                    className="flex items-center space-x-2 bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSearching ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Đang tìm kiếm...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            <span>Tra cứu</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Search Results */}
                    {hasSearched && (
                        <div className="mt-8">
                            {isSearching ? (
                                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                                        <span className="ml-3 text-gray-600">Đang tìm kiếm thông tin hồ sơ...</span>
                                    </div>
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                                    <div className="bg-gray-50 px-6 py-3 border-b">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            Kết quả tra cứu
                                        </h3>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                        #
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                        Số hồ sơ
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                        Thủ tục thực hiện
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                        Người nộp
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                                        Tình trạng hồ sơ
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {searchResults.map((result, index) => (
                                                    <tr key={result.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {result.fileNumber}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-900">
                                                            {result.procedure}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {result.submitter}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${result.status === 'Hoàn thành'
                                                                ? 'bg-green-100 text-green-800'
                                                                : result.status === 'Đang xử lý'
                                                                    ? 'bg-blue-100 text-blue-800'
                                                                    : 'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                {result.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
                                    <div className="text-center">
                                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.709A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
                                        </svg>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                            Không tìm thấy hồ sơ
                                        </h3>
                                        <p className="text-gray-600">
                                            Vui lòng kiểm tra lại mã số hồ sơ và mã xác nhận
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                            📋 Hướng dẫn sử dụng
                        </h3>
                        <ul className="space-y-2 text-yellow-700">
                            <li>• Mã số hồ sơ được cấp khi bạn nộp hồ sơ tại cơ quan có thẩm quyền</li>
                            <li>• Mã xác nhận được gửi qua SMS hoặc email khi bạn đăng ký nhận kết quả</li>
                            <li>• Nhập đúng mã xác nhận hiển thị trên màn hình</li>
                            <li>• Nếu không nhớ thông tin, vui lòng liên hệ cơ quan tiếp nhận hồ sơ</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}
