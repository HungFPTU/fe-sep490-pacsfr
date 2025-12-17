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
        success: "bg-green-100 text-green-800 border border-green-300 font-semibold",
        info: "bg-blue-100 text-blue-800 border border-blue-300 font-semibold",
        danger: "bg-red-100 text-red-800 border border-red-300 font-semibold",
        default: "bg-slate-100 text-slate-700 border border-slate-300 font-semibold",
    };

    return (
        <span className={cn("inline-block rounded-lg px-3 py-1 text-xs", toneClasses[tone])}>
            {status}
        </span>
    );
};

export const CaseProgressTimeline: React.FC<CaseProgressTimelineProps> = ({ steps }) => {
    if (!steps.length) {
        return (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
                <div>
                    <p className="text-sm font-semibold text-slate-600 mb-1">Không có dữ liệu</p>
                    <p className="text-xs text-slate-500">Quá trình xử lý chưa được cập nhật</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg ring-1 ring-black/5">
            <div className="mb-6 border-b border-slate-200 pb-4">
                <h3 className="text-2xl font-bold text-slate-900">Quá trình xử lý</h3>
                <p className="mt-1 text-sm text-slate-600">
                    Các bước xử lý hồ sơ theo thứ tự thực hiện
                </p>
            </div>

            <div className="space-y-4 relative">
                {/* Vertical line */}
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-300 via-slate-300 to-transparent" />

                {steps.map((step, index) => {
                    const tone = getStatusTone(step.status);
                    const isLast = index === steps.length - 1;

                    return (
                        <div
                            key={`${step.order ?? index}-${step.title ?? index}`}
                            className="relative pl-10"
                        >
                            {/* Timeline dot */}
                            <div
                                className={cn(
                                    "absolute -left-2 top-2 h-6 w-6 rounded-full border-4 border-white shadow-md flex items-center justify-center",
                                    tone === "success"
                                        ? "bg-green-500"
                                        : tone === "info"
                                            ? "bg-blue-500"
                                            : tone === "danger"
                                                ? "bg-red-500"
                                                : "bg-slate-400",
                                )}
                            >
                                {tone === "success" ? (
                                    <CheckCircle2 className="h-4 w-4 text-white" />
                                ) : tone === "info" ? (
                                    <Clock3 className="h-4 w-4 text-white" />
                                ) : tone === "danger" ? (
                                    <Circle className="h-4 w-4 text-white" />
                                ) : (
                                    <Circle className="h-4 w-4 text-white" />
                                )}
                            </div>

                            {/* Card */}
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100 transition-colors">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                                            Bước {step.order ?? index + 1}
                                        </p>
                                        <h4 className="text-base font-bold text-slate-900 mt-1">
                                            {step.title ?? `Bước ${index + 1}`}
                                        </h4>
                                    </div>
                                    <StatusBadge status={step.status} />
                                </div>

                                {step.description && (
                                    <p className="rounded-lg bg-white px-3 py-2 text-sm text-slate-700 border border-slate-100 mb-3">
                                        {step.description}
                                    </p>
                                )}

                                <div className="flex flex-col sm:flex-row gap-3 text-xs text-slate-600 border-t border-slate-200 pt-3">
                                    {step.processedAt && (
                                        <div className="flex items-center gap-2">
                                            <Clock3 className="h-4 w-4 text-slate-400 shrink-0" />
                                            <span>{step.processedAt}</span>
                                        </div>
                                    )}
                                    {step.handlerName && (
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-slate-400 shrink-0" />
                                            <span>{step.handlerName}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

