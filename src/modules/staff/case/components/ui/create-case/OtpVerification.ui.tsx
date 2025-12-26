"use client";

import React, { useState, useRef, useEffect } from "react";
import { Shield, Mail, RefreshCw, Loader2 } from "lucide-react";

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
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [error, setError] = useState("");
    const [isResending, setIsResending] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Auto-focus first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    // Auto-submit when all 6 digits are entered
    useEffect(() => {
        const otpCode = otp.join("");
        if (otpCode.length === 6 && !otp.includes("") && !isVerifying) {
            setError("");
            onVerify(otpCode);
        }
    }, [otp, isVerifying, onVerify]);

    const handleChange = (index: number, value: string) => {
        // Only allow digits
        const digit = value.replace(/\D/g, "").slice(-1);
        
        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);
        setError("");

        // Move to next input if digit entered
        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Move to previous input on backspace if current is empty
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        // Move forward on ArrowRight
        if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
        // Move backward on ArrowLeft
        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        
        if (pastedData) {
            const newOtp = [...otp];
            pastedData.split("").forEach((digit, index) => {
                if (index < 6) newOtp[index] = digit;
            });
            setOtp(newOtp);
            
            // Focus the next empty input or last input
            const nextEmptyIndex = newOtp.findIndex(d => !d);
            if (nextEmptyIndex !== -1) {
                inputRefs.current[nextEmptyIndex]?.focus();
            } else {
                inputRefs.current[5]?.focus();
            }
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        await onResend();
        setIsResending(false);
        setOtp(Array(6).fill(""));
        setError("");
        inputRefs.current[0]?.focus();
    };

    const isComplete = otp.every(d => d !== "");

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
            <div className="space-y-5">
                {/* Header */}
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">
                            Xác thực email
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Mã OTP đã được gửi đến <span className="font-medium text-gray-700">{email}</span>
                        </p>
                    </div>
                </div>

                {/* OTP Input Boxes */}
                <div className="space-y-3">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Nhập mã xác thực 6 số
                    </label>
                    <div className="flex justify-center gap-3" onPaste={handlePaste}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="text"
                                inputMode="numeric"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                disabled={isVerifying || isResending}
                                maxLength={1}
                                className={`
                                    w-12 h-14 text-center text-xl font-bold rounded-lg border-2 
                                    transition-all duration-200 outline-none
                                    ${digit 
                                        ? "border-indigo-500 bg-indigo-50 text-indigo-700" 
                                        : "border-gray-200 bg-gray-50 text-gray-900"
                                    }
                                    ${isVerifying ? "opacity-50 cursor-not-allowed" : ""}
                                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
                                    disabled:bg-gray-100 disabled:cursor-not-allowed
                                `}
                            />
                        ))}
                    </div>
                    
                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm text-center font-medium">{error}</p>
                    )}

                    {/* Auto-verifying indicator */}
                    {isVerifying && isComplete && (
                        <div className="flex items-center justify-center gap-2 text-sm text-indigo-600">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Đang xác thực...</span>
                        </div>
                    )}
                </div>

                {/* Instructions */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                        <div className="text-sm text-gray-600">
                            <p className="font-medium text-gray-700 mb-1">Hướng dẫn:</p>
                            <ul className="space-y-0.5 text-xs">
                                <li>• Kiểm tra hộp thư đến của khách hàng</li>
                                <li>• Mã có hiệu lực trong 10 phút</li>
                                <li>• Hệ thống tự động xác thực khi nhập đủ 6 số</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Resend Button */}
                <div className="flex justify-center pt-2">
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={isVerifying || isResending}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isResending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Đang gửi lại...
                            </>
                        ) : (
                            <>
                                <RefreshCw className="w-4 h-4" />
                                Gửi lại mã xác thực
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
