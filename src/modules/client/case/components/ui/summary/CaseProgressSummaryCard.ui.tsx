'use client';

import { CalendarDays, ClipboardList, Contact, FileText, MapPin, Timer, TrendingUp, User } from "lucide-react";
import type { CaseProgressSummary } from "../../../types";
import { cn } from "@/shared/lib";

interface CaseProgressSummaryCardProps {
    summary: CaseProgressSummary;
    message?: string;
}

const SummaryRow: React.FC<{
    icon: React.ReactNode;
    label: string;
    value?: string;
    highlight?: boolean;
}> = ({ icon, label, value, highlight = false }) => {
    if (!value) return null;

    return (
        <div
            className={cn(
                "flex items-start gap-3 rounded-lg border border-gray-100 bg-white/90 p-4 shadow-sm transition hover:shadow-md",
                highlight ? "border-blue-200 bg-blue-50" : "",
            )}
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{label}</p>
                <p className="mt-1 text-base font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    );
};

export const CaseProgressSummaryCard: React.FC<CaseProgressSummaryCardProps> = ({
    summary,
    message,
}) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white via-white to-blue-50 p-6 shadow-lg">
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">Tổng quan hồ sơ</h3>
                    <p className="text-sm text-gray-600">
                        Thông tin trạng thái xử lý mới nhất của hồ sơ công dân.
                    </p>
                </div>
                {message && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        {message}
                    </span>
                )}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                <SummaryRow
                    icon={<ClipboardList className="h-5 w-5" />}
                    label="Mã số hồ sơ"
                    value={summary.caseCode}
                    highlight
                />
                <SummaryRow
                    icon={<FileText className="h-5 w-5" />}
                    label="Thủ tục hành chính"
                    value={summary.serviceName}
                />
                <SummaryRow
                    icon={<Contact className="h-5 w-5" />}
                    label="Người nộp hồ sơ"
                    value={summary.applicantName}
                />
                <SummaryRow
                    icon={<User className="h-5 w-5" />}
                    label="Cán bộ phụ trách"
                    value={summary.processingAgency}
                />
                <SummaryRow
                    icon={<CalendarDays className="h-5 w-5" />}
                    label="Ngày tiếp nhận"
                    value={summary.submittedAt}
                />
                <SummaryRow
                    icon={<Timer className="h-5 w-5" />}
                    label="Ngày cập nhật gần nhất"
                    value={summary.updatedAt}
                />
                {summary.progressPercentage !== undefined && (
                    <SummaryRow
                        icon={<TrendingUp className="h-5 w-5" />}
                        label="Tiến độ xử lý"
                        value={`${summary.progressPercentage}%`}
                        highlight
                    />
                )}
            </div>

            {(summary.status || summary.statusNote || summary.estimatedCompletionDate || summary.receivedChannel) && (
                <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-700 uppercase tracking-wide">
                                Trạng thái hiện tại
                            </p>
                            <p className="text-lg font-semibold text-blue-900">
                                {summary.status ?? "Chưa xác định"}
                            </p>
                        </div>
                        {summary.estimatedCompletionDate && (
                            <div className="rounded-md border border-blue-200 bg-white px-4 py-2 text-sm text-blue-700">
                                Dự kiến hoàn thành:{" "}
                                <span className="font-semibold">{summary.estimatedCompletionDate}</span>
                            </div>
                        )}
                    </div>
                    {summary.statusNote && (
                        <p className="mt-3 rounded-md bg-white px-4 py-3 text-sm text-blue-800">
                            {summary.statusNote}
                        </p>
                    )}
                    {summary.receivedChannel && (
                        <p className="mt-2 text-xs text-blue-600">
                            Hình thức tiếp nhận: {summary.receivedChannel}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

