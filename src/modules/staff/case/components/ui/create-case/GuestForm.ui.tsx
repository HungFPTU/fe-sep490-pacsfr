"use client";

import React from "react";
import { Card } from "@/shared/components/ui/card.ui";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/ui/input.ui";
import { User, Calendar, Check, FileText } from "lucide-react";
import type { CreateGuestRequest } from "../../../../dashboard/types";

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
    return (
        <div className="space-y-6">
            {/* Success State */}
            {isSuccess && guestId && onContinueToCase && onFinish && (
                <Card className="p-6 bg-green-50 border-green-200">
                    <div className="flex items-start gap-4">
                        <Check className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-green-900 mb-2">
                                Tạo khách hàng thành công!
                            </h3>
                            <p className="text-sm text-green-700 mb-4">
                                Guest ID: <span className="font-mono font-semibold">{guestId}</span>
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    onClick={onContinueToCase}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    <FileText className="w-4 h-4 mr-2" />
                                    Tiếp tục tạo hồ sơ
                                </Button>
                                <Button
                                    onClick={onFinish}
                                    variant="outline"
                                    className="border-green-600 text-green-600 hover:bg-green-50"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                placeholder="VD: 03603636363636"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                placeholder="VD: 036633663"
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
                                placeholder="VD: example@thanhhoa.com"
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
                                placeholder="VD: Trường XYZ"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                    {/* Row 9: Ward, City, Country */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phường/Xã
                            </label>
                            <Input
                                value={guestData.ward}
                                onChange={(e) => onDataChange({ ...guestData, ward: e.target.value })}
                                placeholder="VD: Phường Đông Thọ"
                                disabled={isSuccess}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tỉnh/Thành phố
                            </label>
                            <Input
                                value={guestData.city}
                                onChange={(e) => onDataChange({ ...guestData, city: e.target.value })}
                                placeholder="VD: Thanh Hóa"
                                disabled={isSuccess}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quốc gia
                            </label>
                            <Input
                                value={guestData.country}
                                onChange={(e) => onDataChange({ ...guestData, country: e.target.value })}
                                placeholder="VD: Việt Nam"
                                disabled={isSuccess}
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
                                className="bg-blue-600 hover:bg-blue-700"
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

