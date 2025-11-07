'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { LegalDocumentService } from '../../../services/legal-document.service';
import type { LegalDocumentFilters } from '../../../types';

interface Props {
    filters: LegalDocumentFilters;
    onFilterChange: (filters: LegalDocumentFilters) => void;
    onRefresh?: () => void;
}

export const LegalDocumentFilter: React.FC<Props> = ({
    filters,
    onFilterChange,
    onRefresh,
}) => {
    const documentTypeOptions = LegalDocumentService.getDocumentTypeOptions();
    const documentStatusOptions = LegalDocumentService.getDocumentStatusOptions();

    // Local state for filter inputs (not triggering API)
    const [localFilters, setLocalFilters] = useState<LegalDocumentFilters>({
        keyword: filters.keyword || '',
        documentType: filters.documentType || '',
        status: filters.status || '',
        isActive: filters.isActive !== undefined ? filters.isActive : undefined,
    });

    // Sync local filters when props change (e.g., reset from parent)
    useEffect(() => {
        setLocalFilters({
            keyword: filters.keyword || '',
            documentType: filters.documentType || '',
            status: filters.status || '',
            isActive: filters.isActive !== undefined ? filters.isActive : undefined,
        });
    }, [filters]);

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalFilters({ ...localFilters, keyword: e.target.value });
    };

    const handleDocumentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocalFilters({ ...localFilters, documentType: e.target.value });
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocalFilters({ ...localFilters, status: e.target.value });
    };

    const handleActiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setLocalFilters({
            ...localFilters,
            isActive: value === '' ? undefined : value === 'true',
        });
    };

    const handleApplyFilters = () => {
        // Apply filters - trigger API call with page reset to 1
        onFilterChange({
            ...localFilters,
            page: 1,
            size: filters.size || 10,
        });
        // Refresh data sau khi apply filters
        if (onRefresh) {
            onRefresh();
        }
    };

    const handleResetFilters = () => {
        const resetFilters: LegalDocumentFilters = {
            keyword: '',
            documentType: '',
            status: '',
            isActive: undefined,
            page: 1,
            size: filters.size || 10,
        };
        setLocalFilters({
            keyword: '',
            documentType: '',
            status: '',
            isActive: undefined,
        });
        onFilterChange(resetFilters);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-wrap items-center gap-3">
                {/* Keyword Search */}
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm theo số văn bản, tên..."
                        value={localFilters.keyword || ''}
                        onChange={handleKeywordChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleApplyFilters();
                            }
                        }}
                        className="w-full h-10 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Document Type Filter */}
                <select
                    value={localFilters.documentType || ''}
                    onChange={handleDocumentTypeChange}
                    className="h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px]"
                >
                    <option value="">Tất cả loại văn bản</option>
                    {documentTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Status Filter */}
                <select
                    value={localFilters.status || ''}
                    onChange={handleStatusChange}
                    className="h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px]"
                >
                    <option value="">Tất cả trạng thái</option>
                    {documentStatusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Active Status Filter */}
                <select
                    value={localFilters.isActive === undefined ? '' : String(localFilters.isActive)}
                    onChange={handleActiveChange}
                    className="h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px]"
                >
                    <option value="">Tất cả</option>
                    <option value="true">Hoạt động</option>
                    <option value="false">Không hoạt động</option>
                </select>

                {/* Action Buttons */}
                <button
                    onClick={handleApplyFilters}
                    className="px-4 py-2 h-10 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                    <Search className="w-4 h-4" />
                    Tìm kiếm
                </button>
                <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 h-10 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                    <X className="w-4 h-4" />
                    Đặt lại
                </button>
            </div>
        </div>
    );
};
