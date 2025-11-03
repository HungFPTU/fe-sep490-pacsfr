"use client";

import React from "react";
import { Card } from "@/shared/components/ui/card.ui";
import { Button } from "@/shared/components/ui/button.ui";
import { AlertCircle, CheckCircle, Settings } from "lucide-react";
import type { ServiceGroup, QueueStatus } from "../../../types";

interface ServiceGroupStatusProps {
    serviceGroupId: string | null;
    selectedServiceGroup: ServiceGroup | null;
    queueStatus: QueueStatus | null;
    onOpenSetup: () => void;
}

export function ServiceGroupStatus({
    serviceGroupId,
    selectedServiceGroup,
    queueStatus,
    onOpenSetup,
}: ServiceGroupStatusProps) {
    return (
        <Card className={`p-4 ${!serviceGroupId ? 'bg-gray-50 border-gray-200' : 'bg-indigo-50 border-indigo-200'}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {!serviceGroupId ? (
                        <AlertCircle className="w-5 h-5 text-gray-600" />
                    ) : (
                        <CheckCircle className="w-5 h-5 text-indigo-600" />
                    )}
                    <div>
                        {!serviceGroupId ? (
                            <>
                                <p className="font-medium text-gray-900">Chưa chọn nhóm dịch vụ</p>
                                <p className="text-sm text-gray-600">Vui lòng chọn nhóm dịch vụ để bắt đầu quản lý hàng đợi</p>
                            </>
                        ) : (
                            <>
                                <p className="font-medium text-gray-900">
                                    {selectedServiceGroup ? selectedServiceGroup.groupName : 'Nhóm dịch vụ'}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {selectedServiceGroup && `Mã: ${selectedServiceGroup.groupCode}`}
                                    {queueStatus && ` • ${queueStatus.messageCount} ticket đang chờ`}
                                </p>
                            </>
                        )}
                    </div>
                </div>
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onOpenSetup}
                    className={!serviceGroupId 
                        ? "border-gray-300 text-gray-700 hover:bg-gray-100" 
                        : "border-indigo-300 text-indigo-700 hover:bg-indigo-100"
                    }
                >
                    <Settings className="w-4 h-4 mr-2" />
                    {!serviceGroupId ? 'Chọn nhóm dịch vụ' : 'Thay đổi nhóm'}
                </Button>
            </div>
        </Card>
    );
}

