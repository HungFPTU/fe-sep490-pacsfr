"use client";

import React from "react";
import { Card } from "@/shared/components/ui/card.ui";
import { Button } from "@/shared/components/ui/button.ui";
import { Users, Clock, CheckCircle, Phone, UserCheck, Settings } from "lucide-react";
import type { QueueStatus } from "../../../types";

interface CurrentServingData {
    id: string;
    number: string;
    fullName: string;
    serviceType: string;
    status: 'waiting' | 'serving' | 'completed';
}

interface CurrentServingPanelProps {
    serviceGroupId: string | null;
    queueStatus: QueueStatus | null;
    isLoadingQueueStatus: boolean;
    currentServing: CurrentServingData | null;
    isCallingNext: boolean;
    onCallNext: () => void;
    onComplete: () => void;
    onChangeQueue: () => void;
}

export function CurrentServingPanel({
    serviceGroupId,
    queueStatus,
    isLoadingQueueStatus,
    currentServing,
    isCallingNext,
    onCallNext,
    onComplete,
    onChangeQueue,
}: CurrentServingPanelProps) {
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

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    {/* Current Serving Display */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <UserCheck className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Đang phục vụ:</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            {currentServing ? (
                                <div className="flex items-center space-x-3">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${currentServing.status === 'completed'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-blue-100 text-blue-700'
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
                    {serviceGroupId && queueStatus && (
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
                        onClick={onCallNext}
                        disabled={isCallingNext || !serviceGroupId || (queueStatus?.messageCount === 0)}
                        className="bg-indigo-600 hover:bg-indigo-700"
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

                    {currentServing && currentServing.status !== 'completed' && (
                        <Button
                            onClick={onComplete}
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Hoàn thành
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
}

