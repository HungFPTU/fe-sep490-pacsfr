/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { FileText, User, Briefcase, Calendar, Banknote, FileEdit, StickyNote } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { TextareaField } from '@/shared/components/manager/features/form/BaseForm';
import { useCaseForm } from '../../../../hooks/useCaseForm';
import type { CaseDetailResponse } from '../../../../types/case-search';
import { FormApiOf } from '@/types/types';

interface UpdateCaseModalProps {
  open: boolean;
  onClose: () => void;
  caseData: CaseDetailResponse | null;
  onSuccess?: () => void;
}

type FormValues = {
  submissionMethod: string;
  estimatedCompletionDate: string;
  actualCompletionDate: string;
  resultDescription: string;
  totalFee: number;
  notes: string;
};

export const UpdateCaseModal: React.FC<UpdateCaseModalProps> = ({
  open,
  onClose,
  caseData,
  onSuccess,
}) => {
  const { form, isLoading, handleSubmit } = useCaseForm({
    caseData,
    open,
    onSuccess,
    onClose,
  });

  const inputClass = "w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed";
  const labelClass = "block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5";

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Cập nhật hồ sơ"
      onOk={handleSubmit}
      onCancel={onClose}
      okText="Lưu thay đổi"
      cancelText="Hủy"
      centered
      size="large"
      confirmLoading={isLoading}
    >
      <div className="space-y-5">
        {/* Case Info Header */}
        {caseData && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-gray-900 font-mono">{caseData.caseCode}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {caseData.guestName}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    {caseData.serviceName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Submission Method - Read Only */}
          <form.Field name="submissionMethod">
            {(field) => (
              <div>
                <label className={labelClass}>Phương thức nộp</label>
                <input
                  type="text"
                  value={field.state.value}
                  disabled
                  className={inputClass}
                />
              </div>
            )}
          </form.Field>

          {/* Dates Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field name="estimatedCompletionDate">
              {(field) => (
                <div>
                  <label className={labelClass}>
                    <Calendar className="w-3.5 h-3.5 inline mr-1" />
                    Ngày dự kiến hoàn thành
                  </label>
                  <input
                    type="date"
                    value={field.state.value}
                    disabled
                    className={inputClass}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="actualCompletionDate">
              {(field) => (
                <div>
                  <label className={labelClass}>
                    <Calendar className="w-3.5 h-3.5 inline mr-1" />
                    Ngày hoàn thành thực tế <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value as never)}
                    disabled={isLoading}
                    className={inputClass}
                  />
                </div>
              )}
            </form.Field>
          </div>

          {/* Total Fee - Read Only */}
          <form.Field name="totalFee">
            {(field) => (
              <div>
                <label className={labelClass}>
                  <Banknote className="w-3.5 h-3.5 inline mr-1" />
                  Tổng phí
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={field.state.value}
                    disabled
                    className={inputClass}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    {field.state.value.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>
              </div>
            )}
          </form.Field>

          {/* Result Description */}
          <form.Field name="resultDescription">
            {(field) => (
              <div>
                <label className={labelClass}>
                  <FileEdit className="w-3.5 h-3.5 inline mr-1" />
                  Mô tả kết quả
                </label>
                <textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as never)}
                  disabled={isLoading}
                  rows={3}
                  placeholder="Nhập mô tả kết quả xử lý hồ sơ..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:cursor-not-allowed resize-none"
                />
              </div>
            )}
          </form.Field>

          {/* Notes */}
          <form.Field name="notes">
            {(field) => (
              <div>
                <label className={labelClass}>
                  <StickyNote className="w-3.5 h-3.5 inline mr-1" />
                  Ghi chú
                </label>
                <textarea
                  value={field.state.value as string}
                  onChange={(e) => field.handleChange(e.target.value as never)}
                  disabled={isLoading}
                  rows={3}
                  placeholder="Nhập ghi chú bổ sung..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:cursor-not-allowed resize-none"
                />
              </div>
            )}
          </form.Field>
        </div>
      </div>
    </BaseModal>
  );
};
