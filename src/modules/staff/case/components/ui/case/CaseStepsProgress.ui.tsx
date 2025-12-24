'use client';

import React, { useState } from 'react';
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

    // Chỉ hiển thị khi có steps
    if (!steps?.$values || steps.$values.length === 0) {
        return null;
    }

    const allSteps = steps.$values;

    // Tìm bước có stepNumber lớn nhất
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

    // Kiểm tra xem hồ sơ đã hoàn thành và tất cả bước đã hoàn thành chưa
    const isCompleted = currentStatus === 'Hoàn thành' || currentStatus === 'Đã hoàn thành';
    const allStepsFinished = allSteps.every(step => step.isFinished);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quy trình xử lý
            </h3>

            <div className="space-y-4">
                {/* Hiển thị tất cả các bước */}
                <div className="space-y-3">
                    {allSteps
                        .sort((a, b) => a.stepNumber - b.stepNumber)
                        .map((step) => (
                            <div
                                key={step.caseServiceProcedureId}
                                className={`flex items-center gap-3 p-3 rounded-lg border ${step.isFinished
                                    ? 'bg-green-50 border-green-200'
                                    : step.isCurrent
                                        ? 'bg-blue-50 border-blue-300'
                                        : 'bg-gray-50 border-gray-200'
                                    }`}
                            >
                                <div
                                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step.isFinished
                                        ? 'bg-green-500 text-white'
                                        : step.isCurrent
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-300 text-gray-600'
                                        }`}
                                >
                                    {step.isFinished ? '✓' : step.stepNumber}
                                </div>
                                <div className="flex-1">
                                    <p
                                        className={`font-medium ${step.isFinished
                                            ? 'text-green-900'
                                            : step.isCurrent
                                                ? 'text-blue-900'
                                                : 'text-gray-700'
                                            }`}
                                    >
                                        {step.stepName}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
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

                {/* Nút chuyển bước kế tiếp - Chỉ ẩn khi hồ sơ đã hoàn thành và tất cả bước đã xong */}
                {!(isCompleted && allStepsFinished) && (
                    <button
                        onClick={handleMoveNextStep}
                        disabled={moveNextStepMutation.isPending}
                        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {moveNextStepMutation.isPending
                            ? 'Đang xử lý...'
                            : 'Chuyển sang bước kế tiếp'}
                    </button>
                )}

                {/* Hiển thị thông báo hoàn thành khi hồ sơ đã hoàn thành và tất cả bước đã xong */}
                {isCompleted && allStepsFinished && (
                    <div className="text-center text-sm text-green-600 font-medium py-2">
                        ✓ Đã hoàn thành tất cả các bước
                    </div>
                )}
            </div>

            {/* Confirm Dialog */}
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
