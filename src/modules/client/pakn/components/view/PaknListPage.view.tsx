"use client";

import { PaknLookupCard } from '../ui';


export const PaknListPageView: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-8">
                <div className="text-center space-y-3">
                    <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-red-600">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        Tra cứu phản ánh kiến nghị
                    </p>
                    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Tra cứu nhanh PAKN của bạn</h1>
                    <p className="text-slate-600">Nhập mã PAKN hoặc tên người gửi để xem thông tin phản ánh và tải tài liệu đính kèm.</p>
                </div>

                <PaknLookupCard className="w-full" />
            </div>
        </div>
    );
};

