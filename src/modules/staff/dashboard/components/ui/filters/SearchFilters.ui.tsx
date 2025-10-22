"use client";

import React from "react";
import { Card } from "@/shared/components/ui/card.ui";
import { Input } from "@/shared/components/ui/input.ui";
import { Search } from "lucide-react";

interface ServiceType {
    id: string;
    name: string;
    code: string;
}

interface SearchFiltersProps {
    searchQuery: string;
    selectedServiceType: string;
    serviceTypes: ServiceType[];
    onSearchChange: (query: string) => void;
    onServiceTypeChange: (serviceType: string) => void;
}

export function SearchFilters({
    searchQuery,
    selectedServiceType,
    serviceTypes,
    onSearchChange,
    onServiceTypeChange,
}: SearchFiltersProps) {
    return (
        <Card className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Tìm kiếm theo tên, số thứ tự, hoặc số điện thoại..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>
                <div className="sm:w-64">
                    <select
                        value={selectedServiceType}
                        onChange={(e) => onServiceTypeChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="">Tất cả loại dịch vụ</option>
                        {serviceTypes.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </Card>
    );
}

