'use client';

import React, { useState } from 'react';
import { usePaknList } from '../../hooks';
import { PaknFilter, PaknTable, PaknPagination, PaknDetailModal, UpdateStatusModal } from '../ui';
import type { Pakn } from '../../types';
import { getValuesPage } from '@/types/rest';
import { PaknStatus } from '../../types';

export const PaknListPageView: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Local state for inputs
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('');

  // Active filters state (applied on search)
  const [activeFilters, setActiveFilters] = useState({
    keyword: '',
    status: '',
    categoryId: '',
  });

  // Modal state
  const [detailId, setDetailId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const [updateStatusId, setUpdateStatusId] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<PaknStatus | null>(null);
  const [updateStatusOpen, setUpdateStatusOpen] = useState(false);

  const { data, isLoading, refetch } = usePaknList({
    keyword: activeFilters.keyword,
    status: activeFilters.status === 'ALL' ? '' : activeFilters.status,
    categoryId: activeFilters.categoryId,
    page,
    size: pageSize,
  });

  const handleSearch = () => {
    setPage(1);
    setActiveFilters({
      keyword,
      status,
      categoryId: '',
    });
    setTimeout(() => {
      refetch();
    }, 0);
  };

  const handleReset = () => {
    setKeyword('');
    setStatus('');
    setPage(1);
    setActiveFilters({
      keyword: '',
      status: '',
      categoryId: '',
    });
    refetch();
  };

  const pageResult = data ? getValuesPage(data) : null;
  const items = pageResult?.items || [];
  const total = pageResult?.total || 0;
  const totalPages = pageResult?.totalPages || 1;

  const handleViewDetail = (item: Pakn) => {
    setDetailId(item.id);
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
    setDetailId(null);
  };

  const handleUpdateStatus = (item: Pakn) => {
    setUpdateStatusId(item.id);
    setCurrentStatus(item.status);
    setUpdateStatusOpen(true);
  };

  const handleCloseUpdateStatus = () => {
    setUpdateStatusOpen(false);
    setUpdateStatusId(null);
    setCurrentStatus(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">
          Phản ánh kiến nghị được phân công
        </h1>
      </div>

      <PaknFilter
        keyword={keyword}
        onKeywordChange={setKeyword}
        status={status}
        onStatusChange={setStatus}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <PaknTable
        items={items}
        isLoading={isLoading}
        onView={handleViewDetail}
        onUpdateStatus={handleUpdateStatus}
      />

      <div className="mt-4">
        {total > 0 && (
          <PaknPagination
            page={page}
            pageSize={pageSize}
            total={total}
            totalPages={totalPages}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        )}
      </div>

      <PaknDetailModal
        open={detailOpen}
        onClose={handleCloseDetail}
        id={detailId}
      />

      <UpdateStatusModal
        open={updateStatusOpen}
        onClose={handleCloseUpdateStatus}
        paknId={updateStatusId}
        currentStatus={currentStatus}
      />
    </div>
  );
};

