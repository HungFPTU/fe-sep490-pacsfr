"use client";

import Link from "next/link";
import { useFeaturedServices } from "../hooks/useServices";
import { ServiceList } from "./ServiceList";
import { LoadingSpinner } from "@/shared/components/common";

interface FeaturedServicesProps {
    title?: string;
    subtitle?: string;
    limit?: number;
    showViewAll?: boolean;
    className?: string;
}

export const FeaturedServices: React.FC<FeaturedServicesProps> = ({
    title = "Dịch vụ nổi bật",
    subtitle = "Các dịch vụ hành chính được quan tâm nhiều nhất",
    limit = 6,
    showViewAll = true,
    className = "",
}) => {
    const { data: services, isLoading, error } = useFeaturedServices(limit);

    if (isLoading) {
        return (
            <section className={`py-16 bg-gray-50 ${className}`}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
                        <p className="text-lg text-gray-600">{subtitle}</p>
                    </div>
                    <div className="flex justify-center items-center py-12">
                        <LoadingSpinner size="lg" />
                    </div>
                </div>
            </section>
        );
    }

    if (error || !services || services.length === 0) {
        return null;
    }

    return (
        <section className={`py-16 bg-gray-50 ${className}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-lg text-gray-600">{subtitle}</p>
                </div>

                <ServiceList
                    services={services}
                    showDescription={true}
                    className="mb-8"
                />

                {showViewAll && (
                    <div className="text-center">
                        <Link
                            href="/search"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            Xem tất cả dịch vụ
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};
