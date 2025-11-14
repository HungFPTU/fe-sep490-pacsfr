"use client";

import { ServicesListView } from "@/modules/client/services/components/view";

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <ServicesListView />
            </div>
        </div>
    );
}
