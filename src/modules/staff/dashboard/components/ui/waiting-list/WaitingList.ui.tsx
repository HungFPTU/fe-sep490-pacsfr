"use client";

import React from "react";
import { Card } from "@/shared/components/ui/card.ui";
import { Button } from "@/shared/components/ui/button.ui";
import { Users } from "lucide-react";
import type { CitizenProfile } from "../../../types";

interface WaitingListProps {
    waitingList: CitizenProfile[];
    isLoading: boolean;
    onRefresh: () => void;
    onViewCitizen: (citizenId: string) => void;
    getServiceTypeName: (serviceId: string) => string;
    getStatusBadge: (status: CitizenProfile['status']) => React.ReactNode;
}

export function WaitingList({
    waitingList,
    isLoading,
    onRefresh,
    onViewCitizen,
    getServiceTypeName,
    getStatusBadge,
}: WaitingListProps) {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                    Danh sách công dân đang chờ
                </h2>
                <Button
                    onClick={onRefresh}
                    disabled={isLoading}
                    variant="outline"
                    size="sm"
                >
                    {isLoading ? "Đang tải..." : "Làm mới"}
                </Button>
            </div>

            {isLoading ? (
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
                                    onClick={() => onViewCitizen(citizen.id)}
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
    );
}

