"use client";

import { GovernmentHeader } from "@/shared/components/home/GovernmentHeader.com";
import { ServicesListView } from "@/modules/client/services/components/view";

export default function ServicesPage() {
    const breadcrumbItems = [
        { label: "Trang chủ", href: "/" },
        { label: "Thủ tục hành chính" }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <GovernmentHeader breadcrumbItems={breadcrumbItems} />

            <div className="container mx-auto px-4 py-8">
                <ServicesListView />
            </div>
        </div>
    );
}
