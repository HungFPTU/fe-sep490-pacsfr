"use client";

import { useState } from "react";
import { useNewsHighlights } from "@/modules/client/homepage/hooks";
import { 
  NewspaperIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export function NewProceduresCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: news = [], isLoading, isError } = useNewsHighlights(6);

  const nextSlide = () => {
    if (news.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    if (news.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-32">
            <ArrowPathIcon className="w-6 h-6 animate-spin text-red-600" />
            <span className="ml-2 text-gray-600">Đang tải tin tức...</span>
          </div>
        </div>
      </section>
    );
  }

  // Error or empty state
  if (isError || news.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-white relative overflow-hidden">
      {/* Left Background Decoration */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-48 opacity-90 pointer-events-none hidden lg:block"
        style={{
          backgroundImage: "url('/assets/image/background/ban-mai-iii-tranh-son-mai-hoa-sen-cua-hoa-si-tran-thieu-nam.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)',
        }}
      />
      
      {/* Right Background Decoration */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-48 opacity-90 pointer-events-none hidden lg:block"
        style={{
          backgroundImage: "url('/assets/image/background/ban-mai-iii-tranh-son-mai-hoa-sen-cua-hoa-si-tran-thieu-nam.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.8), transparent)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.8), transparent)',
        }}
      />

      <div className="container mx-auto px-16 relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-red-600 mb-2 flex items-center justify-center">
            <NewspaperIcon className="w-6 h-6 mr-2" />
            Tin tức dịch vụ công mới
          </h2>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {news.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <Link href={`/tin-tuc/${item.id}`}>
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 border border-red-200 hover:shadow-md transition-shadow cursor-pointer">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {item.summary || item.content?.substring(0, 150)}
                      </p>
                      {item.createdAt && (
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {news.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {news.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-red-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
