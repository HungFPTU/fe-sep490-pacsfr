"use client";

import React, { useMemo, useState } from "react";
import { Card } from "@/shared/components/ui/card.ui";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/ui/input.ui";
import { Select } from "@/shared/components/ui/select.ui";
import { User, Calendar, Check, FileText, ScanLine, X } from "lucide-react";
import type { CreateGuestRequest } from "../../../../dashboard/types";
import { useProvinces, useDistricts, useWards } from "../../../hooks";
import { getProvinceById, getDistrictById, getWardById } from "../../../constants/vietnam-address";

// Helper function to format date from yyyy-mm-dd to dd/mm/yyyy
const formatDateDisplay = (dateString: string): string => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
};

// Helper function to convert dd/mm/yyyy to yyyy-mm-dd
const formatDateToISO = (dateValue: string): string => {
    if (!dateValue) return "";
    const parts = dateValue.split("/");
    if (parts.length !== 3) return "";
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
};

// Helper function to convert yyyy-mm-dd to dd/mm/yyyy
const formatISOToDate = (isoValue: string): string => {
    if (!isoValue) return "";
    const datePart = isoValue.substring(0, 10);
    const [year, month, day] = datePart.split("-");
    return `${day}/${month}/${year}`;
};

// DatePickerCalendar component with year and month selector
const DatePickerCalendar: React.FC<{
    value: string;
    onChange: (date: string) => void;
    onClose: () => void;
}> = ({ value, onChange, onClose }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showYearSelector, setShowYearSelector] = useState(false);
    const [showMonthSelector, setShowMonthSelector] = useState(false);
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

    const getDisplayDate = () => {
        if (value) {
            const parts = value.split("/");
            if (parts.length === 3) {
                const [day, month, year] = parts;
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
        const dd = String(selected.getDate()).padStart(2, "0");
        const mm = String(selected.getMonth() + 1).padStart(2, "0");
        const yyyy = selected.getFullYear();
        onChange(`${dd}/${mm}/${yyyy}`);
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
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-20 p-3 w-96">
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
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((day, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => day && handleSelectDate(day)}
                                disabled={!day}
                                className={`w-10 h-10 text-sm rounded hover:bg-blue-100 disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-colors ${day === displayDate.getDate() && currentDate.getMonth() === displayDate.getMonth()
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
                                        className={`px-3 py-2 rounded text-sm font-medium transition-colors ${year === selectedYear
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
                                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${index === selectedMonth
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

interface GuestFormProps {
    guestData: CreateGuestRequest;
    errors: Record<string, string>;
    isSubmitting: boolean;
    isSuccess: boolean;
    guestId?: string;
    idTypes: string[];
    genders: string[];
    guestTypes: string[];
    onDataChange: (data: CreateGuestRequest) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    onContinueToCase?: () => void;
    onFinish?: () => void;
}

export function GuestForm({
    guestData,
    errors,
    isSubmitting,
    isSuccess,
    guestId,
    idTypes,
    genders,
    guestTypes,
    onDataChange,
    onSubmit,
    onCancel,
    onContinueToCase,
    onFinish,
}: GuestFormProps) {
    // Store IDs for cascading lookup in state-like refs
    // We need to track selected IDs separately to properly cascade
    const [selectedProvinceId, setSelectedProvinceId] = React.useState<string>("");
    const [selectedDistrictId, setSelectedDistrictId] = React.useState<string>("");
    const [showBirthDatePicker, setShowBirthDatePicker] = React.useState(false);
    const [showIdIssueDatePicker, setShowIdIssueDatePicker] = React.useState(false);

    // QR Scanner State
    const [isScanMode, setIsScanMode] = useState(false);
    const cccdInputRef = React.useRef<HTMLInputElement>(null);

    // Activate Scanner
    const handleActivateScanner = () => {
        setIsScanMode(true);
        // Delay slightly to ensure render, though React 18 usually handles this well
        setTimeout(() => {
            if (cccdInputRef.current) {
                cccdInputRef.current.focus();
                cccdInputRef.current.select();
            }
        }, 100);
    };

    // Deactivate Scanner
    const handleDeactivateScanner = () => {
        setIsScanMode(false);
    };

    // Handle CCCD Input Change with Parsing Logic
    const handleCCCDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Check for QR code pattern (contains pipes)
        // Format: ID|OldID|Name|DOB|Gender|Address|Date
        // Example: 046201000152||Võ Việt Dũng|30072001|Nam|Address...|Date...
        if (isScanMode && value.includes("|")) {
            const parts = value.split("|");
            // Basic validation - check if we have enough parts
            // Some cards might differ slightly but usually have at least 6 parts
            if (parts.length >= 6) {
                const idNumber = parts[0] || "";
                const fullName = parts[2] || "";
                const dobRaw = parts[3] || "";
                const genderRaw = parts[4] || "";
                const address = parts[5] || "";

                // Parse Date of Birth (ddmmyyyy -> yyyy-mm-dd)
                let birthDate = guestData.birthDate;
                if (dobRaw.length === 8) {
                    const day = dobRaw.substring(0, 2);
                    const month = dobRaw.substring(2, 4);
                    const year = dobRaw.substring(4, 8);
                    birthDate = `${year}-${month}-${day}`;
                }

                // Map Gender (assuming raw is "Nam" or "Nữ", matching select values)
                const gender = genderRaw;

                // Parse Issue Date (last part of string)
                // Format: ddmmyyyy -> yyyy-mm-dd
                const issueDateRaw = parts[parts.length - 1] || "";
                let idIssueDate = guestData.idIssueDate;
                if (issueDateRaw.length === 8) {
                    const day = issueDateRaw.substring(0, 2);
                    const month = issueDateRaw.substring(2, 4);
                    const year = issueDateRaw.substring(4, 8);
                    idIssueDate = `${year}-${month}-${day}`;
                }

                // Hardcode Issue Place
                const idIssuePlace = "CỤC TRƯỞNG CỤC CẢNH SÁT QUẢN LÝ HÀNH CHÍNH VỀ TRẬT TỰ XÃ HỘI";

                const newData = {
                    ...guestData,
                    idNumber,
                    fullName,
                    birthDate,
                    gender,
                    address,
                    idIssuePlace,
                    idIssueDate,
                };

                onDataChange(newData);
                setIsScanMode(false);
                return;
            }
        }

        // Normal input behavior
        onDataChange({ ...guestData, idNumber: value });
    };

    // Fetch Vietnam address data
    const { data: provinces } = useProvinces();
    const { data: districts } = useDistricts(selectedProvinceId || undefined);
    const { data: wards } = useWards(selectedDistrictId || undefined);

    // Convert to select options
    const provinceOptions = useMemo(
        () => provinces.map((p: any) => ({ value: p.id, label: p.name })),
        [provinces]
    );

    const districtOptions = useMemo(
        () => districts.map((d: any) => ({ value: d.id, label: d.name })),
        [districts]
    );

    const wardOptions = useMemo(
        () => wards.map((w: any) => ({ value: w.id, label: w.name })),
        [wards]
    );

    // Handle province change
    const handleProvinceChange = (proId: string) => {
        const selectedProvince = provinces.find((p: any) => p.id === proId);
        setSelectedProvinceId(proId);
        setSelectedDistrictId(""); // Reset district ID
        onDataChange({
            ...guestData,
            city: selectedProvince?.name || "", // Store province name for display
            ward: "", // Reset district name
            country: "", // Reset ward name
        });
    };

    // Handle district change
    const handleDistrictChange = (distId: string) => {
        const selectedDistrict = districts.find((d: any) => d.id === distId);
        setSelectedDistrictId(distId);
        onDataChange({
            ...guestData,
            ward: selectedDistrict?.name || "", // Store district name for display
            country: "", // Reset ward name
        });
    };

    // Handle ward change
    const handleWardChange = (wId: string) => {
        const selectedWard = wards.find((w: any) => w.id === wId);
        onDataChange({
            ...guestData,
            country: selectedWard?.name || "", // Store ward name for display
        });
    };

    return (
        <div className="space-y-6">
            {/* QR Scanner Control Bar */}
            {!isSuccess && (
                <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <ScanLine className="w-5 h-5 text-indigo-600" />
                                Quét mã QR CCCD
                            </h3>
                            <p className="text-sm text-gray-500">
                                Kích hoạt chế độ quét để tự động điền thông tin từ thẻ CCCD gắn chip
                            </p>
                        </div>

                        {isScanMode ? (
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <div className="flex-1 md:flex-none px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 flex items-center gap-2 animate-pulse font-medium">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
                                    Đang chờ quét...
                                </div>
                                <Button
                                    onClick={handleDeactivateScanner}
                                    variant="outline"
                                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                >
                                    <X className="w-4 h-4 mr-1" />
                                    Hủy
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={handleActivateScanner}
                                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all transform hover:scale-105"
                            >
                                <ScanLine className="w-4 h-4 mr-2" />
                                Kích hoạt máy quét
                            </Button>
                        )}
                    </div>
                </div>
            )}
            {/* Success State */}
            {isSuccess && guestId && onContinueToCase && onFinish && (
                <Card className="p-6 bg-blue-50 border-blue-200">
                    <div className="flex items-start gap-4">
                        <Check className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-blue-900 mb-2">
                                Tạo khách hàng thành công!
                            </h3>

                            <div className="flex gap-3">
                                <Button
                                    onClick={onContinueToCase}
                                    className="bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <FileText className="w-4 h-4 mr-2" />
                                    Tiếp tục tạo hồ sơ
                                </Button>
                                <Button
                                    onClick={onFinish}
                                    variant="outline"
                                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    <Check className="w-4 h-4 mr-2" />
                                    Hoàn thành
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {/* Guest Form */}
            <Card className="p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <User className="w-6 h-6 text-blue-600" />
                        Thông tin khách hàng
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">Vui lòng điền đầy đủ thông tin</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    {/* Row 1: Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={guestData.fullName}
                            onChange={(e) => onDataChange({ ...guestData, fullName: e.target.value })}
                            placeholder="Nhập họ tên đầy đủ"
                            className={errors.fullName ? "border-red-500" : ""}
                            disabled={isSuccess}
                        />
                        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Row 2: ID Type, ID Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Loại giấy tờ <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={guestData.idType}
                                onChange={(e) => onDataChange({ ...guestData, idType: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={isSuccess}
                            >
                                {idTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Số CCCD <span className="text-red-500">*</span>
                            </label>
                            <Input
                                ref={cccdInputRef}
                                value={guestData.idNumber}
                                onChange={handleCCCDChange}
                                placeholder={isScanMode ? "Đang đợt dữ liệu quét..." : "VD: 023..."}
                                className={`${errors.idNumber ? "border-red-500" : ""
                                    } ${isScanMode
                                        ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50 transition-all duration-300" // Highlight style
                                        : ""
                                    }`}
                                disabled={isSuccess}
                            />
                            {errors.idNumber && <p className="text-xs text-red-500 mt-1">{errors.idNumber}</p>}
                        </div>
                    </div>

                    {/* Row 3: Birth Date, ID Issue Place */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Calendar className="w-4 h-4 inline mr-1" />
                                Ngày sinh <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={formatISOToDate(guestData.birthDate || '')}
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
                                                    const isoDate = formatDateToISO(formatted);
                                                    onDataChange({ ...guestData, birthDate: isoDate });
                                                }
                                            }
                                        }}
                                        placeholder="dd/mm/yyyy"
                                        maxLength={10}
                                        className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.birthDate ? "border-red-500" : "border-gray-300"
                                            }`}
                                        disabled={isSuccess}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowBirthDatePicker(!showBirthDatePicker)}
                                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                        title="Chọn từ lịch"
                                        disabled={isSuccess}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                                {showBirthDatePicker && (
                                    <DatePickerCalendar
                                        value={formatISOToDate(guestData.birthDate || '')}
                                        onChange={(date) => {
                                            const isoDate = formatDateToISO(date);
                                            onDataChange({ ...guestData, birthDate: isoDate });
                                        }}
                                        onClose={() => setShowBirthDatePicker(false)}
                                    />
                                )}
                            </div>
                            {errors.birthDate && <p className="text-xs text-red-500 mt-1">{errors.birthDate}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nơi cấp <span className="text-red-500">*</span>
                            </label>
                            <Input
                                value={guestData.idIssuePlace}
                                onChange={(e) => onDataChange({ ...guestData, idIssuePlace: e.target.value })}
                                placeholder="VD: Cục Cảnh sát..."
                                className={errors.idIssuePlace ? "border-red-500" : ""}
                                disabled={isSuccess}
                            />
                            {errors.idIssuePlace && <p className="text-xs text-red-500 mt-1">{errors.idIssuePlace}</p>}
                        </div>
                    </div>

                    {/* Row 4: ID Issue Date, Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Calendar className="w-4 h-4 inline mr-1" />
                                Ngày hết hạn <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={formatISOToDate(guestData.idIssueDate || '')}
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
                                                    const isoDate = formatDateToISO(formatted);
                                                    onDataChange({ ...guestData, idIssueDate: isoDate });
                                                }
                                            }
                                        }}
                                        placeholder="dd/mm/yyyy"
                                        maxLength={10}
                                        className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${errors.idIssueDate ? "border-red-500" : "border-gray-300"
                                            }`}
                                        disabled={isSuccess}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowIdIssueDatePicker(!showIdIssueDatePicker)}
                                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                        title="Chọn từ lịch"
                                        disabled={isSuccess}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                                {showIdIssueDatePicker && (
                                    <DatePickerCalendar
                                        value={formatISOToDate(guestData.idIssueDate || '')}
                                        onChange={(date) => {
                                            const isoDate = formatDateToISO(date);
                                            onDataChange({ ...guestData, idIssueDate: isoDate });
                                        }}
                                        onClose={() => setShowIdIssueDatePicker(false)}
                                    />
                                )}
                            </div>
                            {errors.idIssueDate && <p className="text-xs text-red-500 mt-1">{errors.idIssueDate}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Giới tính <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={guestData.gender}
                                onChange={(e) => onDataChange({ ...guestData, gender: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={isSuccess}
                            >
                                {genders.map(gender => (
                                    <option key={gender} value={gender}>{gender}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Row 5: Phone, Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Số điện thoại <span className="text-red-500">*</span>
                            </label>
                            <Input
                                value={guestData.phone}
                                onChange={(e) => onDataChange({ ...guestData, phone: e.target.value })}
                                placeholder="VD: 0905123456"
                                className={errors.phone ? "border-red-500" : ""}
                                disabled={isSuccess}
                            />
                            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="email"
                                value={guestData.email}
                                onChange={(e) => onDataChange({ ...guestData, email: e.target.value })}
                                placeholder="VD: example@mail.com"
                                className={errors.email ? "border-red-500" : ""}
                                disabled={isSuccess}
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    {/* Row 6: Occupation, Organization */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nghề nghiệp
                            </label>
                            <Input
                                value={guestData.occupation}
                                onChange={(e) => onDataChange({ ...guestData, occupation: e.target.value })}
                                placeholder="VD: Giáo viên"
                                disabled={isSuccess}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tổ chức
                            </label>
                            <Input
                                value={guestData.organization}
                                onChange={(e) => onDataChange({ ...guestData, organization: e.target.value })}
                                placeholder="VD: Cơ quan..."
                                disabled={isSuccess}
                            />
                        </div>
                    </div>

                    {/* Row 7: Guest Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Loại khách hàng <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={guestData.guestType}
                            onChange={(e) => onDataChange({ ...guestData, guestType: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={isSuccess}
                        >
                            {guestTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Row 8: Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Địa chỉ
                        </label>
                        <Input
                            value={guestData.address}
                            onChange={(e) => onDataChange({ ...guestData, address: e.target.value })}
                            placeholder="Số nhà, tên đường"
                            disabled={isSuccess}
                        />
                    </div>



                    {/* Submit Button */}
                    {!isSuccess && (
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                disabled={isSubmitting}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-indigo-600 hover:bg-indigo-700"
                            >
                                {isSubmitting ? "Đang xử lý..." : "Tạo khách hàng"}
                            </Button>
                        </div>
                    )}
                </form>
            </Card>
        </div>
    );
}

