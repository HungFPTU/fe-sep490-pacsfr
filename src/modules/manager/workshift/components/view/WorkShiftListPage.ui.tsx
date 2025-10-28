'use client';

import React, { useState } from 'react';
import { useWorkShifts, useDeleteWorkShift } from '../../hooks';
import { WorkShiftHeader } from '../ui/header/WorkShiftHeader.ui';
import { WorkShiftFilter } from '../ui/filter/WorkShiftFilter.ui';
import { WorkShiftPagination } from '../ui/pagination/WorkShiftPagination.ui';
import { useGlobalToast } from '@core/patterns/SingletonHook';
import { getValuesPage, RestPaged } from '@/types/rest';
import type { WorkShift } from '../../types';

export const WorkShiftListPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [isActive, setIsActive] = useState<boolean>(true);

    const { data, refetch, isLoading } = useWorkShifts({
        keyword,
        isActive,
        page,
        size: pageSize,
    });

    const deleteMutation = useDeleteWorkShift();
    const { addToast } = useGlobalToast();

    const handleCreate = () => {
        addToast({ message: 'Tính năng tạo mới đang phát triển', type: 'info' });
    };

    const handleEdit = () => {
        addToast({ message: 'Tính năng chỉnh sửa đang phát triển', type: 'info' });
    };

    const handleDelete = (id: string) => {
        if (confirm('Bạn có chắc chắn muốn xóa ca làm việc này?')) {
            deleteMutation.mutate(id, {
                onSuccess: () => {
                    addToast({ message: 'Xóa ca làm việc thành công', type: 'success' });
                    refetch();
                },
                onError: () => {
                    addToast({ message: 'Xóa ca làm việc thất bại', type: 'error' });
                },
            });
        }
    };

    const pageResult = data ? getValuesPage(data as RestPaged<WorkShift>) : null;
    const workShifts = pageResult?.items || [];
    const total = pageResult?.total || 0;
    const totalPages = pageResult?.totalPages || 1;

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setPage(1);
    };

    return (
        <div className="p-6">
            <WorkShiftHeader onCreateClick={handleCreate} />

            <WorkShiftFilter
                keyword={keyword}
                onKeywordChange={setKeyword}
                isActive={isActive}
                onStatusChange={setIsActive}
            />

            {/* Data Table */}
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow mb-4">
                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                Tên ca
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                Giờ bắt đầu
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                Giờ kết thúc
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-slate-500">
                                    Đang tải...
                                </td>
                            </tr>
                        ) : workShifts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-slate-500">
                                    Không có dữ liệu
                                </td>
                            </tr>
                        ) : (
                            workShifts.map((ws) => (
                                <tr key={ws.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{ws.shiftType}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{ws.startTime}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{ws.endTime}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                            ws.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {ws.shiftType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={handleEdit}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="Chỉnh sửa"
                                            >
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(ws.id)}
                                                disabled={deleteMutation.isPending}
                                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                title="Xóa"
                                            >
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12. deutlichA2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {total > 0 && (
                <WorkShiftPagination
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}
        </div>
    );
};
