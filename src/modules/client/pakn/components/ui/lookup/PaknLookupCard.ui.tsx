"use client";

import { useState } from 'react';
import { Search, FileDown, Loader2, Send } from 'lucide-react';
import { Input } from '@/shared/components/ui/input.ui';
import { Button } from '@/shared/components/ui/button.ui';
import { cn } from '@/shared/lib/utils';
import { paknApi } from '../../../api/pakn.api';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import { PaknOTPVerificationModal } from '../modal/PaknOTPVerificationModal.ui.tsx';

interface PaknLookupCardProps {
    className?: string;
}

export const PaknLookupCard: React.FC<PaknLookupCardProps> = ({ className }) => {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const [selectedCode, setSelectedCode] = useState('');
    const [attachments, setAttachments] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);
    const { addToast } = useGlobalToast();

    const handleSendOTP = async () => {
        if (!code.trim()) {
            addToast({ message: 'Vui lòng nhập mã PAKN', type: 'error' });
            return;
        }

        setIsLoading(true);
        try {
            const response = await paknApi.lookup({ paknCode: code.trim() });
            if (response?.data?.success) {
                setSelectedCode(code.trim());
                setOtpModalOpen(true);
                addToast({ message: 'Mã OTP đã được gửi', type: 'success' });
            } else {
                addToast({ message: response?.data?.message || 'Không thể gửi mã OTP', type: 'error' });
            }
        } catch (error: any) {
            addToast({ 
                message: error?.response?.data?.message || 'Đã xảy ra lỗi khi gửi mã OTP', 
                type: 'error' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifySuccess = (data: any) => {
        // Data structure from API response
        const files = data?.attachments || data?.files || [];
        setAttachments(files);
        setShowResults(true);
        setOtpModalOpen(false);
    };

    return (
        <>
            <div className={cn('rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg ring-1 ring-black/5', className)}>
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                            Tra cứu PAKN
                        </div>
                        <h3 className="mt-3 text-xl font-bold text-slate-900">Tìm nhanh phản ánh của bạn</h3>
                        <p className="mt-1 text-sm text-slate-600">
                            Nhập mã PAKN để xem phản ánh và tải tài liệu đính kèm.
                        </p>
                    </div>
                    <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <Search className="h-6 w-6" />
                    </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900" htmlFor="pakn-code">
                            Mã PAKN <span className="text-red-600">*</span>
                        </label>
                        <Input
                            id="pakn-code"
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSendOTP();
                            }}
                            placeholder="VD: PAKN-1234"
                            className="w-full h-11"
                            disabled={isLoading}
                        />
                    </div>

                    <Button
                        onClick={handleSendOTP}
                        disabled={isLoading || !code.trim()}
                        className="w-full sm:w-auto sm:px-6 bg-red-600 hover:bg-red-700 font-bold"
                    >
                        {isLoading ? (
                            <span className="inline-flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Đang gửi...
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-2">
                                <Send className="h-4 w-4" />
                                Gửi OTP
                            </span>
                        )}
                    </Button>
                </div>

                {showResults && (
                    <div className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Kết quả tra cứu</p>
                                <p className="mt-1 text-sm text-slate-700">
                                    Mã PAKN: <span className="font-semibold text-red-600">{selectedCode}</span>
                                </p>
                            </div>
                        </div>

                        {attachments.length === 0 ? (
                            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">
                                Không tìm thấy tài liệu đính kèm.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm text-slate-700">
                                    <span className="font-semibold">Tài liệu đính kèm</span>
                                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                                        {attachments.length} file
                                    </span>
                                </div>
                                <ul className="space-y-2">
                                    {attachments.map((file: any, index: number) => (
                                        <li
                                            key={index}
                                            className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200"
                                        >
                                            <div className="flex items-center gap-2 min-w-0">
                                                <FileDown className="h-4 w-4 text-red-500 shrink-0" />
                                                <span className="truncate text-slate-800" title={file.fileName || file.name}>
                                                    {file.fileName || file.name}
                                                </span>
                                            </div>
                                            <a
                                                href={file.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-red-600 hover:text-red-700 hover:underline whitespace-nowrap"
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

            <PaknOTPVerificationModal
                isOpen={otpModalOpen}
                paknCode={selectedCode}
                onVerifySuccess={handleVerifySuccess}
                onClose={() => setOtpModalOpen(false)}
            />
        </>
    );
};

