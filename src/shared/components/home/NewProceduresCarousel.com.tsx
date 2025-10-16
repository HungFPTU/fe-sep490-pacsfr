"use client";

import { useState } from "react";

const newProcedures = [
  {
    id: 1,
    title: "Dịch vụ đăng ký khai sinh trực tuyến toàn trình từ 01/01/2025",
    description: "Dịch vụ đăng ký khai sinh hoàn toàn trực tuyến"
  },
  {
    id: 2,
    title: "Quy định về cấp, thu hồi thẻ căn cước công dân và hộ chiếu",
    description: "Quy định mới về cấp giấy tờ tùy thân"
  },
  {
    id: 3,
    title: "Quy định về đăng ký kinh doanh và quản lý doanh nghiệp trực tuyến",
    description: "Quy định về đăng ký kinh doanh trực tuyến"
  }
];

export function NewProceduresCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % newProcedures.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + newProcedures.length) % newProcedures.length);
    };

    return (
        <section className="py-8 bg-white">
            <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-red-600 mb-2 flex items-center justify-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Dịch vụ công mới
          </h2>
        </div>

                <div className="relative">
                    {/* Carousel Container */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {newProcedures.map((procedure) => (
                                <div key={procedure.id} className="w-full flex-shrink-0">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                            {procedure.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {procedure.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-4 space-x-2">
                    {newProcedures.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-red-600" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
