'use client';

import React, { useState } from 'react';
import { useCaseSearch } from '../../hooks/useCaseSearch';
import type { CaseSearchFilters, CaseData } from '../../types/case-search';
import { SearchFilters, SearchActions, SearchStatus, EmptySearchState, CaseDetailModal } from '../ui/case';
import { CaseListView } from './CaseListView.view';

export const CaseSearchView: React.FC = () => {
  const [filters, setFilters] = useState<CaseSearchFilters>({
    page: 1,
    size: 20,
  });

  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchFilters, setSearchFilters] = useState<CaseSearchFilters>({
    page: 1,
    size: 20,
  });

  // Modal state
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useCaseSearch(searchFilters, searchEnabled);

  const hasFilterChanges = JSON.stringify(filters) !== JSON.stringify(searchFilters);

  const handleSearch = () => {
    const cleanFilters: CaseSearchFilters = {
      page: 1,
      size: filters.size || 20,
    };

    if (filters.caseCode?.trim()) cleanFilters.caseCode = filters.caseCode.trim();
    if (filters.guestId?.trim()) cleanFilters.guestId = filters.guestId.trim();
    if (filters.serviceId?.trim()) cleanFilters.serviceId = filters.serviceId.trim();
    if (filters.staffId?.trim()) cleanFilters.staffId = filters.staffId.trim();
    if (filters.priorityLevel !== undefined && filters.priorityLevel !== null) {
      cleanFilters.priorityLevel = filters.priorityLevel;
    }
    if (filters.caseStatus?.trim()) cleanFilters.caseStatus = filters.caseStatus.trim();
    if (filters.fromDate?.trim()) cleanFilters.fromDate = filters.fromDate.trim();
    if (filters.toDate?.trim()) cleanFilters.toDate = filters.toDate.trim();

    setSearchFilters(cleanFilters);
    setSearchEnabled(true);
    setFilters((prev) => ({ ...prev, page: 1 }));
  };

  const handleReset = () => {
    const resetFilters = { page: 1, size: 20 };
    setFilters(resetFilters);
    setSearchFilters(resetFilters);
    setSearchEnabled(false);
  };

  const handleFilterChange = (key: keyof CaseSearchFilters, value: string | number | undefined) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    if (!searchEnabled) return;
    setFilters((prev) => ({ ...prev, page }));
    setSearchFilters((prev) => ({ ...prev, page }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleViewDetail = (caseItem: CaseData) => {
    setSelectedCaseId(caseItem.id);
    setDetailModalOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailModalOpen(false);
    setSelectedCaseId(null);
  };

  const caseListData = data?.data?.data;
  const cases = caseListData?.items?.$values || [];

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tra cứu hồ sơ</h1>
            <p className="text-gray-600">Tìm kiếm và quản lý hồ sơ công dân</p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bộ lọc tìm kiếm</h3>

            <SearchFilters filters={filters} onFilterChange={handleFilterChange} onKeyPress={handleKeyPress} />

            <div className="mt-6">
              <SearchActions
                isLoading={isLoading}
                hasChanges={hasFilterChanges}
                searchEnabled={searchEnabled}
                onSearch={handleSearch}
                onReset={handleReset}
              />
            </div>

            <SearchStatus error={error} hasChanges={hasFilterChanges} searchEnabled={searchEnabled} />
          </div>

          {/* Results */}
          {searchEnabled ? (
            <CaseListView
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
          ) : (
            <EmptySearchState />
          )}

          {/* Case Detail Modal */}
          <CaseDetailModal
            open={detailModalOpen}
            onClose={handleCloseDetail}
            caseId={selectedCaseId}
            onUpdateSuccess={() => refetch()}
          />
        </div>
      </div>
    </div>
  );
};

