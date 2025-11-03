"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/button.ui";
import { useStaffDashboardStore } from "../../stores/useStaffDashboardStore";
import { staffDashboardService } from "../../services/staff-dashboard.service";
import { getMockWaitingList, SERVICE_TYPES } from "../../consts";
import type { CitizenProfile, ServiceGroup } from "../../types";
import { Filter, Plus } from "lucide-react";
import { useMinimumLoadingTime } from "@/shared/hooks";
import { useGlobalToast } from "@core/patterns/SingletonHook";

// UI Components
import {
    ServiceGroupStatus,
    ServiceGroupSetup,
    CurrentServingPanel,
    StatsCards,
    SearchFilters,
    WaitingList,
} from "../ui";
import { StaffDashboardTabsView } from "./StaffDashboardTabsView.view";

export function StaffDashboardView() {
    const router = useRouter();
    const { withMinimumLoadingTime } = useMinimumLoadingTime(1500); // 1.5 seconds minimum
    const { addToast } = useGlobalToast();
    
    const {
        waitingList,
        stats,
        waitingListFilters,
        isLoadingWaitingList,
        serviceGroupId,
        queueStatus,
        isLoadingQueueStatus,
        isCallingNext,
        setWaitingList,
        setWaitingListFilters,
        setLoadingWaitingList,
        setServiceGroupId,
        setQueueStatus,
        setLoadingQueueStatus,
        setCallingNext,
    } = useStaffDashboardStore();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedServiceType, setSelectedServiceType] = useState("");
    const [showQueueSetup, setShowQueueSetup] = useState(!serviceGroupId);
    
    // Service Group states
    const [serviceGroups, setServiceGroups] = useState<ServiceGroup[]>([]);
    const [isLoadingServiceGroups, setIsLoadingServiceGroups] = useState(false);
    const [selectedServiceGroup, setSelectedServiceGroup] = useState<ServiceGroup | null>(null);
    const [serviceGroupSearchInput, setServiceGroupSearchInput] = useState("");
    const [serviceGroupSearchKeyword, setServiceGroupSearchKeyword] = useState("");

    // Queue management states
    const [currentServing, setCurrentServing] = useState<{
        id: string;
        number: string;
        fullName: string;
        serviceType: string;
        status: 'waiting' | 'serving' | 'completed';
    } | null>(null);

    // Load service groups with optional keyword
    const loadServiceGroups = useCallback(async (keyword?: string) => {
        setIsLoadingServiceGroups(true);
        try {
            await withMinimumLoadingTime(async () => {
                const groups = await staffDashboardService.getServiceGroups({
                    keyword: keyword || undefined,
                    isActive: true,
                    page: 1,
                    size: 100
                });
                setServiceGroups(groups);
                
                // Auto-select if serviceGroupId exists (only on first load)
                if (!keyword && serviceGroupId) {
                    const found = groups.find((g: ServiceGroup) => g.id === serviceGroupId);
                    if (found) {
                        setSelectedServiceGroup(found);
                    }
                }
            });
        } catch (error) {
            console.error("Error loading service groups:", error);
            addToast({ message: "Lỗi khi tải danh sách nhóm dịch vụ. Vui lòng thử lại!", type: "info" });
        } finally {
            setIsLoadingServiceGroups(false);
        }
    }, [serviceGroupId, withMinimumLoadingTime, addToast]);

    // Handle search button click
    const handleSearchServiceGroups = () => {
        const keyword = serviceGroupSearchInput.trim();
        setServiceGroupSearchKeyword(keyword);
        loadServiceGroups(keyword);
    };

    // Handle clear search
    const handleClearSearch = () => {
        setServiceGroupSearchInput("");
        setServiceGroupSearchKeyword("");
        loadServiceGroups();
    };

    // Handle Enter key press
    const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchServiceGroups();
        }
    };

    // Load queue status
    const loadQueueStatus = useCallback(async () => {
        if (!serviceGroupId) return;
        
        setLoadingQueueStatus(true);
        try {
            await withMinimumLoadingTime(async () => {
                const status = await staffDashboardService.getQueueStatus(serviceGroupId);
                setQueueStatus(status);
            });
        } catch (error) {
            console.error("Error loading queue status:", error);
        } finally {
            setLoadingQueueStatus(false);
        }
    }, [serviceGroupId, setQueueStatus, setLoadingQueueStatus, withMinimumLoadingTime]);

    const loadDashboardData = useCallback(async () => {
        setLoadingWaitingList(true);
        try {
            await withMinimumLoadingTime(async () => {
                // In real app, these would be API calls
                // For now, using mock data
                setWaitingList(getMockWaitingList());
                
                // Load queue status if serviceGroupId is set
                if (serviceGroupId) {
                    await loadQueueStatus();
                }
            });
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setLoadingWaitingList(false);
        }
    }, [serviceGroupId, loadQueueStatus, setWaitingList, setLoadingWaitingList, withMinimumLoadingTime]);

    // Call next number - using real API
    const callNextNumber = async () => {
        if (!serviceGroupId) {
            addToast({ message: 'Vui lòng cấu hình Service Group ID trước!', type: 'info' });
            return;
        }

        setCallingNext(true);

        try {
            await withMinimumLoadingTime(async () => {
                const response = await staffDashboardService.callNext(serviceGroupId);
                
                if (response.success && response.data) {
                    // Update current serving with API data
                    setCurrentServing({
                        id: response.data.ticketNumber || '',
                        number: response.data.ticketNumber || '',
                        fullName: response.data.citizenName || 'Chưa có thông tin',
                        serviceType: response.data.serviceType || 'Dịch vụ',
                        status: 'serving'
                    });

                    const citizenName = response.data.citizenName || 'Chưa có thông tin';
                    addToast({ 
                        message: `Mời số ${response.data.ticketNumber} - ${citizenName} vào phục vụ`, 
                        type: 'info' 
                    });
                    
                    // Reload queue status and dashboard data
                    await loadQueueStatus();
                    await loadDashboardData();
                } else {
                    throw new Error(response.message || 'Failed to call next');
                }
            });
        } catch (error) {
            console.error('Error calling next number:', error);
            if (error instanceof Error) {
                addToast({ message: error.message, type: 'info' });
            } else {
                addToast({ message: 'Có lỗi xảy ra khi gọi số tiếp theo', type: 'info' });
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

            addToast({ message: `Đã hoàn thành phục vụ số ${currentServing.number}`, type: 'info' });
        } catch (error) {
            console.error('Error completing current serving:', error);
            addToast({ message: 'Có lỗi xảy ra khi hoàn thành phục vụ', type: 'info' });
        }
    };

    // Load service groups on mount
    useEffect(() => {
        loadServiceGroups();
    }, [loadServiceGroups]);

    // Load initial data
    useEffect(() => {
        loadDashboardData();
    }, [loadDashboardData]);

    // Auto-refresh queue status every 10 seconds
    useEffect(() => {
        if (!serviceGroupId) return;
        
        const interval = setInterval(() => {
            loadQueueStatus();
        }, 10000); // 10 seconds

        return () => clearInterval(interval);
    }, [serviceGroupId, loadQueueStatus]);

    // Handle service group selection
    const handleServiceGroupSelect = (group: ServiceGroup) => {
        setSelectedServiceGroup(group);
        setServiceGroupId(group.id);
        setShowQueueSetup(false);
        // Reload dashboard with new serviceGroupId
        loadDashboardData();
    };

    // Handle search and filters
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filters = {
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
        const filters = {
            ...waitingListFilters,
            serviceType: serviceType || undefined,
        };
        setWaitingListFilters(filters);

        // Apply filters to mock data
        const filtered = getMockWaitingList(filters);
        setWaitingList(filtered);
    };

    const handleViewCitizen = (citizenId: string) => {
        // TODO: Implement citizen details view
        console.log("View citizen:", citizenId);
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
        <StaffDashboardTabsView>
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
                        <Button 
                            onClick={() => router.push('/staff/create-case')}
                            className="bg-indigo-600 hover:bg-indigo-700"
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

                {/* Service Group Status */}
                <ServiceGroupStatus
                    serviceGroupId={serviceGroupId}
                    selectedServiceGroup={selectedServiceGroup}
                    queueStatus={queueStatus}
                    onOpenSetup={() => setShowQueueSetup(true)}
                />

                {/* Service Group Setup Modal */}
                <ServiceGroupSetup
                    show={showQueueSetup}
                    serviceGroups={serviceGroups}
                    isLoadingServiceGroups={isLoadingServiceGroups}
                    selectedServiceGroup={selectedServiceGroup}
                    searchInput={serviceGroupSearchInput}
                    searchKeyword={serviceGroupSearchKeyword}
                    queueStatus={queueStatus}
                    onClose={() => {
                        setShowQueueSetup(false);
                        setServiceGroupSearchInput("");
                        setServiceGroupSearchKeyword("");
                    }}
                    onSearchInputChange={setServiceGroupSearchInput}
                    onSearch={handleSearchServiceGroups}
                    onClearSearch={handleClearSearch}
                    onSearchKeyPress={handleSearchKeyPress}
                    onSelectGroup={handleServiceGroupSelect}
                />

                {/* Current Serving & Call Next Number */}
                <CurrentServingPanel
                    serviceGroupId={serviceGroupId}
                    queueStatus={queueStatus}
                    isLoadingQueueStatus={isLoadingQueueStatus}
                    currentServing={currentServing}
                    isCallingNext={isCallingNext}
                    onCallNext={callNextNumber}
                    onComplete={completeCurrentServing}
                    onChangeQueue={() => setShowQueueSetup(true)}
                />

                {/* Stats Cards */}
                <StatsCards stats={stats} queueStatus={queueStatus} />

                {/* Search and Filters */}
                <SearchFilters
                    searchQuery={searchQuery}
                    selectedServiceType={selectedServiceType}
                    serviceTypes={SERVICE_TYPES}
                    onSearchChange={handleSearch}
                    onServiceTypeChange={handleServiceTypeFilter}
                />

                {/* Waiting List */}
                <WaitingList
                    waitingList={waitingList}
                    isLoading={isLoadingWaitingList}
                    onRefresh={loadDashboardData}
                    onViewCitizen={handleViewCitizen}
                    getServiceTypeName={getServiceTypeName}
                    getStatusBadge={getStatusBadge}
                />
            </div>
        </StaffDashboardTabsView>
    );
}

