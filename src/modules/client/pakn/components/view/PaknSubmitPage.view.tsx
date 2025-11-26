"use client";

import { useGlobalToast } from '@core/patterns/SingletonHook';
import { PaknSubmitForm, PaknLookupCard, PaknNotesCard } from '../ui';
import { usePaknCategories, usePaknOrgUnits, usePaknSubmit } from '../../hooks';
import { CheckCircle2, Clock3, FileText } from 'lucide-react';
import Link from 'next/link';

export const PaknSubmitPageView: React.FC = () => {
    const { addToast } = useGlobalToast();
    const { data: categoriesData, isLoading: categoriesLoading } = usePaknCategories();
    const { data: orgUnitsData, isLoading: orgUnitsLoading } = usePaknOrgUnits();
    const submitMutation = usePaknSubmit();

    const categories = categoriesData ?? [];
    const orgUnits = orgUnitsData ?? [];

    const handleSubmit = async (payload: Parameters<typeof submitMutation.mutateAsync>[0]) => {
        try {
            await submitMutation.mutateAsync(payload);
            addToast({ message: 'Đã gửi phản ánh thành công. Vui lòng theo dõi kết quả qua email/số điện thoại đã cung cấp.', type: 'success' });
        } catch (error) {
            console.error(error);
            addToast({ message: 'Không thể gửi phản ánh. Vui lòng thử lại sau.', type: 'error' });
        }
    };

    const isLoading = submitMutation.isPending || categoriesLoading || orgUnitsLoading;

    return (
        <div className="bg-slate-50 py-10">
            <div className="mx-auto max-w-6xl space-y-8 px-4 lg:px-0">
                <section className="relative overflow-hidden rounded-3xl bg-red-600 p-8 text-white shadow-xl">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at top, white 0%, transparent 50%)' }} />
                    <div className="relative grid gap-6 lg:grid-cols-2">
                        <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-white/80">Phản ánh - kiến nghị</p>
                            <h1 className="mt-3 text-3xl font-bold leading-tight lg:text-4xl">Cổng tiếp nhận trực tuyến, minh bạch & thân thiện</h1>
                            <p className="mt-4 text-base text-white/90">
                                Gửi ý kiến, kiến nghị của bạn đến cơ quan chức năng mọi lúc mọi nơi. Chúng tôi cam kết xử lý nhanh chóng,
                                công khai và bảo mật thông tin người gửi.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium text-white/90">
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                                    <Clock3 className="h-4 w-4" />
                                    Xử lý trung bình &lt;= 03 ngày
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    100% phản ánh được phản hồi
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 rounded-2xl bg-white/10 p-5 text-sm backdrop-blur">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20">
                                    <FileText className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="text-base font-semibold">Hồ sơ được tiếp nhận liên tục</p>
                                    <p className="text-white/80">Hệ thống tự động phân luồng đến đơn vị phụ trách.</p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-white/85">
                                <li>• Ưu tiên phản ánh về thái độ phục vụ, thủ tục hành chính.</li>
                                <li>• Không tiếp nhận tranh chấp dân sự, khiếu kiện đã có quyết định cuối cùng.</li>
                                <li>• Thông tin người gửi được bảo mật tuyệt đối.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl ring-1 ring-black/5">
                        <div className="pb-6">
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Biểu mẫu trực tuyến</p>
                            <h2 className="mt-2 text-2xl font-bold text-slate-900">Gửi phản ánh - kiến nghị</h2>
                            <p className="mt-1 text-sm text-slate-600">
                                Điền đầy đủ thông tin bên dưới. Thông tin liên hệ sẽ được sử dụng để phản hồi kết quả xử lý.
                            </p>
                        </div>
                        <PaknSubmitForm
                            categories={categories}
                            orgUnits={orgUnits}
                            isSubmitting={isLoading}
                            onSubmit={handleSubmit}
                        />
                    </div>

                    <div className="w-full space-y-4 lg:w-80">
                        <PaknLookupCard className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-md ring-1 ring-black/5" />
                        <div className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-md ring-1 ring-black/5">
                            <h3 className="text-lg font-semibold text-slate-900">Chủ đề PAKN</h3>
                            <p className="mt-1 text-sm text-slate-600">Xem danh sách chủ đề để lựa chọn đúng nội dung phản ánh.</p>
                            <Link
                                href="/pakn/category"
                                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-500"
                            >
                                Xem chủ đề PAKN
                            </Link>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-md ring-1 ring-black/5">
                            <h3 className="text-lg font-semibold text-slate-900">Tình hình xử lý PAKN</h3>
                            <p className="mt-1 text-sm text-slate-600">Số liệu cập nhật trong ngày (dữ liệu demo).</p>
                            <div className="mt-4 space-y-3 text-sm text-slate-700">
                                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-slate-500">PAKN đã trả lời</p>
                                        <p className="text-xl font-bold text-slate-900">169.339</p>
                                    </div>
                                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                                </div>
                                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-slate-500">PAKN đang xử lý</p>
                                        <p className="text-xl font-bold text-slate-900">51.931</p>
                                    </div>
                                    <Clock3 className="h-6 w-6 text-amber-500" />
                                </div>
                            </div>
                        </div>
                        <PaknNotesCard className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-md ring-1 ring-black/5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

