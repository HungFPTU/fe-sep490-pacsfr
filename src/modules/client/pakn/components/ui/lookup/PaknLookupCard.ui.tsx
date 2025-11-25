"use client";

import { useState } from 'react';
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
        <div className={cn('rounded-xl border border-slate-200 bg-white p-4 shadow-sm', className)}>
            <h3 className="text-lg font-semibold text-slate-900">Tra cứu thông tin PAKN</h3>
            <p className="mt-1 text-sm text-slate-600">
                Nhập mã PAKN hoặc tên người gửi để xem lại thông tin phản ánh và tài liệu đính kèm.
            </p>

            <div className="mt-4 flex flex-col gap-2">
                <Input
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="Nhập mã PAKN hoặc tên"
                />
                <Button onClick={handleLookup} disabled={isFetching} variant="red">
                    {isFetching ? 'Đang tra cứu...' : 'Tra cứu'}
                </Button>
            </div>

            {lookupCode && (
                <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-slate-800">
                        Kết quả tra cứu cho mã <span className="font-semibold text-red-600">{lookupCode}</span>
                    </p>
                    {isFetching && <p className="text-sm text-slate-500">Đang tải dữ liệu...</p>}
                    {!isFetching && (!data || data.length === 0) && (
                        <p className="text-sm text-slate-500">Không tìm thấy tài liệu đính kèm.</p>
                    )}
                    {!isFetching && data && data.length > 0 && (
                        <ul className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
                            {data.map((file) => (
                                <li key={file.fileName} className="flex items-center justify-between gap-2">
                                    <span className="truncate">{file.fileName}</span>
                                    <a
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-red-600 hover:underline"
                                    >
                                        Tải xuống
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

