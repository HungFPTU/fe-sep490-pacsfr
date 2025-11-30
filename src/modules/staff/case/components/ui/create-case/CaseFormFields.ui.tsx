"use client";

import React, { useMemo } from "react";
import type { CreateCaseRequest, SubmissionMethod } from "../../../../dashboard/types";

interface PriorityLevel {
    value: number;
    label: string;
}

interface CaseFormFieldsProps {
    caseData: CreateCaseRequest;
    priorityLevels: PriorityLevel[];
    submissionMethods?: SubmissionMethod[];
    isLoadingSubmissionMethods?: boolean;
    onDataChange: (data: CreateCaseRequest) => void;
}

export function CaseFormFields({
    caseData,
    priorityLevels,
    submissionMethods = [],
    isLoadingSubmissionMethods = false,
    onDataChange,
}: CaseFormFieldsProps) {
    // Deduplicate submission methods by submissionMethodId
    const uniqueSubmissionMethods = useMemo(() => {
        const seen = new Set<string>();
        return submissionMethods.filter(method => {
            if (seen.has(method.submissionMethodId)) {
                return false;
            }
            seen.add(method.submissionMethodId);
            return true;
        });
    }, [submissionMethods]);

    return (
        <div className="space-y-6">
            {/* Priority Level */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mức độ ưu tiên
                </label>
                <select
                    value={caseData.priorityLevel}
                    onChange={(e) => onDataChange({ ...caseData, priorityLevel: parseInt(e.target.value) })}
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {priorityLevels.map(level => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                </select>
            </div>

            {/* Submission Method */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phương thức nộp <span className="text-red-500">*</span>
                </label>
                <select
                    value={caseData.submissionMethodId}
                    onChange={(e) => onDataChange({ ...caseData, submissionMethodId: e.target.value })}
                    disabled={isLoadingSubmissionMethods}
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="">{isLoadingSubmissionMethods ? "Đang tải..." : "-- Chọn phương thức nộp --"}</option>
                    {uniqueSubmissionMethods.map(method => (
                        <option key={method.submissionMethodId} value={method.submissionMethodId}>
                            {method.submissionMethodName} {method.fee > 0 ? `(${method.fee.toLocaleString()}đ)` : "(Miễn phí)"}
                        </option>
                    ))}
                </select>
                {uniqueSubmissionMethods.find(m => m.submissionMethodId === caseData.submissionMethodId) && (
                    <p className="text-xs text-gray-500 mt-1">
                        {uniqueSubmissionMethods.find(m => m.submissionMethodId === caseData.submissionMethodId)?.description}
                    </p>
                )}
            </div>

            {/* Notes */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú
                </label>
                <textarea
                    value={caseData.notes || ""}
                    onChange={(e) => onDataChange({ ...caseData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Thêm ghi chú cho hồ sơ..."
                />
            </div>

            {/* Estimated Completion Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày hoàn thành dự kiến
                </label>
                <input
                    type="date"
                    value={caseData.estimatedCompletionDate || ""}
                    onChange={(e) => onDataChange({ ...caseData, estimatedCompletionDate: e.target.value || undefined })}
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
        </div>
    );
}

