/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { InputField, TextareaField } from '@/shared/components/manager/features/form/BaseForm';
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
  priorityLevel: number;
  submissionMethod: string;
  estimatedCompletionDate: string;
  actualCompletionDate: string;
  resultDescription: string;
  totalFee: number;
  isPayment: boolean;
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

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Cập nhật hồ sơ"
      onOk={handleSubmit}
      onCancel={onClose}
      okText="Lưu"
      cancelText="Hủy"
      centered
      size="large"
      confirmLoading={isLoading}
    >
      <div className="space-y-4">
        {/* Case Info - Read Only */}
        {caseData && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Thông tin hồ sơ</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Mã hồ sơ:</span>{' '}
                <span className="font-medium text-gray-900">{caseData.caseCode}</span>
              </div>
              <div>
                <span className="text-gray-600">Khách hàng:</span>{' '}
                <span className="font-medium text-gray-900">{caseData.guestName}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-600">Dịch vụ:</span>{' '}
                <span className="font-medium text-gray-900">{caseData.serviceName}</span>
              </div>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Priority Level */}
          <form.Field name="priorityLevel">
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mức độ ưu tiên <span className="text-red-500">*</span>
                </label>
                <select
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value) as never)}
                  disabled={isLoading}
                  className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value={1}>Thấp (1)</option>
                  <option value={2}>Trung bình (2)</option>
                  <option value={3}>Cao (3)</option>
                  <option value={4}>Rất cao (4)</option>
                  <option value={5}>Khẩn cấp (5)</option>
                </select>
              </div>
            )}
          </form.Field>

          {/* Submission Method */}
          <form.Field name="submissionMethod">
            {(field) => (
              <InputField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="submissionMethod"
                label="Phương thức nộp"
                required
                placeholder="Nhập phương thức nộp (trực tiếp, online...)"
                disabled={isLoading}
              />
            )}
          </form.Field>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field name="estimatedCompletionDate">
              {(field) => (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày dự kiến hoàn thành <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value as never)}
                    disabled={isLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="actualCompletionDate">
              {(field) => (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày hoàn thành thực tế <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value as never)}
                    disabled={isLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              )}
            </form.Field>
          </div>

          {/* Total Fee */}
          <form.Field name="totalFee">
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tổng phí <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value) as never)}
                  disabled={isLoading}
                  min={0}
                  step={1000}
                  placeholder="Nhập tổng phí"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Số tiền: {field.state.value.toLocaleString('vi-VN')} VNĐ
                </p>
              </div>
            )}
          </form.Field>

          {/* Is Payment */}
          <form.Field name="isPayment">
            {(field) => (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked as never)}
                  disabled={isLoading}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Đã thanh toán
                </label>
              </div>
            )}
          </form.Field>

          {/* Result Description */}
          <form.Field name="resultDescription">
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả kết quả
                </label>
                <textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as never)}
                  disabled={isLoading}
                  rows={3}
                  placeholder="Nhập mô tả kết quả xử lý hồ sơ"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                />
              </div>
            )}
          </form.Field>

          {/* Notes */}
          <form.Field name="notes">
            {(field) => (
              <TextareaField<FormValues>
                form={form as FormApiOf<FormValues>}
                name="notes"
                label="Ghi chú"
                placeholder="Nhập ghi chú bổ sung..."
                rows={3}
                disabled={isLoading}
              />
            )}
          </form.Field>
        </div>
      </div>
    </BaseModal>
  );
};

