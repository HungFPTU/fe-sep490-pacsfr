"use client";

import React, { useMemo } from "react";
import type { WorkShift } from "../types";
import { workshiftService } from "../services/workshift.service";

interface WorkShiftCalendarProps {
    shifts: WorkShift[];
    selectedDate?: string;
    onDateSelect?: (date: string) => void;
}

export function WorkShiftCalendar({ shifts, selectedDate, onDateSelect }: WorkShiftCalendarProps) {
    const calendarShifts = useMemo(() => {
        return workshiftService.transformShiftsForCalendar(shifts);
    }, [shifts]);

    // Get dates with shifts for highlighting
    const datesWithShifts = useMemo(() => {
        return new Set(calendarShifts.map(cs => cs.date));
    }, [calendarShifts]);

    // Generate calendar for current month
    const calendarData = useMemo(() => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        const firstDay = new Date(currentYear, currentMonth, 1);

        const calendar = [];
        const startDate = new Date(firstDay);

        // Adjust to start from Sunday
        startDate.setDate(startDate.getDate() - startDate.getDay());

        for (let week = 0; week < 6; week++) {
            const weekDays = [];
            for (let day = 0; day < 7; day++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + (week * 7) + day);

                const dateString = date.toISOString().split('T')[0];
                const hasShift = datesWithShifts.has(dateString);
                const isCurrentMonth = date.getMonth() === currentMonth;
                const isToday = date.toISOString().split('T')[0] === today.toISOString().split('T')[0];

                weekDays.push({
                    date,
                    dateString,
                    hasShift,
                    isCurrentMonth,
                    isToday,
                });
            }
            calendar.push(weekDays);
        }

        return calendar;
    }, [datesWithShifts]);

    const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Lịch làm việc tháng {new Date().toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-sm text-gray-600">Có lịch làm việc</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
                {weekdays.map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {calendarData.map((week, weekIndex) =>
                    week.map((day, dayIndex) => (
                        <div
                            key={`${weekIndex}-${dayIndex}`}
                            className={`
                                relative p-2 text-center text-sm cursor-pointer rounded-lg transition-all
                                ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                                ${day.isToday ? 'bg-blue-100 border border-blue-300' : ''}
                                ${day.hasShift ? 'bg-blue-100 hover:bg-blue-200 border border-blue-300' : 'hover:bg-gray-100'}
                                ${selectedDate === day.dateString ? 'ring-2 ring-blue-500' : ''}
                            `}
                            onClick={() => onDateSelect?.(day.dateString)}
                        >
                            {day.date.getDate()}
                            {day.hasShift && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {selectedDate && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">
                        Lịch làm việc ngày {workshiftService.formatDate(selectedDate)}
                    </h3>
                    {(() => {
                        const dayShifts = workshiftService.getShiftsForDate(shifts, selectedDate);
                        if (dayShifts.length === 0) {
                            return <p className="text-gray-500">Không có lịch làm việc</p>;
                        }
                        return (
                            <div className="space-y-2">
                                {dayShifts.map(shift => (
                                    <div key={shift.id} className="flex items-center justify-between p-3 bg-white rounded border">
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                Ca làm việc: {workshiftService.formatTime(shift.startTime)} - {workshiftService.formatTime(shift.endTime)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Loại: {shift.shiftType}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })()}
                </div>
            )}
        </div>
    );
}
