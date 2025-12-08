"use client";

import React from "react";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/ui/input.ui";
import { FileText, Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { Service, PaginatedData } from "../../../../dashboard/types";

interface ServiceListWithPaginationProps {
    searchKeyword: string;
    isSearching: boolean;
    serviceData: PaginatedData<Service> | null;
    selectedService: Service | null;
    currentPage: number;
    onSearchKeywordChange: (keyword: string) => void;
    onSelectService: (service: Service) => void;
    onPageChange: (page: number) => void;
}

export function ServiceListWithPagination({
    searchKeyword,
    isSearching,
    serviceData,
    selectedService,
    currentPage,
    onSearchKeywordChange,
    onSelectService,
    onPageChange,
}: ServiceListWithPaginationProps) {
    const services = serviceData?.items?.$values || [];
    const totalPages = serviceData?.totalPages || 1;
    const total = serviceData?.total || 0;
    const hasPreviousPage = serviceData?.hasPreviousPage || false;
    const hasNextPage = serviceData?.hasNextPage || false;

    const renderPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    type="button"
                    onClick={() => onPageChange(i)}
                    disabled={isSearching}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                        i === currentPage
                            ? "bg-blue-600 text-white"
                            : "border border-gray-300 hover:bg-gray-50"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-1" />
                Tìm kiếm dịch vụ <span className="text-red-500">*</span>
            </label>

            {/* Search Bar */}
            <div className="relative">
                <Input
                    value={searchKeyword}
                    onChange={(e) => onSearchKeywordChange(e.target.value)}
                    placeholder="Nhập tên hoặc mã dịch vụ..."
                />
                {isSearching && (
                    <div className="absolute right-3 top-3 pointer-events-none">
                        <div className="animate-spin h-5 w-5 text-indigo-600">⟳</div>
                    </div>
                )}
            </div>

            {/* Service List */}
            {serviceData && services.length > 0 && (
                <div className="mt-4 border border-gray-300 rounded-lg bg-white shadow-sm">
                    {/* Header */}
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-300">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-700">
                                Tìm thấy {total} dịch vụ
                            </p>
                            <p className="text-xs text-gray-500">
                                Trang {currentPage} / {totalPages}
                            </p>
                        </div>
                    </div>

                    {/* Service Items */}
                    <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                        {services.map((service) => {
                            const isSelected = selectedService?.id === service.id;
                            return (
                                <button
                                    key={service.id}
                                    type="button"
                                    onClick={() => onSelectService(service)}
                                    className={`w-full text-left px-4 py-3 transition-colors ${
                                        isSelected
                                            ? "bg-blue-50 hover:bg-blue-100"
                                            : "hover:bg-gray-50"
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        {isSelected && (
                                            <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                        )}
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">
                                                {service.serviceName}
                                            </div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                Mã dịch vụ: {service.serviceCode}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-3">
                                                <span>Loại: {service.serviceType}</span>
                                                {service.processingTime && (
                                                    <>
                                                        <span>•</span>
                                                        <span>Thời gian: {service.processingTime}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-4 py-3 bg-gray-50 border-t border-gray-300">
                            <div className="flex items-center justify-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onPageChange(currentPage - 1)}
                                    disabled={!hasPreviousPage || isSearching}
                                    className="flex items-center gap-1"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Trước
                                </Button>

                                <div className="flex items-center gap-1">
                                    {renderPageNumbers()}
                                </div>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onPageChange(currentPage + 1)}
                                    disabled={!hasNextPage || isSearching}
                                    className="flex items-center gap-1"
                                >
                                    Sau
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Empty State */}
            {serviceData && services.length === 0 && (
                <div className="mt-4 p-6 border border-gray-300 rounded-lg bg-gray-50 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Không tìm thấy dịch vụ nào</p>
                    <p className="text-xs text-gray-500 mt-1">
                        Thử thay đổi từ khóa tìm kiếm hoặc để trống để xem tất cả
                    </p>
                </div>
            )}
        </div>
    );
}

