'use client';

import React, { useState } from 'react';
import { Check, Circle, ArrowRight } from 'lucide-react';
import type { CaseStep } from '../../../types/case-search';
import { useMoveNextStep } from '../../../hooks';
import { ConfirmDialog } from '@/shared/components/common/ConfirmDialog';

interface CaseStepsProgressProps {
  caseId: string;
  currentStatus: string;
  steps?: {
    $id?: string;
    $values: CaseStep[];
  };
  currentStep?: CaseStep;
}

export const CaseStepsProgress: React.FC<CaseStepsProgressProps> = ({
  caseId,
  currentStatus,
  steps,
  currentStep,
}) => {
  const moveNextStepMutation = useMoveNextStep();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  if (!steps?.$values || steps.$values.length === 0) {
    return null;
  }

  const allSteps = steps.$values;
  const maxStepNumber = Math.max(...allSteps.map(s => s.stepNumber));
  const displayStep = currentStep || allSteps.find(s => s.stepNumber === maxStepNumber);

  if (!displayStep) return null;

  const handleMoveNextStep = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmMoveNextStep = async () => {
    setShowConfirmDialog(false);
    await moveNextStepMutation.mutateAsync({
      caseId,
      note: 'note',
    });
  };

  const isCompleted = currentStatus === 'Hoàn thành' || currentStatus === 'Đã hoàn thành';
  const allStepsFinished = allSteps.every(step => step.isFinished);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Quy trình xử lý</h4>

      <div className="space-y-2">
        {allSteps
          .sort((a, b) => a.stepNumber - b.stepNumber)
          .map((step) => (
            <div
              key={step.caseServiceProcedureId}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                step.isFinished
                  ? 'bg-emerald-50 border-emerald-200'
                  : step.isCurrent
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-gray-50 border-gray-100'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  step.isFinished
                    ? 'bg-emerald-500 text-white'
                    : step.isCurrent
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step.isFinished ? (
                  <Check className="w-4 h-4" />
                ) : step.isCurrent ? (
                  <Circle className="w-3 h-3 fill-current" />
                ) : (
                  <span className="text-xs font-semibold">{step.stepNumber}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    step.isFinished
                      ? 'text-emerald-900'
                      : step.isCurrent
                      ? 'text-blue-900'
                      : 'text-gray-600'
                  }`}
                >
                  {step.stepName}
                </p>
                <p className="text-xs text-gray-500">
                  {step.isFinished
                    ? 'Đã hoàn thành'
                    : step.isCurrent
                    ? 'Đang xử lý'
                    : 'Chưa bắt đầu'}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Move Next Step Button */}
      {!(isCompleted && allStepsFinished) && (
        <button
          onClick={handleMoveNextStep}
          disabled={moveNextStepMutation.isPending}
          className="w-full mt-4 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {moveNextStepMutation.isPending ? (
            'Đang xử lý...'
          ) : (
            <>
              Chuyển sang bước kế tiếp
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      )}

      {/* Completion Message */}
      {isCompleted && allStepsFinished && (
        <div className="mt-4 text-center text-sm text-emerald-600 font-medium py-2 bg-emerald-50 rounded-lg border border-emerald-200">
          <Check className="w-4 h-4 inline mr-1" />
          Đã hoàn thành tất cả các bước
        </div>
      )}

      <ConfirmDialog
        open={showConfirmDialog}
        title="Xác nhận chuyển bước"
        message="Bạn có chắc chắn muốn chuyển sang bước kế tiếp?"
        confirmText="Xác nhận"
        cancelText="Hủy"
        type="info"
        onConfirm={handleConfirmMoveNextStep}
        onCancel={() => setShowConfirmDialog(false)}
        loading={moveNextStepMutation.isPending}
      />
    </div>
  );
};
