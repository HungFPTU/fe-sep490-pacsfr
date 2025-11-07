'use client';

import React, { useState, useEffect } from 'react';
import { StaffFilters } from '../../../types';
import { Search, X } from 'lucide-react';
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
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, mã, email..."
                        value={localFilters.SearchTerm || ''}
                        onChange={handleSearchChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleApplyFilters();
                            }
                        }}
                        className="w-full h-10 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Status Filter */}
                <select
                    value={localFilters.IsActive === undefined ? '' : String(localFilters.IsActive)}
                    onChange={handleStatusChange}
                    className="h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px]"
                >
                    {filterOptions.status.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Role Type Filter */}
                <select
                    value={localFilters.RoleType || ''}
                    onChange={handleRoleTypeChange}
                    className="h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px]"
                >
                    {filterOptions.roleType.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
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
}
