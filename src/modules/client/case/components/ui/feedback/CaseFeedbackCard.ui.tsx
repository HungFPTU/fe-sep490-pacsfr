'use client';

import { useMemo } from "react";
import { useForm } from "@tanstack/react-form";
import { useStore } from "@tanstack/react-store";
import { Button } from "@/shared/components/ui/button.ui";
import { Input } from "@/shared/components/forms/Input.com";
import { useCaseFeedback } from "../../../hooks";
import { useGlobalToast } from "@core/patterns/SingletonHook";
import { MessageCircle, ShieldCheck, Star } from "lucide-react";

type CaseFeedbackFormValues = {
    rating: number;
    comment: string;
    guestName: string;
    guestPhone: string;
    isAnonymous: boolean;
};

const DEFAULT_VALUES: CaseFeedbackFormValues = {
    rating: 5,
    comment: "",
    guestName: "",
    guestPhone: "",
    isAnonymous: false,
};

const RATING_OPTIONS = [1, 2, 3, 4, 5];

interface CaseFeedbackCardProps {
    caseId?: string;
    caseCode?: string;
    serviceName?: string;
}

export const CaseFeedbackCard: React.FC<CaseFeedbackCardProps> = ({
    caseId,
    caseCode,
    serviceName,
}) => {
    const { mutateAsync, isPending } = useCaseFeedback();
    const { addToast } = useGlobalToast();

    const canSubmit = useMemo(() => Boolean(caseId), [caseId]);

    const form = useForm({
        defaultValues: DEFAULT_VALUES,
        onSubmit: async ({ value, formApi }) => {
            if (!caseId) {
                addToast({ message: "Không xác định được hồ sơ để đánh giá.", type: "error" });
                return;
            }

            try {
                await mutateAsync({
                    caseId,
                    rating: value.rating,
                    comment: value.comment.trim(),
                    guestName: value.isAnonymous ? undefined : value.guestName.trim(),
                    guestPhone: value.isAnonymous ? undefined : value.guestPhone.trim(),
                    isAnonymous: value.isAnonymous,
                });

                addToast({
                    message: "Cảm ơn bạn đã gửi phản hồi. Chúng tôi sẽ ghi nhận ý kiến để cải thiện dịch vụ.",
                    type: "success",
                });
                formApi.reset(DEFAULT_VALUES);
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Không thể gửi phản hồi vào lúc này. Vui lòng thử lại.";
                addToast({ message, type: "error" });
            }
        },
    });
    const isAnonymous = useStore(form.store, (state) => state.values.isAnonymous);

    if (!canSubmit) {
        return null;
    }

    return (
        <section className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-lg ring-1 ring-black/5">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                    {/* <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Bước 3</p> */}
                    <h3 className="mt-1 text-xl font-semibold text-slate-900">Đánh giá chất lượng phục vụ</h3>
                    <p className="text-sm text-slate-500">
                        Bạn hãy để lại nhận xét về quá trình giải quyết hồ sơ {caseCode ? `(${caseCode})` : ""}{" "}
                        {serviceName ? ` - ${serviceName}` : ""} để chúng tôi phục vụ tốt hơn.
                    </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1 text-xs font-semibold text-amber-600">
                    <MessageCircle className="h-4 w-4" />
                    Phản hồi tự nguyện
                </div>
            </div>

            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    form.handleSubmit();
                }}
                className="mt-6 space-y-6"
            >
                <form.Field name="rating">
                    {(field) => (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-800 flex items-center gap-2">
                                Mức độ hài lòng *
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {RATING_OPTIONS.map((value) => {
                                    const selected = Number(field.state.value) >= value;
                                    return (
                                        <button
                                            key={value}
                                            type="button"
                                            aria-label={`${value} sao`}
                                            onClick={() => field.handleChange(value as never)}
                                            className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${selected
                                                ? "border-amber-400 bg-amber-50 text-amber-500"
                                                : "border-slate-200 bg-white text-slate-400 hover:border-slate-300"
                                                }`}
                                        >
                                            <Star
                                                className="h-6 w-6"
                                                fill={selected ? "currentColor" : "none"}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                            <p className="text-xs text-slate-500">Chọn từ 1 đến 5 sao (5 sao là hài lòng nhất).</p>
                        </div>
                    )}
                </form.Field>

                <form.Field
                    name="comment"
                    validators={{
                        onChange: ({ value }) =>
                            !value || value.trim().length < 10 ? "Nội dung cần ít nhất 10 ký tự." : undefined,
                    }}
                >
                    {(field) => (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-800">
                                Nhận xét chi tiết *
                            </label>
                            <textarea
                                className="min-h-[130px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                value={field.state.value}
                                onChange={(event) => field.handleChange(event.target.value as never)}
                                placeholder="Mô tả trải nghiệm của bạn, những điểm hài lòng hoặc cần cải thiện..."
                                disabled={isPending}
                            />
                            {field.state.meta.errors?.[0] && (
                                <p className="text-xs text-red-500">{field.state.meta.errors[0]}</p>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field name="isAnonymous">
                    {(field) => {
                        const checked = !!field.state.value;
                        return (
                            <label
                                className={`block rounded-2xl border p-4 transition-all ${checked
                                    ? "border-emerald-200 bg-emerald-50/80 shadow-sm"
                                    : "border-slate-200 bg-slate-50"
                                    }`}
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white ${checked ? "bg-emerald-500" : "bg-slate-300"
                                                }`}
                                        >
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-base font-semibold text-slate-900">Gửi phản hồi ẩn danh</p>
                                            <p className="text-sm text-slate-500">
                                                Chúng tôi sẽ chỉ lưu nội dung góp ý, không hiển thị họ tên hay số điện thoại của bạn.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${checked ? "bg-emerald-500" : "bg-slate-300"
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${checked ? "translate-x-6" : "translate-x-1"
                                                    }`}
                                            />
                                        </span>
                                        <span className="text-sm font-medium text-slate-700">
                                            {checked ? "Đã bật ẩn danh" : "Hiển thị thông tin người gửi"}
                                        </span>
                                    </div>
                                </div>

                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={checked}
                                    onChange={(event) => field.handleChange(event.target.checked as never)}
                                    disabled={isPending}
                                />
                            </label>
                        );
                    }}
                </form.Field>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <form.Field
                        name="guestName"
                        validators={{
                            onChange: ({ value }) =>
                                isAnonymous || (value && value.trim().length > 0)
                                    ? undefined
                                    : "Vui lòng nhập họ tên",
                        }}
                    >
                        {(field) => (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-800">Họ và tên</label>
                                <Input
                                    value={field.state.value}
                                    onChange={(event) => field.handleChange(event.target.value as never)}
                                    placeholder="Nhập họ tên"
                                    disabled={isPending || isAnonymous}
                                    error={!!field.state.meta.errors.length && !isAnonymous}
                                />
                                {!isAnonymous && field.state.meta.errors?.[0] && (
                                    <p className="text-xs text-red-500">{field.state.meta.errors[0]}</p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="guestPhone">
                        {(field) => (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-800">Số điện thoại</label>
                                <Input
                                    value={field.state.value}
                                    onChange={(event) => field.handleChange(event.target.value as never)}
                                    placeholder="(Không bắt buộc)"
                                    disabled={isPending || isAnonymous}
                                />
                                <p className="text-xs text-slate-500">Chúng tôi chỉ liên hệ khi cần làm rõ thông tin.</p>
                            </div>
                        )}
                    </form.Field>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600 flex gap-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                    <div>
                        <p>Phản hồi của bạn được bảo mật và lưu trữ trên hệ thống của UBND tỉnh.</p>
                        <p className="text-xs text-slate-500 mt-1">
                            Khi gửi, bạn đồng ý để chúng tôi sử dụng nội dung nhằm cải thiện chất lượng dịch vụ.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isPending}
                        onClick={() => form.reset(DEFAULT_VALUES)}
                    >
                        Xóa nội dung
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Đang gửi..." : "Gửi phản hồi"}
                    </Button>
                </div>
            </form>
        </section>
    );
};


