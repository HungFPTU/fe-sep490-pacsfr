"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/forms/Input.com";
import { FormField } from "@/shared/components/forms/FormField.com";
import { LoadingSpinner } from "@/shared/components/common/LoadingSpinner.com";
import type { LoginPayload, LoginResponse } from "../../types";

interface LoginFormProps {
  onSubmit?: (payload: LoginPayload) => Promise<LoginResponse>;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [form, setForm] = useState<LoginPayload>({
    username: "",
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

    // Username validation - only check if not empty
    if (!form.username.trim()) {
      newErrors.username = "Tên đăng nhập là bắt buộc";
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
        const apiPayload = {
          username: form.username,
          password: form.password,
          rememberMe: form.rememberMe,
        };

        await onSubmit(apiPayload as unknown as LoginPayload);
      } catch (error) {
        console.error("Login error:", error);
        // Handle specific error cases
        if (error instanceof Error) {
          if (error.message.includes("401") || error.message.includes("Unauthorized")) {
            setErrors({ username: "Thông tin đăng nhập không chính xác" });
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
      <div className="w-full max-w-sm mx-auto bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
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
                className="text-gray-400 hover:text-gray-600"
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
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={form.rememberMe}
              onChange={handleInputChange("rememberMe")}
            />
            Ghi nhớ đăng nhập
          </label>
          <a href="#" className="text-red-500 hover:text-red-600 hover:underline">
            Quên mật khẩu?
          </a>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" color="white" className="mr-2" />
              Đang đăng nhập...
            </>
          ) : (
            "Đăng nhập"
          )}
        </Button>
      </form>
    </div>
  );
}