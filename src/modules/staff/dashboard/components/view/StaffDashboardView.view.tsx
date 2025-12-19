"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/button.ui";
import { useStaffDashboardStore } from "../../stores/useStaffDashboardStore";
import { staffDashboardService } from "../../services/staff-dashboard.service";
import { getMockWaitingList, SERVICE_TYPES } from "../../consts";
import type { CitizenProfile, ServiceGroup } from "../../types";
import { Plus } from "lucide-react";
import { useMinimumLoadingTime } from "@/shared/hooks";
import { useGlobalToast } from "@core/patterns/SingletonHook";
import { CurrentServingStorage } from "@core/utils/storage";
import { useQueueWebSocket } from "../../hooks/useQueueWebSocket";

// UI Components
import {
    ServiceGroupStatus,
    ServiceGroupSetup,
    CurrentServingPanel,
    StatsCards,
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
        ticketNumber: string;
        fullName: string;
        status: string;
        calledAt?: string;
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
            return undefined;
        }

        setCallingNext(true);

        try {
            return await withMinimumLoadingTime(async () => {
                const response = await staffDashboardService.callNext(serviceGroupId);

                if (response.success && response.data?.ticketNumber) {
                    // Get ticket detail using the ticketNumber from call next response
                    const ticketDetail = await staffDashboardService.getTicketDetail(response.data.ticketNumber);

                    // Update current serving with detailed ticket data
                    setCurrentServing({
                        id: ticketDetail.ticketNumber,
                        ticketNumber: ticketDetail.ticketNumber,
                        fullName: ticketDetail.fullName,
                        status: ticketDetail.status,
                        calledAt: ticketDetail.servedAt
                    });

                    addToast({
                        message: `Mời số ${ticketDetail.ticketNumber} - ${ticketDetail.fullName} vào phục vụ`,
                        type: 'info'
                    });

                    // Reload queue status and dashboard data
                    await loadQueueStatus();
                    await loadDashboardData();
                    return response;
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
            return undefined;
        } finally {
            setCallingNext(false);
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

    // Restore current serving from storage on mount
    useEffect(() => {
        const savedServing = CurrentServingStorage.getCurrentServing();
        if (savedServing) {
            setCurrentServing(savedServing);
        }
    }, []);

    // Save current serving to storage whenever it changes
    useEffect(() => {
        if (currentServing) {
            CurrentServingStorage.setCurrentServing(currentServing);
        }
    }, [currentServing]);

    // WebSocket for real-time queue updates
    const handleQueueUpdate = useCallback((status: any) => {
        setQueueStatus(status);
    }, [setQueueStatus]);

    const handleTicketCalled = useCallback((data: any) => {
        // Update current serving when a ticket is called
        if (data.ticketNumber) {
            setCurrentServing({
                id: data.ticketNumber,
                ticketNumber: data.ticketNumber,
                fullName: data.fullName || 'Chưa có thông tin',
                status: data.status || 'Calling',
                calledAt: data.calledAt
            });
        }
    }, []);

    const handleTicketCompleted = useCallback((ticketNumber: string) => {
        // Update current serving when a ticket is completed
        setCurrentServing(null);
        // Reload queue status
        loadQueueStatus();
    }, [loadQueueStatus]);

    const handleStatusChanged = useCallback((ticketNumber: string, status: string) => {
        // Update current serving status when it changes
        setCurrentServing(prev =>
            prev && prev.ticketNumber === ticketNumber
                ? { ...prev, status }
                : prev
        );
    }, []);

    const handleStatusUpdated = useCallback((ticketData: {
        id: string;
        ticketNumber: string;
        fullName: string;
        status: string;
        calledAt?: string;
    }) => {
        // Update current serving with new ticket data from API
        setCurrentServing(ticketData);
    }, []);

    useQueueWebSocket({
        serviceGroupId,
        onQueueUpdate: handleQueueUpdate,
        onTicketCalled: handleTicketCalled,
        onTicketCompleted: handleTicketCompleted,
        onStatusChanged: handleStatusChanged,
        enabled: !!serviceGroupId,
    });

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
                    onRefresh={loadQueueStatus}
                    onChangeQueue={() => setShowQueueSetup(true)}
                    onStatusUpdated={handleStatusUpdated}
                />

                {/* Stats Cards */}
                <StatsCards stats={stats} queueStatus={queueStatus} />


            </div>
        </StaffDashboardTabsView>
    );
}
