'use client';

import React from 'react';
import { useHttpLoading } from '@/shared/hooks/useHttpLoading';
import { LoadingSpinner } from './LoadingSpinner.com';

export function GlobalLoadingOverlay() {
    const { isLoading } = useHttpLoading();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="rounded-lg bg-white p-6 shadow-2xl">
                <div className="flex flex-col items-center gap-3">
                    <LoadingSpinner size="lg" color="primary" />
                    <p className="text-sm font-medium text-slate-700">Đang xử lý...</p>
                </div>
            </div>
        </div>
    );
}

