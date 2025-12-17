"use client";

import { useState } from 'react';
import { Search, FileDown, Loader2 } from 'lucide-react';
import { Input } from '@/shared/components/ui/input.ui';
import { Button } from '@/shared/components/ui/button.ui';
import { usePaknAttachments } from '../../../hooks';
import { cn } from '@/shared/lib/utils';

interface PaknLookupCardProps {
    className?: string;
}

export const PaknLookupCard: React.FC<PaknLookupCardProps> = ({ className }) => {
    const [code, setCode] = useState('');
    const [lookupCode, setLookupCode] = useState('');
    const { data, isFetching, refetch } = usePaknAttachments(lookupCode);

    const handleLookup = () => {
        if (!code.trim()) return;
        setLookupCode(code.trim());
        refetch();
    };

    return (
        <div className={cn('rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg ring-1 ring-black/5', className)}>
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        Tra cứu PAKN
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-slate-900">Tìm nhanh phản ánh của bạn</h3>
                    <p className="mt-1 text-sm text-slate-600">
                        Nhập mã PAKN hoặc tên người gửi để xem phản ánh và tải tài liệu đính kèm.
                    </p>
                </div>
                <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <Search className="h-6 w-6" />
                </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700" htmlFor="pakn-code">Mã PAKN / Tên người gửi</label>
                    <Input
                        id="pakn-code"
                        value={code}
                        onChange={(event) => setCode(event.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleLookup();
                        }}
                        placeholder="VD: PAKN-1234 hoặc Nguyễn Văn A"
                        className="w-full"
                    />
                    <p className="text-xs text-slate-500">Nhấn Enter hoặc bấm Tra cứu để xem kết quả</p>
                </div>

                <Button
                    onClick={handleLookup}
                    disabled={isFetching}
                    variant="red"
                    className="w-full sm:w-auto sm:px-5"
                >
                    {isFetching ? (
                        <span className="inline-flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Đang tra cứu
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-2">
                            <Search className="h-4 w-4" />
                            Tra cứu
                        </span>
                    )}
                </Button>
            </div>

            {lookupCode && (
                <div className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Kết quả tra cứu</p>
                            <p className="mt-1 text-sm text-slate-700">
                                Mã / tên: <span className="font-semibold text-red-600">{lookupCode}</span>
                            </p>
                        </div>
                        {isFetching && (
                            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Đang tải dữ liệu
                            </span>
                        )}
                    </div>

                    {!isFetching && (!data || data.length === 0) && (
                        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">
                            Không tìm thấy tài liệu đính kèm cho mã này.
                        </div>
                    )}

                    {!isFetching && data && data.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm text-slate-700">
                                <span className="font-semibold">Tài liệu đính kèm</span>
                                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 shadow-sm">{data.length} file</span>
                            </div>
                            <ul className="space-y-2">
                                {data.map((file) => (
                                    <li
                                        key={file.fileName}
                                        className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200"
                                    >
                                        <div className="flex items-center gap-2 min-w-0">
                                            <FileDown className="h-4 w-4 text-red-500" />
                                            <span className="truncate text-slate-800" title={file.fileName}>{file.fileName}</span>
                                        </div>
                                        <a
                                            href={file.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-red-600 hover:text-red-700 hover:underline"
                                        >
                                            Tải xuống
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

