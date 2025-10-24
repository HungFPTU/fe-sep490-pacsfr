'use client';

import React, { useEffect } from 'react';
import { BaseModal } from '@/shared/components/manager/modal/BaseModal';
import { accountApiService } from '../../services/account.service';
import type { Account } from '../../types';
import { getOne } from '@/types/rest';

interface Props {
  onClose: () => void;
  initData: Account | null | undefined;
}

const statusColor: Record<Account['status'], string> = {
  ACTIVE: 'bg-green-100 text-green-700 ring-1 ring-green-200',
  INACTIVE: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  DISABLED: 'bg-red-100 text-red-700 ring-1 ring-red-200',
};

function formatDate(dt?: string | Date) {
  if (!dt) return '';
  const d = new Date(dt);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleString('vi-VN'); // tuỳ chỉnh theo locale của bạn
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
  const [account, setAccount] = React.useState<Account | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (!initData?.id) {
      setLoading(false);
      setError('Thiếu ID tài khoản.');
      return;
    }
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await accountApiService.getAccountById(initData.id);
        if (!isMounted) return;
        if (res?.success) {
          setAccount(getOne(res) ?? null);
      } else {
        setAccount(null);
      }
      } catch (err) {
        console.error(err);
        if (!isMounted) return;
        setError('Không tải được thông tin tài khoản.');
        setAccount(null);
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
      title="Chi tiết tài khoản"
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
            {account?.fullName?.charAt(0)?.toUpperCase() ??
              initData?.fullName?.charAt(0)?.toUpperCase() ??
              'U'}
          </div>
          <div>
            <div className="text-base font-semibold text-slate-900">
              {loading ? <SkeletonRow className="h-6 w-40" /> : account?.fullName ?? '—'}
            </div>
            <div className="text-sm text-slate-600">
              {loading ? <SkeletonRow className="mt-1 h-4 w-56" /> : account?.username ?? '—'}
            </div>
          </div>
        </div>

        <div>
          {loading ? (
            <div className="h-7 w-28 animate-pulse rounded bg-slate-200" />
          ) : account ? (
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${statusColor[account.status]}`}>
              {account.status}
            </span>
          ) : null}
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
            <FieldRow label="ID" value={account?.id} />
            <FieldRow label="Đơn vị (orgUnitId)" value={account?.orgUnitId} />
            <FieldRow label="Mã nhân sự" value={account?.staffCode} />
            <FieldRow label="Họ tên" value={account?.fullName} />
            <FieldRow label="Tên đăng nhập" value={account?.username} />
            <FieldRow label="Email" value={account?.email} />
            <FieldRow label="Số điện thoại" value={account?.phone} />
            <FieldRow label="Chức vụ" value={account?.position} />
            <FieldRow label="Vai trò" value={account?.roleType} />
            <FieldRow label="Chuyên môn" value={account?.specialization} />
            <FieldRow label="Người tạo" value={account?.createdBy} />
            <FieldRow
              label="Ghi chú"
              value={
                account?.note ? (
                  <span className="whitespace-pre-wrap">{account.note}</span>
                ) : (
                  '—'
                )
              }
              className="md:col-span-2"
            />
            <FieldRow label="Tạo lúc" value={formatDate(account?.createdTime)} />
            <FieldRow label="Cập nhật lúc" value={formatDate(account?.updatedTime)} />
          </>
        )}
      </div>
    </BaseModal>
  );
};

export default ViewModal;
