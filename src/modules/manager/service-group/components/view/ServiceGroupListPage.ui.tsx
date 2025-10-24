'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useServiceGroups, useDeleteServiceGroup } from '../../hooks';
import { CreateServiceGroupModal } from '../ui/modal/CreateServiceGroupModal.ui';
import { ServiceGroupDetailModal } from '../ui/detail/ServiceGroupDetailModal.ui';
import type { ServiceGroup } from '../../types';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValuesPage } from '@/types/rest';
import { formatDate } from '@/shared/lib/utils';

export const ServiceGroupListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<ServiceGroup | null>(null);

    const { data, isLoading, refetch } = useServiceGroups({
        keyword,
        isActive,
        page,
        size: 10,
    });

    const deleteMutation = useDeleteServiceGroup();
    const { addToast } = useGlobalToast();

    const handleCreate = () => {
        setSelectedGroup(null);
        setModalOpen(true);
    };

    const handleEdit = (group: ServiceGroup) => {
        setSelectedGroup(group);
        setModalOpen(true);
    };

    const handleViewDetail = (group: ServiceGroup) => {
        setSelectedGroup(group);
        setDetailModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc chắn muốn xóa nhóm dịch vụ này?')) {
            return;
        }

        try {
            await deleteMutation.mutateAsync(id);
            addToast({ message: 'Xóa nhóm dịch vụ thành công', type: 'success' });
            refetch();
        } catch (error) {
            console.error('Error deleting service group:', error);
            addToast({ message: 'Xóa nhóm dịch vụ thất bại', type: 'error' });
        }
    };

    const handleModalSuccess = () => {
        refetch();
    };

    const pageResult = data ? getValuesPage(data) : null;
    const serviceGroups = pageResult?.items || [];
    const totalPages = pageResult?.totalPages || 1;

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Quản lý Nhóm Dịch Vụ</h1>
                <button
                    onClick={handleCreate}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                    + Tạo nhóm mới
                </button>
            </div>

            {/* Filters */}
            <div className="mb-4 flex gap-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên hoặc mã..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
                <select
                    value={String(isActive)}
                    onChange={(e) => setIsActive(e.target.value === 'true')}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                >
                    <option value="true">Đang kích hoạt</option>
                    <option value="false">Ngừng kích hoạt</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow">
                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                Icon
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                Mã nhóm
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                Tên nhóm
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                Mô tả
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                Cập nhật
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {isLoading ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-sm text-slate-500">
                                    Đang tải...
                                </td>
                            </tr>
                        ) : serviceGroups.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-sm text-slate-500">
                                    Không có dữ liệu
                                </td>
                            </tr>
                        ) : (
                            serviceGroups.map((group: ServiceGroup) => (
                                <tr key={group.id} className="hover:bg-slate-50">
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="h-10 w-10 flex-shrink-0 relative overflow-hidden rounded-lg">
                                            {group.iconUrl ? (
                                                <Image
                                                    src={group.iconUrl}
                                                    alt={group.groupName}
                                                    width={40}
                                                    height={40}
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-lg bg-slate-200 flex items-center justify-center">
                                                    <span className="text-xs text-slate-500">No img</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                                        {group.groupCode}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-900">{group.groupName}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {group.description.length > 50
                                            ? `${group.description.substring(0, 50)}...`
                                            : group.description}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                                        <span
                                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${group.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {group.isActive ? 'Hoạt động' : 'Ngừng'}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                                        {group.modifiedAt ? (
                                            <div className="flex flex-col">
                                                <span>{formatDate(group.modifiedAt)}</span>
                                            </div>
                                        ) : group.createdAt ? (
                                            <div className="flex flex-col">
                                                <span>{formatDate(group.createdAt)}</span>
                                            </div>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleViewDetail(group)}
                                            className="mr-3 text-slate-600 hover:text-slate-900"
                                        >
                                            Xem
                                        </button>
                                        <button
                                            onClick={() => handleEdit(group)}
                                            className="mr-3 text-indigo-600 hover:text-indigo-900"
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(group.id)}
                                            className="text-red-600 hover:text-red-900"
                                            disabled={deleteMutation.isPending}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-center gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="rounded-lg border border-slate-300 px-3 py-1 text-sm disabled:opacity-50"
                    >
                        Trước
                    </button>
                    <span className="text-sm text-slate-600">
                        Trang {page} / {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="rounded-lg border border-slate-300 px-3 py-1 text-sm disabled:opacity-50"
                    >
                        Sau
                    </button>
                </div>
            )}

            {/* Create/Edit Modal */}
            <CreateServiceGroupModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                initData={selectedGroup}
                onSuccess={handleModalSuccess}
            />

            {/* Detail Modal */}
            <ServiceGroupDetailModal
                open={detailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                serviceGroup={selectedGroup}
            />
        </div>
    );
};

