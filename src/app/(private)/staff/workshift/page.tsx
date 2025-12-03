"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/hooks";
import { WorkShiftCalendar, workshiftService } from "@/modules/staff/workshift";
import { LoadingSpinner } from "@/shared/components/common/LoadingSpinner.com";

export default function WorkShiftPage() {
    // Get user profile with staffId
    const { user } = useAuth();
    const staffId = user?.id;

    // Only query shifts after we have staffId
    const { data: workshiftResponse, isLoading, error } = useQuery({
        queryKey: ["workshift", "my-shifts", staffId],
        queryFn: () => staffId ? workshiftService.getShiftsByStaffId(staffId) : Promise.reject("No staffId"),
        enabled: !!staffId, // Only run when staffId is available
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

    const allShifts = workshiftResponse?.data?.items?.$values || [];
    // Filter out placeholder shifts before passing to calendar and display
    const shifts = allShifts.filter(shift => workshiftService.isValidShift(shift));
    console.log('🔍 DEBUG - Page: allShifts:', allShifts.length, 'filtered shifts:', shifts.length);
    console.log('🔍 DEBUG - Page: First shift:', shifts[0]);
    if (shifts.length > 0) {
        console.log('🔍 DEBUG - Page: All shifts:', shifts.map(s => ({ date: s.workDate, time: s.startTime + '-' + s.endTime })));
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-autosm:px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Lịch làm việc
                    </h1>
                    <p className="text-gray-600">
                        Xem lịch làm việc của bạn. Click vào ngày để xem chi tiết các ca làm việc.
                    </p>
                </div>

                {/* Calendar */}
                <WorkShiftCalendar
                    workShifts={shifts}
                    isLoading={isLoading}
                    onShiftClick={(shift) => {
                        // Could open a modal here in the future
                        console.log('Shift clicked:', shift);
                    }}
                />
            </div>
        </div>
    );
}
