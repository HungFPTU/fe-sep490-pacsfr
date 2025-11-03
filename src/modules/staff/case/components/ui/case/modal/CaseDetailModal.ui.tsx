'use client';

import React, { useState } from 'react';
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
    // Refetch the detail data
    refetch();
    // Call the parent callback to refresh search table
    onUpdateSuccess?.();
  };

  return (
    <>
      <BaseModal
        open={open}
        onClose={onClose}
        title="Chi tiết hồ sơ"
        size="large"
        centered
        footer={
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={handleUpdateClick}
              disabled={isLoading || !!error || !data?.data}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Cập nhật hồ sơ
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Đóng
            </button>
          </div>
        }
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-sm text-gray-500">Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div className="bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 rounded-lg p-4 shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-bold text-red-900">Lỗi tải dữ liệu</h4>
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

