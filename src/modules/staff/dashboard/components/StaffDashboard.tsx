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
import { Search, Filter, Users, Clock, CheckCircle, AlertCircle, Phone, PhoneOff, UserCheck } from "lucide-react";

export function StaffDashboard() {
    const {
        waitingList,
        stats,
        waitingListFilters,
        isLoadingWaitingList,
        setWaitingList,
        setWaitingListFilters,
        setLoadingWaitingList,
    } = useStaffDashboardStore();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedServiceType, setSelectedServiceType] = useState("");
    const [selectedCitizenId, setSelectedCitizenId] = useState<string | null>(null);
    const [showCitizenDocumentsModal, setShowCitizenDocumentsModal] = useState(false);

    // Queue management states
    const [currentServing, setCurrentServing] = useState<{
        id: string;
        number: string;
        fullName: string;
        serviceType: string;
        status: 'waiting' | 'serving' | 'completed';
    } | null>(null);
    const [nextNumber, setNextNumber] = useState<string | null>(null);
    const [isCallingNext, setIsCallingNext] = useState(false);

    const loadDashboardData = useCallback(async () => {
        setLoadingWaitingList(true);
        try {
            // In real app, these would be API calls
            // For now, using mock data
            setWaitingList(getMockWaitingList());

            // Generate next number for demo
            generateNextNumber();
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setLoadingWaitingList(false);
        }
    }, [setWaitingList, setLoadingWaitingList]);

    // Generate next number for demo purposes
    const generateNextNumber = () => {
        // Use mock data to generate next number
        const mockList = getMockWaitingList();
        const currentNumbers = mockList.map(c => parseInt(c.queueNumber.replace('A', '')));
        const maxNumber = Math.max(...currentNumbers, 0);
        setNextNumber(`A${String(maxNumber + 1).padStart(3, '0')}`);
    };

    // Call next number
    const callNextNumber = async () => {
        if (!nextNumber || waitingList.length === 0) {
            alert('Không có số nào trong hàng đợi!');
            return;
        }

        setIsCallingNext(true);

        try {
            // Find next citizen to serve - get fresh data
            const currentList = getMockWaitingList();
            const nextCitizen = currentList.find(c => c.status === 'waiting') || currentList[0];

            if (nextCitizen) {
                // Set as current serving
                setCurrentServing({
                    id: nextCitizen.id,
                    number: nextCitizen.queueNumber,
                    fullName: nextCitizen.fullName,
                    serviceType: getServiceTypeName(nextCitizen.serviceId),
                    status: 'serving'
                });

                // Update citizen status in list
                const updatedList = currentList.map(c =>
                    c.id === nextCitizen.id
                        ? { ...c, status: 'processing' as const }
                        : c
                );
                setWaitingList(updatedList);

                // Generate new next number
                generateNextNumber();

                // In real app, this would call API to update queue status
                alert(`Đã gọi số ${nextCitizen.queueNumber} - ${nextCitizen.fullName}`);
            }
        } catch (error) {
            console.error('Error calling next number:', error);
            alert('Có lỗi xảy ra khi gọi số tiếp theo');
        } finally {
            setIsCallingNext(false);
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
                            <Button variant="outline" size="sm">
                                <Filter className="w-4 h-4 mr-2" />
                                Lọc nâng cao
                            </Button>
                        </div>
                    </div>

                    {/* Current Serving & Call Next Number */}
                    <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                                {/* Current Serving Display */}
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <UserCheck className="w-5 h-5 text-blue-600" />
                                        <span className="text-sm font-medium text-gray-700">Đang phục vụ:</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        {currentServing ? (
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${currentServing.status === 'completed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-blue-100 text-blue-800'
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

                                {/* Next Number Display */}
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-gray-700">Số tiếp theo:</span>
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-600">
                                        {nextNumber || '--'}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-3">
                                <Button
                                    onClick={callNextNumber}
                                    disabled={isCallingNext || !nextNumber}
                                    className="bg-green-600 hover:bg-green-700"
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
                                        className="border-green-600 text-green-600 hover:bg-green-50"
                                    >
                                        <PhoneOff className="w-4 h-4 mr-2" />
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
                                    <p className="text-sm font-medium text-gray-600">Đang chờ</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stats?.totalWaiting || 0}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-4">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Clock className="w-6 h-6 text-blue-600" />
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-sm font-medium text-blue-600">
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
        </div>
    );

    // Citizen Documents Modal
    if (showCitizenDocumentsModal && selectedCitizenId) {
        return (
            <CitizenDocumentsModal
                citizenId={selectedCitizenId!}
                onClose={() => {
                    setShowCitizenDocumentsModal(false);
                    setSelectedCitizenId(null);
                }}
            />
        );
    }

    return null;
}
