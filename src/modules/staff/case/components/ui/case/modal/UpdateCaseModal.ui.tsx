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
          {/* Submission Method */}
          <form.Field name="submissionMethod">
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phương thức nộp
                </label>
                <input
                  type="text"
                  value={field.state.value}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>
            )}
          </form.Field>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field name="estimatedCompletionDate">
              {(field) => (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày dự kiến hoàn thành
                  </label>
                  <input
                    type="date"
                    value={field.state.value}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
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
                  Tổng phí
                </label>
                <input
                  type="number"
                  value={field.state.value}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Số tiền: {field.state.value.toLocaleString('vi-VN')} VNĐ
                </p>
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

