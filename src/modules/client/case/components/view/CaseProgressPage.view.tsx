'use client';

import { useEffect, useMemo, useState } from "react";
import { useCaseProgress } from "../../hooks";
import { CaseLookupForm, type CaseLookupFormValues, CaseProgressResultView } from "../ui";
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

            // Step 2: Verify token with our API route (optional - backend may verify too)
            // Note: Token expires in ~2 minutes, so verify immediately after generation
            // If backend also verifies, we can skip this step, but it's good to verify early
            const shouldVerifyOnFrontend = process.env.NEXT_PUBLIC_VERIFY_RECAPTCHA_ON_FRONTEND !== "false";

            if (shouldVerifyOnFrontend) {
                console.log("[CaseProgress] Verifying reCAPTCHA token on frontend...");
                try {
                    const verifyResult = await verifyRecaptchaToken(token);
                    if (!verifyResult.success) {
                        const verifyMessage = verifyResult.message || "Xác thực CAPTCHA thất bại. Vui lòng thử lại.";
                        setErrorMessage(verifyMessage);
                        addToast({
                            message: verifyMessage.includes("hết hạn")
                                ? "Token đã hết hạn. Vui lòng thử lại ngay."
                                : verifyMessage,
                            type: "error"
                        });
                        return;
                    }
                    console.log("[CaseProgress] reCAPTCHA verified successfully on frontend, score:", verifyResult.score);
                } catch (verifyError) {
                    // If frontend verification fails but we want to proceed anyway, log and continue
                    console.warn("[CaseProgress] Frontend verification failed, but proceeding:", verifyError);
                    // Uncomment below to block on frontend verification failure:
                    // setErrorMessage("Xác thực CAPTCHA thất bại. Vui lòng thử lại.");
                    // addToast({ message: "Xác thực CAPTCHA thất bại. Vui lòng thử lại.", type: "error" });
                    // return;
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
            <main className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center gap-3 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                            Tra cứu tiến độ hồ sơ trực tuyến
                        </div>
                        <h1 className="mt-4 text-3xl font-bold text-blue-900">
                            Theo dõi trạng thái hồ sơ của bạn
                        </h1>
                        <p className="mt-2 text-base text-gray-600">
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

