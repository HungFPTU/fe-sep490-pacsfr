'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/manager/features/modal/BaseModal';
import { useCounterById } from '../../../hooks';
import { EyeIcon } from '@heroicons/react/24/outline';

interface Props {
    open: boolean;
    onClose: () => void;
    counterId: string | null;
}

export const CounterDetailModal: React.FC<Props> = ({ open, onClose, counterId }) => {
    const { data: counter, isLoading } = useCounterById(counterId);

    const getStatusBadge = (isActive: boolean) => {
        if (isActive) {
            return (
                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                    Hoạt động
                </span>
            );
        }
        return (
            <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800">
                Ngừng hoạt động
            </span>
        );
    };

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={
                <div className="flex items-center gap-2">
                    <EyeIcon className="h-5 w-5 text-indigo-600" />
                    <span>Chi tiết quầy</span>
                </div>
            }
            footer={null}
            centered
            size="large"
        >
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                        <p className="text-sm text-slate-600">Đang tải dữ liệu...</p>
                    </div>
                </div>
            ) : counter ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Mã quầy
                            </label>
                            <p className="text-sm text-slate-900 bg-slate-50 rounded-lg px-4 py-2">
                                {counter.counterCode || '-'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Tên quầy
                            </label>
                            <p className="text-sm text-slate-900 bg-slate-50 rounded-lg px-4 py-2">
                                {counter.counterName || '-'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Vị trí
                            </label>
                            <p className="text-sm text-slate-900 bg-slate-50 rounded-lg px-4 py-2">
                                {counter.location || '-'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Loại quầy
                            </label>
                            <p className="text-sm text-slate-900 bg-slate-50 rounded-lg px-4 py-2">
                                {counter.counterType || '-'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Sức chứa tối đa
                            </label>
                            <p className="text-sm text-slate-900 bg-slate-50 rounded-lg px-4 py-2">
                                {counter.maxCapacity ? `${counter.maxCapacity} người` : '-'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Trạng thái
                            </label>
                            <div className="bg-slate-50 rounded-lg px-4 py-2">
                                {getStatusBadge(counter.isActive)}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Nhân viên phụ trách
                            </label>
                            <p className="text-sm text-slate-900 bg-slate-50 rounded-lg px-4 py-2">
                                {counter.staffName || '-'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                ID Nhân viên
                            </label>
                            <p className="text-sm text-slate-500 bg-slate-50 rounded-lg px-4 py-2 font-mono">
                                {counter.staffId || '-'}
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Nhóm dịch vụ
                        </label>
                        {counter.serviceGroups?.$values && counter.serviceGroups.$values.length > 0 ? (
                            <div className="space-y-2">
                                {counter.serviceGroups.$values.map((sg) => (
                                    <div
                                        key={sg.id}
                                        className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex rounded bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800">
                                                {sg.groupName}
                                            </span>
                                            <span className="text-sm text-slate-600">
                                                {sg.currentLength} đang chờ
                                            </span>
                                        </div>
                                        {sg.status && (
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                    sg.status === 'Active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-slate-100 text-slate-800'
                                                }`}
                                            >
                                                {sg.status}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
                                <p className="text-sm text-slate-500">Không có nhóm dịch vụ</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <p className="text-sm text-slate-600">Không tìm thấy thông tin quầy</p>
                    </div>
                </div>
            )}
        </BaseModal>
    );
};

