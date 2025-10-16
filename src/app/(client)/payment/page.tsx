"use client";

import { GovernmentHeader } from "@/shared/components/home/GovernmentHeader.com";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
    const router = useRouter();
    const breadcrumbItems = [
        { label: "Trang chủ", href: "/" },
        { label: "Hỗ trợ", href: "#" },
        { label: "Thanh toán trực tuyến" }
    ];

    useEffect(() => {
        // Redirect to lookup page after 2 seconds
        const timer = setTimeout(() => {
            router.push("/lookup");
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-white">
            <GovernmentHeader
                showBreadcrumb={true}
                breadcrumbItems={breadcrumbItems}
                currentPage="payment"
            />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                        <div className="mb-6">
                            <svg className="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <h1 className="text-2xl font-bold text-green-800 mb-2">
                                Thanh toán trực tuyến
                            </h1>
                            <p className="text-green-700">
                                Chúng tôi đang chuyển hướng bạn đến trang tra cứu mã hồ sơ...
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-center space-x-2">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                                <span className="text-green-600 font-medium">Đang chuyển hướng...</span>
                            </div>

                            <div className="bg-white rounded-lg p-4 border border-green-200">
                                <p className="text-gray-700 mb-4">
                                    Để tra cứu thông tin thanh toán, vui lòng sử dụng chức năng tra cứu mã hồ sơ.
                                </p>
                                <button
                                    onClick={() => router.push("/lookup")}
                                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Tra cứu mã hồ sơ
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 text-sm text-gray-600">
                            <p>Trang sẽ tự động chuyển hướng sau 2 giây</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
