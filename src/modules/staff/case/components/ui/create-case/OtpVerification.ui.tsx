"use client";

import React, { useState } from "react";
import { Card } from "@/shared/components/ui/card.ui";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/ui/input.ui";
import { Shield, Mail, RefreshCw } from "lucide-react";

interface OtpVerificationProps {
    guestId: string;
    email: string;
    isVerifying: boolean;
    onVerify: (otpCode: string) => void;
    onResend: () => void;
}

export const OtpVerification: React.FC<OtpVerificationProps> = ({
    guestId,
    email,
    isVerifying,
    onVerify,
    onResend,
}) => {
    const [otpCode, setOtpCode] = useState("");
    const [error, setError] = useState("");
    const [isResending, setIsResending] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!otpCode.trim()) {
            setError("Vui lòng nhập mã xác thực");
            return;
        }

        if (otpCode.length !== 6) {
            setError("Mã xác thực phải đủ 6 số");
            return;
        }

        setError("");
        onVerify(otpCode);
    };

    const handleResend = async () => {
        setIsResending(true);
        await onResend();
        setIsResending(false);
        setOtpCode("");
        setError("");
    };

    return (
        <Card className="p-6 bg-blue-50 border-2 border-blue-200 mt-6">
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">
                            Xác thực email khách hàng
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Mã xác thực đã được gửi đến email: <strong>{email}</strong>
                        </p>
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="flex items-start gap-2">
                        <Mail className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-gray-700">
                            <p className="font-medium mb-1">Hướng dẫn:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>Kiểm tra hộp thư đến của khách hàng</li>
                                <li>Nhập mã xác thực gồm 6 ký tự</li>
                                <li>Mã có hiệu lực trong 10 phút</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* OTP Input Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mã xác thực (OTP) <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="000000"
                            value={otpCode}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, ''); // Chỉ cho phép số
                                if (value.length <= 6) {
                                    setOtpCode(value);
                                    setError("");
                                }
                            }}
                            maxLength={6}
                            disabled={isVerifying || isResending}
                            className="text-center text-2xl font-bold tracking-[0.5em] bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl py-4 text-blue-700"
                            autoFocus
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-1 text-center font-medium">{error}</p>
                        )}

                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            type="submit"
                            disabled={isVerifying || isResending || otpCode.length !== 6}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                        >
                            {isVerifying ? (
                                <>
                                    <span className="inline-block animate-spin mr-2">⏳</span>
                                    Đang xác thực...
                                </>
                            ) : (
                                <>
                                    <Shield className="w-4 h-4 mr-2" />
                                    Xác thực
                                </>
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleResend}
                            disabled={isVerifying || isResending}
                            className="px-6 border-2 border-blue-300 hover:bg-blue-50 text-blue-700"
                        >
                            {isResending ? (
                                <>
                                    <span className="inline-block animate-spin mr-2">⏳</span>
                                    Đang gửi...
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Gửi lại mã
                                </>
                            )}
                        </Button>
                    </div>
                </form>

            </div>
        </Card>
    );
};
