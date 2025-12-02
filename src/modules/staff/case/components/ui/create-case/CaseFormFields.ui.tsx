"use client";

import React, { useMemo, useState } from "react";
import type { CreateCaseRequest, SubmissionMethod } from "../../../../dashboard/types";
import { Calendar } from "lucide-react";

interface PriorityLevel {
    value: number;
    label: string;
}

interface CaseFormFieldsProps {
    caseData: CreateCaseRequest;
    priorityLevels: PriorityLevel[];
    submissionMethods?: SubmissionMethod[];
    isLoadingSubmissionMethods?: boolean;
    onDataChange: (data: CreateCaseRequest) => void;
}

// Helper functions for date conversion
const formatDateToISO = (dateValue: string, timeValue: string = '00:00'): string => {
    if (!dateValue) return '';
    const parts = dateValue.split('/');
    if (parts.length !== 3) return '';
    const [day, month, year] = parts;
    const [hours, minutes] = timeValue.split(':');
    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
};

const formatISOToDate = (isoValue: string): string => {
    if (!isoValue) return '';
    const datePart = isoValue.substring(0, 10);
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year}`;
};

const formatISOToTime = (isoValue: string): string => {
    if (!isoValue) return '00:00';
    const timePart = isoValue.substring(11, 16);
    return timePart || '00:00';
};

// DatePickerCalendar with year and month selector
const DatePickerCalendar: React.FC<{
    value: string;
    onChange: (datetime: string) => void;
    onClose: () => void;
}> = ({ value, onChange, onClose }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showYearSelector, setShowYearSelector] = useState(false);
    const [showMonthSelector, setShowMonthSelector] = useState(false);
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

    const getDisplayDate = () => {
        if (value) {
            const datePart = value.substring(0, 10);
            const [year, month, day] = datePart.split('-');
            if (year && month && day) {
                return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            }
        }
        return currentDate;
    };

    const displayDate = getDisplayDate();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const handleSelectDate = (day: number) => {
        const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dd = String(selected.getDate()).padStart(2, '0');
        const mm = String(selected.getMonth() + 1).padStart(2, '0');
        const yyyy = selected.getFullYear();
        onChange(`${yyyy}-${mm}-${dd}`);
        onClose();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleYearChange = (year: number) => {
        setCurrentDate(new Date(year, currentDate.getMonth(), 1));
        setSelectedYear(year);
        setShowYearSelector(false);
    };

    const handleMonthChange = (month: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
        setSelectedMonth(month);
        setShowMonthSelector(false);
    };

    const currentYear = new Date().getFullYear();
    const yearRange = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
    const monthShortNames = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];
    const dayNames = ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

    return (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-20 p-3 w-full max-w-md">
            {!showYearSelector && !showMonthSelector ? (
                <>
                    {/* Month Navigation */}
                    <div className="flex justify-between items-center mb-4">
                        <button
                            type="button"
                            onClick={handlePrevMonth}
                            className="px-2 py-1 hover:bg-gray-100 rounded text-sm font-medium"
                        >
                            ← Trước
                        </button>
                        <div className="flex items-center gap-2 flex-1 justify-center">
                            <button
                                type="button"
                                onClick={() => setShowMonthSelector(true)}
                                className="px-3 py-1 hover:bg-gray-100 rounded text-sm font-semibold border border-gray-300"
                            >
                                {monthNames[currentDate.getMonth()]}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowYearSelector(true)}
                                className="px-3 py-1 hover:bg-gray-100 rounded text-sm font-semibold border border-gray-300"
                            >
                                {currentDate.getFullYear()}
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={handleNextMonth}
                            className="px-2 py-1 hover:bg-gray-100 rounded text-sm font-medium"
                        >
                            Sau →
                        </button>
                    </div>

                    {/* Days Header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {dayNames.map((day) => (
                            <div key={day} className="text-center text-xs font-semibold text-gray-600">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1 mb-4">
                        {days.map((day, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => day && handleSelectDate(day)}
                                disabled={!day}
                                className={`w-10 h-10 text-sm rounded hover:bg-blue-100 disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors ${
                                    day === displayDate.getDate() && currentDate.getMonth() === displayDate.getMonth()
                                        ? "bg-blue-500 text-white hover:bg-blue-600"
                                        : ""
                                }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </>
            ) : showYearSelector ? (
                <>
                    {/* Year Selector */}
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Chọn năm</h3>
                        <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg">
                            <div className="grid grid-cols-3 gap-2 p-3">
                                {yearRange.map((year) => (
                                    <button
                                        key={year}
                                        type="button"
                                        onClick={() => handleYearChange(year)}
                                        className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                                            year === selectedYear
                                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                                : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                                        }`}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowYearSelector(false)}
                        className="w-full px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium transition-colors"
                    >
                        Quay lại
                    </button>
                </>
            ) : (
                <>
                    {/* Month Selector */}
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Chọn tháng</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {monthShortNames.map((month, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleMonthChange(index)}
                                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                                        index === selectedMonth
                                            ? "bg-blue-500 text-white hover:bg-blue-600"
                                            : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                                    }`}
                                >
                                    {month}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowMonthSelector(false)}
                        className="w-full px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium transition-colors"
                    >
                        Quay lại
                    </button>
                </>
            )}
        </div>
    );
};

