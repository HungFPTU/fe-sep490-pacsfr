'use client';

import React from 'react';
import { useForm } from '@tanstack/react-form';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import { Input } from '@/shared/components/forms/Input.com';
import { ENV } from '@core/config/env';
// Heroicon MagnifyingGlass (outline)
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export interface CaseLookupFormValues {
    caseCode: string;
}

interface CaseLookupFormProps {
    onSubmit: (values: CaseLookupFormValues) => Promise<void>;
    isSubmitting?: boolean;
    errorMessage?: string | null;
    isRecaptchaReady?: boolean;
}

export const CaseLookupForm: React.FC<CaseLookupFormProps> = ({
    onSubmit,
    isSubmitting = false,
    errorMessage,
    isRecaptchaReady = true,
}) => {
    const recaptchaSiteKey = ENV.RECAPTCHA_SITE_KEY;
    const isRecaptchaConfigured = !!recaptchaSiteKey && recaptchaSiteKey.trim().length > 0;

    const form = useForm({
        defaultValues: {
            caseCode: '',
        } as CaseLookupFormValues,
        onSubmit: async ({ value }) => {
            await onSubmit({
                caseCode: value.caseCode.trim(),
            });
        },
        validators: {
            onSubmitAsync: async ({ value }) => {
                if (!value.caseCode || !value.caseCode.trim()) {
                    return 'Vui lòng nhập Mã số hồ sơ.';
                }
                if (value.caseCode.trim().length < 3) {
                    return 'Mã số hồ sơ cần tối thiểu 3 ký tự.';
                }
                return undefined;
            },
        },
    });

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            <div className="mb-6 border-b border-gray-200 pb-4">
                <h2 className="text-xl font-semibold text-gray-900">Tra cứu hồ sơ</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Nhập mã số hồ sơ để tra cứu thông tin tiến độ xử lý.
                </p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
                className="space-y-4"
            >
                <form.Field name="caseCode">
                    {(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                                Mã số hồ sơ <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2 items-start">
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder="Nhập mã số hồ sơ (ví dụ: HS2025851371)"
                                    disabled={isSubmitting}
                                    error={!!field.state.meta.errors.length}
                                    className="flex-1"
                                />
                                <Button
                                    type="submit"
                                    variant="red"
                                    disabled={isSubmitting || !isRecaptchaReady}
                                    className="min-w-[120px] flex-shrink-0 flex items-center gap-2"
                                >
                                    <MagnifyingGlassIcon className="h-5 w-5" />
                                    {isSubmitting ? 'Đang tra cứu...' : 'Tra cứu'}
                                </Button>
                            </div>
                            {field.state.meta.errors.length > 0 && (
                                <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                            )}
                        </div>
                    )}
                </form.Field>

                {!isRecaptchaConfigured && (
                    <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                        <div>
                            <p className="font-semibold">Chưa cấu hình Google reCAPTCHA</p>
                            <p>
                                Vui lòng bổ sung giá trị{' '}
                                <code className="rounded bg-yellow-100 px-1 py-0.5">
                                    NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                                </code>{' '}
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
                            {errorMessage.toLowerCase().includes('captcha') && (
                                <p className="mt-2 text-xs text-red-600">
                                    💡 Gợi ý: Vui lòng đợi vài giây rồi thử lại. Nếu vấn đề vẫn tiếp tục, hãy tải lại trang.
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};
