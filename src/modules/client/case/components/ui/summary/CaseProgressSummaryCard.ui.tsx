'use client';

import { CalendarDays, ClipboardList, Contact, FileText, Zap, CheckCircle2 } from "lucide-react";
import type { CaseProgressSummary } from "../../../types";

interface CaseProgressSummaryCardProps {
    summary: CaseProgressSummary;
    message?: string;
}

const InfoItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    value?: string;
}> = ({ icon, label, value }) => {
    if (!value) return null;
    return (
        <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="text-red-600">{icon}</div>
                <span className="font-medium">{label}</span>
            </div>
            <p className="ml-6 text-sm font-semibold text-slate-900">{value}</p>
        </div>
    );
};

export const CaseProgressSummaryCard: React.FC<CaseProgressSummaryCardProps> = ({
    summary,
    message,
}) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg ring-1 ring-black/5">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                    <h3 className="text-2xl font-bold text-slate-900">Thông tin hồ sơ</h3>
                    <p className="mt-1 text-sm text-slate-600">Chi tiết xử lý và tiến độ hồ sơ của bạn</p>
                </div>
                {message && (
                    <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-green-700">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="text-sm font-semibold">{message}</span>
                    </div>
                )}
            </div>

            {/* Key Information Grid */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <InfoItem
                    icon={<ClipboardList className="h-5 w-5" />}
                    label="Mã hồ sơ"
                    value={summary.caseCode}
                />
                <InfoItem
                    icon={<FileText className="h-5 w-5" />}
                    label="Thủ tục"
                    value={summary.serviceName}
                />
                <InfoItem
                    icon={<Contact className="h-5 w-5" />}
                    label="Người nộp"
                    value={summary.applicantName}
                />
                <InfoItem
                    icon={<Zap className="h-5 w-5" />}
                    label="Cán bộ phụ trách"
                    value={summary.processingAgency}
                />
                <InfoItem
                    icon={<CalendarDays className="h-5 w-5" />}
                    label="Ngày tiếp nhận"
                    value={summary.submittedAt}
                />
                {summary.progressPercentage !== undefined && (
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Zap className="h-5 w-5 text-red-600" />
                            <span className="font-medium">Tiến độ</span>
                        </div>
                        <div className="ml-6 space-y-2">
                            <p className="text-sm font-semibold text-slate-900">{summary.progressPercentage}%</p>
                            <div className="h-2 rounded-full bg-slate-200">
                                <div className="h-full rounded-full bg-red-600" style={{ width: `${summary.progressPercentage}%` }} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Status Section */}
            {(summary.status || summary.statusNote || summary.estimatedCompletionDate || summary.receivedChannel) && (
                <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-5">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-red-700">Trạng thái hiện tại</p>
                                <p className="mt-1 text-lg font-bold text-red-900">{summary.status ?? "Chưa xác định"}</p>
                            </div>
                            {summary.progressPercentage !== undefined && summary.progressPercentage === 100 && (
                                <div className="rounded-full bg-green-100 p-3 text-green-600">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                            )}
                        </div>
                        {summary.statusNote && (
                            <p className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-900">
                                {summary.statusNote}
                            </p>
                        )}
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-red-800">
                            {summary.estimatedCompletionDate && (
                                <span><strong>Dự kiến:</strong> {summary.estimatedCompletionDate}</span>
                            )}
                            {summary.receivedChannel && (
                                <span><strong>Hình thức:</strong> {summary.receivedChannel}</span>
                            )}
                            {summary.updatedAt && (
                                <span><strong>Cập nhật:</strong> {summary.updatedAt}</span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