export function CaseFormFields({
    caseData,
    priorityLevels,
    submissionMethods = [],
    isLoadingSubmissionMethods = false,
    onDataChange,
}: CaseFormFieldsProps) {
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Deduplicate submission methods by submissionMethodId
    const uniqueSubmissionMethods = useMemo(() => {
        const seen = new Set<string>();
        return submissionMethods.filter(method => {
            if (seen.has(method.submissionMethodId)) {
                return false;
            }
            seen.add(method.submissionMethodId);
            return true;
        });
    }, [submissionMethods]);

    return (
        <div className="space-y-6">
            {/* Priority Level */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mức độ ưu tiên
                </label>
                <select
                    value={caseData.priorityLevel}
                    onChange={(e) => onDataChange({ ...caseData, priorityLevel: parseInt(e.target.value) })}
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {priorityLevels.map(level => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                </select>
            </div>

            {/* Submission Method */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phương thức nộp <span className="text-red-500">*</span>
                </label>
                <select
                    value={caseData.submissionMethodId}
                    onChange={(e) => onDataChange({ ...caseData, submissionMethodId: e.target.value })}
                    disabled={isLoadingSubmissionMethods}
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="">{isLoadingSubmissionMethods ? "Đang tải..." : "-- Chọn phương thức nộp --"}</option>
                    {uniqueSubmissionMethods.map(method => (
                        <option key={method.submissionMethodId} value={method.submissionMethodId}>
                            {method.submissionMethodName} {method.fee > 0 ? `(${method.fee.toLocaleString()}đ)` : "(Miễn phí)"}
                        </option>
                    ))}
                </select>
                {uniqueSubmissionMethods.find(m => m.submissionMethodId === caseData.submissionMethodId) && (
                    <p className="text-xs text-gray-500 mt-1">
                        {uniqueSubmissionMethods.find(m => m.submissionMethodId === caseData.submissionMethodId)?.description}
                    </p>
                )}
            </div>

            {/* Notes */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú
                </label>
                <textarea
                    value={caseData.notes || ""}
                    onChange={(e) => onDataChange({ ...caseData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Thêm ghi chú cho hồ sơ..."
                />
            </div>

            {/* Estimated Completion Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Ngày hoàn thành dự kiến
                </label>
                <div className="relative">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={formatISOToDate(caseData.estimatedCompletionDate || '')}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^[0-9/]*$/.test(value)) {
                                    let formatted = value.replace(/\D/g, '');
                                    if (formatted.length >= 2) {
                                        formatted = formatted.substring(0, 2) + '/' + formatted.substring(2);
                                    }
                                    if (formatted.length >= 5) {
                                        formatted = formatted.substring(0, 5) + '/' + formatted.substring(5, 9);
                                    }
                                    if (formatted.length === 10 && /^\d{2}\/\d{2}\/\d{4}$/.test(formatted)) {
                                        const time = formatISOToTime(caseData.estimatedCompletionDate || '00:00');
                                        const isoDate = formatDateToISO(formatted, time);
                                        onDataChange({ ...caseData, estimatedCompletionDate: isoDate || undefined });
                                    }
                                }
                            }}
                            placeholder="dd/mm/yyyy"
                            maxLength={10}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowDatePicker(!showDatePicker)}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Chọn từ lịch"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </button>
                    </div>
                    {showDatePicker && (
                        <DatePickerCalendar
                            value={caseData.estimatedCompletionDate || ''}
                            onChange={(datetime) => {
                                onDataChange({ ...caseData, estimatedCompletionDate: datetime || undefined });
                            }}
                            onClose={() => setShowDatePicker(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

