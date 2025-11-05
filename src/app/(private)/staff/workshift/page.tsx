"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { WorkShiftCalendar, workshiftService } from "@/modules/staff/workshift";
import { LoadingSpinner } from "@/shared/components/common/LoadingSpinner.com";

export default function WorkShiftPage() {
    const [selectedDate, setSelectedDate] = useState<string | undefined>();

    const { data: workshiftResponse, isLoading, error } = useQuery({
        queryKey: ["workshift", "my-shifts"],
        queryFn: workshiftService.getMyShifts,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-gray-900 text-lg mb-2">Không thể tải lịch làm việc</div>
                    <div className="text-gray-600">Vui lòng thử lại sau</div>
                </div>
            </div>
        );
    }

    const shifts = workshiftResponse?.$values || [];

    return (
        <div className="bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Lịch làm việc
                    </h1>
                    <p className="text-gray-600">
                        Xem lịch làm việc của bạn trong tháng
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Calendar */}
                    <div className="lg:col-span-2">
                        <WorkShiftCalendar
                            shifts={shifts}
                            selectedDate={selectedDate}
                            onDateSelect={setSelectedDate}
                        />
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Tổng quan tháng này
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Tổng số ca làm việc:</span>
                                    <span className="font-semibold text-gray-900">{shifts.length}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Số ngày có lịch:</span>
                                    <span className="font-semibold text-gray-900">
                                        {new Set(shifts.map(s => s.shiftDate.split('T')[0])).size}
                                    </span>
                                </div>

                                {selectedDate && (
                                    <>
                                        <div className="border-t pt-4">
                                            <h4 className="font-medium text-gray-900 mb-2">
                                                Chi tiết ngày {new Date(selectedDate).getDate()}
                                            </h4>
                                            {(() => {
                                                const dayShifts = workshiftService.getShiftsForDate(shifts, selectedDate);
                                                if (dayShifts.length === 0) {
                                                    return <p className="text-gray-500">Không có lịch làm việc</p>;
                                                }
                                                return (
                                                    <div className="space-y-2">
                                                        {dayShifts.map(shift => (
                                                            <div key={shift.id} className="text-sm">
                                                                <div className="font-medium">
                                                                    {workshiftService.formatTime(shift.startTime)} - {workshiftService.formatTime(shift.endTime)}
                                                                </div>
                                                                <div className="text-gray-500">
                                                                    {shift.shiftType}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
