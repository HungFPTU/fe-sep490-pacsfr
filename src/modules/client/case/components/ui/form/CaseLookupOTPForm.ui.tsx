'use client';

import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { Search, Loader, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import { Input } from '@/shared/components/forms/Input.com';

export interface CaseLookupOTPFormValues {
  caseCode: string;
}

interface CaseLookupOTPFormProps {
  onSubmit: (values: CaseLookupOTPFormValues) => Promise<void>;
  isSubmitting?: boolean;
  errorMessage?: string | null;
}

export const CaseLookupOTPForm: React.FC<CaseLookupOTPFormProps> = ({
  onSubmit,
  isSubmitting = false,
  errorMessage,
}) => {
  const [step, setStep] = useState<'input' | 'sending' | 'sent' | 'error'>('input');

  const form = useForm({
    defaultValues: {
      caseCode: '',
    } as CaseLookupOTPFormValues,
    onSubmit: async ({ value }) => {
      setStep('sending');
      try {
        await onSubmit({
          caseCode: value.caseCode.trim(),
        });
        setStep('sent');
        // Reset after 3 seconds
        setTimeout(() => {
          setStep('input');
          form.reset();
        }, 3000);
      } catch (err) {
        setStep('error');
      }
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <form.Field name="caseCode">
        {(field) => (
          <div className="space-y-3">
            <label htmlFor={field.name} className="block text-sm font-semibold text-slate-700">
              Mã số hồ sơ <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                  if (step === 'error') setStep('input');
                }}
                onBlur={field.handleBlur}
                placeholder="Ví dụ: HS2025851371"
                disabled={isSubmitting || step === 'sent'}
                error={!!field.state.meta.errors.length}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {/* Status Messages */}
      {step === 'sending' && (
        <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4 border border-blue-200">
          <Loader className="h-5 w-5 animate-spin text-blue-600 shrink-0" />
          <span className="text-sm text-blue-700 font-medium">Đang gửi mã OTP...</span>
        </div>
      )}

      {step === 'sent' && (
        <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4 border border-green-200">
          <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
          <div className="text-sm text-green-700">
            <p className="font-medium">Mã OTP đã được gửi!</p>
            <p className="text-xs mt-1">Vui lòng kiểm tra email hoặc tin nhắn của bạn</p>
          </div>
        </div>
      )}

      {errorMessage && step === 'error' && (
        <div className="flex items-start gap-3 rounded-lg bg-red-50 p-4 border border-red-200">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-medium text-red-700">Lỗi gửi mã OTP</p>
            <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || step === 'sent'}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 h-auto"
      >
        {isSubmitting || step === 'sending' ? (
          <>
            <Loader className="h-5 w-5 animate-spin mr-2" />
            Đang xử lý...
          </>
        ) : step === 'sent' ? (
          <>
            <CheckCircle className="h-5 w-5 mr-2" />
            Đã gửi thành công
          </>
        ) : (
          <>
            <Send className="h-5 w-5 mr-2" />
            Gửi mã OTP
          </>
        )}
      </Button>
    </form>
  );
};
