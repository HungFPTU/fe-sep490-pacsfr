"use client";

import { useParams } from "next/navigation";
import { ServiceDetailView } from "@/modules/client/services/components/view";

export default function ServiceDetailPage() {
    const params = useParams();
    const serviceId = params?.id as string;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <ServiceDetailView serviceId={serviceId} />
            </div>
        </div>
    );
}
