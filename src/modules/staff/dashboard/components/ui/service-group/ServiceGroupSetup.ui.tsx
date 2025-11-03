"use client";

import React from "react";
import { Card } from "@/shared/components/ui/card.ui";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/ui/input.ui";
import { Search, CheckCircle, AlertCircle } from "lucide-react";
import type { ServiceGroup, QueueStatus } from "../../../types";

interface ServiceGroupSetupProps {
    show: boolean;
    serviceGroups: ServiceGroup[];
    isLoadingServiceGroups: boolean;
    selectedServiceGroup: ServiceGroup | null;
    searchInput: string;
    searchKeyword: string;
    queueStatus: QueueStatus | null;
    onClose: () => void;
    onSearchInputChange: (value: string) => void;
    onSearch: () => void;
    onClearSearch: () => void;
    onSearchKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onSelectGroup: (group: ServiceGroup) => void;
}

export function ServiceGroupSetup({
    show,
    serviceGroups,
    isLoadingServiceGroups,
    selectedServiceGroup,
    searchInput,
    searchKeyword,
    queueStatus,
    onClose,
    onSearchInputChange,
    onSearch,
    onClearSearch,
    onSearchKeyPress,
    onSelectGroup,
}: ServiceGroupSetupProps) {
    if (!show) return null;

    return (
        <Card className="p-6 bg-white border-2 border-blue-200 shadow-lg">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">
                        Chọn Nhóm Dịch Vụ
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        {serviceGroups.length} nhóm dịch vụ có sẵn
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            {/* Search Box */}
            <div className="mb-4">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Nhập tên hoặc mã nhóm dịch vụ..."
                            value={searchInput}
                            onChange={(e) => onSearchInputChange(e.target.value)}
                            onKeyPress={onSearchKeyPress}
                            className="pl-10 pr-4 py-3 w-full text-base border-2 border-gray-300 focus:border-blue-500 rounded-lg"
                            disabled={isLoadingServiceGroups}
                        />
                    </div>
                    <Button
                        onClick={onSearch}
                        disabled={isLoadingServiceGroups}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        <Search className="w-5 h-5 mr-2" />
                        Tìm kiếm
                    </Button>
                    {searchKeyword && (
                        <Button
                            onClick={onClearSearch}
                            disabled={isLoadingServiceGroups}
                            variant="outline"
                            className="px-4 py-3 border-gray-300"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Button>
                    )}
                </div>
                {searchKeyword && (
                    <div className="mt-2 flex items-center gap-2">
                        <p className="text-sm text-gray-600">
                            Kết quả tìm kiếm cho: <span className="font-semibold text-gray-900">&ldquo;{searchKeyword}&rdquo;</span>
                        </p>
                        <span className="text-sm text-gray-500">• {serviceGroups.length} kết quả</span>
                    </div>
                )}
            </div>
            
            {/* Service Group Selection */}
            <div className="space-y-3">
                {isLoadingServiceGroups ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3"></div>
                        <p className="text-sm font-medium text-gray-900">Đang tải nhóm dịch vụ...</p>
                        <p className="text-xs text-gray-500 mt-1">Vui lòng đợi</p>
                    </div>
                ) : serviceGroups.length === 0 ? (
                    <div className="p-12 text-center">
                        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm font-medium text-gray-900">
                            {searchKeyword ? 'Không tìm thấy kết quả' : 'Không có nhóm dịch vụ nào'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {searchKeyword ? 'Thử tìm kiếm với từ khóa khác' : 'Vui lòng liên hệ quản trị viên'}
                        </p>
                        {searchKeyword && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={onClearSearch}
                                className="mt-4"
                            >
                                Xóa bộ lọc
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3 max-h-[500px] overflow-y-auto pr-2">
                        {serviceGroups.map((group) => (
                            <button
                                key={group.id}
                                onClick={() => onSelectGroup(group)}
                                className={`p-4 text-left border-2 rounded-lg transition-all hover:border-blue-500 hover:shadow-md ${
                                    selectedServiceGroup?.id === group.id
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 bg-white'
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded">
                                                {group.groupCode}
                                            </span>
                                            <h4 className="font-semibold text-gray-900">
                                                {group.groupName}
                                            </h4>
                                        </div>
                                        {group.description && (
                                            <p className="text-sm text-gray-600 mt-1">
                                                {group.description}
                                            </p>
                                        )}
                                    </div>
                                    {selectedServiceGroup?.id === group.id && (
                                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 ml-2" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {selectedServiceGroup && (
                <div className="mt-4 p-4 bg-white rounded-lg border-2 border-indigo-200">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                ✓ Đã chọn: {selectedServiceGroup.groupName}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                                Mã: {selectedServiceGroup.groupCode} • ID: {selectedServiceGroup.id.substring(0, 8)}...
                            </p>
                            {queueStatus && (
                                <p className="text-xs text-gray-600 mt-1">
                                    Hàng đợi: <strong>{queueStatus.queueName}</strong> • {queueStatus.messageCount} ticket đang chờ
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
}

