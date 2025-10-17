"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/forms/Input.com";
import { FormField } from "@/shared/components/forms/FormField.com";
import { LoadingSpinner } from "@/shared/components/common/LoadingSpinner.com";
import type { LoginPayload, LoginResponse } from "@/modules/auth/types";

interface StaffLoginFormProps {
  onSubmit?: (payload: LoginPayload) => Promise<LoginResponse>;
  isLoading?: boolean;
}

export function StaffLoginForm({ onSubmit, isLoading = false }: StaffLoginFormProps) {
  const [form, setForm] = useState<LoginPayload>({
    phone: "",
    password: "",
    rememberMe: false,
  });
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Phone validation - only check if not empty
    if (!form.phone.trim()) {
      newErrors.phone = "Tên đăng nhập là bắt buộc";
    }

    // Password validation - only check if not empty
    if (!form.password.trim()) {
      newErrors.password = "Mật khẩu là bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (onSubmit) {
      try {
        // Transform payload to match API requirement (Username, Password with capital letters)
        const apiPayload = {
          Username: form.phone,
          Password: form.password,
        };
        
        await onSubmit(apiPayload as unknown as LoginPayload);
      } catch (error) {
        console.error("Login error:", error);
        // Handle specific error cases
        if (error instanceof Error) {
          if (error.message.includes("401") || error.message.includes("Unauthorized")) {
            setErrors({ phone: "Thông tin đăng nhập không chính xác" });
          } else {
            setErrors({ password: error.message });
          }
        }
      }
    }
  };

  const handleInputChange = (field: keyof LoginPayload) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'rememberMe' ? e.target.checked : e.target.value;
    setForm({ ...form, [field]: value });

    // Clear error when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-md mx-auto bg-white border border-slate-200 p-8 rounded-2xl shadow-lg">
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-slate-200 p-8 rounded-2xl shadow-lg">
      {/* Header với badge nhân viên */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-2 text-slate-900">
          Đăng nhập Nhân viên
        </h1>
        <p className="text-sm text-slate-600 mb-1">
          Hệ thống PASCS - Khu vực quản lý
        </p>
        <div className="inline-flex items-center px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Khu vực bảo mật
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField
          label="Tên đăng nhập"
          name="phone"
          error={errors.phone}
          required
        >
          <Input
            id="phone"
            type="text"
            placeholder="Nhập tên đăng nhập hoặc mã nhân viên"
            autoComplete="username"
            value={form.phone}
            onChange={handleInputChange("phone")}
            error={!!errors.phone}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
        </FormField>

        <FormField
          label="Mật khẩu"
          name="password"
          error={errors.password}
          required
        >
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Nhập mật khẩu"
            autoComplete="current-password"
            value={form.password}
            onChange={handleInputChange("password")}
            error={!!errors.password}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            }
          />
        </FormField>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-red-600 border-slate-300 rounded focus:ring-red-500"
              checked={form.rememberMe}
              onChange={handleInputChange("rememberMe")}
            />
            Duy trì đăng nhập
          </label>
          <a href="#" className="text-red-600 hover:text-red-700 hover:underline font-medium transition-colors">
            Quên mật khẩu?
          </a>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" color="white" className="mr-2" />
              Đang xác thực...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Đăng nhập hệ thống
            </div>
          )}
        </Button>
      </form>

      {/* Security notice */}
      <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-xs text-slate-600">
            <p className="font-medium mb-1">Lưu ý bảo mật</p>
            <ul className="space-y-1 text-slate-500">
              <li>• Không chia sẻ thông tin đăng nhập với người khác</li>
              <li>• Đăng xuất sau mỗi ca làm việc</li>
              <li>• Liên hệ IT nếu phát hiện bất thường</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

