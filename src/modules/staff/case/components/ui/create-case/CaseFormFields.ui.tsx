"use client";

import React, { useMemo } from "react";
import { Send, StickyNote, Calendar } from "lucide-react";
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

// Helper functions for date conversion
const formatISOToDate = (isoValue: string): string => {
    if (!isoValue) return '';
    const datePart = isoValue.substring(0, 10);
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year}`;
};

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

    // Calculate estimated completion date based on processingTime
    const calculateEstimatedDate = (processingTime: string): string => {
        const days = parseInt(processingTime, 10);
        if (isNaN(days)) return '';
        
        const today = new Date();
        const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
        
        const dd = String(futureDate.getDate()).padStart(2, '0');
        const mm = String(futureDate.getMonth() + 1).padStart(2, '0');
        const yyyy = futureDate.getFullYear();
        
        return `${yyyy}-${mm}-${dd}`;
    };

    // Handle submission method change
    const handleSubmissionMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMethodId = e.target.value;
        const selectedMethod = uniqueSubmissionMethods.find(m => m.submissionMethodId === selectedMethodId);
        
        const updatedData: CreateCaseRequest = { ...caseData, submissionMethodId: selectedMethodId };
        
        // Auto-set estimated completion date based on processingTime
        if (selectedMethod?.processingTime) {
            updatedData.estimatedCompletionDate = calculateEstimatedDate(selectedMethod.processingTime);
        }
        
        onDataChange(updatedData);
    };

    const labelClass = "block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5";
    const inputClass = "w-full h-10 px-3 text-sm border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed";
    const selectedMethod = uniqueSubmissionMethods.find(m => m.submissionMethodId === caseData.submissionMethodId);

    return (
        <div className="space-y-5">
            {/* Submission Method */}
            <div>
                <label className={labelClass}>
                    <Send className="w-3.5 h-3.5 inline mr-1" />
                    Phương thức nộp <span className="text-red-500">*</span>
                </label>
                <select
                    value={caseData.submissionMethodId}
                    onChange={handleSubmissionMethodChange}
                    disabled={isLoadingSubmissionMethods}
                    className={`${inputClass} appearance-none cursor-pointer`}
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.25em 1.25em',
                    }}
                >
                    <option value="">{isLoadingSubmissionMethods ? "Đang tải..." : "-- Chọn phương thức nộp --"}</option>
                    {uniqueSubmissionMethods.map(method => (
                        <option key={method.submissionMethodId} value={method.submissionMethodId}>
                            {method.submissionMethodName} - {method.processingTime} ngày {method.fee > 0 ? `(${method.fee.toLocaleString()}đ)` : "(Miễn phí)"}
                        </option>
                    ))}
                </select>
                {selectedMethod && (
                    <p className="text-xs text-gray-500 mt-1.5 pl-1">{selectedMethod.description}</p>
                )}
            </div>

            {/* Estimated Completion Date */}
            {caseData.estimatedCompletionDate && (
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-xs text-emerald-700">Ngày hoàn thành dự kiến</p>
                        <p className="text-sm font-semibold text-emerald-900">{formatISOToDate(caseData.estimatedCompletionDate)}</p>
                    </div>
                </div>
            )}

            {/* Notes */}
            <div>
                <label className={labelClass}>
                    <StickyNote className="w-3.5 h-3.5 inline mr-1" />
                    Ghi chú
                </label>
                <textarea
                    value={caseData.notes || ""}
                    onChange={(e) => onDataChange({ ...caseData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    placeholder="Thêm ghi chú cho hồ sơ..."
                />
            </div>
        </div>
    );
}
