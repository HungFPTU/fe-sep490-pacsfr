"use client";

import { GovernmentHeader } from "@/shared/components/home/GovernmentHeader.com";
import { useState } from "react";

export default function ProceduresPage() {
    const breadcrumbItems = [
        { label: "Trang chủ", href: "/" },
        { label: "Thủ tục hành chính" }
    ];

    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchBy, setSearchBy] = useState("ministry");
    const [selectedAgency, setSelectedAgency] = useState("");
    const [selectedField, setSelectedField] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedTarget, setSelectedTarget] = useState("");

    const agencies = [
        "-- Chọn cơ quan --",
        "Bộ Công thương",
        "Bộ Tài chính",
        "Bộ Xây dựng",
        "Bộ Giao thông vận tải",
        "Bộ Nông nghiệp và Phát triển nông thôn",
        "Bộ Y tế",
        "Bộ Giáo dục và Đào tạo"
    ];

    const fields = [
        "-- Chọn lĩnh vực --",
        "Xúc tiến thương mại",
        "Tài chính - Ngân hàng",
        "Xây dựng",
        "Giao thông vận tải",
        "Nông nghiệp",
        "Y tế",
        "Giáo dục"
    ];

    const levels = [
        "-- Chọn cấp thực hiện --",
        "Cấp Trung ương",
        "Cấp Tỉnh/Thành phố",
        "Cấp Huyện/Quận",
        "Cấp Xã/Phường"
    ];

    const targets = [
        "-- Chọn đối tượng --",
        "Công dân",
        "Tổ chức",
        "Doanh nghiệp",
        "Cơ quan nhà nước"
    ];

    const procedures = [
        {
            id: 1,
            code: "2.000001",
            name: "Đăng ký sửa đổi, bổ sung nội dung tổ chức hội chợ, triển lãm thương mại tại Việt Nam.",
            issuingAgency: "Bộ Công thương",
            implementingAgency: "Sở Công thương; Sở Công thương",
            field: "Xúc tiến thương mại"
        },
        {
            id: 2,
            code: "2.000002",
            name: "Cấp giấy phép kinh doanh dịch vụ lữ hành quốc tế",
            issuingAgency: "Bộ Văn hóa, Thể thao và Du lịch",
            implementingAgency: "Sở Văn hóa, Thể thao và Du lịch",
            field: "Du lịch"
        },
        {
            id: 3,
            code: "2.000003",
            name: "Đăng ký thành lập doanh nghiệp",
            issuingAgency: "Bộ Kế hoạch và Đầu tư",
            implementingAgency: "Sở Kế hoạch và Đầu tư",
            field: "Kinh doanh"
        },
        {
            id: 4,
            code: "2.000004",
            name: "Cấp giấy phép xây dựng",
            issuingAgency: "Bộ Xây dựng",
            implementingAgency: "Sở Xây dựng",
            field: "Xây dựng"
        },
        {
            id: 5,
            code: "2.000005",
            name: "Đăng ký khai sinh",
            issuingAgency: "Bộ Tư pháp",
            implementingAgency: "UBND cấp xã/phường",
            field: "Hành chính"
        }
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching:", {
            searchKeyword,
            searchBy,
            selectedAgency,
            selectedField,
            selectedLevel,
            selectedTarget
        });
    };

    const handleSimplifiedSearch = () => {
        console.log("Simplified search");
    };

    const handleExport = () => {
        console.log("Export to Excel");
    };

    return (
        <div className="min-h-screen bg-white">
            <GovernmentHeader
                showBreadcrumb={true}
                breadcrumbItems={breadcrumbItems}
                currentPage="procedures"
            />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Search Bar */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-8">
                        <form onSubmit={handleSearch} className="space-y-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={searchKeyword}
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                        placeholder="Nhập từ khoá tìm kiếm"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={handleSimplifiedSearch}
                                        className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                    >
                                        Tìm kiếm rút gọn
                                    </button>

                                    <button
                                        type="submit"
                                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Tìm kiếm
                                    </button>
                                </div>
                            </div>

                            {/* Filter Section */}
                            <div className="border-t pt-6">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Tìm theo:
                                    </label>
                                    <div className="flex space-x-6">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="searchBy"
                                                value="ministry"
                                                checked={searchBy === "ministry"}
                                                onChange={(e) => setSearchBy(e.target.value)}
                                                className="mr-2 text-red-600 focus:ring-red-500"
                                            />
                                            <span className="text-sm text-gray-700">Bộ/ Ban/ Ngành</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="searchBy"
                                                value="province"
                                                checked={searchBy === "province"}
                                                onChange={(e) => setSearchBy(e.target.value)}
                                                className="mr-2 text-red-600 focus:ring-red-500"
                                            />
                                            <span className="text-sm text-gray-700">Tỉnh/ Thành phố</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cơ quan thực hiện
                                        </label>
                                        <select
                                            value={selectedAgency}
                                            onChange={(e) => setSelectedAgency(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            {agencies.map((agency) => (
                                                <option key={agency} value={agency}>
                                                    {agency}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Lĩnh vực
                                        </label>
                                        <select
                                            value={selectedField}
                                            onChange={(e) => setSelectedField(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            {fields.map((field) => (
                                                <option key={field} value={field}>
                                                    {field}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cấp thực hiện
                                        </label>
                                        <select
                                            value={selectedLevel}
                                            onChange={(e) => setSelectedLevel(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            {levels.map((level) => (
                                                <option key={level} value={level}>
                                                    {level}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Đối tượng thực hiện
                                        </label>
                                        <select
                                            value={selectedTarget}
                                            onChange={(e) => setSelectedTarget(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            {targets.map((target) => (
                                                <option key={target} value={target}>
                                                    {target}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Results Section */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Danh sách thủ tục hành chính (5782)
                            </h2>
                            <button
                                onClick={handleExport}
                                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
                                title="Xuất Excel"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                            Mã số
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                            Tên
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                            Cơ quan ban hành
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                            Cơ quan thực hiện
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                            Lĩnh vực
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {procedures.map((procedure) => (
                                        <tr key={procedure.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {procedure.code}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                                                {procedure.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {procedure.issuingAgency}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                                                {procedure.implementingAgency}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {procedure.field}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="bg-gray-50 px-6 py-3 border-t">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Hiển thị 1-5 của 5782 kết quả
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                        Trước
                                    </button>
                                    <button className="px-3 py-1 text-sm bg-red-600 text-white rounded">
                                        1
                                    </button>
                                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                        2
                                    </button>
                                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                        3
                                    </button>
                                    <span className="text-sm text-gray-500">...</span>
                                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                        1157
                                    </button>
                                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                        Sau
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
