"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/shared/components/ui/card.ui";
import { Button } from "@/shared/components/ui/button.ui";
import { staffDashboardApi } from "../../api/staff-dashboard.api";
import type { CreateGuestRequest, CreateCaseRequest, Guest, Service } from "../../types";
import { ArrowLeft, FileText } from "lucide-react";

// UI Components
import {
    ModeSelector,
    GuestForm,
    GuestSearchForm,
    ServiceSelector,
    CaseFormFields,
} from "../ui/create-case";

type PageMode = "select" | "create-guest" | "create-case";

export function CreateCasePageView() {
    const router = useRouter();
    const [mode, setMode] = useState<PageMode>("select");
    const [guestId, setGuestId] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [guestCreatedSuccess, setGuestCreatedSuccess] = useState(false);

    // Guest Form Data
    const [guestData, setGuestData] = useState<CreateGuestRequest>({
        guestCode: "",
        fullName: "",
        idNumber: "",
        idType: "CCCD",
        idIssueDate: "",
        idIssuePlace: "",
        phone: "",
        email: "",
        birthDate: "",
        gender: "Nam",
        occupation: "",
        organization: "",
        guestType: "Cá nhân",
        notes: "",
        address: "",
        ward: "",
        city: "",
        country: "Việt Nam",
    });

    // Case Form Data
    const [caseData, setCaseData] = useState<CreateCaseRequest>({
        guestId: "",
        serviceId: "",
        priorityLevel: 0,
        submissionMethod: "Trực tiếp",
        notes: "",
        createdBy: "",
    });

    // Guest Search
    const [guestSearchKeyword, setGuestSearchKeyword] = useState("");
    const [guestSearchResults, setGuestSearchResults] = useState<Guest[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
    const [showGuestDropdown, setShowGuestDropdown] = useState(false);

    // Service Search
    const [serviceSearchKeyword, setServiceSearchKeyword] = useState("");
    const [serviceSearchResults, setServiceSearchResults] = useState<Service[]>([]);
    const [isSearchingService, setIsSearchingService] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [showServiceDropdown, setShowServiceDropdown] = useState(false);

    const idTypes = ["CCCD", "CMND", "Hộ chiếu"];
    const genders = ["Nam", "Nữ", "Khác"];
    const guestTypes = ["Cá nhân", "Tổ chức"];
    const submissionMethods = ["Trực tiếp", "Online", "Qua điện thoại", "Qua email"];
    const priorityLevels = [
        { value: 0, label: "Bình thường" },
        { value: 2, label: "Ưu tiên thấp" },
        { value: 5, label: "Ưu tiên trung bình" },
        { value: 8, label: "Ưu tiên cao" },
        { value: 10, label: "Khẩn cấp" },
    ];

    const validateGuestForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!guestData.guestCode.trim()) newErrors.guestCode = "Mã khách hàng là bắt buộc";
        if (!guestData.fullName.trim()) newErrors.fullName = "Họ tên là bắt buộc";
        if (!guestData.idNumber.trim()) newErrors.idNumber = "Số CMND/CCCD là bắt buộc";
        if (!guestData.idIssueDate) newErrors.idIssueDate = "Ngày cấp là bắt buộc";
        if (!guestData.idIssuePlace.trim()) newErrors.idIssuePlace = "Nơi cấp là bắt buộc";
        if (!guestData.phone.trim()) newErrors.phone = "Số điện thoại là bắt buộc";
        if (!guestData.email.trim()) newErrors.email = "Email là bắt buộc";
        if (!guestData.birthDate) newErrors.birthDate = "Ngày sinh là bắt buộc";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSearchGuests = async () => {
        if (!guestSearchKeyword.trim()) {
            alert("Vui lòng nhập từ khóa tìm kiếm!");
            return;
        }

        setIsSearching(true);
        try {
            const response = await staffDashboardApi.getGuests({
                keyword: guestSearchKeyword,
                isActive: true,
                page: 1,
                size: 20
            });

            if (response.success && response.data.$values) {
                setGuestSearchResults(response.data.$values);
                setShowGuestDropdown(true);
            } else {
                setGuestSearchResults([]);
                alert("Không tìm thấy khách hàng nào!");
            }
        } catch (error) {
            console.error("Error searching guests:", error);
            alert("Lỗi khi tìm kiếm: " + (error instanceof Error ? error.message : "Vui lòng thử lại!"));
        } finally {
            setIsSearching(false);
        }
    };

    const handleSelectGuest = (guest: Guest) => {
        setSelectedGuest(guest);
        setCaseData({ ...caseData, guestId: guest.id });
        setGuestSearchKeyword(`${guest.fullName} - ${guest.idNumber}`);
        setShowGuestDropdown(false);
    };

    const handleSearchServices = async () => {
        if (!serviceSearchKeyword.trim()) {
            alert("Vui lòng nhập từ khóa tìm kiếm dịch vụ!");
            return;
        }

        setIsSearchingService(true);
        try {
            const response = await staffDashboardApi.getServices({
                keyword: serviceSearchKeyword,
                isActive: true,
                page: 1,
                size: 20
            });

            if (response.success && response.data?.items?.$values) {
                setServiceSearchResults(response.data.items.$values);
                setShowServiceDropdown(true);
            } else {
                setServiceSearchResults([]);
                alert("Không tìm thấy dịch vụ nào!");
            }
        } catch (error) {
            console.error("Error searching services:", error);
            alert("Lỗi khi tìm kiếm dịch vụ: " + (error instanceof Error ? error.message : "Vui lòng thử lại!"));
        } finally {
            setIsSearchingService(false);
        }
    };

    const handleSelectService = (service: Service) => {
        setSelectedService(service);
        setCaseData({ ...caseData, serviceId: service.id });
        setServiceSearchKeyword(`${service.serviceName} - ${service.serviceCode}`);
        setShowServiceDropdown(false);
    };

    const handleCreateGuest = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateGuestForm()) {
            alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await staffDashboardApi.createGuest(guestData);
            
            if (response.success && response.data) {
                setGuestId(response.data);
                setGuestCreatedSuccess(true);
                alert(response.message || "Tạo khách hàng thành công!");
            } else {
                alert("Lỗi: " + (response.message || "Không thể tạo khách hàng"));
            }
        } catch (error) {
            console.error("Error creating guest:", error);
            alert("Lỗi khi tạo khách hàng: " + (error instanceof Error ? error.message : "Vui lòng thử lại!"));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCreateCase = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!caseData.guestId.trim()) {
            alert("Vui lòng chọn khách hàng!");
            return;
        }

        if (!caseData.serviceId.trim()) {
            alert("Vui lòng chọn dịch vụ!");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await staffDashboardApi.createCase(caseData);
            
            if (response.success && response.data) {
                alert("Tạo hồ sơ thành công! ID: " + response.data);
                router.push("/staff/dashboard");
            } else {
                alert("Lỗi: " + (response.message || "Không thể tạo hồ sơ"));
            }
        } catch (error) {
            console.error("Error creating case:", error);
            alert("Lỗi khi tạo hồ sơ: " + (error instanceof Error ? error.message : "Vui lòng thử lại!"));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleContinueToCreateCase = () => {
        setCaseData({ ...caseData, guestId: guestId });
        setMode("create-case");
        setGuestCreatedSuccess(false);
    };

    const handleFinish = () => {
        router.push("/staff/dashboard");
    };

    // Select Mode Screen
    if (mode === "select") {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="mb-6 flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.back()}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Quay lại
                        </Button>
                        <h1 className="text-3xl font-bold text-gray-900">Chọn hành động</h1>
                    </div>

                    <ModeSelector
                        onSelectCreateGuest={() => setMode("create-guest")}
                        onSelectCreateCase={() => setMode("create-case")}
                    />
                </div>
            </div>
        );
    }

    // Create Guest Mode
    if (mode === "create-guest") {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="mb-6 flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setMode("select");
                                setGuestCreatedSuccess(false);
                            }}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Quay lại
                        </Button>
                        <h1 className="text-3xl font-bold text-gray-900">Tạo khách hàng mới</h1>
                    </div>

                    <GuestForm
                        guestData={guestData}
                        errors={errors}
                        isSubmitting={isSubmitting}
                        isSuccess={guestCreatedSuccess}
                        guestId={guestId}
                        idTypes={idTypes}
                        genders={genders}
                        guestTypes={guestTypes}
                        onDataChange={setGuestData}
                        onSubmit={handleCreateGuest}
                        onCancel={() => setMode("select")}
                        onContinueToCase={handleContinueToCreateCase}
                        onFinish={handleFinish}
                    />
                </div>
            </div>
        );
    }

    // Create Case Mode
    if (mode === "create-case") {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="mb-6 flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setMode("select")}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Quay lại
                        </Button>
                        <h1 className="text-3xl font-bold text-gray-900">Tạo hồ sơ mới</h1>
                    </div>

                    <Card className="p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <FileText className="w-6 h-6 text-green-600" />
                                Thông tin hồ sơ
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">Vui lòng chọn khách hàng và điền thông tin hồ sơ</p>
                        </div>

                        <form onSubmit={handleCreateCase} className="space-y-6">
                            {/* Guest Search */}
                            <GuestSearchForm
                                searchKeyword={guestSearchKeyword}
                                isSearching={isSearching}
                                searchResults={guestSearchResults}
                                selectedGuest={selectedGuest}
                                showDropdown={showGuestDropdown}
                                onSearchKeywordChange={setGuestSearchKeyword}
                                onSearch={handleSearchGuests}
                                onSelectGuest={handleSelectGuest}
                            />

                            {/* Service Search */}
                            <ServiceSelector
                                searchKeyword={serviceSearchKeyword}
                                isSearching={isSearchingService}
                                searchResults={serviceSearchResults}
                                selectedService={selectedService}
                                showDropdown={showServiceDropdown}
                                onSearchKeywordChange={setServiceSearchKeyword}
                                onSearch={handleSearchServices}
                                onSelectService={handleSelectService}
                            />

                            {/* Case Form Fields */}
                            <CaseFormFields
                                caseData={caseData}
                                priorityLevels={priorityLevels}
                                submissionMethods={submissionMethods}
                                onDataChange={setCaseData}
                            />

                            {/* Submit Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setMode("select")}
                                    disabled={isSubmitting}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !caseData.guestId || !caseData.serviceId}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    {isSubmitting ? "Đang tạo hồ sơ..." : "Tạo hồ sơ"}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        );
    }

    return null;
}

