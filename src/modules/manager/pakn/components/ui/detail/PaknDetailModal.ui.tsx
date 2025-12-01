'use client';

import React from 'react';
import { useStaffDetail } from '@/modules/manager/staff/hooks';
import { FileText, User, MapPin, Phone, Mail, Calendar, Tag, Info, Briefcase } from 'lucide-react';
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

// ... imports

export const PaknDetailModal: React.FC<Props> = ({ open, onClose, id }) => {
  const { data: pakn, isLoading } = usePaknDetail(id || '');
  
  // Fetch assigned staff details if available
  const { data: assignedStaffData } = useStaffDetail(pakn?.assignedStaffId || '', {
    enabled: !!pakn?.assignedStaffId,
  });

  // Extract staff object from response
  const assignedStaff = assignedStaffData ? getOne(assignedStaffData) : null;
  
  console.log('PaknDetailModal - assignedStaffData:', assignedStaffData);
  console.log('PaknDetailModal - assignedStaff:', assignedStaff);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
        </div>
      );
    }

    if (!pakn) {
      return (
        <div className="flex h-40 items-center justify-center text-slate-500">
          Không tìm thấy dữ liệu
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Header Info */}
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{pakn.title}</h3>
              <div className="mt-1 flex items-center gap-3 text-sm text-slate-500">
                <span className="font-medium text-slate-700">{pakn.paknCode}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(pakn.createdAt)}
                </span>
              </div>
            </div>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-5 ${
                PAKN_STATUS_COLOR[pakn.status] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {PAKN_STATUS_LABEL[pakn.status] || pakn.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm">
              <Tag className="h-4 w-4 text-slate-400" />
              <span className="text-slate-500">Danh mục:</span>
              <span className="font-medium text-slate-900">{pakn.categoryName}</span>
            </div>
          </div>
        </div>

        {/* Assigned Staff Info */}
        {assignedStaff && (
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase text-slate-500">
              <Briefcase className="h-4 w-4" />
              Nhân viên xử lý
            </h4>
            <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-semibold text-indigo-600">
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

        {/* Citizen Info */}
        <div>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase text-slate-500">
            <User className="h-4 w-4" />
            Thông tin người gửi
          </h4>
          <div className="grid grid-cols-1 gap-4 rounded-lg border border-slate-200 p-4 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="mt-0.5 h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Họ và tên</p>
                  <p className="text-sm font-medium text-slate-900">{pakn.citizenName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Số điện thoại</p>
                  <p className="text-sm font-medium text-slate-900">{pakn.phone}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm font-medium text-slate-900">{pakn.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Địa chỉ</p>
                  <p className="text-sm font-medium text-slate-900">
                    {[pakn.streetAddress, pakn.ward, pakn.city].filter(Boolean).join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase text-slate-500">
            <Info className="h-4 w-4" />
            Nội dung phản ánh
          </h4>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-900">
            {pakn.content}
          </div>
        </div>

        {/* Attachments */}
        {pakn.attachments && pakn.attachments.$values && pakn.attachments.$values.length > 0 && (
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase text-slate-500">
              <FileText className="h-4 w-4" />
              Tài liệu đính kèm
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {pakn.attachments.$values.map((file) => (
                <a
                  key={file.id}
                  href={file.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50 hover:text-indigo-600"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-slate-100 text-slate-500">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1 truncate">
                    <p className="truncate text-sm font-medium">{file.fileName}</p>
                    <p className="text-xs text-slate-500">Nhấn để xem</p>
                  </div>
                </a>
              ))}
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
        <Button onClick={onClose} variant="default">
          Đóng
        </Button>
      }
      size="large"
    >
      {renderContent()}
    </BaseModal>
  );
};
