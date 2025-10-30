"use client";

import React from "react";
import { Input } from "@/shared/components/ui/input.ui";
import type { CreateCaseRequest } from "../../../../dashboard/types";

interface PriorityLevel {
    value: number;
    label: string;
}

interface CaseFormFieldsProps {
    caseData: CreateCaseRequest;
    priorityLevels: PriorityLevel[];
    submissionMethods: string[];
    onDataChange: (data: CreateCaseRequest) => void;
}

export function CaseFormFields({
    caseData,
    priorityLevels,
    submissionMethods,
    onDataChange,
}: CaseFormFieldsProps) {
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {priorityLevels.map(level => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                </select>
            </div>

            {/* Submission Method */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phương thức nộp
                </label>
                <select
                    value={caseData.submissionMethod}
                    onChange={(e) => onDataChange({ ...caseData, submissionMethod: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {submissionMethods.map(method => (
                        <option key={method} value={method}>{method}</option>
                    ))}
                </select>
            </div>

            {/* Created By */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Người tạo
                </label>
                <Input
                    value={caseData.createdBy}
                    onChange={(e) => onDataChange({ ...caseData, createdBy: e.target.value })}
                    placeholder="Nhập ID người tạo"
                />
            </div>

            {/* Notes */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú
                </label>
                <textarea
                    value={caseData.notes}
                    onChange={(e) => onDataChange({ ...caseData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Thêm ghi chú cho hồ sơ..."
                />
            </div>
        </div>
    );
}

