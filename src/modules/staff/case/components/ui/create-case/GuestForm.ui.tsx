"use client";

import React, { useMemo } from "react";
import { Card } from "@/shared/components/ui/card.ui";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/ui/input.ui";
import { Select } from "@/shared/components/ui/select.ui";
import { User, Calendar, Check, FileText } from "lucide-react";
import type { CreateGuestRequest } from "../../../../dashboard/types";
import { useProvinces, useDistricts, useWards } from "../../../hooks";
import { getProvinceById, getDistrictById, getWardById } from "../../../constants/vietnam-address";

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
                    {/* Row 1: Guest Code, Full Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mã khách hàng <span className="text-red-500">*</span>
                            </label>
                            <Input
                                value={guestData.guestCode}
                                onChange={(e) => onDataChange({ ...guestData, guestCode: e.target.value })}
                                placeholder="VD: KH003"
                                className={errors.guestCode ? "border-red-500" : ""}
                                disabled={isSuccess}
                            />
                            {errors.guestCode && <p className="text-xs text-red-500 mt-1">{errors.guestCode}</p>}
                        </div>

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
                                Số CMND/CCCD <span className="text-red-500">*</span>
                            </label>
                            <Input
                                value={guestData.idNumber}
                                onChange={(e) => onDataChange({ ...guestData, idNumber: e.target.value })}
                                placeholder="VD: 023..."
                                className={errors.idNumber ? "border-red-500" : ""}
                                disabled={isSuccess}
                            />
                            {errors.idNumber && <p className="text-xs text-red-500 mt-1">{errors.idNumber}</p>}
                        </div>
                    </div>

                    {/* Row 3: ID Issue Date, ID Issue Place */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Calendar className="w-4 h-4 inline mr-1" />
                                Ngày cấp <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={guestData.idIssueDate}
                                onChange={(e) => onDataChange({ ...guestData, idIssueDate: e.target.value })}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.idIssueDate ? "border-red-500" : "border-gray-300"
                                }`}
                                disabled={isSuccess}
                            />
                            {errors.idIssueDate && <p className="text-xs text-red-500 mt-1">{errors.idIssueDate}</p>}
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

                    {/* Row 4: Birth Date, Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Calendar className="w-4 h-4 inline mr-1" />
                                Ngày sinh <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={guestData.birthDate}
                                onChange={(e) => onDataChange({ ...guestData, birthDate: e.target.value })}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.birthDate ? "border-red-500" : "border-gray-300"
                                }`}
                                disabled={isSuccess}
                            />
                            {errors.birthDate && <p className="text-xs text-red-500 mt-1">{errors.birthDate}</p>}
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

                    {/* Row 9: Province, District, Ward */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tỉnh/Thành phố
                            </label>
                            <Select
                                value={
                                    provinces.find((p: any) => p.name === guestData.city)?.id || ""
                                }
                                onChange={(e) => handleProvinceChange(e.target.value)}
                                options={provinceOptions}
                                placeholder="Chọn tỉnh/thành phố"
                                disabled={isSuccess}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quận/Huyện
                            </label>
                            <Select
                                value={
                                    districts.find((d: any) => d.name === guestData.ward)?.id || ""
                                }
                                onChange={(e) => handleDistrictChange(e.target.value)}
                                options={districtOptions}
                                placeholder={
                                    !guestData.city
                                        ? "Chọn tỉnh/thành phố trước"
                                        : districtOptions.length > 0
                                          ? `Chọn quận/huyện (${districtOptions.length})`
                                          : "Không có dữ liệu"
                                }
                                disabled={isSuccess || !guestData.city || districtOptions.length === 0}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phường/Xã
                            </label>
                            <Select
                                value={
                                    wards.find((w: any) => w.name === guestData.country)?.id || ""
                                }
                                onChange={(e) => handleWardChange(e.target.value)}
                                options={wardOptions}
                                placeholder={
                                    !guestData.ward
                                        ? "Chọn quận/huyện trước"
                                        : wardOptions.length > 0
                                          ? `Chọn phường/xã (${wardOptions.length})`
                                          : "Không có dữ liệu"
                                }
                                disabled={isSuccess || !guestData.ward || wardOptions.length === 0}
                            />
                        </div>
                    </div>

                    {/* Row 10: Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ghi chú
                        </label>
                        <textarea
                            value={guestData.notes}
                            onChange={(e) => onDataChange({ ...guestData, notes: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Thêm ghi chú nếu cần..."
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

