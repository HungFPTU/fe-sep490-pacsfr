'use client';

import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { usePriorityStore } from '../../../stores/usePriorityStore';

export const PriorityRefreshButton: React.FC = () => {
    const { fetchPriorityData, isLoading } = usePriorityStore();

    const handleRefresh = () => {
        fetchPriorityData();
    };

    return (
        <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
            <ArrowPathIcon 
                className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
            />
            <span>Làm mới</span>
        </button>
    );
};

