'use client';

import React, { useState } from 'react';
import { Search, MessageSquare, FileDown, X, Loader2, Send, ArrowRight, CheckCircle2, Clock, User } from 'lucide-react';
import { Input } from '@/shared/components/ui/input.ui';
import { Button } from '@/shared/components/ui/button.ui';
import { paknApi } from '@/modules/client/pakn/api/pakn.api';
import { PaknOTPVerificationModal } from '@/modules/client/pakn/components/ui/modal/PaknOTPVerificationModal.ui';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import { formatDate } from '@/shared/lib/utils';
import type { PaknDetail } from '@/modules/client/pakn/types/response';

const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
        'CHO_TIEP_NHAN': 'bg-yellow-100 text-yellow-700 border-yellow-200',
        'DA_TIEP_NHAN': 'bg-blue-100 text-blue-700 border-blue-200',
        'DANG_XU_LY': 'bg-purple-100 text-purple-700 border-purple-200',
        'DA_TRA_LOI': 'bg-green-100 text-green-700 border-green-200',
        'HOAN_THANH': 'bg-emerald-100 text-emerald-700 border-emerald-200',
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
        'HOAN_THANH': 'Hoàn thành',
        'TU_CHOI': 'Từ chối',
    };
    return labelMap[status] || status;
};

export function PaknResponseSection() {
  const [paknCode, setPaknCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');
  const [paknDetail, setPaknDetail] = useState<PaknDetail | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'timeline' | 'responses'>('info');
  const { addToast } = useGlobalToast();

  const handleSendOTP = async () => {
    if (!paknCode.trim()) {
      addToast({ message: 'Vui lòng nhập mã PAKN', type: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await paknApi.lookup({ paknCode: paknCode.trim() });
      if (response?.data) {
        setSelectedCode(paknCode.trim());
        setOtpModalOpen(true);
        addToast({ message: 'Mã OTP đã được gửi đến email/SMS của bạn', type: 'success' });
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
    setPaknCode('');
    setPaknDetail(null);
    setSelectedCode('');
    setActiveTab('info');
  };

  const attachments = paknDetail?.attachments?.$values || [];
  const statusHistories = paknDetail?.statusHistories?.$values || [];
  const responses = paknDetail?.responses?.$values || [];

  return (
    <>
      <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <MessageSquare className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Tra cứu phản hồi Phản ánh kiến nghị
              </h2>
              <p className="text-lg text-gray-600">
                Nhập mã PAKN để xem các phản hồi từ cơ quan chức năng
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    value={paknCode}
                    onChange={(e) => setPaknCode(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendOTP();
                    }}
                    placeholder="Nhập mã PAKN (ví dụ: PAKN-2025-001234)"
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  onClick={handleSendOTP}
                  disabled={!paknCode.trim() || isLoading}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Tra cứu
                    </>
                  )}
                </Button>
                {paknDetail && (
                  <Button onClick={handleReset} variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Xóa
                  </Button>
                )}
              </div>
            </div>

            {/* PAKN Detail Results */}
            {paknDetail && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                {/* Status Header */}
                <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-5 mb-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{paknDetail.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Mã: <span className="font-semibold text-indigo-600">{paknDetail.paknCode}</span>
                      </p>
                    </div>
                    <span className={`inline-flex rounded-full px-4 py-2 text-sm font-bold border-2 ${getStatusColor(paknDetail.status)}`}>
                      {getStatusLabel(paknDetail.status)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t border-slate-200">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Tiếp nhận</p>
                      <p className="text-sm font-semibold text-slate-800">{paknDetail.receivedAt ? formatDate(paknDetail.receivedAt) : '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Xử lý</p>
                      <p className="text-sm font-semibold text-slate-800">{paknDetail.processingStartedAt ? formatDate(paknDetail.processingStartedAt) : '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Hoàn thành</p>
                      <p className="text-sm font-semibold text-slate-800">{paknDetail.completedAt ? formatDate(paknDetail.completedAt) : '—'}</p>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-slate-200 mb-6">
                  {(['info', 'timeline', 'responses'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-indigo-600 text-indigo-600'
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
                <div className="max-h-[500px] overflow-y-auto">
                  {activeTab === 'info' && (
                    <div className="space-y-5">
                      {/* Citizen Info */}
                      <div className="grid grid-cols-2 gap-4 rounded-lg border border-slate-200 bg-slate-50/50 p-4 text-sm">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Họ và tên</p>
                          <p className="font-semibold text-slate-900">{paknDetail.citizenName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Điện thoại</p>
                          <p className="font-semibold text-slate-900">{paknDetail.phone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Email</p>
                          <p className="font-semibold text-slate-900">{paknDetail.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Địa chỉ</p>
                          <p className="font-semibold text-slate-900">{[paknDetail.streetAddress, paknDetail.city].filter(Boolean).join(', ')}</p>
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <p className="text-xs font-semibold text-slate-600 mb-2">Nội dung phản ánh</p>
                        <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-900 whitespace-pre-wrap">
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
                                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                              >
                                <FileDown className="h-4 w-4 text-indigo-500" />
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
                          <div key={idx} className="rounded-lg border border-slate-200 bg-white p-4">
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
                        <p className="text-center py-8 text-slate-500">Không có lịch sử xử lý</p>
                      )}
                    </div>
                  )}

                  {activeTab === 'responses' && (
                    <div className="space-y-4">
                      {responses.length > 0 ? (
                        responses.map((response, idx) => (
                          <div key={idx} className="rounded-lg border border-slate-200 bg-white p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                              <span className="text-sm font-semibold text-slate-700">Phản hồi từ cán bộ</span>
                              <span className="text-xs text-slate-500 ml-auto">{formatDate(response.createdAt)}</span>
                            </div>
                            <p className="text-sm text-slate-900 whitespace-pre-wrap mb-4">{response.responseContent}</p>
                            
                            {response.attachments?.$values && response.attachments.$values.length > 0 && (
                              <div className="pt-4 border-t border-slate-200">
                                <p className="text-xs font-semibold text-slate-600 mb-2">Tài liệu đính kèm</p>
                                <div className="space-y-2">
                                  {response.attachments.$values.map((file, fidx) => (
                                    <a
                                      key={fidx}
                                      href={file.fileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-sm text-indigo-600 hover:underline"
                                    >
                                      <FileDown className="h-4 w-4" />
                                      {file.fileName}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-center py-8 text-slate-500">Chưa có phản hồi nào</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!paknDetail && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 mb-4">
                  <MessageSquare className="h-7 w-7 text-slate-400" />
                </div>
                <p className="text-gray-600 text-lg">
                  Vui lòng nhập mã PAKN để xem phản hồi
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Mã OTP sẽ được gửi đến email/SMS của bạn để xác thực
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <PaknOTPVerificationModal
        isOpen={otpModalOpen}
        paknCode={selectedCode}
        onVerifySuccess={handleVerifySuccess}
        onClose={() => setOtpModalOpen(false)}
      />
    </>
  );
}
