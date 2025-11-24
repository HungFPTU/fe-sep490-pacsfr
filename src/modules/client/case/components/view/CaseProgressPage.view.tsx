'use client';

import { useEffect, useMemo, useState } from "react";
import { useCaseProgress } from "../../hooks";
import { CaseLookupForm, type CaseLookupFormValues } from "../ui/form";
import { CaseProgressResultView } from "../ui";
import { executeRecaptcha, verifyRecaptchaToken } from "@/shared/lib";
import { CASE_RECAPTCHA_ACTION } from "../../constants";
import { ENV } from "@/core/config/env";
import { useGlobalToast } from "@core/patterns/SingletonHook";

export const CaseProgressPageView: React.FC = () => {
    const { mutateAsync, isPending } = useCaseProgress();
    const [result, setResult] = useState<ReturnType<typeof useCaseProgress>["data"] | null>(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { addToast } = useGlobalToast();

    const recaptchaSiteKey = useMemo(() => ENV.RECAPTCHA_SITE_KEY, []);

    useEffect(() => {
        if (!recaptchaSiteKey) {
            console.warn(
                "[CaseProgress] Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY. Google reCAPTCHA will be disabled.",
            );
        }
    }, [recaptchaSiteKey]);

    const handleSubmit = async (values: CaseLookupFormValues) => {
        setHasSearched(true);
        setErrorMessage(null);
        setResult(null);

        if (!recaptchaSiteKey) {
            const message =
                "Hệ thống chưa cấu hình Google reCAPTCHA. Vui lòng liên hệ quản trị viên để bổ sung.";
            setErrorMessage(message);
            addToast({ message, type: "error" });
            return;
        }

        try {
            // Step 1: Execute reCAPTCHA
            console.log("[CaseProgress] Executing reCAPTCHA...");
            let token: string;
            try {
                token = await executeRecaptcha(recaptchaSiteKey, CASE_RECAPTCHA_ACTION);
                console.log("[CaseProgress] reCAPTCHA token received, length:", token.length);
            } catch (recaptchaError) {
                const recaptchaMessage =
                    recaptchaError instanceof Error
                        ? recaptchaError.message
                        : "Không thể tạo token reCAPTCHA. Vui lòng tải lại trang và thử lại.";
                setErrorMessage(recaptchaMessage);
                addToast({ message: recaptchaMessage, type: "error" });
                return;
            }

            // Step 2: Skip frontend verification by default
            // Backend will verify the token, so we don't need to verify on frontend
            // This avoids browser-error issues with domain mismatch
            // Set NEXT_PUBLIC_VERIFY_RECAPTCHA_ON_FRONTEND=true to enable frontend verification
            const shouldVerifyOnFrontend = process.env.NEXT_PUBLIC_VERIFY_RECAPTCHA_ON_FRONTEND === "true";

            if (shouldVerifyOnFrontend) {
                console.log("[CaseProgress] Verifying reCAPTCHA token on frontend...");
                try {
                    const verifyResult = await verifyRecaptchaToken(token);
                    if (!verifyResult.success) {
                        const verifyMessage = verifyResult.message || "Xác thực CAPTCHA thất bại. Vui lòng thử lại.";

                        // If it's a browser-error (domain mismatch), silently continue to backend
                        // Backend may have different domain configuration
                        if (verifyMessage.includes("Domain không khớp") || verifyMessage.includes("browser-error")) {
                            console.warn("[CaseProgress] Frontend verification failed with browser-error, proceeding to backend (backend will verify)");
                            // Continue silently - don't show error to user
                        } else {
                            // For other errors, log but still proceed to backend
                            console.warn("[CaseProgress] Frontend verification failed, but proceeding to backend:", verifyMessage);
                            // Don't block - let backend verify instead
                        }
                    } else {
                        console.log("[CaseProgress] reCAPTCHA verified successfully on frontend, score:", verifyResult.score);
                    }
                } catch (verifyError) {
                    // If frontend verification fails, log and continue to backend
                    console.warn("[CaseProgress] Frontend verification error, but proceeding to backend:", verifyError);
                }
            } else {
                console.log("[CaseProgress] Skipping frontend verification (backend will verify)");
            }

            // Step 3: Call API with token (backend may or may not verify again)
            console.log("[CaseProgress] Calling API with caseCode:", values.caseCode);
            const data = await mutateAsync({
                caseCode: values.caseCode.trim(),
                captchaToken: token,
            });

            console.log("[CaseProgress] API response:", { success: data?.success, hasData: !!data });

            setResult(data);

            if (!data?.success) {
                const message =
                    data?.message ??
                    "Không thể xác nhận trạng thái hồ sơ. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.";
                setErrorMessage(message);

                // Check if it's a CAPTCHA error
                const messageLower = message.toLowerCase();
                if (messageLower.includes("captcha") || messageLower.includes("verification")) {
                    addToast({
                        message: message.includes("CAPTCHA verification failed")
                            ? "Xác thực CAPTCHA thất bại. Vui lòng thử lại sau vài giây."
                            : message,
                        type: "error",
                    });
                } else {
                    addToast({ message, type: "warning" });
                }
            } else {
                // Success
                if (data.message) {
                    addToast({ message: data.message, type: "success" });
                }
                setErrorMessage(null);
            }
        } catch (error) {
            console.error("[CaseProgress] Error:", error);
            const message =
                error instanceof Error
                    ? error.message
                    : "Đã xảy ra lỗi khi tra cứu hồ sơ. Vui lòng thử lại.";

            // Check if it's a CAPTCHA-related error
            const errorLower = message.toLowerCase();
            if (errorLower.includes("captcha") || errorLower.includes("verification")) {
                setErrorMessage("Xác thực CAPTCHA thất bại. Vui lòng thử lại sau vài giây.");
                addToast({
                    message: "Xác thực CAPTCHA thất bại. Vui lòng thử lại sau vài giây.",
                    type: "error",
                });
            } else {
                setErrorMessage(message);
                addToast({ message, type: "error" });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-6 sm:mb-8 text-center">
                        <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-red-100 bg-red-50 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-red-700">
                            <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                            <span className="whitespace-nowrap">Tra cứu tiến độ hồ sơ trực tuyến</span>
                        </div>
                        <h1 className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-bold text-blue-900 px-2">
                            Theo dõi trạng thái hồ sơ của bạn
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-gray-600 px-2">
                            Nhập mã hồ sơ đã được cấp để nhận thông tin xử lý mới nhất và đảm bảo vượt CAPTCHA bảo mật từ Google.
                        </p>
                    </div>

                    <CaseLookupForm
                        onSubmit={handleSubmit}
                        isSubmitting={isPending}
                        errorMessage={errorMessage}
                        isRecaptchaReady={!!recaptchaSiteKey}
                    />

                    <CaseProgressResultView
                        result={result ?? null}
                        isLoading={isPending}
                        hasSearched={hasSearched}
                    />
                </div>
            </main>
        </div>
    );
};

