/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/forms/Input.com";
import { FormField } from "@/shared/components/forms/FormField.com";
import { DatePicker } from "@/shared/components/forms/DatePicker.com";
import { LoadingSpinner } from "@/shared/components/common/LoadingSpinner.com";
import {
    validateEmail,
    validatePassword,
    validatePasswordConfirmation,
    validatePhone,
    validateIdCard,
    validateFullName,
    validateUsername,
    validateDateOfBirth
} from "@/core/utils/validation";
import { formatDateInput, parseDateFromInput } from "@/core/utils/date";
import type { RegisterPayload, RegisterResponse } from "../../types";
import { DEFAULT_ROLE } from "../../consts";

interface RegisterFormProps {
    onSubmit?: (payload: RegisterPayload) => Promise<RegisterResponse>;
    isLoading?: boolean;
}

export function RegisterForm({ onSubmit, isLoading = false }: RegisterFormProps) {
    const [form, setForm] = useState<RegisterPayload>({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: DEFAULT_ROLE,
        isActive: true,
        dayOfBirth: "",
        priorityGroup: false,
        idCardNumber: "",
        description: "",
    });
    const [mounted, setMounted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);



    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // Use centralized validation functions
        const fullNameResult = validateFullName(form.fullName);
        if (!fullNameResult.isValid) {
            newErrors.fullName = fullNameResult.error!;
        }

        const usernameResult = validateUsername(form.username);
        if (!usernameResult.isValid) {
            newErrors.username = usernameResult.error!;
        }

        const emailResult = validateEmail(form.email);
        if (!emailResult.isValid) {
            newErrors.email = emailResult.error!;
        }

        const phoneResult = validatePhone(form.phone);
        if (!phoneResult.isValid) {
            newErrors.phone = phoneResult.error!;
        }

        const passwordResult = validatePassword(form.password?.trim() || "");
        if (!passwordResult.isValid) {
            newErrors.password = passwordResult.error!;
        }

        const confirmPasswordResult = validatePasswordConfirmation(
            form.password?.trim() || "",
            form.confirmPassword?.trim() || ""
        );
        if (!confirmPasswordResult.isValid) {
            newErrors.confirmPassword = confirmPasswordResult.error!;
        }

        const dateOfBirthResult = validateDateOfBirth(form.dayOfBirth);
        if (!dateOfBirthResult.isValid) {
            newErrors.dayOfBirth = dateOfBirthResult.error!;
        }

        const idCardResult = validateIdCard(form.idCardNumber);
        if (!idCardResult.isValid) {
            newErrors.idCardNumber = idCardResult.error!;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent double submission
        if (isLoading) {
            console.warn("[RegisterForm] Submission blocked - already loading");
            return;
        }

        if (!validateForm()) {
            return;
        }

        if (onSubmit) {
            try {
                const { confirmPassword, ...payload } = form;
                const date = parseDateFromInput(payload.dayOfBirth);
                console.log("[RegisterForm] Submitting registration:", {
                    username: payload.username,
                    email: payload.email,
                    timestamp: new Date().toISOString()
                });

                await onSubmit({
                    ...payload,
                    password: payload.password.trim(),
                    dayOfBirth: date ? date.toISOString() : payload.dayOfBirth,
                });
            } catch (error) {
                console.error("[RegisterForm] Registration error:", error);
                if (error instanceof Error) {
                    // Handle specific registration errors
                    if (error.message.includes("409") || error.message.includes("đã tồn tại")) {
                        setErrors({
                            username: "Tên đăng nhập hoặc email đã được sử dụng",
                            email: "Email đã được sử dụng"
                        });
                    } else {
                        setErrors({ general: error.message });
                    }
                }
            }
        }
    };

    const handleInputChange = (field: keyof RegisterPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = e.target.value;

        // Special handling for specific fields
        if (field === 'dayOfBirth') {
            value = formatDateInput(value);
        } else if (field === 'idCardNumber') {
            value = value.replace(/\D/g, '').slice(0, 12);
        }

        setForm({ ...form, [field]: value });

        // Clear error when user starts typing
        if (errors[field]) {
            const newErrors = { ...errors };
            delete newErrors[field];
            setErrors(newErrors);
        }
    };

    const handleCheckboxChange = (field: keyof RegisterPayload) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [field]: e.target.checked });
    };

    if (!mounted) {
        return (
            <div className="w-full max-w-3xl mx-auto bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-center py-8">
                    <LoadingSpinner size="lg" />
                </div>
            </div>
        );
    }

    const passwordsMatch = form.password && form.confirmPassword &&
        form.password.trim() === form.confirmPassword.trim();

    return (
        <div className="w-full max-w-3xl mx-auto bg-white">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold mb-3 text-black">
                    Đăng ký tài khoản công dân
                </h1>
                <p className="text-sm text-gray-600">
                    Tạo tài khoản để sử dụng các dịch vụ hành chính công trực tuyến
                </p>
            </div>

            {errors.general && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{errors.general}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div>
                    <h3 className="text-lg font-medium text-black mb-4 border-b border-gray-200 pb-2">
                        Thông tin cá nhân
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            label="Họ và tên"
                            name="fullName"
                            error={errors.fullName}
                            required
                        >
                            <Input
                                id="fullName"
                                type="text"
                                placeholder="Nhập họ và tên đầy đủ"
                                autoComplete="name"
                                value={form.fullName}
                                onChange={handleInputChange("fullName")}
                                error={!!errors.fullName}
                            />
                        </FormField>

                        <FormField
                            label="Tên đăng nhập"
                            name="username"
                            error={errors.username}
                            required
                        >
                            <Input
                                id="username"
                                type="text"
                                placeholder="Nhập tên đăng nhập"
                                autoComplete="username"
                                value={form.username}
                                onChange={handleInputChange("username")}
                                error={!!errors.username}
                            />
                        </FormField>

                        <FormField
                            label="Email"
                            name="email"
                            error={errors.email}
                            required
                        >
                            <Input
                                id="email"
                                type="email"
                                placeholder="Nhập địa chỉ email"
                                autoComplete="email"
                                value={form.email}
                                onChange={handleInputChange("email")}
                                error={!!errors.email}
                            />
                        </FormField>

                        <FormField
                            label="Số điện thoại"
                            name="phone"
                            error={errors.phone}
                            required
                        >
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="Nhập số điện thoại"
                                autoComplete="tel"
                                value={form.phone}
                                onChange={handleInputChange("phone")}
                                error={!!errors.phone}
                            />
                        </FormField>

                        <FormField
                            label="Ngày sinh"
                            name="dayOfBirth"
                            error={errors.dayOfBirth}
                            required
                        >
                            <DatePicker
                                id="dayOfBirth"
                                value={form.dayOfBirth}
                                onChange={(value) => {
                                    setForm({ ...form, dayOfBirth: value });
                                    // Clear error when user changes date
                                    if (errors.dayOfBirth) {
                                        const newErrors = { ...errors };
                                        delete newErrors.dayOfBirth;
                                        setErrors(newErrors);
                                    }
                                }}
                                error={!!errors.dayOfBirth}
                                maxDate={new Date()} // Today
                                minDate={new Date(new Date().getFullYear() - 100, 0, 1)} // 100 years ago
                            />
                        </FormField>

                        <FormField
                            label="Số CCCD"
                            name="idCardNumber"
                            error={errors.idCardNumber}
                            required
                        >
                            <Input
                                id="idCardNumber"
                                type="text"
                                placeholder="Nhập 12 chữ số CCCD"
                                maxLength={12}
                                value={form.idCardNumber}
                                onChange={handleInputChange("idCardNumber")}
                                error={!!errors.idCardNumber}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {form.idCardNumber.length}/12 chữ số
                            </p>
                        </FormField>
                    </div>

                    {/* Priority Group */}
                    <div className="mt-4">
                        <label className="flex items-center space-x-2">
                            <input
                                id="priorityGroup"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                checked={form.priorityGroup}
                                onChange={handleCheckboxChange("priorityGroup")}
                            />
                            <span className="text-sm text-gray-700">
                                Thuộc nhóm ưu tiên (người cao tuổi, người khuyết tật, phụ nữ có thai...)
                            </span>
                        </label>
                    </div>

                    {/* Description */}
                    <FormField
                        label="Ghi chú thêm"
                        name="description"
                        className="mt-4"
                    >
                        <textarea
                            id="description"
                            placeholder="Ghi chú thêm về bản thân, nhu cầu sử dụng dịch vụ..."
                            rows={3}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder:text-gray-400 resize-none"
                            value={form.description}
                            onChange={handleInputChange("description")}
                        />
                    </FormField>
                </div>

                {/* Security Information Section */}
                <div>
                    <h3 className="text-lg font-medium text-black mb-4 border-b border-gray-200 pb-2">
                        Thông tin bảo mật
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            label="Mật khẩu"
                            name="password"
                            error={errors.password}
                            required
                        >
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                                autoComplete="new-password"
                                value={form.password}
                                onChange={handleInputChange("password")}
                                error={!!errors.password}
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                }
                            />
                        </FormField>

                        <FormField
                            label="Xác nhận mật khẩu"
                            name="confirmPassword"
                            error={errors.confirmPassword}
                            required
                        >
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Nhập lại mật khẩu"
                                autoComplete="new-password"
                                value={form.confirmPassword}
                                onChange={handleInputChange("confirmPassword")}
                                error={!!errors.confirmPassword}
                                className={passwordsMatch && form.confirmPassword ? "border-green-500" : ""}
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                }
                            />
                            {passwordsMatch && form.confirmPassword && !errors.confirmPassword && (
                                <p className="text-green-600 text-xs mt-1 flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Mật khẩu khớp
                                </p>
                            )}
                        </FormField>
                    </div>
                </div>

                <div className="pt-4">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner size="sm" color="white" className="mr-2" />
                                Đang đăng ký...
                            </>
                        ) : (
                            "Đăng ký tài khoản công dân"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}