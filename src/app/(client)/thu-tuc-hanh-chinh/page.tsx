"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ServicesListView } from "@/modules/client/services/components/view";
import type { ServiceFilters } from "@/modules/client/services/types/req";

const parseBooleanParam = (value: string | null): boolean | null => {
    if (value === null || value === "") return null;
    if (value === "true") return true;
    if (value === "false") return false;
    return null;
};

export default function ServicesPage() {
    const searchParams = useSearchParams();

    const initialFilters = useMemo<Partial<ServiceFilters>>(() => {
        return {
            keyword: searchParams.get("keyword") ?? "",
            serviceType: searchParams.get("serviceType") ?? "",
            field: searchParams.get("field") ?? "",
            executionLevel: searchParams.get("executionLevel") ?? "",
            onlineAvailable: parseBooleanParam(searchParams.get("onlineAvailable")),
            isActive: parseBooleanParam(searchParams.get("isActive")),
            page: Number(searchParams.get("page") ?? 1),
        };
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <ServicesListView initialFilters={initialFilters} />
            </div>
        </div>
    );
}
