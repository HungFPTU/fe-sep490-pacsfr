"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/shared/components/ui/card.ui";
import { Button } from "@/shared/components/ui/button.ui";
import { staffDashboardApi } from "@modules/staff/dashboard/api/staff-dashboard.api";
import type { CreateGuestRequest, CreateCaseRequest, Guest, Service, PaginatedData } from "../../../dashboard/types";
import { ArrowLeft, FileText } from "lucide-react";
import { StaffDashboardTabsView } from "@modules/staff/dashboard/components/view/StaffDashboardTabsView.view";
import { useGlobalToast } from "@core/patterns/SingletonHook";

// UI Components
import {
    ModeSelector,
    GuestForm,
    GuestSearchForm,
    ServiceListWithPagination,
    CaseFormFields,
    OtpVerification,
} from "../ui/create-case";

type PageMode = "select" | "create-guest" | "create-case";

export function CreateCasePageView() {
    const router = useRouter();
    const { addToast } = useGlobalToast();
    const [mode, setMode] = useState<PageMode>("select");
    const [guestId, setGuestId] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [guestCreatedSuccess, setGuestCreatedSuccess] = useState(false);
    const [showOtpVerification, setShowOtpVerification] = useState(false);
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

    // Guest Form Data
    // const [guestData, setGuestData] = useState<CreateGuestRequest>({
    //     fullName: "",
    //     idNumber: "",
    //     idType: "CCCD",
    //     idIssueDate: "",
    //     idIssuePlace: "",
    //     phone: "",
    //     email: "",
    //     birthDate: "",
    //     gender: "Nam",
    //     occupation: "",
    //     organization: "",
    //     guestType: "Cá nhân",
    //     notes: "",
    //     address: "",
    //     ward: "",
    //     city: "",
    //     country: "Việt Nam",
    // });

    // Guest Form Data
    const [guestData, setGuestData] = useState<CreateGuestRequest>({
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
        submissionMethodId: "",
        notes: "",
        createdBy: "system",
    });

    // Guest Search
    const [guestSearchKeyword, setGuestSearchKeyword] = useState("");
    const [guestSearchResults, setGuestSearchResults] = useState<Guest[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
    const [showGuestDropdown, setShowGuestDropdown] = useState(false);

    // Service Search
    const [serviceSearchKeyword, setServiceSearchKeyword] = useState("");
    const [serviceData, setServiceData] = useState<PaginatedData<Service> | null>(null);
    const [isSearchingService, setIsSearchingService] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [servicePage, setServicePage] = useState(1);

    // Submission Methods
    const [submissionMethods, setSubmissionMethods] = useState<import("../../../dashboard/types").SubmissionMethod[]>([]);
    const [isLoadingSubmissionMethods, setIsLoadingSubmissionMethods] = useState(false);

    const idTypes = ["CCCD", "Hộ chiếu"];
    const genders = ["Nam", "Nữ", "Khác"];
    const guestTypes = ["Cá nhân", "Tổ chức"];
    const priorityLevels = [
        { value: 0, label: "Bình thường" },
        { value: 2, label: "Ưu tiên thấp" },
        { value: 5, label: "Ưu tiên trung bình" },
        { value: 8, label: "Ưu tiên cao" },
        { value: 10, label: "Khẩn cấp" },
    ];

    const validateGuestForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!guestData.fullName.trim()) newErrors.fullName = "Họ tên là bắt buộc";

        // Validate ID Number (CCCD/Passport)
        if (!guestData.idNumber.trim()) {
            newErrors.idNumber = "Số CCCD là bắt buộc";
        } else if (!/^\d{12}$/.test(guestData.idNumber.trim())) {
            newErrors.idNumber = "Số CCCD phải là 12 chữ số không có ký tự";
        }

        // Validate Birth Date
        if (!guestData.birthDate) newErrors.birthDate = "Ngày sinh là bắt buộc";

        // Validate ID Issue Date (must be >= birthDate + 14 years)
        if (!guestData.idIssueDate) {
            newErrors.idIssueDate = "Ngày cấp là bắt buộc";
        } else if (guestData.birthDate) {
            const birthDate = new Date(guestData.birthDate);
            const issueDate = new Date(guestData.idIssueDate);
            const minIssueDate = new Date(birthDate.getFullYear() + 14, birthDate.getMonth(), birthDate.getDate());

            if (issueDate < minIssueDate) {
                newErrors.idIssueDate = "Ngày cấp phải cách 14 năm kể từ ngày sinh";
            }
        }

        if (!guestData.idIssuePlace.trim()) newErrors.idIssuePlace = "Nơi cấp là bắt buộc";

        // Validate Phone Number (10 digits)
        if (!guestData.phone.trim()) {
            newErrors.phone = "Số điện thoại là bắt buộc";
        } else if (!/^\d{10}$/.test(guestData.phone.trim())) {
            newErrors.phone = "Số điện thoại phải là 10 chữ số";
        }

        if (!guestData.email.trim()) newErrors.email = "Email là bắt buộc";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSearchGuests = async (keyword: string = "") => {
        // Allow empty search to show all guests
        const searchKeyword = keyword.trim();

        setIsSearching(true);
        try {
            const response = await staffDashboardApi.getGuests({
                keyword: searchKeyword,
                isActive: true,
                page: 1,
                size: 20
            });

            if (response.success && response.data.$values) {
                setGuestSearchResults(response.data.$values);
                // Show dropdown only when there are results and input is not empty
                setShowGuestDropdown(searchKeyword.length > 0);
            } else {
                setGuestSearchResults([]);
                setShowGuestDropdown(false);
            }
        } catch (error) {
            console.error("Error searching guests:", error);
            setGuestSearchResults([]);
            setShowGuestDropdown(false);
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

    const handleSearchServices = async (keyword: string = "", page: number = 1) => {
        const searchKeyword = keyword.trim();

        setIsSearchingService(true);
        try {
            const response = await staffDashboardApi.getServices({
                keyword: searchKeyword,
                isActive: true,
                page: page,
                size: 10
            });

            if (response.success && response.data) {
                setServiceData(response.data);
                setServicePage(page);
            } else {
                setServiceData(null);
            }
        } catch (error) {
            console.error("Error searching services:", error);
            setServiceData(null);
        } finally {
            setIsSearchingService(false);
        }
    };

    const handleServicePageChange = (page: number) => {
        handleSearchServices(serviceSearchKeyword, page);
    };

    const handleSelectService = async (service: Service) => {
        setSelectedService(service);
        setServiceSearchKeyword(service.serviceName);
        setCaseData({ ...caseData, serviceId: service.id, submissionMethodId: "" }); // Reset submission method

        // Fetch submission methods for the selected service
        setIsLoadingSubmissionMethods(true);
        try {
            const methods = await staffDashboardApi.getSubmissionMethodsForService(service.id);
            setSubmissionMethods(methods);
        } catch (error) {
            console.error("Error fetching submission methods:", error);
            addToast({
                message: "Lỗi khi tải phương thức nộp: " + (error instanceof Error ? error.message : "Vui lòng thử lại!"),
                type: "error"
            });
            setSubmissionMethods([]);
        } finally {
            setIsLoadingSubmissionMethods(false);
        }
    };

    const handleCreateGuest = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateGuestForm()) {
            addToast({ message: "Vui lòng điền đầy đủ thông tin bắt buộc!", type: "warning" });
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await staffDashboardApi.createGuest(guestData);

            if (response.success && response.data) {
                setGuestId(response.data);
                setGuestCreatedSuccess(true);
                setShowOtpVerification(true);
                addToast({ message: response.message || "Tạo khách hàng thành công! Mã xác thực đã được gửi đến email.", type: "success" });
            } else {
                addToast({ message: "Lỗi: " + (response.message || "Không thể tạo khách hàng"), type: "error" });
            }
        } catch (error) {
            console.error("Error creating guest:", error);
            addToast({ message: "Lỗi khi tạo khách hàng: " + (error instanceof Error ? error.message : "Vui lòng thử lại!"), type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerifyOtp = async (otpCode: string) => {
        setIsVerifyingOtp(true);
        try {
            const response = await staffDashboardApi.verifyGuestEmail(guestId, otpCode);

            if (response.success) {
                addToast({ message: "Xác thực email thành công!", type: "success" });
                setShowOtpVerification(false);
            } else {
                addToast({ message: response.message || "Mã xác thực không đúng. Vui lòng thử lại!", type: "error" });
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            addToast({ message: "Lỗi khi xác thực: " + (error instanceof Error ? error.message : "Vui lòng thử lại!"), type: "error" });
        } finally {
            setIsVerifyingOtp(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            const response = await staffDashboardApi.resendGuestOtp(guestId);

            if (response.success) {
                addToast({ message: "Mã xác thực mới đã được gửi đến email!", type: "success" });
            } else {
                addToast({ message: response.message || "Không thể gửi lại mã. Vui lòng thử lại!", type: "error" });
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
            addToast({ message: "Lỗi khi gửi lại mã: " + (error instanceof Error ? error.message : "Vui lòng thử lại!"), type: "error" });
        }
    };

    const handleCreateCase = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!caseData.guestId.trim()) {
            addToast({ message: "Vui lòng chọn khách hàng!", type: "warning" });
            return;
        }

        if (!caseData.serviceId.trim()) {
            addToast({ message: "Vui lòng chọn dịch vụ!", type: "warning" });
            return;
        }

        if (!caseData.submissionMethodId.trim()) {
            addToast({ message: "Vui lòng chọn phương thức nộp!", type: "warning" });
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await staffDashboardApi.createCase(caseData);

            if (response.success && response.data) {
                addToast({ message: "Tạo hồ sơ thành công!", type: "success" });
                // Save caseId to sessionStorage to open detail popup after navigation
                sessionStorage.setItem('newCaseId', String(response.data.data?.id));
                router.push("/staff/case");
            } else {
                addToast({ message: "Lỗi: " + (response.message || "Không thể tạo hồ sơ"), type: "error" });
            }
        } catch (error) {
            console.error("Error creating case:", error);
            addToast({ message: "Lỗi khi tạo hồ sơ: " + (error instanceof Error ? error.message : "Vui lòng thử lại!"), type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleContinueToCreateCase = () => {
        // Set guest data in case form
        setCaseData({ ...caseData, guestId: guestId });

        // Set a mock selected guest to display in the form (showing the guestId)
        setSelectedGuest({
            id: guestId,
            fullName: guestData.fullName,
            idNumber: guestData.idNumber,
            idType: guestData.idType,
            idIssueDate: guestData.idIssueDate,
            idIssuePlace: guestData.idIssuePlace,
            phone: guestData.phone,
            email: guestData.email,
            birthDate: guestData.birthDate,
            gender: guestData.gender,
            occupation: guestData.occupation,
            organization: guestData.organization,
            guestType: guestData.guestType,
            notes: guestData.notes,
            isActive: true,
            address: guestData.address,
            ward: guestData.ward,
            city: guestData.city,
            country: guestData.country,
        } as Guest);

        setMode("create-case");
    };

    const handleFinish = () => {
        router.push("/staff/dashboard");
    };

    // Select Mode Screen
    if (mode === "select") {
        return (
            <StaffDashboardTabsView>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Tạo hồ sơ mới</h1>
                            <p className="text-gray-600 mt-1">Chọn hành động để bắt đầu</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.back()}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Quay lại
                        </Button>
                    </div>

                    <ModeSelector
                        onSelectCreateGuest={() => setMode("create-guest")}
                        onSelectCreateCase={() => setMode("create-case")}
                    />
                </div>
            </StaffDashboardTabsView>
        );
    }

    // Create Guest Mode
    if (mode === "create-guest") {
        return (
            <StaffDashboardTabsView>
                <div className="space-y-6 max-w-4xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Tạo khách hàng mới</h1>
                            <p className="text-gray-600 mt-1">Nhập thông tin công dân</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setMode("select");
                                setGuestCreatedSuccess(false);
                                setGuestId(""); // Reset guestId khi quay lại
                            }}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Quay lại
                        </Button>
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
                        onCancel={() => {
                            setMode("select");
                            setGuestCreatedSuccess(false);
                            setGuestId("");
                            setShowOtpVerification(false);
                        }}
                        onContinueToCase={handleContinueToCreateCase}
                        onFinish={handleFinish}
                    />

                    {/* OTP Verification Section */}
                    {guestCreatedSuccess && showOtpVerification && guestId && (
                        <OtpVerification
                            guestId={guestId}
                            email={guestData.email}
                            isVerifying={isVerifyingOtp}
                            onVerify={handleVerifyOtp}
                            onResend={handleResendOtp}
                        />
                    )}
                </div>
            </StaffDashboardTabsView>
        );
    }

    // Create Case Mode
    if (mode === "create-case") {
        return (
            <div className="min-h-screen py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6 flex items-center gap-4">
                        <h1 className="text-3xl font-bold text-gray-900">Tạo hồ sơ mới</h1>
                    </div>

                    <Card className="p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <FileText className="w-6 h-6 text-blue-600" />
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
                                onSearchKeywordChange={(keyword) => {
                                    setGuestSearchKeyword(keyword);
                                    handleSearchGuests(keyword);
                                }}
                                onSelectGuest={handleSelectGuest}
                                onCreateNewGuest={() => setMode("create-guest")}
                                onToggleDropdown={() => setShowGuestDropdown(!showGuestDropdown)}
                            />

                            {/* Service Search */}
                            <ServiceListWithPagination
                                searchKeyword={serviceSearchKeyword}
                                isSearching={isSearchingService}
                                serviceData={serviceData}
                                selectedService={selectedService}
                                currentPage={servicePage}
                                onSearchKeywordChange={(keyword) => {
                                    setServiceSearchKeyword(keyword);
                                    handleSearchServices(keyword, 1);
                                }}
                                onSelectService={handleSelectService}
                                onPageChange={handleServicePageChange}
                            />

                            {/* Case Form Fields */}
                            <CaseFormFields
                                caseData={caseData}
                                priorityLevels={priorityLevels}
                                submissionMethods={submissionMethods}
                                isLoadingSubmissionMethods={isLoadingSubmissionMethods}
                                onDataChange={setCaseData}
                            />

                            {/* Submit Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setMode("select");
                                        // Reset form data
                                        setGuestSearchKeyword("");
                                        setGuestSearchResults([]);
                                        setSelectedGuest(null);
                                        setServiceSearchKeyword("");
                                        setServiceData(null);
                                        setSelectedService(null);
                                    }}
                                    disabled={isSubmitting}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !caseData.guestId || !caseData.serviceId}
                                    className="bg-indigo-600 hover:bg-indigo-700"
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

