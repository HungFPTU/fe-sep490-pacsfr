'use client';

import React, { useState, useEffect } from 'react';
import { Loader, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import { useVerifyOTP, useResendOTP } from '../../../hooks';
import { useGlobalToast } from '@/core/patterns/SingletonHook';

interface CaseOTPVerificationModalProps {
  isOpen: boolean;
  caseCode: string;
  onVerifySuccess?: () => void;
  onClose: () => void;
}

export const CaseOTPVerificationModal: React.FC<CaseOTPVerificationModalProps> = ({
  isOpen,
  caseCode,
  onVerifySuccess,
  onClose,
}) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'input' | 'verifying' | 'success' | 'error'>('input');
  const [countdown, setCountdown] = useState(60);
  const verifyMutation = useVerifyOTP();
  const resendMutation = useResendOTP();
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

    try {
      setStep('verifying');
      const result = await verifyMutation.mutateAsync({
        caseCode: caseCode,
        otpCode: otp.trim(),
      });

      if (result?.data?.success) {
        setStep('success');
        addToast({ message: 'Xác minh OTP thành công!', type: 'success' });
        setTimeout(() => {
          onVerifySuccess?.();
          handleClose();
        }, 1500);
      } else {
        const errorMsg = result?.data?.message || 'Xác minh OTP thất bại';
        setError(errorMsg);
        setStep('error');
        addToast({ message: errorMsg, type: 'error' });
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Xác minh OTP thất bại';
      setError(errorMsg);
      setStep('error');
      addToast({ message: errorMsg, type: 'error' });
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
        setOtp('');
        setError('');
        setStep('input');
        addToast({ message: 'Mã OTP mới đã được gửi', type: 'success' });
      } else {
        const errorMsg = result?.data?.message || 'Gửi lại OTP thất bại';
        addToast({ message: errorMsg, type: 'error' });
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Gửi lại OTP thất bại';
      addToast({ message: errorMsg, type: 'error' });
    }
  };

  const handleClose = () => {
    setOtp('');
    setError('');
    setStep('input');
    setCountdown(60);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1">
            <div className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-sm font-medium text-blue-600">Xác minh OTP</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Nhập mã OTP</h2>
          <p className="mt-2 text-sm text-slate-600">
            Chúng tôi đã gửi mã xác minh đến hồ sơ <strong>{caseCode}</strong>
          </p>
        </div>

        {/* Status Messages */}
        {step === 'verifying' && (
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-blue-50 p-4 border border-blue-200">
            <Loader className="h-5 w-5 animate-spin text-blue-600 shrink-0" />
            <span className="text-sm text-blue-700 font-medium">Đang xác minh mã OTP...</span>
          </div>
        )}

        {step === 'success' && (
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-50 p-4 border border-green-200">
            <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
            <span className="text-sm text-green-700 font-medium">Xác minh thành công!</span>
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-lg bg-red-50 p-4 border border-red-200">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* Form */}
        {(step === 'input' || step === 'error') && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-slate-700 mb-2">
                Mã OTP <span className="text-red-500">*</span>
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.toUpperCase());
                  setError('');
                }}
                placeholder="Ví dụ: 123456"
                disabled={verifyMutation.isPending}
                maxLength={10}
                className={`w-full rounded-lg border-2 px-4 py-3 text-lg tracking-widest font-mono transition-all focus:outline-none ${
                  error
                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
              />
            </div>

            {/* Resend OTP Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={countdown > 0 || resendMutation.isPending}
                className={`inline-flex items-center gap-2 text-sm font-medium transition-all ${
                  countdown > 0 || resendMutation.isPending
                    ? 'text-slate-400 cursor-not-allowed'
                    : 'text-blue-600 hover:text-blue-700 cursor-pointer'
                }`}
              >
                <RotateCcw className="h-4 w-4" />
                {countdown > 0 ? `Gửi lại OTP sau ${countdown}s` : 'Gửi lại OTP'}
              </button>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={verifyMutation.isPending}
                className="flex-1"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={verifyMutation.isPending || !otp.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {verifyMutation.isPending ? 'Đang xác minh...' : 'Xác minh'}
              </Button>
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="flex gap-3">
            <Button
              onClick={handleClose}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Đóng
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
