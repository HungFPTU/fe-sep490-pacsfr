"use client";

import { useState } from 'react';
import { Search, FileDown, Loader2, Send, User, MapPin, Phone, Mail, Calendar, Tag, MessageSquare, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Input } from '@/shared/components/ui/input.ui';
import { Button } from '@/shared/components/ui/button.ui';
import { cn, formatDate } from '@/shared/lib/utils';
import { paknApi } from '../../../api/pakn.api';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import { PaknOTPVerificationModal } from '../modal/PaknOTPVerificationModal.ui';
import type { PaknDetail } from '../../../types/response';

interface PaknLookupCardProps {
    className?: string;
}

const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
        'CHO_TIEP_NHAN': 'bg-yellow-100 text-yellow-700 border-yellow-200',
        'DA_TIEP_NHAN': 'bg-blue-100 text-blue-700 border-blue-200',
        'DANG_XU_LY': 'bg-purple-100 text-purple-700 border-purple-200',
        'DA_TRA_LOI': 'bg-green-100 text-green-700 border-green-200',
        'TU_CHOI': 'bg-red-100 text-red-700 border-red-200',
    };
    return colorMap[status] || 'bg-slate-100 text-slate-700 border-slate-200';
};

const getStatusLabel = (status: string) => {
    const labelMap: Record<string, string> = {
        'CHO_TIEP_NHAN': 'Chờ tiếp nhận',
        'DA_TIEP_NHAN': 'Đã tiếp nhận',
        'DANG_XU_LY': 'Đang xử lý',
        'DA_TRA_LOI': 'Đã trả lời',
        'TU_CHOI': 'Từ chối',
    };
    return labelMap[status] || status;
};

