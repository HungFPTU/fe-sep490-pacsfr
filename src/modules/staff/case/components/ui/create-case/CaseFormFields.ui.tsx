"use client";

import React from "react";
import { Calendar } from "lucide-react";
import type { CreateCaseRequest, SubmissionMethod } from "../../../../dashboard/types";

interface PriorityLevel {
    value: number;
    label: string;
}

interface CaseFormFieldsProps {
    caseData: CreateCaseRequest;
    priorityLevels: PriorityLevel[];
    submissionMethods: SubmissionMethod[];
    isLoadingSubmissionMethods?: boolean;
    onDataChange: (data: CreateCaseRequest) => void;
}

export function CaseFormFields({
    caseData,
    priorityLevels,
    submissionMethods,
    isLoadingSubmissionMethods,
    onDataChange,
}: CaseFormFieldsProps) {
    // Handler to format date to ISO string when user selects a date
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value; // yyyy-MM-dd format from input
        if (dateValue) {
            // Convert to ISO string format for API
            const date = new Date(dateValue);
            date.setHours(8, 0, 0, 0); // Set to 8:00 AM to avoid timezone issues
            onDataChange({ 
                ...caseData, 
                estimatedCompletionDate: date.toISOString() 
            });
        } else {
            onDataChange({ 
                ...caseData, 
                estimatedCompletionDate: "" 
            });
        }
    };

    // Get date value in yyyy-MM-dd format for input
    const getDateInputValue = () => {
        if (!caseData.estimatedCompletionDate) return "";
        try {
            const date = new Date(caseData.estimatedCompletionDate);
            return date.toISOString().split('T')[0];
        } catch {
            return "";
        }
    };

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
                    Phương thức nộp <span className="text-red-500">*</span>
                </label>
                <select
                    value={caseData.submissionMethod}
                    onChange={(e) => onDataChange({ ...caseData, submissionMethod: e.target.value })}
                    disabled={isLoadingSubmissionMethods}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                    {isLoadingSubmissionMethods ? (
                        <option value="">Đang tải...</option>
                    ) : submissionMethods.length === 0 ? (
                        <option value="">Không có phương thức nộp</option>
                    ) : (
                        submissionMethods.map(method => (
                            <option key={method.id} value={method.id}>
                                {method.submissionMethodName} {method.fee > 0 ? `(${method.fee.toLocaleString('vi-VN')} đ)` : '(Miễn phí)'}
                            </option>
                        ))
                    )}
                </select>
                {submissionMethods.length > 0 && caseData.submissionMethod && (
                    <p className="text-xs text-gray-500 mt-1">
                        {submissionMethods.find(m => m.id === caseData.submissionMethod)?.description}
                    </p>
                )}
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

            {/* Estimated Completion Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Ngày dự kiến hoàn thành <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    value={getDateInputValue()}
                    onChange={handleDateChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Chọn ngày hoàn thành"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Chọn ngày dự kiến hoàn thành hồ sơ
                </p>
            </div>

            {/* Result Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả kết quả
                </label>
                <textarea
                    value={caseData.resultDescription}
                    onChange={(e) => onDataChange({ ...caseData, resultDescription: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Mô tả kết quả dự kiến của hồ sơ..."
                />
            </div>
        </div>
    );
}

