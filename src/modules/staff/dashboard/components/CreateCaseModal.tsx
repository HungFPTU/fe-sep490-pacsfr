"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/shared/components/ui/card.ui";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/ui/input.ui";
import { staffDashboardService } from "../services/staff-dashboard.service";
import { staffDashboardApi } from "../api/staff-dashboard.api";
import type { CreateCaseRequest, Service } from "../types";
import { X, FileText, User, Briefcase, AlertCircle, FileCheck, Search, ChevronDown } from "lucide-react";

interface CreateCaseModalProps {
    onClose: () => void;
    onSuccess?: (caseId: string) => void;
    defaultCreatedBy?: string;
}

export function CreateCaseModal({ onClose, onSuccess, defaultCreatedBy }: CreateCaseModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const [formData, setFormData] = useState<CreateCaseRequest>({
        guestId: "",
        serviceId: "",
        priorityLevel: 0,
        submissionMethod: "Trực tiếp",
        notes: "",
        createdBy: defaultCreatedBy || "",
    });

    // Service search states
    const [services, setServices] = useState<Service[]>([]);
    const [isLoadingServices, setIsLoadingServices] = useState(false);
    const [serviceSearchKeyword, setServiceSearchKeyword] = useState("");
    const [showServiceDropdown, setShowServiceDropdown] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const priorityLevels = [
        { value: 0, label: "Bình thường", color: "text-gray-600" },
        { value: 2, label: "Ưu tiên thấp", color: "text-blue-600" },
        { value: 5, label: "Ưu tiên trung bình", color: "text-yellow-600" },
        { value: 8, label: "Ưu tiên cao", color: "text-orange-600" },
        { value: 10, label: "Khẩn cấp", color: "text-red-600" },
    ];

    const submissionMethods = [
        "Trực tiếp",
        "Online",
        "Email",
        "Điện thoại",
        "Bưu điện",
    ];

    // Load services
    const loadServices = useCallback(async (keyword: string = "", page: number = 1) => {
        setIsLoadingServices(true);
        try {
            const response = await staffDashboardApi.getServices({
                keyword: keyword || undefined,
                isActive: true,
                page,
                size: 10,
            });

            if (response.success && response.data) {
                setServices(response.data.items.$values || []);
                setTotalPages(response.data.totalPages);
                setCurrentPage(response.data.page);
            }
        } catch (error) {
            console.error("Error loading services:", error);
        } finally {
            setIsLoadingServices(false);
        }
    }, []);

    // Load services on mount
    useEffect(() => {
        loadServices();
    }, [loadServices]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (showServiceDropdown) {
                loadServices(serviceSearchKeyword, 1);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [serviceSearchKeyword, showServiceDropdown, loadServices]);

    const handleServiceSelect = (service: Service) => {
        setSelectedService(service);
        setFormData({ ...formData, serviceId: service.id });
        setServiceSearchKeyword(service.serviceName);
        setShowServiceDropdown(false);
        // Clear error
        if (errors.serviceId) {
            const newErrors = { ...errors };
            delete newErrors.serviceId;
            setErrors(newErrors);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.guestId.trim()) {
            newErrors.guestId = "Guest ID là bắt buộc";
        }
        if (!formData.serviceId.trim()) {
            newErrors.serviceId = "Service ID là bắt buộc";
        }
        if (!formData.createdBy.trim()) {
            newErrors.createdBy = "Người tạo là bắt buộc";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const caseResponse = await staffDashboardService.createCase(formData);
            alert(`Tạo hồ sơ thành công! ID: ${caseResponse.id}`);
            if (onSuccess) {
                onSuccess(caseResponse.id);
            }
            onClose();
        } catch (error) {
            console.error("Error creating case:", error);
            if (error instanceof Error) {
                alert(`Lỗi: ${error.message}`);
            } else {
                alert("Có lỗi xảy ra khi tạo hồ sơ");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: keyof CreateCaseRequest, value: string | number) => {
        setFormData({ ...formData, [field]: value });
        // Clear error when user starts typing
        if (errors[field]) {
            const newErrors = { ...errors };
            delete newErrors[field];
            setErrors(newErrors);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Tạo hồ sơ mới</h2>
                            <p className="text-sm text-gray-600">Nhập thông tin hồ sơ cho công dân</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Guest ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Guest ID <span className="text-red-500">*</span>
                            </div>
                        </label>
                        <Input
                            placeholder="Nhập Guest ID (UUID)"
                            value={formData.guestId}
                            onChange={(e) => handleInputChange("guestId", e.target.value)}
                            className={errors.guestId ? 'border-red-500' : ''}
                        />
                        {errors.guestId && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.guestId}
                            </p>
                        )}
                    </div>

                    {/* Service Selection with Search */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4" />
                                Dịch vụ <span className="text-red-500">*</span>
                            </div>
                        </label>
                        
                        {/* Search Input */}
                        <div className="relative">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm dịch vụ..."
                                    value={serviceSearchKeyword}
                                    onChange={(e) => setServiceSearchKeyword(e.target.value)}
                                    onFocus={() => setShowServiceDropdown(true)}
                                    className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                                        errors.serviceId ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                <ChevronDown 
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer"
                                    onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                                />
                            </div>

                            {/* Dropdown */}
                            {showServiceDropdown && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-auto">
                                    {isLoadingServices ? (
                                        <div className="p-4 text-center text-gray-500">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mx-auto"></div>
                                            <p className="mt-2 text-sm">Đang tải...</p>
                                        </div>
                                    ) : services.length === 0 ? (
                                        <div className="p-4 text-center text-gray-500">
                                            <p className="text-sm">Không tìm thấy dịch vụ</p>
                                        </div>
                                    ) : (
                                        <>
                                            {services.map((service) => (
                                                <div
                                                    key={service.id}
                                                    onClick={() => handleServiceSelect(service)}
                                                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <p className="font-medium text-gray-900">{service.serviceName}</p>
                                                                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                                                                    {service.serviceCode}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                                                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                                                                <span>⏱️ {service.processingTime}</span>
                                                                <span>💰 {service.feeAmount.toLocaleString('vi-VN')} VNĐ</span>
                                                                <span className={`px-2 py-0.5 rounded ${
                                                                    service.serviceType === 'Trực tiếp' 
                                                                        ? 'bg-green-100 text-green-700' 
                                                                        : 'bg-purple-100 text-purple-700'
                                                                }`}>
                                                                    {service.serviceType}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Pagination */}
                                            {totalPages > 1 && (
                                                <div className="p-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                                                    <button
                                                        type="button"
                                                        onClick={() => loadServices(serviceSearchKeyword, currentPage - 1)}
                                                        disabled={currentPage === 1}
                                                        className="text-sm px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        Trước
                                                    </button>
                                                    <span className="text-sm text-gray-600">
                                                        Trang {currentPage} / {totalPages}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => loadServices(serviceSearchKeyword, currentPage + 1)}
                                                        disabled={currentPage === totalPages}
                                                        className="text-sm px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        Sau
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Selected Service Display */}
                        {selectedService && (
                            <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-green-900">
                                            ✓ Đã chọn: {selectedService.serviceName}
                                        </p>
                                        <p className="text-xs text-green-700 mt-1">
                                            Mã: {selectedService.serviceCode} • {selectedService.processingTime} • {selectedService.feeAmount.toLocaleString('vi-VN')} VNĐ
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedService(null);
                                            setFormData({ ...formData, serviceId: "" });
                                            setServiceSearchKeyword("");
                                        }}
                                        className="text-green-600 hover:text-green-800"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {errors.serviceId && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.serviceId}
                            </p>
                        )}
                    </div>

                    {/* Priority Level */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <FileCheck className="w-4 h-4" />
                                Mức độ ưu tiên
                            </div>
                        </label>
                        <select
                            value={formData.priorityLevel}
                            onChange={(e) => handleInputChange("priorityLevel", parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            {priorityLevels.map((level) => (
                                <option key={level.value} value={level.value}>
                                    {level.label} ({level.value})
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                            Mức độ: {staffDashboardService.getPriorityLevelText(formData.priorityLevel)}
                        </p>
                    </div>

                    {/* Submission Method */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phương thức nộp <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.submissionMethod}
                            onChange={(e) => handleInputChange("submissionMethod", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            {submissionMethods.map((method) => (
                                <option key={method} value={method}>
                                    {method}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Created By */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Người tạo <span className="text-red-500">*</span>
                        </label>
                        <Input
                            placeholder="Nhập tên người tạo"
                            value={formData.createdBy}
                            onChange={(e) => handleInputChange("createdBy", e.target.value)}
                            className={errors.createdBy ? 'border-red-500' : ''}
                        />
                        {errors.createdBy && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.createdBy}
                            </p>
                        )}
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ghi chú
                        </label>
                        <textarea
                            placeholder="Nhập ghi chú (tùy chọn)"
                            value={formData.notes}
                            onChange={(e) => handleInputChange("notes", e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Đang tạo...
                                </>
                            ) : (
                                <>
                                    <FileText className="w-4 h-4 mr-2" />
                                    Tạo hồ sơ
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

