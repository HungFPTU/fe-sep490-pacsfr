'use client';

import React, { useState } from 'react';
import { useStaffDetail } from '@/modules/manager/staff/hooks';
import { FileText, User, MapPin, Phone, Mail, Calendar, Tag, Info, Briefcase, Clock, CheckCircle2, MessageSquare, ArrowRight, FileDown } from 'lucide-react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { Button } from '@/shared/components/ui/button.ui';
import { usePaknDetail } from '../../../hooks';
import { formatDate } from '@/shared/lib/utils';
import { PAKN_STATUS_LABEL, PAKN_STATUS_COLOR } from '../../../constants';

interface Props {
  open: boolean;
  onClose: () => void;
  id: string | null;
}

import { getOne } from '@/types/rest';

// Status color mapping
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

export const PaknDetailModal: React.FC<Props> = ({ open, onClose, id }) => {
  const { data: pakn, isLoading } = usePaknDetail(id || '');
  const [activeTab, setActiveTab] = useState<'info' | 'timeline' | 'responses'>('info');
  
  // Fetch assigned staff details if available
  const { data: assignedStaffData } = useStaffDetail(pakn?.assignedStaffId || '', {
    enabled: !!pakn?.assignedStaffId,
  });

  // Extract staff object from response
  const assignedStaff = assignedStaffData ? getOne(assignedStaffData) : null;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-96 items-center justify-center">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
            <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin" />
          </div>
        </div>
      );
    }

    if (!pakn) {
      return (
        <div className="flex h-96 items-center justify-center text-slate-500">
          Không tìm thấy dữ liệu
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Status Overview */}
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6 ring-1 ring-black/5">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-2">Trạng thái hiện tại</p>
              <h3 className="text-2xl font-bold text-slate-900">{pakn.title}</h3>
              <p className="mt-2 text-sm text-slate-600">
                <span className="font-semibold text-slate-900">Mã PAKN:</span> {pakn.paknCode}
              </p>
            </div>
            <div className={`inline-flex rounded-full px-4 py-2 text-sm font-bold border-2 ${getStatusColor(pakn.status)}`}>
              {getStatusLabel(pakn.status)}
            </div>
          </div>
          
          {/* Timeline Badges */}
          <div className="grid grid-cols-4 gap-2 mt-6 pt-4 border-t border-slate-200">
            <div className="text-center">
              <p className="text-xs text-slate-600 mb-1">Tiếp nhận</p>
              <p className="text-xs font-semibold text-slate-900">{formatDate(pakn.receivedAt)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-600 mb-1">Bắt đầu xử lý</p>
              <p className="text-xs font-semibold text-slate-900">{pakn.processingStartedAt ? formatDate(pakn.processingStartedAt) : '—'}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-600 mb-1">Hoàn thành</p>
              <p className="text-xs font-semibold text-slate-900">{pakn.completedAt ? formatDate(pakn.completedAt) : '—'}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-600 mb-1">Danh mục</p>
              <p className="text-xs font-semibold text-slate-900">{pakn.categoryName}</p>
            </div>
          </div>
        </div>

        {/* Assigned Staff Info */}
        {assignedStaff && (
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase text-slate-700">
              <Briefcase className="h-4 w-4" />
              Nhân viên xử lý
            </h4>
            <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-semibold text-indigo-600 shrink-0">
                  {assignedStaff.avatarUrl ? (
                    <img src={assignedStaff.avatarUrl} alt="" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    assignedStaff.fullName.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-slate-900">{assignedStaff.fullName}</h5>
                  <p className="text-sm text-slate-500">{assignedStaff.staffCode} • {assignedStaff.position}</p>
                  
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      {assignedStaff.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      {assignedStaff.phone}
                    </div>
                    {assignedStaff.orgUnitName && (
                      <div className="col-span-2 flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {assignedStaff.orgUnitName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-200">
          {(['info', 'timeline', 'responses'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'info' && 'Thông tin'}
              {tab === 'timeline' && 'Lịch sử'}
              {tab === 'responses' && `Phản hồi (${pakn.responses?.$values?.length || 0})`}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            {/* Citizen Info */}
            <div>
              <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase text-slate-700">
                <User className="h-4 w-4" />
                Thông tin người gửi
              </h4>
              <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 p-5 sm:grid-cols-2 bg-slate-50/50">
                <div>
                  <p className="text-xs font-semibold text-slate-600 mb-1">Họ và tên</p>
                  <p className="text-sm font-semibold text-slate-900">{pakn.citizenName}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 mb-1">Số điện thoại</p>
                  <p className="text-sm font-semibold text-slate-900">{pakn.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 mb-1">Email</p>
                  <p className="text-sm font-semibold text-slate-900">{pakn.email}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 mb-1">Địa chỉ</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {[pakn.streetAddress, pakn.ward, pakn.city].filter(Boolean).join(', ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase text-slate-700">
                <Info className="h-4 w-4" />
                Nội dung phản ánh
              </h4>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-900 whitespace-pre-wrap">
                {pakn.content}
              </div>
            </div>

            {/* Attachments */}
            {pakn.attachments?.['$values'] && pakn.attachments['$values'].length > 0 && (
              <div>
                <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase text-slate-700">
                  <FileText className="h-4 w-4" />
                  Tài liệu đính kèm ({pakn.attachments['$values'].length})
                </h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {pakn.attachments['$values'].map((file: any, idx: number) => (
                    <a
                      key={idx}
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 hover:bg-indigo-50 hover:border-indigo-300 transition-colors group"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors shrink-0">
                        <FileDown className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">{file.fileName}</p>
                        <p className="text-xs text-slate-500">Nhấn để tải xuống</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase text-slate-700">
              <Clock className="h-4 w-4" />
              Lịch sử xử lý
            </h4>
            <div className="space-y-3">
              {pakn.statusHistories?.['$values'] && pakn.statusHistories['$values'].length > 0 ? (
                pakn.statusHistories['$values'].map((history: any, idx: number) => (
                  <div key={idx} className="relative rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow bg-slate-50/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold border-2 ${getStatusColor(history.oldStatus)}`}>
                            {getStatusLabel(history.oldStatus)}
                          </span>
                          <ArrowRight className="h-4 w-4 text-slate-400" />
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold border-2 ${getStatusColor(history.newStatus)}`}>
                            {getStatusLabel(history.newStatus)}
                          </span>
                        </div>
                        {history.note && (
                          <p className="text-sm text-slate-700 font-medium mb-2">{history.note}</p>
                        )}
                        <p className="text-xs text-slate-500">
                          <span className="font-semibold">Ngày:</span> {formatDate(history.modifiedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  Không có lịch sử xử lý
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'responses' && (
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase text-slate-700">
              <MessageSquare className="h-4 w-4" />
              Phản hồi từ cán bộ
            </h4>
            <div className="space-y-4">
              {pakn.responses?.['$values'] && pakn.responses['$values'].length > 0 ? (
                pakn.responses['$values'].map((response: any, idx: number) => (
                  <div key={idx} className="rounded-lg border border-slate-200 p-5 bg-slate-50/50">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-700">Cán bộ phản hồi</p>
                          <p className="text-xs text-slate-500">{formatDate(response.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-900 leading-relaxed mb-3 whitespace-pre-wrap">{response.responseContent}</p>
                    
                    {response.attachments?.['$values'] && response.attachments['$values'].length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <p className="text-xs font-semibold text-slate-700 mb-3">Tài liệu đính kèm ({response.attachments['$values'].length})</p>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {response.attachments['$values'].map((file: any, fidx: number) => (
                            <a
                              key={fidx}
                              href={file.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 rounded-lg border border-slate-300 p-2 hover:bg-indigo-50 hover:border-indigo-400 transition-colors text-sm"
                            >
                              <FileDown className="h-4 w-4 text-slate-500 shrink-0" />
                              <span className="truncate text-slate-700">{file.fileName}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">
                  Chưa có phản hồi nào
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Chi tiết Phản ánh kiến nghị"
      footer={
        <div className="flex justify-between gap-2">
          <div />
          <Button onClick={onClose} variant="outline" className="ml-auto">
            Đóng
          </Button>
        </div>
      }
      size="large"
    >
      {renderContent()}
    </BaseModal>
  );
};
