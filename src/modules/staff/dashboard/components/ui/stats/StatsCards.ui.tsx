"use client";

import React from "react";
import { Card } from "@/shared/components/ui/card.ui";
import { Users, Clock, CheckCircle, AlertCircle } from "lucide-react";
import type { DashboardStats, QueueStatus } from "../../../types";

interface StatsCardsProps {
    stats: DashboardStats | null;
    queueStatus: QueueStatus | null;
}

export function StatsCards({ stats, queueStatus }: StatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
                <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
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
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <Clock className="w-6 h-6 text-indigo-600" />
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
                    <div className="p-2 bg-gray-100 rounded-lg">
                        <AlertCircle className="w-6 h-6 text-gray-600" />
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
    );
}

