'use client';

import type { CaseFeedback } from "../../../types";
import { Star, User, Phone, Clock } from "lucide-react";

interface CaseFeedbackViewerProps {
    feedback: CaseFeedback | null | undefined;
    isLoading?: boolean;
}

const ratingIcons = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
        <Star
            key={index}
            className={`h-5 w-5 ${index < rating ? "text-amber-400 fill-amber-400" : "text-slate-300"
                }`}
        />
    ));

const statusTextMap: Record<string, string> = {
    pending: "Đang xử lý",
    processing: "Đang phản hồi",
    resolved: "Đã phản hồi",
    completed: "Hoàn thành",
};

export const CaseFeedbackViewer: React.FC<CaseFeedbackViewerProps> = ({ feedback, isLoading }) => {
    if (isLoading) {
        return (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow ring-1 ring-black/5">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
                    <div>
                        <p className="font-semibold text-slate-900">Đang tải phản hồi...</p>
                        <p className="text-sm text-slate-500">Vui lòng chờ trong giây lát.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!feedback) {
        return (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white/90 p-6 text-sm text-slate-500 ring-1 ring-black/5">
                Hồ sơ này chưa có phản hồi nào. Bạn có thể là người đầu tiên gửi đánh giá sau khi hoàn tất biểu mẫu phía trên.
            </div>
        );
    }

    return (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl ring-1 ring-black/5">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Phản hồi đã gửi</p>
                    <h3 className="mt-1 text-xl font-semibold text-slate-900">Đánh giá gần nhất của bạn</h3>
                    <p className="text-sm text-slate-500">Chúng tôi sẽ xử lý và phản hồi sớm nhất có thể.</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold text-slate-700">
                    {statusTextMap[feedback.status?.toLowerCase() ?? "pending"] ?? feedback.status ?? "Đang xử lý"}
                </div>
            </div>

            <div className="mt-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1">{ratingIcons(feedback.rating)}</div>
                    <span className="text-sm font-medium text-slate-600">
                        {feedback.rating}/5 - {feedback.rating >= 4 ? "Hài lòng" : "Cần cải thiện"}
                    </span>
                </div>

                <div className="rounded-2xl bg-slate-50/80 p-4 text-slate-700">
                    <p className="text-sm leading-relaxed">{feedback.comment}</p>
                </div>

                <div className="grid gap-4 rounded-2xl border border-slate-100 bg-white/80 p-4 text-sm text-slate-600 md:grid-cols-3">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <span>{feedback.isAnonymous ? "Ẩn danh" : feedback.guestName || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span>{feedback.isAnonymous ? "Không hiển thị" : feedback.guestPhone || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>{feedback.createdAt ? new Date(feedback.createdAt).toLocaleString("vi-VN") : "—"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