export const PaknLookupCard: React.FC<PaknLookupCardProps> = ({ className }) => {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const [selectedCode, setSelectedCode] = useState('');
    const [paknDetail, setPaknDetail] = useState<PaknDetail | null>(null);
    const [activeTab, setActiveTab] = useState<'info' | 'timeline' | 'responses'>('info');
    const { addToast } = useGlobalToast();

    const handleSendOTP = async () => {
        if (!code.trim()) {
            addToast({ message: 'Vui lòng nhập mã PAKN', type: 'error' });
            return;
        }

        setIsLoading(true);
        try {
            const response = await paknApi.lookup({ paknCode: code.trim() });
            if (response?.data) {
                setSelectedCode(code.trim());
                setOtpModalOpen(true);
                addToast({ message: 'Mã OTP đã được gửi', type: 'success' });
            } else {
                addToast({ message: response?.message || 'Không thể gửi mã OTP', type: 'error' });
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

    const handleVerifySuccess = (data: PaknDetail) => {
        setPaknDetail(data);
        setOtpModalOpen(false);
    };

    const handleReset = () => {
        setCode('');
        setPaknDetail(null);
        setActiveTab('info');
    };

    const attachments = paknDetail?.attachments?.$values || [];
    const statusHistories = paknDetail?.statusHistories?.$values || [];
    const responses = paknDetail?.responses?.$values || [];

    return (
        <>
            <div className={cn('rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg ring-1 ring-black/5', className)}>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                            Tra cứu PAKN
                        </div>
                        <h3 className="mt-3 text-xl font-bold text-slate-900">Tìm nhanh phản ánh của bạn</h3>
                        <p className="mt-1 text-sm text-slate-600">
                            Nhập mã PAKN để xem chi tiết và phản hồi.
                        </p>
                    </div>
                    <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <Search className="h-6 w-6" />
                    </div>
                </div>

                {/* Search Form */}
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

                {/* PAKN Detail */}
                {paknDetail && (
                    <div className="mt-6 space-y-4">
                        {/* Status Header */}
                        <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-4">
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">{paknDetail.title}</h4>
                                    <p className="text-sm text-slate-600">
                                        Mã: <span className="font-semibold text-red-600">{paknDetail.paknCode}</span>
                                    </p>
                                </div>
                                <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold border-2 ${getStatusColor(paknDetail.status)}`}>
                                    {getStatusLabel(paknDetail.status)}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-200">
                                <div>
                                    <p className="text-xs text-slate-500">Tiếp nhận</p>
                                    <p className="text-xs font-semibold text-slate-800">{paknDetail.receivedAt ? formatDate(paknDetail.receivedAt) : '—'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Xử lý</p>
                                    <p className="text-xs font-semibold text-slate-800">{paknDetail.processingStartedAt ? formatDate(paknDetail.processingStartedAt) : '—'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Hoàn thành</p>
                                    <p className="text-xs font-semibold text-slate-800">{paknDetail.completedAt ? formatDate(paknDetail.completedAt) : '—'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-1 border-b border-slate-200">
                            {(['info', 'timeline', 'responses'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                                        activeTab === tab
                                            ? 'border-red-600 text-red-600'
                                            : 'border-transparent text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    {tab === 'info' && 'Thông tin'}
                                    {tab === 'timeline' && 'Lịch sử'}
                                    {tab === 'responses' && `Phản hồi (${responses.length})`}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="max-h-[400px] overflow-y-auto">
                            {activeTab === 'info' && (
                                <div className="space-y-4">
                                    {/* Citizen Info */}
                                    <div className="grid grid-cols-2 gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4 text-sm">
                                        <div>
                                            <p className="text-xs text-slate-500">Họ và tên</p>
                                            <p className="font-semibold text-slate-900">{paknDetail.citizenName}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Điện thoại</p>
                                            <p className="font-semibold text-slate-900">{paknDetail.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Email</p>
                                            <p className="font-semibold text-slate-900">{paknDetail.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Địa chỉ</p>
                                            <p className="font-semibold text-slate-900">{[paknDetail.streetAddress, paknDetail.city].filter(Boolean).join(', ')}</p>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <p className="text-xs font-semibold text-slate-600 mb-2">Nội dung phản ánh</p>
                                        <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-900 whitespace-pre-wrap">
                                            {paknDetail.content}
                                        </div>
                                    </div>

                                    {/* Attachments */}
                                    {attachments.length > 0 && (
                                        <div>
                                            <p className="text-xs font-semibold text-slate-600 mb-2">Tài liệu đính kèm ({attachments.length})</p>
                                            <div className="space-y-2">
                                                {attachments.map((file, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={file.fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2 text-sm hover:bg-red-50 hover:border-red-300 transition-colors"
                                                    >
                                                        <FileDown className="h-4 w-4 text-red-500" />
                                                        <span className="text-slate-700">{file.fileName}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'timeline' && (
                                <div className="space-y-3">
                                    {statusHistories.length > 0 ? (
                                        statusHistories.map((history, idx) => (
                                            <div key={idx} className="rounded-lg border border-slate-200 bg-white p-3">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getStatusColor(history.oldStatus)}`}>
                                                        {getStatusLabel(history.oldStatus)}
                                                    </span>
                                                    <ArrowRight className="h-3 w-3 text-slate-400" />
                                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getStatusColor(history.newStatus)}`}>
                                                        {getStatusLabel(history.newStatus)}
                                                    </span>
                                                </div>
                                                {history.note && <p className="text-sm text-slate-700 mb-1">{history.note}</p>}
                                                <p className="text-xs text-slate-500">{formatDate(history.modifiedAt)}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center py-6 text-slate-500">Không có lịch sử</p>
                                    )}
                                </div>
                            )}

                            {activeTab === 'responses' && (
                                <div className="space-y-3">
                                    {responses.length > 0 ? (
                                        responses.map((response, idx) => (
                                            <div key={idx} className="rounded-lg border border-slate-200 bg-white p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                    <span className="text-xs font-semibold text-slate-700">Phản hồi từ cán bộ</span>
                                                    <span className="text-xs text-slate-500 ml-auto">{formatDate(response.createdAt)}</span>
                                                </div>
                                                <p className="text-sm text-slate-900 whitespace-pre-wrap mb-3">{response.responseContent}</p>
                                                
                                                {response.attachments?.$values && response.attachments.$values.length > 0 && (
                                                    <div className="pt-3 border-t border-slate-200">
                                                        <p className="text-xs font-semibold text-slate-600 mb-2">Tài liệu đính kèm</p>
                                                        <div className="space-y-1">
                                                            {response.attachments.$values.map((file, fidx) => (
                                                                <a
                                                                    key={fidx}
                                                                    href={file.fileUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-2 text-sm text-red-600 hover:underline"
                                                                >
                                                                    <FileDown className="h-3 w-3" />
                                                                    {file.fileName}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center py-6 text-slate-500">Chưa có phản hồi</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Reset Button */}
                        <Button variant="outline" onClick={handleReset} className="w-full">
                            Tra cứu mã khác
                        </Button>
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
