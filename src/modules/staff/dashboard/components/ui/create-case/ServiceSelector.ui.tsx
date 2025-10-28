"use client";

import React from "react";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/ui/input.ui";
import { Search, FileText, Check } from "lucide-react";
import type { Service } from "../../../types";

interface ServiceSelectorProps {
    searchKeyword: string;
    isSearching: boolean;
    searchResults: Service[];
    selectedService: Service | null;
    showDropdown: boolean;
    onSearchKeywordChange: (keyword: string) => void;
    onSearch: () => void;
    onSelectService: (service: Service) => void;
}

export function ServiceSelector({
    searchKeyword,
    isSearching,
    searchResults,
    selectedService,
    showDropdown,
    onSearchKeywordChange,
    onSearch,
    onSelectService,
}: ServiceSelectorProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Tìm kiếm dịch vụ <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Input
                        value={searchKeyword}
                        onChange={(e) => onSearchKeywordChange(e.target.value)}
                        placeholder="Nhập tên hoặc mã dịch vụ (để trống để xem tất cả)..."
                        disabled={isSearching}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                onSearch();
                            }
                        }}
                    />
                </div>
                <Button
                    type="button"
                    onClick={onSearch}
                    disabled={isSearching}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    <Search className="w-4 h-4 mr-2" />
                    {isSearching ? "Đang tìm..." : "Tìm kiếm"}
                </Button>
            </div>

            {/* Search Results Dropdown */}
            {showDropdown && searchResults.length > 0 && (
                <div className="mt-2 border border-gray-300 rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto">
                    {searchResults.map((service) => (
                        <button
                            key={service.id}
                            type="button"
                            onClick={() => onSelectService(service)}
                            className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-0 transition-colors"
                        >
                            <div className="font-medium text-gray-900">{service.serviceName}</div>
                            <div className="text-sm text-gray-600">Mã dịch vụ: {service.serviceCode}</div>
                            <div className="text-xs text-gray-500 mt-1">
                                Loại: {service.serviceType} • Phí: {service.feeAmount?.toLocaleString('vi-VN') ?? '0'}đ
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Selected Service Display */}
            {selectedService && (
                <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-green-900">
                                Đã chọn: {selectedService.serviceName}
                            </p>
                            <p className="text-xs text-green-700 mt-1">
                                Mã: {selectedService.serviceCode} • Service ID: {selectedService.id}
                            </p>
                            <p className="text-xs text-green-700">
                                Phí: {selectedService.feeAmount?.toLocaleString('vi-VN') ?? '0'}đ • Thời gian xử lý: {selectedService.processingTime}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}