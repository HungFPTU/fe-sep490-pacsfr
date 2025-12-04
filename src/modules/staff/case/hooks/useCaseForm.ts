'use client';

import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { useUpdateCase } from './useUpdateCase';
import type { CaseDetailResponse } from '../types/case-search';

type FormValues = {
  submissionMethod: string;
  estimatedCompletionDate: string;
  actualCompletionDate: string;
  resultDescription: string;
  totalFee: number;
  notes: string;
};

interface UseCaseFormProps {
  caseData?: CaseDetailResponse | null;
  open: boolean;
  onSuccess?: () => void;
  onClose: () => void;
}

export const useCaseForm = ({ caseData, open, onSuccess, onClose }: UseCaseFormProps) => {
  const updateMutation = useUpdateCase();
  const { addToast } = useGlobalToast();

  const toFormValues = (data?: Partial<CaseDetailResponse> | null): FormValues => ({
    submissionMethod: data?.submissionMethod ?? '',
    estimatedCompletionDate: data?.estimatedCompletionDate
      ? new Date(data.estimatedCompletionDate).toISOString().split('T')[0]
      : '',
    actualCompletionDate: data?.estimatedCompletionDate
      ? new Date(data.estimatedCompletionDate).toISOString().split('T')[0]
      : '',
    resultDescription: data?.notes ?? '',
    totalFee: data?.totalFee ?? 0,
    notes: data?.notes ?? '',
  });

  const form = useForm({
    defaultValues: toFormValues(caseData),
    onSubmit: async ({ value }) => {
      if (!caseData?.id) {
        addToast({ message: 'Không tìm thấy ID hồ sơ', type: 'error' });
        return;
      }

      try {
        const res = await updateMutation.mutateAsync({
          id: caseData.id,
          data: {
            actualCompletionDate: new Date(value.actualCompletionDate).toISOString(),
            resultDescription: value.resultDescription,
            notes: value.notes,
          },
        });

        if (res?.success) {
          addToast({ message: 'Cập nhật hồ sơ thành công', type: 'success' });
          onSuccess?.();
          onClose();
        }
      } catch (error) {
        console.error('Error updating case:', error);
        addToast({ message: 'Đã xảy ra lỗi khi cập nhật hồ sơ', type: 'error' });
      }
    },
  });

  useEffect(() => {
    if (open && caseData) {
      form.reset();
      form.setFieldValue('priorityLevel', caseData.priorityLevel);
      form.setFieldValue('submissionMethod', caseData.submissionMethod);
      form.setFieldValue(
        'estimatedCompletionDate',
        caseData.estimatedCompletionDate
          ? new Date(caseData.estimatedCompletionDate).toISOString().split('T')[0]
          : ''
      );
      form.setFieldValue(
        'actualCompletionDate',
        caseData.estimatedCompletionDate
          ? new Date(caseData.estimatedCompletionDate).toISOString().split('T')[0]
          : ''
      );
      form.setFieldValue('resultDescription', caseData.notes ?? '');
      form.setFieldValue('totalFee', caseData.totalFee);
      form.setFieldValue('notes', caseData.notes ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, caseData?.id]);

  return {
    form,
    isLoading: updateMutation.isPending,
    handleSubmit: () => form.handleSubmit(),
  };
};

