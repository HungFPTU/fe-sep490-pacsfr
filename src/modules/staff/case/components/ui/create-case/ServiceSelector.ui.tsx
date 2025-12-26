"use client";

import React from "react";
import { FileText, Search, Check, Loader2, Clock, Banknote } from "lucide-react";
import type { Service } from "../../../../dashboard/types";

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
    const labelClass = "block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5";
    const inputClass = "flex-1 h-10 px-3 pl-10 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

    return (
        <div className="space-y-3">
            {/* Header */}
            <label className={labelClass}>
                <FileText className="w-3.5 h-3.5 inline mr-1" />
                Tìm kiếm dịch vụ <span className="text-red-500">*</span>
            </label>

            {/* Search Input */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => onSearchKeywordChange(e.target.value)}
                        placeholder="Nhập tên hoặc mã dịch vụ..."
                        disabled={isSearching}
                        className={inputClass}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                onSearch();
                            }
                        }}
                    />
                </div>
                <button
                    type="button"
                    onClick={onSearch}
                    disabled={isSearching}
                    className="inline-flex items-center gap-2 px-4 h-10 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    {isSearching ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Đang tìm...
                        </>
                    ) : (
                        <>
                            <Search className="w-4 h-4" />
                            Tìm kiếm
                        </>
                    )}
                </button>
            </div>

            {/* Selected Service Display */}
            {selectedService && (
                <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                        <Check className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-emerald-900">{selectedService.serviceName}</p>
                        <p className="text-xs text-emerald-700 mt-0.5">Mã: {selectedService.serviceCode}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-emerald-700">
                            <span className="flex items-center gap-1">
                                <Banknote className="w-3.5 h-3.5" />
                                {selectedService.feeAmount?.toLocaleString('vi-VN') ?? '0'}đ
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {selectedService.processingTime}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Results Dropdown */}
            {showDropdown && searchResults.length > 0 && (
                <div className="border border-gray-200 rounded-lg bg-white shadow-lg max-h-60 overflow-y-auto">
                    {searchResults.map((service) => (
                        <button
                            key={service.id}
                            type="button"
                            onClick={() => onSelectService(service)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5">
                                    <FileText className="w-4 h-4 text-indigo-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">{service.serviceName}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Mã: {service.serviceCode} • {service.serviceType}
                                    </p>
                                    <div className="flex gap-3 mt-1 text-xs text-gray-600">
                                        <span>{service.feeAmount?.toLocaleString('vi-VN') ?? '0'}đ</span>
                                        <span>{service.processingTime}</span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}