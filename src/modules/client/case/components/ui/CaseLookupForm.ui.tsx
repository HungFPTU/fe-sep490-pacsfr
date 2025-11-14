'use client';

import { useMemo } from "react";
import { useForm } from "@tanstack/react-form";
import { FormField } from "@/shared/components/forms/FormField.com";
import { Input } from "@/shared/components/forms/Input.com";
import { Button } from "@/shared/components/ui/button.ui";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export interface CaseLookupFormValues {
    caseCode: string;
}

interface CaseLookupFormProps {
    onSubmit: (values: CaseLookupFormValues) => Promise<void>;
    isSubmitting?: boolean;
    errorMessage?: string | null;
    isRecaptchaReady: boolean;
}

export const CaseLookupForm: React.FC<CaseLookupFormProps> = ({
    onSubmit,
    isSubmitting = false,
    errorMessage,
    isRecaptchaReady,
}) => {
    const form = useForm({
        defaultValues: {
            caseCode: "",
        } as CaseLookupFormValues,
        onSubmit: async ({ value }) => {
            await onSubmit({
                caseCode: value.caseCode.trim(),
            });
        },
        validators: {
            onSubmitAsync: async ({ value }) => {
                if (!value.caseCode || !value.caseCode.trim()) {
                    return "Vui lòng nhập Mã số hồ sơ.";
                }
                if (value.caseCode.trim().length < 3) {
                    return "Mã số hồ sơ cần tối thiểu 3 ký tự.";
                }
                return undefined;
            },
        },
    });

    const submitDisabled = useMemo(
        () => !isRecaptchaReady || isSubmitting,
        [isRecaptchaReady, isSubmitting],
    );

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-red-100 text-red-600">
                        <ShieldCheck className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Thông tin tra cứu hồ sơ
                    </h2>
                </div>
                <p className="text-sm text-gray-600">
                    Nhập Mã số hồ sơ được cung cấp khi tiếp nhận để xem trạng thái xử lý mới nhất.
                </p>
            </div>

            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    void form.handleSubmit();
                }}
                className="space-y-6"
            >
                <form.Field
                    name="caseCode"
                    validators={{
                        onChange: ({ value }) => {
                            if (!value.trim()) {
                                return "Mã số hồ sơ không được để trống.";
                            }
                            return undefined;
                        },
                    }}
                >
                    {(field) => (
                        <FormField
                            label="Mã số hồ sơ"
                            name={field.name}
                            required
                            error={field.state.meta.errors[0]}
                        >
                            <Input
                                placeholder="VD: HS-2025-001234"
                                value={field.state.value}
                                onChange={(event) => field.handleChange(event.target.value)}
                                onBlur={field.handleBlur}
                                autoComplete="off"
                                disabled={isSubmitting}
                                className="text-base"
                            />
                        </FormField>
                    )}
                </form.Field>

                {!isRecaptchaReady && (
                    <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                        <div>
                            <p className="font-semibold">Chưa cấu hình Google reCAPTCHA</p>
                            <p>
                                Vui lòng bổ sung giá trị{" "}
                                <code className="rounded bg-yellow-100 px-1 py-0.5">
                                    NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                                </code>{" "}
                                trong file môi trường để kích hoạt tra cứu.
                            </p>
                        </div>
                    </div>
                )}

                {errorMessage && (
                    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                        <div className="flex-1">
                            <p className="font-semibold">Lỗi tra cứu</p>
                            <p className="mt-1">{errorMessage}</p>
                            {errorMessage.toLowerCase().includes("captcha") && (
                                <p className="mt-2 text-xs text-red-600">
                                    💡 Gợi ý: Vui lòng đợi vài giây rồi thử lại. Nếu vấn đề vẫn tiếp tục, hãy tải lại trang.
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex justify-center">
                    <Button
                        type="submit"
                        variant="red"
                        size="lg"
                        disabled={submitDisabled}
                        className="min-w-[200px]"
                    >
                        {isSubmitting ? "Đang tra cứu..." : "Tra cứu trạng thái"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

