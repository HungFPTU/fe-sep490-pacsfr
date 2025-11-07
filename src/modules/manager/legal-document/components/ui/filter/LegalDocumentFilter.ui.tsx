'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import { Input } from '@/shared/components/ui/input.ui';
import { cn } from '@/shared/lib/utils';
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
        <div className="mb-4">
            <div className="flex items-center gap-1 flex-nowrap">
                {/* Keyword Search */}
                <div className="relative flex-1 min-w-[280px] mr-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                        type="text"
                        placeholder="Tìm theo số văn bản, tên..."
                        value={localFilters.keyword || ''}
                        onChange={handleKeywordChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleApplyFilters();
                            }
                        }}
                        className="pl-10"
                    />
                </div>

                {/* Document Type Filter */}
                <div className="min-w-[170px] mr-3">
                    <select
                        value={localFilters.documentType || ''}
                        onChange={handleDocumentTypeChange}
                        className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    >
                        <option value="">Tất cả loại văn bản</option>
                        {documentTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status Filter */}
                <div className="min-w-[170px] mr-3">
                    <select
                        value={localFilters.status || ''}
                        onChange={handleStatusChange}
                        className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    >
                        <option value="">Tất cả trạng thái</option>
                        {documentStatusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Active Status Filter */}
                <div className="min-w-[170px] mr-3">
                    <select
                        value={localFilters.isActive === undefined ? '' : String(localFilters.isActive)}
                        onChange={handleActiveChange}
                        className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    >
                        <option value="">Tất cả</option>
                        <option value="true">Hoạt động</option>
                        <option value="false">Không hoạt động</option>
                    </select>
                </div>

                {/* Action Buttons */}
                <Button
                    onClick={handleApplyFilters}
                    size="default"
                    className="whitespace-nowrap mr-2 flex-shrink-0"
                >
                    <Search className="h-4 w-4 mr-1" />
                    Tìm kiếm
                </Button>
                <Button
                    onClick={handleResetFilters}
                    variant="outline"
                    size="default"
                    className="whitespace-nowrap flex-shrink-0"
                >
                    <X className="h-4 w-4 mr-1" />
                    Đặt lại
                </Button>
            </div>
        </div>
    );
};
