"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/shared/components/ui/card.ui";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/ui/input.ui";
import { Container } from "@shared/components/layout/Container";
import { staffDashboardService } from "../services/staff-dashboard.service";
import { getMockHistory, SERVICE_TYPES } from "../consts";
import type { CitizenProfile } from "../types";
import { Search, Filter, Calendar, Download, Eye } from "lucide-react";

export function HistoryPage() {
    const [history, setHistory] = useState<CitizenProfile[]>([]);
    const [filteredHistory, setFilteredHistory] = useState<CitizenProfile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedServiceType, setSelectedServiceType] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const applyFilters = useCallback(() => {
        let filtered = [...history];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(c =>
                c.fullName.toLowerCase().includes(query) ||
                c.queueNumber.toLowerCase().includes(query) ||
                c.phoneNumber.includes(query)
            );
        }

        // Service type filter
        if (selectedServiceType) {
            filtered = filtered.filter(c => c.serviceId === selectedServiceType);
        }

        // Date range filter
        if (dateFrom) {
            const fromDate = new Date(dateFrom);
            filtered = filtered.filter(c =>
                c.completedAt && new Date(c.completedAt) >= fromDate
            );
        }

        if (dateTo) {
            const toDate = new Date(dateTo);
            toDate.setHours(23, 59, 59, 999); // End of day
            filtered = filtered.filter(c =>
                c.completedAt && new Date(c.completedAt) <= toDate
            );
        }

        setFilteredHistory(filtered);
    }, [history, searchQuery, selectedServiceType, dateFrom, dateTo]);

    useEffect(() => {
        loadHistory();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    const loadHistory = async () => {
        setIsLoading(true);
        try {
            // In real app, this would be API call
            const historyData = getMockHistory();
            setHistory(historyData);
            setFilteredHistory(historyData);
        } catch (error) {
            console.error("Error loading history:", error);
        } finally {
            setIsLoading(false);
        }
    };


    const clearFilters = () => {
        setSearchQuery("");
        setSelectedServiceType("");
        setDateFrom("");
        setDateTo("");
    };

    const getServiceTypeName = (serviceId: string) => {
        const service = SERVICE_TYPES.find(s => s.id === serviceId);
        return service?.name || serviceId;
    };


    const exportToCSV = () => {
        const csvData = filteredHistory.map(c => ({
            'Số thứ tự': c.queueNumber,
            'Họ tên': c.fullName,
            'Số điện thoại': c.phoneNumber,
            'Loại dịch vụ': getServiceTypeName(c.serviceId),
            'Thời gian yêu cầu': new Date(c.requestedAt).toLocaleString('vi-VN'),
            'Thời gian bắt đầu': c.startedServingAt ? new Date(c.startedServingAt).toLocaleString('vi-VN') : '',
            'Thời gian hoàn thành': c.completedAt ? new Date(c.completedAt).toLocaleString('vi-VN') : '',
            'Trạng thái': staffDashboardService.getStatusText(c.status),
            'Đánh giá': c.feedback?.rating || '',
            'Nhận xét': c.feedback?.comment || ''
        }));

        const csvContent = [
            Object.keys(csvData[0]).join(','),
            ...csvData.map(row => Object.values(row)?.map(value =>
                `"${String(value).replace(/"/g, '""')}"`
            ).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `lich_su_ho_so_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const formatDuration = (startedAt: string, completedAt: string) => {
        const start = new Date(startedAt);
        const end = new Date(completedAt);
        const durationMs = end.getTime() - start.getTime();
        const minutes = Math.floor(durationMs / (1000 * 60));
        const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

        if (minutes > 0) {
            return `${minutes} phút ${seconds} giây`;
        }
        return `${seconds} giây`;
    };

    return (
        <Container className="py-6">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Lịch sử hồ sơ đã xử lý
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Danh sách các hồ sơ đã hoàn thành
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={exportToCSV}
                            variant="outline"
                            size="sm"
                            disabled={filteredHistory.length === 0}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Xuất CSV
                        </Button>
                        <Button
                            onClick={() => setShowFilters(!showFilters)}
                            variant="outline"
                            size="sm"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            {showFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                {showFilters && (
                    <Card className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tìm kiếm
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Tên, số thứ tự, điện thoại..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Loại dịch vụ
                                </label>
                                <select
                                    value={selectedServiceType}
                                    onChange={(e) => setSelectedServiceType(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Tất cả</option>
                                    {SERVICE_TYPES.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Từ ngày
                                </label>
                                <Input
                                    type="date"
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Đến ngày
                                </label>
                                <Input
                                    type="date"
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button
                                onClick={clearFilters}
                                variant="outline"
                                size="sm"
                            >
                                Xóa bộ lọc
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Results Summary */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                        Hiển thị {filteredHistory.length} trên tổng số {history.length} hồ sơ
                    </span>
                    {filteredHistory.length > 0 && (
                        <span>
                            Thời gian trung bình: {
                                Math.round(
                                    filteredHistory
                                        .filter(c => c.startedServingAt && c.completedAt)
                                        .reduce((acc, c) => {
                                            const duration = new Date(c.completedAt!).getTime() - new Date(c.startedServingAt!).getTime();
                                            return acc + duration;
                                        }, 0) / filteredHistory.filter(c => c.startedServingAt && c.completedAt).length / (1000 * 60)
                                )
                            } phút
                        </span>
                    )}
                </div>

                {/* History List */}
                <Card className="p-6">
                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="h-20 bg-gray-200 rounded-lg"></div>
                                </div>
                            ))}
                        </div>
                    ) : filteredHistory.length === 0 ? (
                        <div className="text-center py-12">
                            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Không tìm thấy hồ sơ nào
                            </h3>
                            <p className="text-gray-500">
                                {history.length === 0
                                    ? "Chưa có hồ sơ nào được hoàn thành."
                                    : "Không có hồ sơ nào khớp với bộ lọc hiện tại."
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredHistory.map((citizen) => (
                                <div
                                    key={citizen.id}
                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium text-green-600">
                                                    ✓
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">
                                                {citizen.fullName}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {getServiceTypeName(citizen.serviceId)} • {citizen.queueNumber}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {citizen.phoneNumber} • Hoàn thành: {
                                                    citizen.completedAt
                                                        ? new Date(citizen.completedAt).toLocaleDateString('vi-VN')
                                                        : 'N/A'
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                            {citizen.feedback && (
                                                <div className="flex items-center space-x-1 mb-1">
                                                    <span className="text-xs text-gray-500">Đánh giá:</span>
                                                    {[...Array(5)].map((_, i) => (
                                                        <span
                                                            key={i}
                                                            className={`text-xs ${
                                                                i < citizen.feedback!.rating
                                                                    ? 'text-yellow-400'
                                                                    : 'text-gray-300'
                                                            }`}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            {citizen.startedServingAt && citizen.completedAt && (
                                                <p className="text-xs text-gray-500">
                                                    Thời gian xử lý: {formatDuration(citizen.startedServingAt, citizen.completedAt)}
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-500">
                                                {new Date(citizen.requestedAt).toLocaleTimeString('vi-VN')}
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => alert('Tính năng xem chi tiết sẽ được triển khai sau')}
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </Container>
    );
}
