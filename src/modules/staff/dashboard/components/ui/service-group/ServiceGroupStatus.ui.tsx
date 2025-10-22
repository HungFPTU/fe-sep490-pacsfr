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
        <Card className={`p-4 ${!serviceGroupId ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {!serviceGroupId ? (
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                    ) : (
                        <CheckCircle className="w-5 h-5 text-green-600" />
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
                        ? "border-yellow-600 text-yellow-700 hover:bg-yellow-100" 
                        : "border-green-600 text-green-700 hover:bg-green-100"
                    }
                >
                    <Settings className="w-4 h-4 mr-2" />
                    {!serviceGroupId ? 'Chọn nhóm dịch vụ' : 'Thay đổi nhóm'}
                </Button>
            </div>
        </Card>
    );
}

