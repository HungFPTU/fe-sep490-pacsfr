"use client";

import React, { useState } from "react";
import { Card } from "@/shared/components/ui/card.ui";
import { Button } from "@/shared/components/ui/button.ui";
import { Users, Clock, CheckCircle, Phone, UserCheck, Settings } from "lucide-react";
import { staffDashboardService } from "../../../services/staff-dashboard.service";
import { useGlobalToast } from "@core/patterns/SingletonHook";
import type { QueueStatus } from "../../../types";

interface CurrentServingData {
    id: string;
    ticketNumber: string;
    fullName: string;
    status: string;
    calledAt?: string;
}

interface CurrentServingPanelProps {
    serviceGroupId: string | null;
    queueStatus: QueueStatus | null;
    isLoadingQueueStatus: boolean;
    currentServing: CurrentServingData | null;
    isCallingNext: boolean;
    onCallNext: () => void;
    onRefresh: () => void;
    onChangeQueue: () => void;
    onStatusUpdated?: (ticketData: CurrentServingData) => void;
}

const TICKET_STATUSES = [
    { value: 'Waiting', label: 'Đang chờ' },
    { value: 'Processing', label: 'Đang xử lý' },
    { value: 'Calling', label: 'Đang gọi' },
    { value: 'Completed', label: 'Hoàn thành' },
    { value: 'Skipped', label: 'Bỏ qua' },
    { value: 'Cancelled', label: 'Đã hủy' },
    { value: 'NoShow', label: 'Vắng mặt' },
];

export function CurrentServingPanel({
    serviceGroupId,
    queueStatus,
    isLoadingQueueStatus,
    currentServing,
    isCallingNext,
    onCallNext,
    onRefresh,
    onChangeQueue,
    onStatusUpdated,
}: CurrentServingPanelProps) {
    const { addToast } = useGlobalToast();
    const [selectedStatus, setSelectedStatus] = useState<string>(currentServing?.status || 'Processing');
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    // Sync selected status when current serving changes
    React.useEffect(() => {
        if (currentServing?.status) {
            setSelectedStatus(currentServing.status);
        }
    }, [currentServing?.status]);

    const handleUpdateStatus = async () => {
        if (!currentServing || !selectedStatus) {
            addToast({ message: 'Vui lòng chọn trạng thái', type: 'info' });
            return;
        }

        setIsUpdatingStatus(true);
        try {
            // Update ticket status
            await staffDashboardService.updateTicketStatus(currentServing.ticketNumber, selectedStatus);
            
            // Fetch the latest ticket details
            const updatedTicket = await staffDashboardService.getTicketDetail(currentServing.ticketNumber);
            
            // Update selected status with latest data
            setSelectedStatus(updatedTicket.status);
            
            // Call parent callback to update currentServing
            if (onStatusUpdated) {
                onStatusUpdated({
                    id: updatedTicket.ticketNumber,
                    ticketNumber: updatedTicket.ticketNumber,
                    fullName: updatedTicket.fullName,
                    status: updatedTicket.status,
                    calledAt: updatedTicket.servedAt
                });
            }
            
            addToast({ 
                message: `Đã cập nhật trạng thái ticket ${currentServing.ticketNumber} thành ${staffDashboardService.getTicketStatusText(updatedTicket.status)}`, 
                type: 'info' 
            });
            // Refresh queue status to get latest updates
            onRefresh();
        } catch (error) {
            console.error('Error updating ticket status:', error);
            addToast({ 
                message: 'Lỗi khi cập nhật trạng thái. Vui lòng thử lại!', 
                type: 'info' 
            });
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    return (
        <Card className="p-6 bg-gray-50 border-gray-200">
            {/* Queue Info Header */}
            {serviceGroupId && queueStatus && (
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                {isLoadingQueueStatus ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                                ) : (
                                    <Users className="w-5 h-5 text-blue-600" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700">Hàng đợi</p>
                                <p className="font-semibold text-gray-900">{queueStatus.queueName}</p>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-gray-300"></div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">
                                <strong className="text-blue-600">{queueStatus.messageCount}</strong> ticket đang chờ
                            </span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onChangeQueue}
                        className="border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        <Settings className="w-4 h-4 mr-2" />
                        Đổi Queue
                    </Button>
                </div>
            )}

            {/* Current Serving Display */}
            {currentServing ? (
                <div className="space-y-4">
                    {/* Customer Info */}
                    <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">{currentServing.ticketNumber.slice(-3)}</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600">Số thứ tự</p>
                            <p className="text-2xl font-bold text-gray-900">{currentServing.ticketNumber}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600">Khách hàng</p>
                            <p className="text-lg font-semibold text-gray-900">{currentServing.fullName}</p>
                        </div>
                    </div>

                    {/* Status Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Current Status Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Trạng thái hiện tại
                            </label>
                            <div className={`px-4 py-2 rounded-lg font-medium text-center h-10 flex items-center justify-center ${staffDashboardService.getTicketStatusColor(currentServing.status)}`}>
                                {staffDashboardService.getTicketStatusText(currentServing.status)}
                            </div>
                        </div>

                        {/* Status Selection Dropdown */}
                        <div>
                            <label htmlFor="status-select" className="block text-sm font-medium text-gray-700 mb-2">
                                Cập nhật trạng thái
                            </label>
                            <select
                                id="status-select"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {TICKET_STATUSES.map((status) => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Update Button */}
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                &nbsp;
                            </label>
                            <Button
                                onClick={handleUpdateStatus}
                                disabled={isUpdatingStatus || selectedStatus === currentServing.status}
                                className="h-10 bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                            >
                                {isUpdatingStatus ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Đang cập nhật...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Cập nhật
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Call Time */}
                    {currentServing.calledAt && (
                        <div className="text-sm text-gray-600">
                            Gọi lúc: {new Date(currentServing.calledAt).toLocaleString('vi-VN')}
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500 text-lg">Chưa có khách hàng nào đang phục vụ</p>
                        <p className="text-gray-400 text-sm mt-1">Bấm nút "Gọi số tiếp theo" để bắt đầu</p>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-gray-200">
                <Button
                    onClick={onCallNext}
                    disabled={isCallingNext || !serviceGroupId || (queueStatus?.messageCount === 0)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                    title={!serviceGroupId ? 'Vui lòng cấu hình Service Group ID trước' : (queueStatus?.messageCount === 0 ? 'Không có ticket trong hàng đợi' : '')}
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

                <Button
                    onClick={onRefresh}
                    disabled={isLoadingQueueStatus}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                    <Clock className="w-4 h-4" />
                </Button>
            </div>
        </Card>
    );
}

