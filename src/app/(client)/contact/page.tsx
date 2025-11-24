"use client";

import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
    const [searchForm, setSearchForm] = useState({
        agencyLevel: "Cấp Phường/ Xã",
        province: "Thành phố Hồ Chí Minh",
        department: "",
        ward: "Phường Tăng Nhơn Phú"
    });

    const [searchResults] = useState([
        {
            id: 1,
            name: "Tổ an ninh Công an phường Tăng Nhơn Phú, thành phố Hồ Chí Minh",
            phone: "028.xxxx.xxxx",
            email: "anninh.tangnhonphu@congan.hochiminh.gov.vn",
            address: "123 Đường Tăng Nhơn Phú, Phường Tăng Nhơn Phú, Quận 9, TP.HCM"
        },
        {
            id: 2,
            name: "Tổ cảnh sát khu vực Công an phường Tăng Nhơn Phú, thành phố Hồ Chí Minh",
            phone: "028.xxxx.xxxx",
            email: "canhsat.tangnhonphu@congan.hochiminh.gov.vn",
            address: "456 Đường Tăng Nhơn Phú, Phường Tăng Nhơn Phú, Quận 9, TP.HCM"
        },
        {
            id: 3,
            name: "Tổ cảnh sát trật tự Công an phường Tăng Nhơn Phú, thành phố Hồ Chí Minh",
            phone: "028.xxxx.xxxx",
            email: "trattu.tangnhonphu@congan.hochiminh.gov.vn",
            address: "789 Đường Tăng Nhơn Phú, Phường Tăng Nhơn Phú, Quận 9, TP.HCM"
        },
        {
            id: 4,
            name: "Tổ tổng hợp Công an phường Tăng Nhơn Phú, thành phố Hồ Chí Minh",
            phone: "028.xxxx.xxxx",
            email: "tonghop.tangnhonphu@congan.hochiminh.gov.vn",
            address: "321 Đường Tăng Nhơn Phú, Phường Tăng Nhơn Phú, Quận 9, TP.HCM"
        }
    ]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search logic here
        console.log("Searching with:", searchForm);
    };

    const handleInputChange = (field: string, value: string) => {
        setSearchForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Page Title */}
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-3">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 text-center">
                                Thông tin liên hệ, hỗ trợ hỏi đáp dịch vụ công
                            </h1>
                        </div>
                    </div>

                    {/* Search Form */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
                        <form onSubmit={handleSearch} className="space-y-4 sm:space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <span className="inline-flex items-center">
                                            <div className="w-4 h-4 bg-red-600 rounded-full mr-2"></div>
                                            Cấp cơ quan (*)
                                        </span>
                                    </label>
                                    <select
                                        value={searchForm.agencyLevel}
                                        onChange={(e) => handleInputChange("agencyLevel", e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="Cấp Phường/ Xã">Cấp Phường/ Xã</option>
                                        <option value="Cấp Quận/ Huyện">Cấp Quận/ Huyện</option>
                                        <option value="Cấp Tỉnh/ Thành phố">Cấp Tỉnh/ Thành phố</option>
                                        <option value="Cấp Trung ương">Cấp Trung ương</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <span className="inline-flex items-center">
                                            <div className="w-4 h-4 bg-red-600 rounded-full mr-2"></div>
                                            Cục nghiệp vụ (*)
                                        </span>
                                    </label>
                                    <select
                                        value={searchForm.department}
                                        onChange={(e) => handleInputChange("department", e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="">-- Chọn cục --</option>
                                        <option value="Cục An ninh">Cục An ninh</option>
                                        <option value="Cục Cảnh sát">Cục Cảnh sát</option>
                                        <option value="Cục Điều tra">Cục Điều tra</option>
                                        <option value="Cục Hành chính">Cục Hành chính</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <span className="inline-flex items-center">
                                            <div className="w-4 h-4 bg-red-600 rounded-full mr-2"></div>
                                            Tỉnh/ thành phố (*)
                                        </span>
                                    </label>
                                    <select
                                        value={searchForm.province}
                                        onChange={(e) => handleInputChange("province", e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="Thành phố Hồ Chí Minh">Thành phố Hồ Chí Minh</option>
                                        <option value="Hà Nội">Hà Nội</option>
                                        <option value="Đà Nẵng">Đà Nẵng</option>
                                        <option value="Cần Thơ">Cần Thơ</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <span className="inline-flex items-center">
                                            <div className="w-4 h-4 bg-red-600 rounded-full mr-2"></div>
                                            Phường/ xã (*)
                                        </span>
                                    </label>
                                    <select
                                        value={searchForm.ward}
                                        onChange={(e) => handleInputChange("ward", e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="Phường Tăng Nhơn Phú">Phường Tăng Nhơn Phú</option>
                                        <option value="Phường Long Bình">Phường Long Bình</option>
                                        <option value="Phường Long Thạnh Mỹ">Phường Long Thạnh Mỹ</option>
                                        <option value="Phường Hiệp Phú">Phường Hiệp Phú</option>
                                    </select>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto justify-center"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Tra cứu
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Search Results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {searchResults.map((result) => (
                            <div key={result.id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 sm:p-6">
                                {/* Emblem */}
                                <div className="flex justify-center mb-3 sm:mb-4">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center relative">
                                        <Image
                                            src="/logo.png"
                                            alt="Logo"
                                            width={60}
                                            height={60}
                                            className="object-contain w-10 h-10 sm:w-14 sm:h-14"
                                            priority
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-600 rounded-full flex items-center justify-center">
                                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Department Name */}
                                <h3 className="text-base sm:text-lg font-bold text-gray-800 text-center mb-3 sm:mb-4 leading-tight">
                                    {result.name}
                                </h3>

                                {/* Contact Information */}
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex items-start sm:items-center space-x-2 sm:space-x-3">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span className="text-sm sm:text-base text-gray-700 break-words">
                                            <strong>Điện thoại:</strong> {result.phone}
                                        </span>
                                    </div>

                                    <div className="flex items-start sm:items-center space-x-2 sm:space-x-3">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm sm:text-base text-gray-700 break-words">
                                            <strong>Email:</strong> {result.email}
                                        </span>
                                    </div>

                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-sm sm:text-base text-gray-700 break-words">
                                            <strong>Địa điểm trụ sở:</strong> {result.address}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}