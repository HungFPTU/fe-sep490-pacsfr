/**
 * Enhanced DatePicker component with separate day, month, year selectors
 */

import React, { useState, useEffect } from 'react';
import { isValidDate } from '@/core/utils/date';

interface DatePickerProps {
    value: string; // dd/mm/yyyy format
    onChange: (value: string) => void;
    error?: boolean;
    disabled?: boolean;
    className?: string;
    id?: string;
    maxDate?: Date;
    minDate?: Date;
}

export function DatePicker({
    value,
    onChange,
    error = false,
    disabled = false,
    className = "",
    id,
    maxDate,
    minDate,
}: DatePickerProps) {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    // Parse existing value into day, month, year
    useEffect(() => {
        if (value && value.length === 10) {
            const parts = value.split('/');
            if (parts.length === 3) {
                setDay(parts[0]);
                setMonth(parts[1]);
                setYear(parts[2]);
            }
        } else if (!value) {
            setDay("");
            setMonth("");
            setYear("");
        }
    }, [value]);

    // Generate options for days (1-31)
    const getDayOptions = (): number[] => {
        const maxDay = getMaxDayForMonth(parseInt(month), parseInt(year));
        return Array.from({ length: maxDay }, (_, i) => i + 1);
    };

    // Generate options for months (1-12)
    const getMonthOptions = (): { value: number; label: string }[] => {
        const months = [
            "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
            "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
        ];
        return months.map((label, index) => ({ value: index + 1, label }));
    };

    // Generate options for years (current year - 100 to current year)
    const getYearOptions = (): number[] => {
        const currentYear = new Date().getFullYear();
        const minYear = minDate ? minDate.getFullYear() : currentYear - 100;
        const maxYear = maxDate ? maxDate.getFullYear() : currentYear;

        const years = [];
        for (let y = maxYear; y >= minYear; y--) {
            years.push(y);
        }
        return years;
    };

    // Get maximum day for a given month and year
    const getMaxDayForMonth = (month: number, year: number): number => {
        if (!month || !year) return 31;
        return new Date(year, month, 0).getDate();
    };

    // Generate quick year selection options based on generations
    const getQuickYearOptions = (): { range: string; label: string; year: number }[] => {
        const currentYear = new Date().getFullYear();
        return [
            { range: "18-25", label: "Gen Z", year: currentYear - 22 },
            { range: "26-35", label: "Millennial", year: currentYear - 30 },
            { range: "36-50", label: "Gen X", year: currentYear - 43 },
            { range: "51-65", label: "Boomer", year: currentYear - 58 },
        ].filter(({ year }) => {
            const minYear = minDate ? minDate.getFullYear() : currentYear - 100;
            const maxYear = maxDate ? maxDate.getFullYear() : currentYear;
            return year >= minYear && year <= maxYear;
        });
    };

    // Handle input changes
    const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newDay = e.target.value;
        setDay(newDay);
        updateValue(newDay, month, year);
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = e.target.value;
        setMonth(newMonth);

        // Adjust day if current day is invalid for new month
        const maxDay = getMaxDayForMonth(parseInt(newMonth), parseInt(year));
        const adjustedDay = parseInt(day) > maxDay ? maxDay.toString() : day;
        if (adjustedDay !== day) {
            setDay(adjustedDay.toString());
        }

        updateValue(adjustedDay || day, newMonth, year);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = e.target.value;
        setYear(newYear);

        // Adjust day if current day is invalid for new year (leap year)
        const maxDay = getMaxDayForMonth(parseInt(month), parseInt(newYear));
        const adjustedDay = parseInt(day) > maxDay ? maxDay.toString() : day;
        if (adjustedDay !== day) {
            setDay(adjustedDay.toString());
        }

        updateValue(adjustedDay || day, month, newYear);
    };

    // Update the parent with new date value
    const updateValue = (d: string, m: string, y: string) => {
        if (d && m && y) {
            const formattedDate = `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
            onChange(formattedDate);
        } else {
            onChange("");
        }
    };

    // Check if date components are valid
    const isDateValid = day && month && year && isValidDate(`${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`);
    const isDateComplete = day && month && year;

    return (
        <div className={`space-y-3 ${className}`}>
            {/* Date Selectors */}
            <div className="grid grid-cols-3 gap-3">
                {/* Day Selector */}
                <div>
                    <label className="block text-xs text-gray-600 mb-1">
                        Ngày
                    </label>
                    <select
                        id={`${id}-day`}
                        value={day}
                        onChange={handleDayChange}
                        disabled={disabled}
                        className={`w-full h-10 px-3 rounded-md border focus:ring-2 focus:ring-blue-500 outline-none text-black bg-white ${error ? 'border-red-500' : 'border-gray-300'
                            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <option value="">--</option>
                        {getDayOptions()?.map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

                {/* Month Selector */}
                <div>
                    <label className="block text-xs text-gray-600 mb-1">
                        Tháng
                    </label>
                    <select
                        id={`${id}-month`}
                        value={month}
                        onChange={handleMonthChange}
                        disabled={disabled}
                        className={`w-full h-10 px-3 rounded-md border focus:ring-2 focus:ring-blue-500 outline-none text-black bg-white ${error ? 'border-red-500' : 'border-gray-300'
                            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <option value="">------</option>
                        {getMonthOptions()?.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>

                {/* Year Selector */}
                <div>
                    <label className="block text-xs text-gray-600 mb-1">
                        Năm
                    </label>
                    <select
                        id={`${id}-year`}
                        value={year}
                        onChange={handleYearChange}
                        disabled={disabled}
                        className={`w-full h-10 px-3 rounded-md border focus:ring-2 focus:ring-blue-500 outline-none text-black bg-white ${error ? 'border-red-500' : 'border-gray-300'
                            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <option value="">----</option>
                        {getYearOptions()?.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Quick Year Selection */}
            <div className="border-t pt-3">
                <p className="text-xs text-gray-600 mb-2">Chọn nhanh theo thế hệ:</p>
                <div className="flex flex-wrap gap-2">
                    {getQuickYearOptions()?.map(({ range, label, year }) => (
                        <button
                            key={year}
                            type="button"
                            onClick={() => {
                                setYear(year.toString());
                                updateValue(day, month, year.toString());
                            }}
                            className="px-2 py-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded transition-colors"
                        >
                            {label} ({range})
                        </button>
                    ))}
                </div>
            </div>

            {/* Helper text */}
            <p className="text-xs text-gray-500">
                Chọn ngày, tháng và năm sinh của bạn
            </p>

            {/* Display selected date */}
            {isDateComplete && (
                <div className="flex items-center justify-between">
                    {isDateValid ? (
                        <p className="text-xs text-green-600 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Ngày sinh: {day}/{month}/{year}
                        </p>
                    ) : (
                        <p className="text-xs text-red-600 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Ngày không hợp lệ
                        </p>
                    )}

                    {isDateComplete && (
                        <button
                            type="button"
                            onClick={() => {
                                setDay("");
                                setMonth("");
                                setYear("");
                                onChange("");
                            }}
                            className="text-xs text-gray-500 hover:text-red-600 underline"
                        >
                            Xóa
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}