'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Clock, Activity, AlertCircle, Loader2 } from 'lucide-react';
import { CounterCard } from '../ui/CounterCard.ui';
import { useCurrentWorkShift, useWorkShiftOverview } from '../../hooks';
import { DEFAULT_DISPLAY_SETTINGS } from '../../constants/mock-data';
import type { ServiceGroupOverview } from '../../types/response';

/**
 * Transform ServiceGroupOverview to display format
 */
const transformServiceGroupToDisplay = (
    serviceGroup: ServiceGroupOverview,
    index: number
) => ({
    id: serviceGroup.serviceGroupId,
    counterCode: serviceGroup.serviceGroupCode,
    counterName: serviceGroup.serviceGroupName,
    // For now, show totalProcessing as the "current number" being served
    currentQueueNumber: serviceGroup.totalProcessing > 0 ? serviceGroup.totalProcessing : null,
    totalWaiting: serviceGroup.totalWaiting,
    totalCompleted: serviceGroup.totalCompleted,
    activeCounters: serviceGroup.activeCounters?.$values || [],
    status: serviceGroup.totalWaiting > 0 || serviceGroup.totalProcessing > 0 ? 'active' as const : 'inactive' as const,
});

export const CounterDisplayPage: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    
    // Step 1: Get current workshift to obtain workShiftId
    const { data: currentWorkShift, isLoading: isLoadingCurrent, error: errorCurrent } = useCurrentWorkShift();
    
    // Step 2: Use workShiftId to get detailed overview (this is the main data source)
    const workShiftId = currentWorkShift?.workShiftId || null;
    const { data: workShiftData, isLoading: isLoadingOverview, error: errorOverview } = useWorkShiftOverview(workShiftId);
    
    // Combined loading and error states
    const isLoading = isLoadingCurrent || isLoadingOverview;
    const error = errorCurrent || errorOverview;
    
    // Use data from the second API if available, fallback to first API
    const displayData = workShiftData || currentWorkShift;
    
    const settings = DEFAULT_DISPLAY_SETTINGS;

    // Update clock every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date): string => {
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
    };

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Transform API data to display format
    const serviceGroups = displayData?.serviceGroups?.$values || [];
    const displayItems = serviceGroups.map((sg, index) => 
        transformServiceGroupToDisplay(sg, index)
    );

    // Split into two columns
    const midPoint = Math.ceil(displayItems.length / 2);
    const leftColumn = displayItems.slice(0, midPoint);
    const rightColumn = displayItems.slice(midPoint);

    // Get shift type from API (Ca sáng, Ca chiều, etc.)
    const shiftType = displayData?.shiftType || settings.sessionInfo;

    return (
        <div className="min-h-screen w-full">
            {/* Main Content */}
            <div className="flex flex-col h-screen p-6">
                {/* Header */}
                <header className="mb-6">
                    <div className="bg-[#BB141A] rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src="/logo-cai-cach-hanh-chinh-2.jpg"
                                        alt="Logo"
                                        width={48}
                                        height={48}
                                        className="rounded"
                                    />
                                    <div>
                                        <h1 className="text-xl font-bold text-white">
                                            {settings.title}
                                        </h1>
                                        {settings.subtitle && (
                                            <p className="text-sm text-red-100 mt-0.5">
                                                {settings.subtitle}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Clock */}
                                {settings.showClock && (
                                    <div className="text-right flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-red-200" />
                                        <div>
                                            <div className="text-2xl font-mono font-bold text-white">
                                                {formatTime(currentTime)}
                                            </div>
                                            <div className="text-xs text-red-100">
                                                {formatDate(currentTime)}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 animate-spin text-slate-400 mx-auto mb-4" />
                            <p className="text-slate-500">Đang tải dữ liệu...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center bg-red-50 rounded-lg p-8 max-w-md">
                            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <p className="text-red-600 font-medium">Không thể tải dữ liệu</p>
                            <p className="text-red-400 text-sm mt-2">Vui lòng thử lại sau</p>
                        </div>
                    </div>
                )}

                {/* No Data State */}
                {!isLoading && !error && displayItems.length === 0 && (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center bg-slate-50 rounded-lg p-8 max-w-md">
                            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                            <p className="text-slate-600 font-medium">Không có ca làm việc hiện tại</p>
                            <p className="text-slate-400 text-sm mt-2">Chưa có nhóm dịch vụ nào được cấu hình</p>
                        </div>
                    </div>
                )}

                {/* Counters Grid - Two Columns */}
                {!isLoading && !error && displayItems.length > 0 && (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-auto">
                        {/* Left Column */}
                        <div className="flex flex-col gap-3">
                            {leftColumn.map((item) => (
                                <CounterCard 
                                    key={item.id} 
                                    counter={{
                                        id: item.id,
                                        counterCode: item.counterCode,
                                        counterName: item.counterName,
                                        currentQueueNumber: item.currentQueueNumber,
                                        status: item.status,
                                    }} 
                                />
                            ))}
                        </div>
                        
                        {/* Right Column */}
                        <div className="flex flex-col gap-3">
                            {rightColumn.map((item) => (
                                <CounterCard 
                                    key={item.id} 
                                    counter={{
                                        id: item.id,
                                        counterCode: item.counterCode,
                                        counterName: item.counterName,
                                        currentQueueNumber: item.currentQueueNumber,
                                        status: item.status,
                                    }} 
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <footer className="mt-6">
                    <div className="bg-[#BB141A] rounded-lg border border-slate-200 px-6 py-3 shadow-sm">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-white">
                                <Activity className="w-4 h-4 text-white" />
                                <span>Hệ thống đang hoạt động</span>
                            </div>
                            
                            {shiftType && (
                                <div className="flex items-center gap-2 text-white">
                                    <span>Thời gian tiếp nhận:</span>
                                    <span className="font-semibold text-white">
                                        {shiftType}
                                    </span>
                                </div>
                            )}

                            {/* Stats from API */}
                            {displayData && (
                                <div className="flex items-center gap-4 text-white text-xs">
                                    <span>Đang chờ: <strong>{displayData.totalWaitingToday}</strong></span>
                                    <span>Đang xử lý: <strong>{displayData.totalProcessingToday}</strong></span>
                                    <span>Hoàn thành: <strong>{displayData.totalCompletedToday}</strong></span>
                                </div>
                            )}
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};
