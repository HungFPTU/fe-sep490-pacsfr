'use client';

import React, { useState, useEffect } from 'react';
import { useCaseSearch } from '../../hooks/useCaseSearch';
import type { CaseSearchFilters as FilterTypes, CaseData } from '../../types/case-search';
import { CaseDetailModal } from '../ui/case';
import { CaseSearchFilters } from '../ui/case-search/CaseSearchFilters.ui';
import { CaseTable } from '../ui/case-table/CaseTable.ui';

// Convert date string (YYYY-MM-DD) to ISO format with UTC+7 timezone
const toISOWithTimezone = (dateStr: string, isEndOfDay = false): string => {
  const time = isEndOfDay ? 'T23:59:59+07:00' : 'T00:00:00+07:00';
  return `${dateStr}${time}`;
};

export const CaseSearchView: React.FC = () => {
  const [filters, setFilters] = useState<FilterTypes>({ page: 1, size: 20 });
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchFilters, setSearchFilters] = useState<FilterTypes>({ page: 1, size: 20 });
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const { data, isLoading, refetch } = useCaseSearch(searchFilters, searchEnabled);

  useEffect(() => { setSearchEnabled(true); }, []);

  useEffect(() => {
    const newCaseId = sessionStorage.getItem('newCaseId');
    if (newCaseId) {
      setSelectedCaseId(newCaseId);
      setDetailModalOpen(true);
      sessionStorage.removeItem('newCaseId');
    }
  }, []);

  const handleSearch = () => {
    // Build clean filters with only the 6 required params
    const cleanFilters: FilterTypes = { page: 1, size: filters.size || 20 };
    
    if (filters.caseCode?.trim()) cleanFilters.caseCode = filters.caseCode.trim();
    if (filters.guestName?.trim()) cleanFilters.guestName = filters.guestName.trim();
    if (filters.serviceId?.trim()) cleanFilters.serviceId = filters.serviceId.trim();
    if (filters.caseStatus?.trim()) cleanFilters.caseStatus = filters.caseStatus.trim();
    
    // Convert dates to ISO format with UTC+7 timezone
    if (filters.fromDate?.trim()) {
      cleanFilters.fromDate = toISOWithTimezone(filters.fromDate.trim(), false); // Start of day
    }
    if (filters.toDate?.trim()) {
      cleanFilters.toDate = toISOWithTimezone(filters.toDate.trim(), true); // End of day
    }

    // Date validation
    if (filters.fromDate && filters.toDate) {
      if (new Date(filters.fromDate) > new Date(filters.toDate)) {
        return; // Block search if date validation fails
      }
    }

    setSearchFilters(cleanFilters);
    setSearchEnabled(true);
    setFilters((prev) => ({ ...prev, page: 1 }));
    setTimeout(() => refetch(), 0);
  };

  const handleReset = () => {
    const resetFilters = { page: 1, size: 20 };
    setFilters(resetFilters);
    setSearchFilters(resetFilters);
    setSearchEnabled(true);
    setTimeout(() => refetch(), 0);
  };

  const handleFilterChange = (key: keyof FilterTypes, value: string | number | undefined) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    if (!searchEnabled) return;
    setFilters((prev) => ({ ...prev, page }));
    setSearchFilters((prev) => ({ ...prev, page }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleViewDetail = (caseItem: CaseData) => {
    setSelectedCaseId(caseItem.id);
    setDetailModalOpen(true);
  };

  const caseListData = data?.data?.data;
  const cases = caseListData?.items?.$values || [];

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Tra cứu hồ sơ</h1>
        <p className="text-sm text-gray-500">Tìm kiếm và quản lý hồ sơ công dân</p>
      </div>

      {/* Filters */}
      <CaseSearchFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onKeyPress={handleKeyPress}
        onSearch={handleSearch}
        onReset={handleReset}
        isLoading={isLoading}
      />

      {/* Table */}
      {searchEnabled && (
        <CaseTable
          cases={cases}
          isLoading={isLoading}
          pagination={{
            page: caseListData?.page || 1,
            totalPages: caseListData?.totalPages || 1,
            total: caseListData?.total || 0,
            size: caseListData?.size || 20,
            hasNextPage: caseListData?.hasNextPage || false,
            hasPreviousPage: caseListData?.hasPreviousPage || false,
          }}
          onPageChange={handlePageChange}
          onViewDetail={handleViewDetail}
        />
      )}

      {/* Modal */}
      <CaseDetailModal
        open={detailModalOpen}
        onClose={() => { setDetailModalOpen(false); setSelectedCaseId(null); }}
        caseId={selectedCaseId}
        onUpdateSuccess={() => refetch()}
      />
    </div>
  );
};
