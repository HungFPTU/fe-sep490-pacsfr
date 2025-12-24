'use client';

import React, { useState, useEffect } from 'react';
import { Loader, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import { usePaknVerifyOTP, usePaknResendOTP } from '../../../hooks';
import { useGlobalToast } from '@/core/patterns/SingletonHook';

interface PaknOTPVerificationModalProps {
  isOpen: boolean;
  paknCode: string;
  onVerifySuccess?: (data: any) => void;
  onClose: () => void;
}

export const PaknOTPVerificationModal: React.FC<PaknOTPVerificationModalProps> = ({
  isOpen,
  paknCode,
  onVerifySuccess,
  onClose,
}) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'input' | 'verifying' | 'success' | 'error'>('input');
  const [countdown, setCountdown] = useState(60);
  const verifyMutation = usePaknVerifyOTP();
  const resendMutation = usePaknResendOTP();
  const { addToast } = useGlobalToast();

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp.trim()) {
      setError('Vui lòng nhập mã OTP');
      return;
    }

    if (otp.trim().length < 6) {
      setError('Mã OTP phải có ít nhất 6 ký tự');
      return;
    }

    setStep('verifying');

    try {
      const result = await verifyMutation.mutateAsync({
        paknCode,
        otpCode: otp.trim(),
      });

      setStep('success');
      addToast({ message: 'Xác thực OTP thành công!', type: 'success' });
      
      // Pass data to parent - API response structure: { success, message, data: PaknDetail }
      if (onVerifySuccess && result?.data?.data) {
        onVerifySuccess(result.data.data);
      } else if (onVerifySuccess && result?.data) {
        // Fallback if data is directly in result.data
        onVerifySuccess(result.data);
      }

      // Close modal after a short delay
      setTimeout(() => {
        onClose();
        resetForm();
      }, 1500);
    } catch (err: any) {
      setStep('error');
      const message = err?.response?.data?.message || err?.message || 'Mã OTP không hợp lệ hoặc đã hết hạn';
      setError(message);
      addToast({ message, type: 'error' });
    }
  };

  const handleResend = async () => {
    setError('');
    try {
      await resendMutation.mutateAsync({ paknCode });
      setCountdown(60);
      addToast({ message: 'Đã gửi lại mã OTP', type: 'success' });
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || 'Không thể gửi lại mã OTP';
      setError(message);
      addToast({ message, type: 'error' });
    }
  };

  const resetForm = () => {
    setOtp('');
    setError('');
    setStep('input');
    setCountdown(60);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            {step === 'success' ? (
              <CheckCircle className="h-8 w-8 text-green-600" />
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
          <h3 className="text-2xl font-bold text-slate-900">Xác thực OTP</h3>
          <p className="mt-2 text-sm text-slate-600">
            Vui lòng nhập mã OTP đã được gửi đến email/SMS của bạn
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Mã PAKN: <span className="font-semibold text-red-600">{paknCode}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="otp" className="block text-sm font-semibold text-slate-700 mb-2">
              Mã OTP <span className="text-red-600">*</span>
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                if (error) setError('');
              }}
              placeholder="Nhập mã OTP 6 số"
              maxLength={6}
              disabled={step === 'verifying' || step === 'success'}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-center text-lg font-semibold tracking-widest focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-100"
            />
            {error && (
              <p className="mt-2 flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={handleResend}
              disabled={countdown > 0 || resendMutation.isPending}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4" />
              Gửi lại mã
            </button>
            {countdown > 0 && (
              <span className="text-slate-500">Gửi lại sau {countdown}s</span>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              disabled={step === 'verifying'}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={step === 'verifying' || step === 'success'}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {step === 'verifying' ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Đang xác thực...
                </>
              ) : step === 'success' ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Thành công!
                </>
              ) : (
                'Xác nhận'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
