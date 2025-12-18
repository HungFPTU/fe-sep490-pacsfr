'use client';

import { useState } from "react";
import { useCaseFeedbackByCase } from "../../hooks";
import { CaseLookupOTPForm, type CaseLookupOTPFormValues } from "../ui/form";
import { CaseProgressResultView, CaseFeedbackCard, CaseFeedbackViewer, CaseOTPVerificationModal } from "../ui";
import { useGlobalToast } from "@core/patterns/SingletonHook";
import { FileText, Clock, Shield, Search, CheckCircle2, Lock, Zap } from "lucide-react";
import { caseClientApi } from "../../api/case.api";
import { extractCaseData } from "../../utils/parsers";
import { mapToSummary, mapToSteps } from "../../mappers";
import type { CaseProgressResult } from "../../types";

export const CaseProgressPageView: React.FC = () => {
    const [result, setResult] = useState<CaseProgressResult | null>(null);
    const [isLookupLoading, setIsLookupLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { addToast } = useGlobalToast();
    const feedbackQuery = useCaseFeedbackByCase(result?.rawData?.id ?? undefined);

    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const [selectedCaseCode, setSelectedCaseCode] = useState('');

    // Transform API response to CaseProgressResult
    const transformApiResponse = (apiResponse: any): CaseProgressResult => {
        const rawData = apiResponse?.data || apiResponse;
        const fallbackCode = apiResponse?.caseCode || selectedCaseCode;
        
        return {
            success: apiResponse?.success ?? true,
            message: apiResponse?.message,
            summary: mapToSummary(rawData, fallbackCode),
            steps: mapToSteps(rawData),
            rawData: rawData || null,
        };
    };

    const handleSubmit = async (values: CaseLookupOTPFormValues) => {
        setErrorMessage(null);
        setResult(null);

        try {
            setIsLookupLoading(true);
            console.log("[CaseProgress] Calling lookup API with caseCode:", values.caseCode);
            const data = await caseClientApi.lookup({
                caseCode: values.caseCode.trim(),
            });

            if (!data?.data?.success) {
                const message =
                    data?.data.message ??
                    "Không thể gửi mã OTP. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.";
                setErrorMessage(message);
                addToast({ message, type: "error" });
            } else {
                setSelectedCaseCode(values.caseCode);
                setOtpModalOpen(true);
                addToast({ message: "Mã OTP đã được gửi", type: "success" });
            }
        } catch (error) {
            console.error("[CaseProgress] Error:", error);
            const message =
                error instanceof Error
                    ? error.message
                    : "Đã xảy ra lỗi khi gửi mã OTP. Vui lòng thử lại.";

            setErrorMessage(message);
            addToast({ message, type: "error" });
        } finally {
            setIsLookupLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
            {/* Background Decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-20" />
            </div>

            <main className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Hero Section */}
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 mb-6 animate-pulse">
                        <div className="h-2 w-2 rounded-full bg-blue-600" />
                        <span className="text-sm font-semibold text-blue-700">Tra cứu tiến độ hồ sơ</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                        Theo dõi hồ sơ của bạn
                    </h1>
                    <p className="text-lg text-slate-600">
                        Nhập mã hồ sơ để kiểm tra tình trạng xử lý mới nhất. Bảo mật của bạn là ưu tiên của chúng tôi.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="mb-12 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                        <FileText className="h-8 w-8 text-blue-600 mb-3" />
                        <h3 className="font-bold text-slate-900 mb-1">Quản lý hồ sơ</h3>
                        <p className="text-sm text-slate-600">Xem trạng thái xử lý hồ sơ của bạn theo thời gian thực</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                        <Clock className="h-8 w-8 text-purple-600 mb-3" />
                        <h3 className="font-bold text-slate-900 mb-1">Cập nhật nhanh</h3>
                        <p className="text-sm text-slate-600">Thông báo khi có tiến độ mới nhất cho hồ sơ</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                        <Shield className="h-8 w-8 text-green-600 mb-3" />
                        <h3 className="font-bold text-slate-900 mb-1">Bảo mật cao</h3>
                        <p className="text-sm text-slate-600">Xác thực OTP bảo vệ thông tin hồ sơ</p>
                    </div>
                </div>

                {/* Step by Step Guide */}
                <div className="mb-12 max-w-4xl mx-auto">
                    <h2 className="text-center text-2xl font-bold text-slate-900 mb-8">Cách tra cứu hồ sơ</h2>
                    <div className="grid md:grid-cols-4 gap-4">
                        {/* Step 1 */}
                        <div className="relative">
                            <div className="bg-white rounded-xl border-2 border-blue-500 p-6 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-4 mx-auto">
                                    1
                                </div>
                                <h3 className="font-bold text-slate-900 text-center mb-2">Nhập mã hồ sơ</h3>
                                <div className="flex justify-center mb-3">
                                    <Search className="h-8 w-8 text-blue-600" />
                                </div>
                                <p className="text-sm text-slate-600 text-center">Tìm và nhập mã hồ sơ của bạn (ví dụ: HS2025851371)</p>
                            </div>
                            {/* Arrow */}
                            <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-1 bg-gradient-to-r from-blue-500 to-blue-300" />
                        </div>

                        {/* Step 2 */}
                        <div className="relative">
                            <div className="bg-white rounded-xl border-2 border-purple-500 p-6 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 font-bold text-lg mb-4 mx-auto">
                                    2
                                </div>
                                <h3 className="font-bold text-slate-900 text-center mb-2">Gửi OTP</h3>
                                <div className="flex justify-center mb-3">
                                    <Zap className="h-8 w-8 text-purple-600" />
                                </div>
                                <p className="text-sm text-slate-600 text-center">Nhấn gửi mã OTP để xác thực danh tính</p>
                            </div>
                            {/* Arrow */}
                            <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-1 bg-gradient-to-r from-purple-500 to-purple-300" />
                        </div>

                        {/* Step 3 */}
                        <div className="relative">
                            <div className="bg-white rounded-xl border-2 border-green-500 p-6 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 font-bold text-lg mb-4 mx-auto">
                                    3
                                </div>
                                <h3 className="font-bold text-slate-900 text-center mb-2">Nhập mã OTP</h3>
                                <div className="flex justify-center mb-3">
                                    <Lock className="h-8 w-8 text-green-600" />
                                </div>
                                <p className="text-sm text-slate-600 text-center">Nhập mã OTP được gửi đến email/SMS của bạn</p>
                            </div>
                            {/* Arrow */}
                            <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-1 bg-gradient-to-r from-green-500 to-green-300" />
                        </div>

                        {/* Step 4 */}
                        <div className="relative">
                            <div className="bg-white rounded-xl border-2 border-red-500 p-6 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 font-bold text-lg mb-4 mx-auto">
                                    ✓
                                </div>
                                <h3 className="font-bold text-slate-900 text-center mb-2">Xem kết quả</h3>
                                <div className="flex justify-center mb-3">
                                    <CheckCircle2 className="h-8 w-8 text-red-600" />
                                </div>
                                <p className="text-sm text-slate-600 text-center">Xem chi tiết tiến độ xử lý hồ sơ của bạn</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto">
                    {/* Search Form - Step 1 */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg ring-1 ring-black/5 mb-8">
                        <div className="mb-8 pb-6 border-b border-slate-200">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold mb-3">
                                1
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Nhập mã hồ sơ</h2>
                            <p className="text-slate-600 mt-2">Bước đầu tiên: Cung cấp mã hồ sơ của bạn</p>
                        </div>

                        <CaseLookupOTPForm
                            onSubmit={handleSubmit}
                            isSubmitting={isLookupLoading}
                            errorMessage={errorMessage}
                        />
                    </div>

                    {/* Result Section - Only shown after OTP verification */}
                    {result?.success && (
                        <div className="space-y-6">
                            {/* Case Progress Result */}
                            <CaseProgressResultView
                                result={result}
                                isLoading={false}
                                hasSearched={true}
                            />

                            {/* Feedback Section */}
                            <div className="space-y-6">
                                {!feedbackQuery.data && (
                                    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg ring-1 ring-black/5">
                                        <div className="mb-6 pb-6 border-b border-slate-200">
                                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 font-bold mb-3">
                                                ✓
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-900">Bạn đã xác minh thành công</h2>
                                            <p className="text-slate-600 mt-2">Gửi phản hồi hoặc nhận xét về dịch vụ</p>
                                        </div>
                                        <CaseFeedbackCard
                                            caseId={result.rawData?.id}
                                            caseCode={result.summary?.caseCode}
                                            serviceName={result.summary?.serviceName}
                                        />
                                    </div>
                                )}
                                <CaseFeedbackViewer feedback={feedbackQuery.data} isLoading={feedbackQuery.isPending} />
                            </div>
                        </div>
                    )}
                </div>

                {/* OTP Verification Modal */}
                <CaseOTPVerificationModal
                    isOpen={otpModalOpen}
                    caseCode={selectedCaseCode}
                    onVerifySuccess={(verifiedData: any) => {
                        const transformedResult = transformApiResponse(verifiedData);
                        setResult(transformedResult);
                    }}
                    onClose={() => {
                        setOtpModalOpen(false);
                    }}
                />
            </main>
        </div>
    );
};


