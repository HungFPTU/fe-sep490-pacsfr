'use client';

import React, { useEffect } from 'react';
import { BaseModal } from '@/shared/components/manager/modal/BaseModal';
import { getOne } from '@/types/rest';
import { Services } from '../../types';
import { serviceAPI } from '../../services/services.service';

interface Props {
  onClose: () => void;
  initData: Services | null | undefined;
}

function formatDate(dt?: string | Date) {
  if (!dt) return '';
  const d = new Date(dt);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleString('vi-VN');
}

function formatCurrencyVND(v?: number) {
  if (typeof v !== 'number') return '—';
  return v.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function FieldRow({
  label,
  value,
  className,
}: {
  label: string;
  value?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="mt-1 text-sm text-slate-900 break-words">{value ?? '—'}</div>
    </div>
  );
}

function SkeletonRow({ className }: { className?: string }) {
  return <div className={`h-5 animate-pulse rounded bg-slate-200 ${className ?? ''}`} />;
}

const ViewModal: React.FC<Props> = ({ onClose, initData }) => {
  const [service, setService] = React.useState<Services | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  // Màu badge theo isActive
  const statusBadge = (isActive?: boolean) =>
    isActive
      ? 'bg-green-100 text-green-700 border border-green-200'
      : 'bg-slate-100 text-slate-700 border border-slate-200';

  useEffect(() => {
    if (!initData?.id) {
      setLoading(false);
      setError('Thiếu ID dịch vụ.');
      return;
    }
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await serviceAPI.getServiceById(initData.id);
        if (!isMounted) return;
        if (res?.success) {
          setService(getOne(res) ?? null);
        } else {
          setService(null);
        }
      } catch (err) {
        console.error(err);
        if (!isMounted) return;
        setError('Không tải được thông tin dịch vụ.');
        setService(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [initData?.id]);

  return (
    <BaseModal
      open={true}
      onClose={onClose}
      title="Chi tiết dịch vụ"
      onOk={onClose}
      onCancel={onClose}
      okText="Đóng"
      cancelText="Hủy"
      confirmLoading={false}
      centered
      size="large"
      maskClosable
      keyboard
    >
      {/* Error state */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-lg font-semibold text-slate-700">
            {service?.serviceName?.charAt(0)?.toUpperCase() ??
              initData?.serviceName?.charAt(0)?.toUpperCase() ??
              'S'}
          </div>
          <div>
            <div className="text-base font-semibold text-slate-900">
              {loading ? <SkeletonRow className="h-6 w-40" /> : service?.serviceName ?? '—'}
            </div>
            <div className="text-sm text-slate-600">
              {loading ? <SkeletonRow className="mt-1 h-4 w-56" /> : service?.serviceCode ?? '—'}
            </div>
          </div>
        </div>

        <div>
          {loading ? (
            <div className="h-7 w-28 animate-pulse rounded bg-slate-200" />
          ) : (
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${statusBadge(service?.isActive)}`}>
              {service?.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {loading ? (
          <>
            <SkeletonRow className="h-5 w-24" />
            <SkeletonRow className="h-5 w-40" />
            <SkeletonRow className="h-5 w-60" />
            <SkeletonRow className="h-5 w-28" />
            <SkeletonRow className="h-5 w-52" />
            <SkeletonRow className="h-5 w-32" />
            <SkeletonRow className="h-5 w-56" />
            <SkeletonRow className="h-5 w-48" />
          </>
        ) : (
          <>
            <FieldRow label="ID" value={service?.id} />
            <FieldRow label="Mã dịch vụ" value={service?.serviceCode} />
            <FieldRow label="Tên dịch vụ" value={service?.serviceName} />
            <FieldRow label="Nhóm dịch vụ (serviceGroupId)" value={service?.serviceGroupId} />
            <FieldRow label="Căn cứ pháp lý (legalBasisId)" value={service?.legalBasisId} />
            <FieldRow label="Hình thức" value={service?.serviceType} />
            <FieldRow label="Thời gian xử lý" value={service?.processingTime} />
            <FieldRow label="Phí" value={formatCurrencyVND(service?.feeAmount)} />
            <FieldRow label="Tài liệu kết quả" value={service?.resultDocument} />
            <FieldRow label="Hỗ trợ trực tuyến" value={service?.isOnlineAvailable ? 'Có' : 'Không'} />
            <FieldRow label="Trạng thái" value={service?.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'} />
            <FieldRow
              label="Mô tả"
              value={service?.description ? <span className="whitespace-pre-wrap">{service.description}</span> : '—'}
              className="md:col-span-2"
            />
            <FieldRow label="Tạo lúc" value={formatDate(service?.createdAt)} />
          </>
        )}
      </div>
    </BaseModal>
  );
};

export default ViewModal;
