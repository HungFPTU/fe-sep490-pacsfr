'use client';

import React, { useState, useEffect } from 'react';
import { StaffFilters } from '../../../types';
import { Search, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button.ui';
import { Input } from '@/shared/components/ui/input.ui';
import { cn } from '@/shared/lib/utils';
import { getFilterOptions } from '../../../utils';

interface StaffFilterProps {
    filters: StaffFilters;
    onFilterChange: (filters: StaffFilters) => void;
    onRefresh?: () => void;
}

export function StaffFilter({ filters, onFilterChange, onRefresh }: StaffFilterProps) {
    const filterOptions = getFilterOptions();

    // Local state for filter inputs (not triggering API)
    const [localFilters, setLocalFilters] = useState<StaffFilters>({
        SearchTerm: filters.SearchTerm || '',
        IsActive: filters.IsActive,
        RoleType: filters.RoleType || '',
    });

    // Sync local filters when props change (e.g., reset from parent)
    useEffect(() => {
        setLocalFilters({
            SearchTerm: filters.SearchTerm || '',
            IsActive: filters.IsActive,
            RoleType: filters.RoleType || '',
        });
    }, [filters]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalFilters({ ...localFilters, SearchTerm: e.target.value });
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setLocalFilters({
            ...localFilters,
            IsActive: value === '' ? undefined : value === 'true',
        });
    };

    const handleRoleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLocalFilters({ ...localFilters, RoleType: e.target.value || '' });
    };

    const handleApplyFilters = () => {
        // Apply filters - trigger API call
        onFilterChange(localFilters);
        // Refresh data sau khi apply filters
        if (onRefresh) {
            onRefresh();
        }
    };

    const handleResetFilters = () => {
        const resetFilters: StaffFilters = {
            SearchTerm: '',
            IsActive: undefined,
            RoleType: '',
        };
        setLocalFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <div className="mb-4">
            <div className="flex items-center gap-1 flex-nowrap">
                {/* Search */}
                <div className="relative flex-1 min-w-[280px] mr-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                        type="text"
                        placeholder="Tìm kiếm theo tên, mã, email..."
                        value={localFilters.SearchTerm || ''}
                        onChange={handleSearchChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleApplyFilters();
                        }}
                        className="pl-10"
                    />
                </div>

                {/* Status Filter */}
                <div className="min-w-[170px] mr-3">
                    <select
                        value={localFilters.IsActive === undefined ? '' : String(localFilters.IsActive)}
                        onChange={handleStatusChange}
                        className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    >
                        {filterOptions.status.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Role Type Filter */}
                <div className="min-w-[170px] mr-3">
                    <select
                        value={localFilters.RoleType || ''}
                        onChange={handleRoleTypeChange}
                        className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                    >
                        {filterOptions.roleType.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
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
}
