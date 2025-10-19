"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Card } from "@/shared/components/ui/card.ui";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/ui/input.ui";
import { useStaffDashboardStore } from "../stores/useStaffDashboardStore";
import { staffDashboardService } from "../services/staff-dashboard.service";
import {
    getMockWaitingList,
    SERVICE_TYPES
} from "../consts";
import type { CitizenProfile, WaitingListFilters } from "../types";
// import { NotificationPanel } from "./NotificationPanel";
import { CitizenDocumentsModal } from "./CitizenDocumentsModal";
import { CreateCaseModal } from "./CreateCaseModal";
import { Search, Filter, Users, Clock, CheckCircle, AlertCircle, Phone, UserCheck, Settings, Plus } from "lucide-react";

export function StaffDashboard() {
    const {
        waitingList,
        stats,
        waitingListFilters,
        isLoadingWaitingList,
        queueId,
        queueStatus,
        isLoadingQueueStatus,
        isCallingNext,
        setWaitingList,
        setWaitingListFilters,
        setLoadingWaitingList,
        setQueueId,
        setQueueStatus,
        setLoadingQueueStatus,
        setCallingNext,
    } = useStaffDashboardStore();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedServiceType, setSelectedServiceType] = useState("");
    const [selectedCitizenId, setSelectedCitizenId] = useState<string | null>(null);
    const [showCitizenDocumentsModal, setShowCitizenDocumentsModal] = useState(false);
    const [showQueueSetup, setShowQueueSetup] = useState(!queueId);
    const [queueIdInput, setQueueIdInput] = useState(queueId || "");
    const [showCreateCaseModal, setShowCreateCaseModal] = useState(false);

    // Queue management states
    const [currentServing, setCurrentServing] = useState<{
        id: string;
        number: string;
        fullName: string;
        serviceType: string;
        status: 'waiting' | 'serving' | 'completed';
    } | null>(null);

    // Load queue status
    const loadQueueStatus = useCallback(async () => {
        if (!queueId) return;
        
        setLoadingQueueStatus(true);
        try {
            const status = await staffDashboardService.getQueueStatus(queueId);
            setQueueStatus(status);
        } catch (error) {
            console.error("Error loading queue status:", error);
        } finally {
            setLoadingQueueStatus(false);
        }
    }, [queueId, setQueueStatus, setLoadingQueueStatus]);

    const loadDashboardData = useCallback(async () => {
        setLoadingWaitingList(true);
        try {
            // In real app, these would be API calls
            // For now, using mock data
            setWaitingList(getMockWaitingList());
            
            // Load queue status if queueId is set
            if (queueId) {
                await loadQueueStatus();
            }
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setLoadingWaitingList(false);
        }
    }, [queueId, loadQueueStatus, setWaitingList, setLoadingWaitingList]);

    // Call next number - using real API
    const callNextNumber = async () => {
        if (!queueId) {
            alert('Vui lòng cấu hình Queue ID trước!');
            return;
        }

        setCallingNext(true);

        try {
            const response = await staffDashboardService.callNext(queueId);
            
            if (response.success && response.data) {
                // Update current serving with API data
                setCurrentServing({
                    id: response.data.ticketNumber || '',
                    number: response.data.ticketNumber || '',
                    fullName: response.data.citizenName || 'Chưa có thông tin',
                    serviceType: response.data.serviceType || 'Dịch vụ',
                    status: 'serving'
                });

                alert(`Đã gọi số ${response.data.ticketNumber}`);
                
                // Reload queue status and dashboard data
                await loadQueueStatus();
                await loadDashboardData();
            } else {
                throw new Error(response.message || 'Failed to call next');
            }
        } catch (error) {
            console.error('Error calling next number:', error);
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('Có lỗi xảy ra khi gọi số tiếp theo');
            }
        } finally {
            setCallingNext(false);
        }
    };

    // Complete current serving
    const completeCurrentServing = async () => {
        if (!currentServing) return;

        try {
            // Update current serving status
            setCurrentServing(prev => prev ? { ...prev, status: 'completed' } : null);

            // Update in waiting list
            const currentList = getMockWaitingList();
            const updatedList = currentList.map(c =>
                c.id === currentServing.id
                    ? { ...c, status: 'completed' as const }
                    : c
            );
            setWaitingList(updatedList);

            // Clear current serving after a delay
            setTimeout(() => {
                setCurrentServing(null);
            }, 2000);

            alert(`Đã hoàn thành phục vụ số ${currentServing.number}`);
        } catch (error) {
            console.error('Error completing current serving:', error);
            alert('Có lỗi xảy ra khi hoàn thành phục vụ');
        }
    };

    // Load initial data
    useEffect(() => {
        loadDashboardData();
    }, [loadDashboardData]);

    // Auto-refresh queue status every 10 seconds
    useEffect(() => {
        if (!queueId) return;
        
        const interval = setInterval(() => {
            loadQueueStatus();
        }, 10000); // 10 seconds

        return () => clearInterval(interval);
    }, [queueId, loadQueueStatus]);

    // Handle queue setup
    const handleQueueSetup = () => {
        if (!queueIdInput.trim()) {
            alert('Vui lòng nhập Queue ID');
            return;
        }
        setQueueId(queueIdInput.trim());
        setShowQueueSetup(false);
        // Reload dashboard with new queueId
        loadDashboardData();
    };


    // Handle search and filters
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filters: WaitingListFilters = {
            ...waitingListFilters,
            searchQuery: query || undefined,
        };
        setWaitingListFilters(filters);

        // Apply filters to mock data
        const filtered = getMockWaitingList(filters);
        setWaitingList(filtered);
    };

    const handleServiceTypeFilter = (serviceType: string) => {
        setSelectedServiceType(serviceType);
        const filters: WaitingListFilters = {
            ...waitingListFilters,
            serviceType: serviceType || undefined,
        };
        setWaitingListFilters(filters);

        // Apply filters to mock data
        const filtered = getMockWaitingList(filters);
        setWaitingList(filtered);
    };

    const handleViewCitizen = (citizenId: string) => {
        setSelectedCitizenId(citizenId);
        setShowCitizenDocumentsModal(true);
    };

    const getServiceTypeName = (serviceId: string) => {
        const service = SERVICE_TYPES.find(s => s.id === serviceId);
        return service?.name || serviceId;
    };

    const getStatusBadge = (status: CitizenProfile['status']) => {
        const colorClass = staffDashboardService.getStatusColor(status);
        const text = staffDashboardService.getStatusText(status);

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
                {text}
            </span>
        );
    };

    return (
        <div className="bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Bảng điều khiển Nhân viên
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Quản lý hàng đợi và hồ sơ công dân
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* <NotificationPanel notifications={notifications} /> */}
                            <Button 
                                onClick={() => setShowCreateCaseModal(true)}
                                className="bg-green-600 hover:bg-green-700"
                                size="sm"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Tạo hồ sơ mới
                            </Button>
                            <Button variant="outline" size="sm">
                                <Filter className="w-4 h-4 mr-2" />
                                Lọc nâng cao
                            </Button>
                        </div>
                    </div>

                    {/* Queue Configuration Banner */}
                    {!queueId && (
                        <Card className="p-4 bg-yellow-50 border-yellow-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                                    <div>
                                        <p className="font-medium text-gray-900">Chưa cấu hình Queue</p>
                                        <p className="text-sm text-gray-600">Vui lòng cấu hình Queue ID để bắt đầu quản lý hàng đợi</p>
                                    </div>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setShowQueueSetup(true)}
                                    className="border-yellow-600 text-yellow-700 hover:bg-yellow-100"
                                >
                                    <Settings className="w-4 h-4 mr-2" />
                                    Cấu hình ngay
                                </Button>
                            </div>
                        </Card>
                    )}

                    {/* Queue Setup Modal/Panel */}
                    {showQueueSetup && (
                        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Cấu hình Queue ID
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Nhập Queue ID từ hệ thống để quản lý hàng đợi của quầy
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowQueueSetup(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex gap-3">
                                <Input
                                    placeholder="VD: 760de1fc-028a-46bb-92ef-b9e42f7e11bb"
                                    value={queueIdInput}
                                    onChange={(e) => setQueueIdInput(e.target.value)}
                                    className="flex-1"
                                />
                                <Button 
                                    onClick={handleQueueSetup}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    <Settings className="w-4 h-4 mr-2" />
                                    Lưu Queue ID
                                </Button>
                            </div>
                            {queueId && (
                                <div className="mt-3 p-3 bg-white rounded-lg border border-blue-200">
                                    <p className="text-sm text-gray-600">
                                        Queue hiện tại: <strong className="text-gray-900">{queueId}</strong>
                                    </p>
                                    {queueStatus && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            Tên queue: <strong className="text-gray-900">{queueStatus.queueName}</strong>
                                        </p>
                                    )}
                                </div>
                            )}
                        </Card>
                    )}

                    {/* Current Serving & Call Next Number */}
                    <Card className="p-6 bg-gradient-to-r from-red-50 to-rose-50 border-red-200">
                        {/* Queue Info Header */}
                        {queueId && queueStatus && (
                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-red-200">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                                            {isLoadingQueueStatus ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                                            ) : (
                                                <Users className="w-5 h-5 text-red-600" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Hàng đợi</p>
                                            <p className="font-semibold text-gray-900">{queueStatus.queueName}</p>
                                        </div>
                                    </div>
                                    <div className="h-8 w-px bg-red-200"></div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-red-600" />
                                        <span className="text-sm text-gray-700">
                                            <strong className="text-red-600">{queueStatus.messageCount}</strong> ticket đang chờ
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowQueueSetup(true)}
                                    className="border-red-300 text-red-700 hover:bg-red-100"
                                >
                                    <Settings className="w-4 h-4 mr-2" />
                                    Đổi Queue
                                </Button>
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                                {/* Current Serving Display */}
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <UserCheck className="w-5 h-5 text-red-600" />
                                        <span className="text-sm font-medium text-gray-700">Đang phục vụ:</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        {currentServing ? (
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${currentServing.status === 'completed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {currentServing.number}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {currentServing.fullName}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {currentServing.serviceType}
                                                    </div>
                                                </div>
                                                {currentServing.status === 'completed' && (
                                                    <div className="flex items-center text-green-600">
                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                        <span className="text-sm">Hoàn thành</span>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-gray-500 text-sm">
                                                Chưa có số nào đang phục vụ
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Next Number Display - Hidden when no queue configured */}
                                {queueId && queueStatus && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-700">Số đang chờ:</span>
                                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-600">
                                            {queueStatus.messageCount}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-3">
                                <Button
                                    onClick={callNextNumber}
                                    disabled={isCallingNext || !queueId || (queueStatus?.messageCount === 0)}
                                    className="bg-red-600 hover:bg-red-700"
                                    title={!queueId ? 'Vui lòng cấu hình Queue ID trước' : (queueStatus?.messageCount === 0 ? 'Không có ticket trong hàng đợi' : '')}
                                >
                                    {isCallingNext ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Đang gọi...
                                        </>
                                    ) : (
                                        <>
                                            <Phone className="w-4 h-4 mr-2" />
                                            Gọi số tiếp theo
                                        </>
                                    )}
                                </Button>

                                {currentServing && currentServing.status !== 'completed' && (
                                    <Button
                                        onClick={completeCurrentServing}
                                        variant="outline"
                                        className="border-red-600 text-red-600 hover:bg-red-50"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Hoàn thành
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="p-4">
                            <div className="flex items-center">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <Users className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Đang chờ (Queue)</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {queueStatus?.messageCount ?? (stats?.totalWaiting || 0)}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-4">
                            <div className="flex items-center">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <Clock className="w-6 h-6 text-red-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Đang xử lý</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stats?.totalProcessing || 0}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-4">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Hoàn thành hôm nay</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stats?.totalCompletedToday || 0}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-4">
                            <div className="flex items-center">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <AlertCircle className="w-6 h-6 text-orange-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Thời gian chờ TB</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stats?.averageWaitTime || 0} phút
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Search and Filters */}
                    <Card className="p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Tìm kiếm theo tên, số thứ tự, hoặc số điện thoại..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="sm:w-64">
                                <select
                                    value={selectedServiceType}
                                    onChange={(e) => handleServiceTypeFilter(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="">Tất cả loại dịch vụ</option>
                                    {SERVICE_TYPES.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </Card>

                    {/* Waiting List */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Danh sách công dân đang chờ
                            </h2>
                            <Button
                                onClick={loadDashboardData}
                                disabled={isLoadingWaitingList}
                                variant="outline"
                                size="sm"
                            >
                                {isLoadingWaitingList ? "Đang tải..." : "Làm mới"}
                            </Button>
                        </div>

                        {isLoadingWaitingList ? (
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="h-20 bg-gray-200 rounded-lg"></div>
                                    </div>
                                ))}
                            </div>
                        ) : waitingList.length === 0 ? (
                            <div className="text-center py-12">
                                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Không có công dân nào đang chờ
                                </h3>
                                <p className="text-gray-500">
                                    Hiện tại không có công dân nào trong hàng đợi.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {waitingList.map((citizen) => (
                                    <div
                                        key={citizen.id}
                                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                                    <span className="text-sm font-medium text-red-600">
                                                        {citizen.queueNumber}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900">
                                                    {citizen.fullName}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {getServiceTypeName(citizen.serviceId)}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {citizen.phoneNumber}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                {getStatusBadge(citizen.status)}
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(citizen.requestedAt).toLocaleTimeString('vi-VN')}
                                                </p>
                                            </div>
                                            <Button
                                                onClick={() => handleViewCitizen(citizen.id)}
                                                size="sm"
                                                variant="outline"
                                            >
                                                Xem hồ sơ
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>

            </div>

            {/* Modals */}
            {showCitizenDocumentsModal && selectedCitizenId && (
                <CitizenDocumentsModal
                    citizenId={selectedCitizenId}
                    onClose={() => {
                        setShowCitizenDocumentsModal(false);
                        setSelectedCitizenId(null);
                    }}
                />
            )}

            {showCreateCaseModal && (
                <CreateCaseModal
                    onClose={() => setShowCreateCaseModal(false)}
                    onSuccess={(caseId) => {
                        console.log("Case created with ID:", caseId);
                        // Reload dashboard data
                        loadDashboardData();
                    }}
                    defaultCreatedBy={queueId || undefined}
                />
            )}
        </div>
    );
}
