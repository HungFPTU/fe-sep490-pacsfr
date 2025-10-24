'use client';

import React from 'react';
import { BaseModal } from '@/shared/components/manager/modal/BaseModal';
import { formatDate } from '@/shared/lib/utils';
import type { ServiceGroup } from '../../../types';
import Image from 'next/image';

interface Props {
    open: boolean;
    onClose: () => void;
    serviceGroup: ServiceGroup | null;
}

export const ServiceGroupDetailModal: React.FC<Props> = ({
    open,
    onClose,
    serviceGroup,
}) => {
    if (!serviceGroup) return null;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={`Chi tiết nhóm dịch vụ: ${serviceGroup.groupName}`}
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
                {/* Icon */}
                <div className="flex items-center gap-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200">
                        {serviceGroup.iconUrl ? (
                            <div className="relative h-full w-full">
                                <Image
                                    src={serviceGroup.iconUrl}
                                    alt={serviceGroup.groupName}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-slate-100">
                                <span className="text-sm text-slate-500">No image</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            {serviceGroup.groupName}
                        </h3>
                        <p className="text-sm text-slate-500">Mã: {serviceGroup.groupCode}</p>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Group Code */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Mã nhóm
                        </label>
                        <p className="mt-1 text-sm text-slate-900">{serviceGroup.groupCode}</p>
                    </div>

                    {/* Group Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Tên nhóm
                        </label>
                        <p className="mt-1 text-sm text-slate-900">{serviceGroup.groupName}</p>
                    </div>

                    {/* Display Order */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Thứ tự hiển thị
                        </label>
                        <p className="mt-1 text-sm text-slate-900">{serviceGroup.displayOrder}</p>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Trạng thái
                        </label>
                        <span
                            className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${serviceGroup.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                                }`}
                        >
                            {serviceGroup.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}
                        </span>
                    </div>

                    {/* Created At */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Ngày tạo
                        </label>
                        <p className="mt-1 text-sm text-slate-900">
                            {formatDate(serviceGroup.createdAt)}
                        </p>
                    </div>

                    {/* Modified At */}
                    {serviceGroup.modifiedAt && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Cập nhật lần cuối
                            </label>
                            <p className="mt-1 text-sm text-slate-900">
                                {formatDate(serviceGroup.modifiedAt)}
                            </p>
                        </div>
                    )}

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700">
                            Mô tả
                        </label>
                        <p className="mt-1 text-sm text-slate-900">{serviceGroup.description}</p>
                    </div>
                </div>
            </div>
        </BaseModal>
    );
};

