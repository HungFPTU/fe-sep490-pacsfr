'use client';

import React, { useState } from 'react';
import { XMarkIcon, ExclamationCircleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { useCaseDetail } from '../../../../hooks/useCaseDetail';
import { CaseDetailView } from '../../../view/CaseDetailView.view';
import { UpdateCaseModal } from './UpdateCaseModal.ui';
import { UpdateCaseStatusModal } from './UpdateCaseStatusModal.ui';
import type { CaseDetailResponse } from '../../../../types/case-search';

interface CaseDetailModalProps {
  open: boolean;
  onClose: () => void;
  caseId: string | null;
  onUpdateSuccess?: () => void;
}

export const CaseDetailModal: React.FC<CaseDetailModalProps> = ({ 
  open, 
  onClose, 
  caseId,
  onUpdateSuccess,
}) => {
  const { data, isLoading, error, refetch } = useCaseDetail(caseId || '', !!caseId && open);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const handleUpdateClick = () => {
    setUpdateModalOpen(true);
  };

  const handleStatusClick = () => {
    setStatusModalOpen(true);
  };

  const handleUpdateSuccess = () => {
    refetch();
    onUpdateSuccess?.();
  };

  return (
    <>
      <BaseModal
        open={open}
        onClose={onClose}
        title="Chi tiết hồ sơ"
        size="xl"
        centered
        footer={
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleUpdateClick}
              disabled={isLoading || !!error || !data?.data}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-800 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              <PencilSquareIcon className="h-4 w-4" />
              Cập nhật hồ sơ
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
              Đóng
            </button>
          </div>
        }
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600 mb-3"></div>
            <p className="text-sm text-slate-500">Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-800">Lỗi tải dữ liệu</h4>
                <p className="text-sm text-red-700 mt-1">
                  Không thể tải thông tin chi tiết hồ sơ. Vui lòng thử lại.
                </p>
              </div>
            </div>
          </div>
        ) : data?.data ? (
          <CaseDetailView 
            caseData={data.data as CaseDetailResponse}
            onStatusClick={handleStatusClick}
          />
        ) : null}
      </BaseModal>

      {/* Update Modal */}
      <UpdateCaseModal
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        caseData={(data?.data as CaseDetailResponse) || null}
        onSuccess={handleUpdateSuccess}
      />

      {/* Update Status Modal */}
      <UpdateCaseStatusModal
        open={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        caseId={caseId}
        currentStatus={(data?.data as CaseDetailResponse)?.currentStatus || ''}
        onSuccess={handleUpdateSuccess}
      />
    </>
  );
};
