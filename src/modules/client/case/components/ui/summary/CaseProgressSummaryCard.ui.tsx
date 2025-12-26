'use client';

import React from 'react';
import { 
    FileText, 
    User, 
    Briefcase, 
    Calendar, 
    Clock,
    Send, 
    Banknote, 
    CheckCircle2,
    CreditCard,
    AlertCircle,
    UserCheck,
    StickyNote
} from "lucide-react";
import type { CaseProgressSummary } from "../../../types";

interface CaseProgressSummaryCardProps {
    summary: CaseProgressSummary;
    message?: string;
}

// Format currency
const formatCurrency = (amount: number | undefined): string => {
    if (amount === undefined || amount === null) return '0đ';
    return amount.toLocaleString('vi-VN') + 'đ';
};

// Format date
const formatDate = (dateStr: string | undefined): string => {
    if (!dateStr) return '-';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    } catch {
        return dateStr;
    }
};

export const CaseProgressSummaryCard: React.FC<CaseProgressSummaryCardProps> = ({
    summary,
    message,
}) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-indigo-200">Mã hồ sơ</p>
                            <p className="text-xl font-bold text-white font-mono">{summary.caseCode || '-'}</p>
                        </div>
                    </div>
                    {message && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-white" />
                            <span className="text-sm font-medium text-white">{message}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Guest Name */}
                    {summary.applicantName && (
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Người nộp hồ sơ</p>
                                <p className="text-sm font-semibold text-gray-900 truncate">{summary.applicantName}</p>
                            </div>
                        </div>
                    )}

                    {/* Service Name */}
                    {summary.serviceName && (
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                                <Briefcase className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Thủ tục hành chính</p>
                                <p className="text-sm font-semibold text-gray-900">{summary.serviceName}</p>
                            </div>
                        </div>
                    )}

                    {/* Submission Channel */}
                    {summary.receivedChannel && (
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                <Send className="w-5 h-5 text-slate-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Hình thức nộp</p>
                                <p className="text-sm font-semibold text-gray-900">{summary.receivedChannel}</p>
                            </div>
                        </div>
                    )}

                    {/* Processing Agency */}
                    {summary.processingAgency && (
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                                <UserCheck className="w-5 h-5 text-orange-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Cán bộ phụ trách</p>
                                <p className="text-sm font-semibold text-gray-900">{summary.processingAgency}</p>
                            </div>
                        </div>
                    )}

                    {/* Submitted At */}
                    {summary.submittedAt && (
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                <Calendar className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Ngày tiếp nhận</p>
                                <p className="text-sm font-semibold text-gray-900">{formatDate(summary.submittedAt)}</p>
                            </div>
                        </div>
                    )}

                    {/* Estimated Completion */}
                    {summary.estimatedCompletionDate && (
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                                <Clock className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Dự kiến hoàn thành</p>
                                <p className="text-sm font-semibold text-gray-900">{formatDate(summary.estimatedCompletionDate)}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Status Section */}
                {summary.status && (
                    <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-indigo-600 uppercase tracking-wide font-medium">Trạng thái hiện tại</p>
                                    <p className="text-lg font-bold text-indigo-900">{summary.status}</p>
                                </div>
                            </div>
                            {summary.progressPercentage !== undefined && (
                                <div className="text-right">
                                    <p className="text-xs text-indigo-600 uppercase tracking-wide">Tiến độ</p>
                                    <p className="text-2xl font-bold text-indigo-900">{summary.progressPercentage}%</p>
                                </div>
                            )}
                        </div>
                        {summary.progressPercentage !== undefined && (
                            <div className="mt-3 h-2 bg-indigo-200 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                                    style={{ width: `${summary.progressPercentage}%` }}
                                />
                            </div>
                        )}
                        {summary.statusNote && (
                            <p className="mt-3 text-sm text-indigo-800 bg-white rounded-lg px-3 py-2 border border-indigo-100">
                                {summary.statusNote}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
