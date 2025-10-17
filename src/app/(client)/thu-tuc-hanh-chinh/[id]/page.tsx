"use client";

import { GovernmentHeader } from "@/shared/components/home/GovernmentHeader.com";
import { ServiceDetailView } from "@/modules/client/services/components/view";

interface ServiceDetailPageProps {
    params: {
        id: string;
    };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
    const breadcrumbItems = [
        { label: "Trang chủ", href: "/" },
        { label: "Thủ tục hành chính", href: "/thu-tuc-hanh-chinh" },
        { label: "Chi tiết thủ tục" }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <GovernmentHeader breadcrumbItems={breadcrumbItems} />

            <div className="container mx-auto px-4 py-8">
                <ServiceDetailView serviceId={params.id} />
            </div>
        </div>
    );
}
