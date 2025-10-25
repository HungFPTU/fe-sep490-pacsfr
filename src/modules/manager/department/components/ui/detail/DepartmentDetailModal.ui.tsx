'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/layout/manager/modal/BaseModal';
import { DepartmentInfo } from './DepartmentInfo.ui';
import type { Department } from '../../../types';

interface Props {
    open: boolean;
    onClose: () => void;
    department: Department | null;
}

export const DepartmentDetailModal: React.FC<Props> = ({
    open,
    onClose,
    department,
}) => {
    if (!department) return null;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết phòng ban: ${department.name}`}
            onOk={onClose}
            okText="Đóng"
            centered
            size="large"
            footer={
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                    Đóng
                </button>
            }
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                        <svg
                            className="h-8 w-8 text-indigo-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            {department.name}
                        </h3>
                        <p className="text-sm text-slate-500">Mã: {department.code}</p>
                    </div>
                </div>
                <DepartmentInfo department={department} />
            </div>
        </BaseModal>
    );
};

