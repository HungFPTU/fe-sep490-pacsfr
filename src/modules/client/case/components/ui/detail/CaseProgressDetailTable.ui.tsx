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
    UserCheck,
    StickyNote,
    CreditCard,
    AlertCircle
} from "lucide-react";
import type { CaseProgressRaw } from '../../../types';

interface CaseProgressDetailTableProps {
    rawData: CaseProgressRaw | null;
}

// Format date
const formatDate = (dateStr: string | undefined): string => {
    if (!dateStr) return '-';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch {
        return dateStr;
    }
};

// Format currency
const formatCurrency = (amount: number | undefined): string => {
    if (amount === undefined || amount === null) return '0đ';
    return amount.toLocaleString('vi-VN') + 'đ';
};

// Get payment status in Vietnamese
const getPaymentStatusLabel = (status: string | undefined): { label: string; color: string } => {
    const statusMap: Record<string, { label: string; color: string }> = {
        'Pending': { label: 'Chờ thanh toán', color: 'text-amber-600 bg-amber-50' },
        'Paid': { label: 'Đã thanh toán', color: 'text-emerald-600 bg-emerald-50' },
        'Failed': { label: 'Thanh toán thất bại', color: 'text-red-600 bg-red-50' },
        'Cancelled': { label: 'Đã hủy', color: 'text-gray-600 bg-gray-50' },
    };
    return statusMap[status || ''] || { label: status || '-', color: 'text-gray-600 bg-gray-50' };
};

interface InfoCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | React.ReactNode;
    iconBg?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value, iconBg = 'bg-gray-100' }) => (
    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
            {icon}
        </div>
        <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
            <div className="text-sm font-semibold text-gray-900 mt-0.5">{value}</div>
        </div>
    </div>
);

