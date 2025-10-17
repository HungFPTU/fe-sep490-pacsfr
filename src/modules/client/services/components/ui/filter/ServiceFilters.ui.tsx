"use client";

import { useState } from "react";
import { Input, Button } from "@heroui/react";
import type { ServiceFilters as ServiceFiltersType } from "@/modules/client/services/types";

interface ServiceFiltersProps {
    filters: ServiceFiltersType;
    onFiltersChange: (filters: ServiceFiltersType) => void;
    onReset: () => void;
    className?: string;
}

export const ServiceFilters: React.FC<ServiceFiltersProps> = ({
    filters,
    onFiltersChange,
    onReset,
    className = "",
}) => {
    const [searchKeyword, setSearchKeyword] = useState(filters.keyword);

    const handleSearch = () => {
        onFiltersChange({
            ...filters,
            keyword: searchKeyword,
            page: 1,
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className={`w-full ${className}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex gap-3">
                    <Input
                        placeholder="Nhập từ khoá tìm kiếm"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                        size="lg"
                        startContent={
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        }
                        classNames={{
                            input: "text-base",
                            inputWrapper: "border-gray-300 hover:border-red-400 focus-within:border-red-500"
                        }}
                    />
                    <Button
                        color="primary"
                        size="lg"
                        onClick={handleSearch}
                        className="px-8 bg-red-600 hover:bg-red-700"
                        startContent={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        }
                    >
                        Tìm kiếm
                    </Button>
                    <Button
                        variant="light"
                        size="lg"
                        onClick={onReset}
                        className="px-6 text-gray-600 hover:text-gray-800"
                    >
                        Xóa
                    </Button>
                </div>
            </div>
        </div>
    );
};