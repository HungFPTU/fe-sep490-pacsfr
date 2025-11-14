'use client';

import { CheckCircle2, Clock3, Circle, User } from "lucide-react";
import type { CaseProgressTimelineStep } from "../../../types";
import { cn } from "@/shared/lib";

interface CaseProgressTimelineProps {
    steps: CaseProgressTimelineStep[];
}

const getStatusTone = (status?: string) => {
    if (!status) return "default";
    const normalized = status.toLowerCase();
    if (normalized.includes("hoàn") || normalized.includes("complete")) return "success";
    if (normalized.includes("đang") || normalized.includes("processing")) return "info";
    if (normalized.includes("từ chối") || normalized.includes("reject")) return "danger";
    return "default";
};

const StatusBadge: React.FC<{ status?: string }> = ({ status }) => {
    if (!status) return null;

    const tone = getStatusTone(status);
    const toneClasses: Record<string, string> = {
        success: "bg-green-100 text-green-700 border border-green-200",
        info: "bg-blue-100 text-blue-700 border border-blue-200",
        danger: "bg-red-100 text-red-700 border border-red-200",
        default: "bg-gray-100 text-gray-600 border border-gray-200",
    };

    return (
        <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", toneClasses[tone])}>
            {status}
        </span>
    );
};

export const CaseProgressTimeline: React.FC<CaseProgressTimelineProps> = ({ steps }) => {
    if (!steps.length) {
        return (
            <div className="flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
                Chưa có dữ liệu tiến trình để hiển thị.
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            <div className="mb-6 border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-gray-900">Tiến trình xử lý</h3>
                <p className="text-sm text-gray-600">
                    Các bước xử lý hồ sơ theo thời gian cập nhật từ hệ thống.
                </p>
            </div>

            <ol className="relative border-l border-gray-200 pl-6">
                {steps.map((step, index) => {
                    const tone = getStatusTone(step.status);

                    return (
                        <li key={`${step.order ?? index}-${step.title ?? index}`} className="mb-10 ml-2">
                            <span
                                className={cn(
                                    "absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-white",
                                    tone === "success"
                                        ? "bg-green-500"
                                        : tone === "info"
                                            ? "bg-blue-500"
                                            : tone === "danger"
                                                ? "bg-red-500"
                                                : "bg-gray-400",
                                )}
                            >
                                {tone === "success" ? (
                                    <CheckCircle2 className="h-3 w-3 text-white" />
                                ) : tone === "info" ? (
                                    <Clock3 className="h-3 w-3 text-white" />
                                ) : tone === "danger" ? (
                                    <Circle className="h-3 w-3 text-white" />
                                ) : (
                                    <Circle className="h-3 w-3 text-white" />
                                )}
                            </span>
                            <div className="rounded-lg border border-gray-100 bg-gray-50/80 p-4 shadow-sm">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                                            Bước {step.order ?? index + 1}
                                        </p>
                                        <h4 className="text-lg font-semibold text-gray-900">
                                            {step.title ?? `Bước ${index + 1}`}
                                        </h4>
                                    </div>
                                    <StatusBadge status={step.status} />
                                </div>

                                {step.description && (
                                    <p className="mt-3 rounded-md bg-white px-4 py-3 text-sm text-gray-700">
                                        {step.description}
                                    </p>
                                )}

                                <div className="mt-4 grid gap-3 text-sm text-gray-600 md:grid-cols-2">
                                    {step.processedAt && (
                                        <div className="flex items-center gap-2">
                                            <Clock3 className="h-4 w-4 text-gray-400" />
                                            <span className="font-medium text-gray-700">
                                                Thời gian cập nhật:
                                            </span>
                                            <span>{step.processedAt}</span>
                                        </div>
                                    )}
                                    {step.handlerName && (
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-gray-400" />
                                            <span className="font-medium text-gray-700">
                                                Cán bộ phụ trách:
                                            </span>
                                            <span>{step.handlerName}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