export const CaseProgressDetailTable: React.FC<CaseProgressDetailTableProps> = ({ rawData }) => {
    if (!rawData) {
        return null;
    }

    // Extract payment info if available
    const paymentInfo = rawData.paymentInfo;

    const paymentStatus = paymentInfo?.paymentStatus ? getPaymentStatusLabel(paymentInfo.paymentStatus) : null;

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Thông tin chi tiết hồ sơ</h3>
                        <p className="text-xs text-gray-500">Toàn bộ dữ liệu của hồ sơ</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Case Code */}
                    {rawData.caseCode && (
                        <InfoCard
                            icon={<FileText className="w-5 h-5 text-indigo-600" />}
                            iconBg="bg-indigo-50"
                            label="Mã hồ sơ"
                            value={<span className="font-mono">{rawData.caseCode}</span>}
                        />
                    )}

                    {/* Guest Name */}
                    {rawData.guestName && (
                        <InfoCard
                            icon={<User className="w-5 h-5 text-blue-600" />}
                            iconBg="bg-blue-50"
                            label="Tên công dân"
                            value={rawData.guestName}
                        />
                    )}

                    {/* Service Name */}
                    {rawData.serviceName && (
                        <InfoCard
                            icon={<Briefcase className="w-5 h-5 text-purple-600" />}
                            iconBg="bg-purple-50"
                            label="Thủ tục hành chính"
                            value={rawData.serviceName}
                        />
                    )}

                    {/* Staff Name */}
                    {rawData.staffName && (
                        <InfoCard
                            icon={<UserCheck className="w-5 h-5 text-orange-600" />}
                            iconBg="bg-orange-50"
                            label="Nhân viên xử lý"
                            value={rawData.staffName}
                        />
                    )}

                    {/* Submission Method */}
                    {rawData.submissionMethod && (
                        <InfoCard
                            icon={<Send className="w-5 h-5 text-slate-600" />}
                            iconBg="bg-slate-100"
                            label="Hình thức nộp"
                            value={rawData.submissionMethod}
                        />
                    )}

                    {/* Priority Level */}
                    {rawData.priorityLevel !== undefined && (
                        <InfoCard
                            icon={<AlertCircle className="w-5 h-5 text-amber-600" />}
                            iconBg="bg-amber-50"
                            label="Mức độ ưu tiên"
                            value={rawData.priorityLevel === 0 ? 'Bình thường' : `Mức ${rawData.priorityLevel}`}
                        />
                    )}

                    {/* Estimated Completion Date */}
                    {rawData.estimatedCompletionDate && (
                        <InfoCard
                            icon={<Calendar className="w-5 h-5 text-emerald-600" />}
                            iconBg="bg-emerald-50"
                            label="Ngày dự kiến hoàn thành"
                            value={formatDate(rawData.estimatedCompletionDate)}
                        />
                    )}

                    {/* Current Status */}
                    {rawData.currentStatus && (
                        <InfoCard
                            icon={<Clock className="w-5 h-5 text-indigo-600" />}
                            iconBg="bg-indigo-50"
                            label="Trạng thái hiện tại"
                            value={
                                <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                                    {rawData.currentStatus}
                                </span>
                            }
                        />
                    )}

                    {/* Total Fee */}
                    {rawData.totalFee !== undefined && (
                        <InfoCard
                            icon={<Banknote className="w-5 h-5 text-emerald-600" />}
                            iconBg="bg-emerald-50"
                            label="Tổng phí"
                            value={formatCurrency(rawData.totalFee)}
                        />
                    )}

                    {/* Payment Status */}
                    {rawData.isPayment !== undefined && (
                        <InfoCard
                            icon={<CreditCard className="w-5 h-5 text-blue-600" />}
                            iconBg="bg-blue-50"
                            label="Đã thanh toán"
                            value={rawData.isPayment ? 'Có' : 'Chưa'}
                        />
                    )}
                </div>

                {/* Notes Section */}
                {rawData.notes && (
                    <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                                <StickyNote className="w-4 h-4 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xs text-amber-700 uppercase tracking-wide font-medium">Ghi chú</p>
                                <p className="text-sm text-amber-900 mt-1">{rawData.notes}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Steps Progress Section */}
                {rawData.steps?.$values && rawData.steps.$values.length > 0 && (
                    <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                        <h4 className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-4">
                            Tiến trình xử lý hồ sơ
                        </h4>
                        <div className="space-y-3">
                            {rawData.steps.$values.map((step, index) => (
                                <div key={step.caseServiceProcedureId || index} className="flex items-center gap-3">
                                    {/* Step Number */}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                                        step.isFinished 
                                            ? 'bg-emerald-500 text-white' 
                                            : step.isCurrent 
                                                ? 'bg-indigo-500 text-white' 
                                                : 'bg-gray-200 text-gray-500'
                                    }`}>
                                        {step.isFinished ? '✓' : step.stepNumber}
                                    </div>
                                    {/* Step Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-medium ${
                                            step.isFinished 
                                                ? 'text-emerald-700' 
                                                : step.isCurrent 
                                                    ? 'text-indigo-700' 
                                                    : 'text-gray-500'
                                        }`}>
                                            {step.stepName}
                                        </p>
                                    </div>
                                    {/* Status Badge */}
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                        step.isFinished 
                                            ? 'bg-emerald-100 text-emerald-700' 
                                            : step.isCurrent 
                                                ? 'bg-indigo-100 text-indigo-700' 
                                                : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        {step.isFinished ? 'Hoàn thành' : step.isCurrent ? 'Đang xử lý' : 'Chờ xử lý'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Payment Info Section */}
                {paymentInfo && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            Thông tin thanh toán
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <p className="text-xs text-gray-500">Số tiền</p>
                                <p className="text-sm font-semibold text-gray-900">{formatCurrency(paymentInfo.amount)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Trạng thái</p>
                                {paymentStatus && (
                                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${paymentStatus.color}`}>
                                        {paymentStatus.label}
                                    </span>
                                )}
                            </div>
                            {paymentInfo.expiredAt && (
                                <div>
                                    <p className="text-xs text-gray-500">Hạn thanh toán</p>
                                    <p className="text-sm font-semibold text-gray-900">{formatDate(paymentInfo.expiredAt)}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
