'use client';

import React, { useState, useEffect } from 'react';
import { XMarkIcon, FlagIcon } from '@heroicons/react/24/outline';
import { useUpdatePriority } from '../../../hooks';
import type { PriorityCase } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    priorityCase: PriorityCase | null;
}

export const UpdatePriorityModal: React.FC<Props> = ({ open, onClose, priorityCase }) => {
    const [priorityLevel, setPriorityLevel] = useState<number>(0);
    const [reason, setReason] = useState<string>('');
    const [expiryDate, setExpiryDate] = useState<string>('');
    
    const updateMutation = useUpdatePriority();

    useEffect(() => {
        if (open && priorityCase) {
            setPriorityLevel(priorityCase.priorityLevel);
            setReason('');
            
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            setExpiryDate(tomorrow.toISOString().split('T')[0]);
        }
    }, [open, priorityCase]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!priorityCase) return;

        const expiryDateTime = new Date(expiryDate);
        expiryDateTime.setHours(23, 59, 59, 999);

        await updateMutation.mutateAsync({
            caseId: priorityCase.id,
            priorityLevel,
            reason: reason || 'Cập nhật mức độ ưu tiên',
            expiryDate: expiryDateTime.toISOString(),
        });

        onClose();
    };

    if (!open || !priorityCase) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            
            <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                            <FlagIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                Cập nhật mức độ ưu tiên
                            </h2>
                            <p className="text-sm text-slate-600">
                                {priorityCase.caseCode}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Mức độ ưu tiên <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={priorityLevel}
                            onChange={(e) => setPriorityLevel(Number(e.target.value))}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                            required
                        >
                            <option value={1}>Ưu tiên </option>
                            <option value={0}>Bình thường </option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Lý do cập nhật
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                            rows={3}
                            placeholder="Nhập lý do cập nhật mức độ ưu tiên..."
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Ngày hết hạn <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                            required
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                            disabled={updateMutation.isPending}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={updateMutation.isPending}
                        >
                            {updateMutation.isPending ? 'Đang cập nhật...' : 'Cập nhật'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

