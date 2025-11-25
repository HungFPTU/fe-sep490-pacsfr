"use client";

import React from "react";
import type { CreateCaseRequest } from "../../../../dashboard/types";
import { useSubmissionMethods } from "../../../hooks/useSubmissionMethods";

interface PriorityLevel {
    value: number;
    label: string;
}

interface CaseFormFieldsProps {
    caseData: CreateCaseRequest;
    priorityLevels: PriorityLevel[];
    onDataChange: (data: CreateCaseRequest) => void;
}

export function CaseFormFields({
    caseData,
    priorityLevels,
    onDataChange,
}: CaseFormFieldsProps) {
    const { data: submissionMethods = [], isLoading } = useSubmissionMethods();

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
                    disabled={isLoading}
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="">{isLoading ? "Đang tải..." : "-- Chọn phương thức nộp --"}</option>
                    {submissionMethods.map(method => (
                        <option key={method.id} value={method.id}>
                            {method.submissionMethodName} {method.fee > 0 ? `(${method.fee.toLocaleString()}đ)` : "(Miễn phí)"}
                        </option>
                    ))}
                </select>
                {submissionMethods.find(m => m.id === caseData.submissionMethodId) && (
                    <p className="text-xs text-gray-500 mt-1">
                        {submissionMethods.find(m => m.id === caseData.submissionMethodId)?.description}
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
        </div>
    );
}

