'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Loader, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import { useVerifyOTP, useResendOTP } from '../../../hooks';
import { useGlobalToast } from '@/core/patterns/SingletonHook';

interface CaseOTPVerificationModalProps {
  isOpen: boolean;
  caseCode: string;
  onVerifySuccess?: (data: any) => void;
  onClose: () => void;
}

const OTP_LENGTH = 6;

export const CaseOTPVerificationModal: React.FC<CaseOTPVerificationModalProps> = ({
  isOpen,
  caseCode,
  onVerifySuccess,
  onClose,
}) => {
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [step, setStep] = useState<'input' | 'verifying' | 'success' | 'error'>('input');
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const verifyMutation = useVerifyOTP();
  const resendMutation = useResendOTP();
  const { addToast } = useGlobalToast();

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Auto-verify when all digits are filled
  useEffect(() => {
    const otp = otpDigits.join('');
    if (otp.length === OTP_LENGTH && step === 'input') {
      handleVerify(otp);
    }
  }, [otpDigits]);

  const handleVerify = async (otpCode: string) => {
    setError('');
    setStep('verifying');

    try {
      const result = await verifyMutation.mutateAsync({
        caseCode: caseCode,
        otpCode,
      });

      if (result?.data?.success) {
        setStep('success');
        addToast({ message: 'Xác minh OTP thành công!', type: 'success' });
        setTimeout(() => {
          onVerifySuccess?.(result?.data);
          handleClose();
        }, 1500);
      } else {
        const errorMsg = result?.data?.message || 'Xác minh OTP thất bại';
        setError(errorMsg);
        setStep('error');
        addToast({ message: errorMsg, type: 'error' });
        // Reset and focus first input on error
        setOtpDigits(Array(OTP_LENGTH).fill(''));
        setTimeout(() => {
          setStep('input');
          inputRefs.current[0]?.focus();
        }, 100);
      }
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err?.message || 'Xác minh OTP thất bại';
      setError(errorMsg);
      setStep('error');
      addToast({ message: errorMsg, type: 'error' });
      // Reset and focus first input on error
      setOtpDigits(Array(OTP_LENGTH).fill(''));
      setTimeout(() => {
        setStep('input');
        inputRefs.current[0]?.focus();
      }, 100);
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    if (step !== 'input') return;
    
    // Only allow numbers
    const digit = value.replace(/\D/g, '').slice(-1);
    
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);
    setError('');

    // Auto-focus next input
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (step !== 'input') return;

    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
        const newDigits = [...otpDigits];
        newDigits[index - 1] = '';
        setOtpDigits(newDigits);
      } else {
        // Clear current input
        const newDigits = [...otpDigits];
        newDigits[index] = '';
        setOtpDigits(newDigits);
      }
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (step !== 'input') return;
    
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    
    if (pastedData) {
      const newDigits = Array(OTP_LENGTH).fill('');
      pastedData.split('').forEach((digit, idx) => {
        if (idx < OTP_LENGTH) newDigits[idx] = digit;
      });
      setOtpDigits(newDigits);
      
      // Focus last filled input or last input
      const lastFilledIndex = Math.min(pastedData.length - 1, OTP_LENGTH - 1);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    try {
      const result = await resendMutation.mutateAsync({
        caseCode,
      });

      if (result?.data?.success) {
        setCountdown(60);
        setOtpDigits(Array(OTP_LENGTH).fill(''));
        setError('');
        setStep('input');
        inputRefs.current[0]?.focus();
        addToast({ message: 'Mã OTP mới đã được gửi', type: 'success' });
      } else {
        const errorMsg = result?.data?.message || 'Gửi lại OTP thất bại';
        addToast({ message: errorMsg, type: 'error' });
      }
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err?.message || 'Gửi lại OTP thất bại';
      addToast({ message: errorMsg, type: 'error' });
    }
  };

  const handleClose = () => {
    setOtpDigits(Array(OTP_LENGTH).fill(''));
    setError('');
    setStep('input');
    setCountdown(60);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
        <div className="mb-6 text-center">
          <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
            step === 'success' ? 'bg-green-100' : step === 'verifying' ? 'bg-blue-100' : 'bg-blue-100'
          }`}>
            {step === 'success' ? (
              <CheckCircle className="h-8 w-8 text-green-600" />
            ) : step === 'verifying' ? (
              <Loader className="h-8 w-8 text-blue-600 animate-spin" />
            ) : (
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            )}
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            {step === 'success' ? 'Xác minh thành công!' : step === 'verifying' ? 'Đang xác minh...' : 'Xác minh OTP'}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {step === 'success' 
              ? 'Đang tải thông tin hồ sơ của bạn...' 
              : 'Nhập mã 6 số đã được gửi đến email/SMS'}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Mã hồ sơ: <span className="font-semibold text-blue-600">{caseCode}</span>
          </p>
        </div>

        <div className="space-y-5">
          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={step === 'verifying' || step === 'success'}
                className={`
                  w-12 h-14 rounded-lg border-2 text-center text-xl font-bold
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500/30
                  disabled:bg-slate-100 disabled:cursor-not-allowed
                  ${digit 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-slate-300 bg-white text-slate-900'
                  }
                  ${error ? 'border-red-400 shake' : ''}
                  ${step === 'success' ? 'border-green-500 bg-green-50 text-green-700' : ''}
                `}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <p className="flex items-center justify-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {error}
            </p>
          )}

          {/* Verifying State */}
          {step === 'verifying' && (
            <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
              <Loader className="h-4 w-4 animate-spin" />
              Đang xác minh mã OTP...
            </div>
          )}

          {/* Resend OTP */}
          <div className="flex items-center justify-center gap-3 text-sm">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={countdown > 0 || resendMutation.isPending || step === 'verifying'}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4" />
              Gửi lại mã
            </button>
            {countdown > 0 && (
              <span className="text-slate-500">({countdown}s)</span>
            )}
          </div>

          {/* Close Button */}
          <Button
            type="button"
            onClick={handleClose}
            variant="outline"
            disabled={step === 'verifying'}
            className="w-full"
          >
            Hủy
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};
