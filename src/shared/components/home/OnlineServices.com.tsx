"use client";

import { useState } from "react";

const onlineServices = [
    {
        id: 1,
        title: "Đăng ký khai sinh trực tuyến toàn trình",
        description: "Dịch vụ đăng ký khai sinh hoàn toàn trực tuyến"
    },
    {
        id: 2,
        title: "Đăng ký kết hôn trực tuyến cho công dân Việt Nam",
        description: "Đăng ký kết hôn trực tuyến"
    },
    {
        id: 3,
        title: "Đăng ký hộ khẩu trực tuyến",
        description: "Quản lý hộ khẩu trực tuyến"
    },
    {
        id: 4,
        title: "Cấp thẻ căn cước công dân trực tuyến (thực hiện tại cấp huyện)",
        description: "Cấp thẻ căn cước công dân"
    },
    {
        id: 5,
        title: "Cấp hộ chiếu phổ thông trực tuyến (thực hiện tại cấp tỉnh)",
        description: "Cấp hộ chiếu phổ thông"
    },
    {
        id: 6,
        title: "Đăng ký kinh doanh trực tuyến toàn trình",
        description: "Thành lập doanh nghiệp trực tuyến"
    }
];

export function OnlineServices() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;

    const nextPage = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, Math.ceil(onlineServices.length / itemsPerPage) - 1));
    };

    const prevPage = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const currentServices = onlineServices.slice(
        currentIndex * itemsPerPage,
        (currentIndex + 1) * itemsPerPage
    );

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-800 mb-2 flex items-center justify-center">
                        <svg className="w-8 h-8 mr-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        Dịch vụ công trực tuyến
                    </h2>
                </div>

                <div className="relative">
                    {/* Services Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            {currentServices.slice(0, Math.ceil(currentServices.length / 2))?.map((service) => (
                                <div key={service.id} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                                    <h3 className="font-semibold text-gray-800 mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            {currentServices.slice(Math.ceil(currentServices.length / 2))?.map((service) => (
                                <div key={service.id} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                                    <h3 className="font-semibold text-gray-800 mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    {onlineServices.length > itemsPerPage && (
                        <>
                            <button
                                onClick={prevPage}
                                disabled={currentIndex === 0}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={nextPage}
                                disabled={currentIndex >= Math.ceil(onlineServices.length / itemsPerPage) - 1}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>

                {/* Pagination Dots */}
                {onlineServices.length > itemsPerPage && (
                    <div className="flex justify-center mt-6 space-x-2">
                        {Array.from({ length: Math.ceil(onlineServices.length / itemsPerPage) })?.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
