"use client";

import { useParams } from "next/navigation";
import { GovernmentHeader } from "@/shared/components/home/GovernmentHeader.com";
import { ServiceDetailView } from "@/modules/client/services/components/view";

export default function ServiceDetailPage() {
    const params = useParams();
    const serviceId = params?.id as string;

    const breadcrumbItems = [
        { label: "Trang chủ", href: "/" },
        { label: "Thủ tục hành chính", href: "/thu-tuc-hanh-chinh" },
        { label: "Chi tiết thủ tục" }
    ];

    if (!serviceId) {
        return (
            <div className="min-h-screen bg-gray-50">
                <GovernmentHeader
                    showBreadcrumb={true}
                    breadcrumbItems={breadcrumbItems}
                    currentPage="procedures"
                />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center py-12">
                        <p className="text-gray-600">Đang tải...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <GovernmentHeader
                showBreadcrumb={true}
                breadcrumbItems={breadcrumbItems}
                currentPage="procedures"
            />

            <div className="container mx-auto px-4 py-8">
                <ServiceDetailView serviceId={serviceId} />
            </div>
        </div>
    );
}
