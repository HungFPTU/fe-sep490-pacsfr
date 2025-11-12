'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSubmissionMethods } from '@/modules/manager/submission-method/hooks';
import { useAssignSubmissionMethods } from '../../../hooks';
import { useGlobalToast } from '@/core/patterns/SingletonHook';
import { Button } from '@/shared/components/ui/button.ui';
import { Input } from '@/shared/components/ui/input.ui';
import { Loader2, Search, CheckCircle2, Circle, DollarSign, Clock } from 'lucide-react';
import { getValuesPage } from '@/types/rest';
import { cn } from '@/shared/lib/utils';
import type { SubmissionMethod } from '@/modules/manager/submission-method/types';

interface Props {
    serviceId: string;
    assignedMethodIds?: string[]; // Optional: IDs of already assigned methods
}

/**
 * ServiceSubmissionMethods - Component for assigning submission methods to a service
 * 
 * Features:
 * - Display all available submission methods
 * - Check/uncheck methods to assign/unassign
 * - Save changes via API
 * 
 * @component
 */
export const ServiceSubmissionMethods: React.FC<Props> = ({
    serviceId,
    assignedMethodIds = [],
}) => {
    const { addToast } = useGlobalToast();
    const [selectedIds, setSelectedIds] = useState<string[]>(assignedMethodIds);
    const [hasChanges, setHasChanges] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [debouncedKeyword, setDebouncedKeyword] = useState('');

    // Debounce search keyword to avoid too many API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedKeyword(searchKeyword);
        }, 300); // 300ms delay

        return () => clearTimeout(timer);
    }, [searchKeyword]);

    // Fetch submission methods with keyword from API
    const { data: submissionMethodsData, isLoading: isLoadingMethods } = useSubmissionMethods({
        keyword: debouncedKeyword,
        isActive: true,
        page: 1,
        size: 1000, // Get all active methods
    });

    const assignMutation = useAssignSubmissionMethods();

    // Get items from paginated response using getValuesPage utility
    const pageResult = submissionMethodsData ? getValuesPage(submissionMethodsData) : null;
    const submissionMethods = pageResult?.items || [];

    // Update selectedIds when assignedMethodIds changes
    useEffect(() => {
        setSelectedIds(assignedMethodIds);
        setHasChanges(false);
    }, [assignedMethodIds]);

    const handleToggleMethod = (methodId: string) => {
        setSelectedIds((prev) => {
            const newIds = prev.includes(methodId)
                ? prev.filter((id) => id !== methodId)
                : [...prev, methodId];

            // Check if there are changes
            const originalIds = new Set(assignedMethodIds);
            const newIdsSet = new Set(newIds);
            const hasChanged =
                originalIds.size !== newIdsSet.size ||
                ![...originalIds].every((id) => newIdsSet.has(id));

            setHasChanges(hasChanged);
            return newIds;
        });
    };

    const handleSave = async () => {
        try {
            await assignMutation.mutateAsync({
                serviceId,
                submissionMethodIds: selectedIds,
            });

            addToast({
                message: 'Gán phương thức nộp hồ sơ thành công',
                type: 'success',
            });

            setHasChanges(false);
        } catch (error) {
            console.error('Assign submission methods error:', error);
            addToast({
                message: error instanceof Error ? error.message : 'Gán phương thức nộp hồ sơ thất bại',
                type: 'error',
            });
        }
    };

    if (isLoadingMethods) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            </div>
        );
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-base font-semibold text-slate-900">
                        Phương thức nộp hồ sơ
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                        Chọn các phương thức nộp hồ sơ cho dịch vụ này
                    </p>
                </div>
                {hasChanges && (
                    <Button
                        onClick={handleSave}
                        disabled={assignMutation.isPending}
                        size="sm"
                        className="ml-4"
                    >
                        {assignMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang lưu...
                            </>
                        ) : (
                            'Lưu thay đổi'
                        )}
                    </Button>
                )}
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <Input
                    type="text"
                    placeholder="Tìm kiếm phương thức nộp hồ sơ..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Selected Count Badge */}
            {selectedIds.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        Đã chọn: {selectedIds.length} / {submissionMethods.length}
                    </span>
                </div>
            )}

            {/* Methods List */}
            {submissionMethods.length === 0 && !isLoadingMethods ? (
                <div className="text-center py-12 text-sm text-slate-500 bg-slate-50 rounded-lg border border-slate-200">
                    {debouncedKeyword ? (
                        <>
                            <Search className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                            <p>Không tìm thấy phương thức nào phù hợp với từ khóa "{debouncedKeyword}"</p>
                        </>
                    ) : (
                        <>
                            <Circle className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                            <p>Không có phương thức nộp hồ sơ nào</p>
                        </>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                    {submissionMethods.map((method: SubmissionMethod) => {
                        const isSelected = selectedIds.includes(method.id);
                        return (
                            <label
                                key={method.id}
                                className={cn(
                                    "relative flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                                    isSelected
                                        ? "border-indigo-500 bg-indigo-50 shadow-sm"
                                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                                )}
                            >
                                <div className="shrink-0 mt-0.5">
                                    {isSelected ? (
                                        <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                                    ) : (
                                        <Circle className="h-5 w-5 text-slate-400" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <h4 className="text-sm font-semibold text-slate-900">
                                            {method.submissionMethodName}
                                        </h4>
                                    </div>
                                    {method.description && (
                                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                                            {method.description}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-4 mt-3 text-xs">
                                        {method.fee !== undefined && (
                                            <div className="flex items-center gap-1 text-slate-600">
                                                <DollarSign className="h-3.5 w-3.5" />
                                                <span className="font-medium">
                                                    {method.fee === 0 ? 'Miễn phí' : formatCurrency(method.fee)}
                                                </span>
                                            </div>
                                        )}
                                        {method.processingTime && (
                                            <div className="flex items-center gap-1 text-slate-600">
                                                <Clock className="h-3.5 w-3.5" />
                                                <span>Xử lý: {new Date(method.processingTime).toLocaleDateString('vi-VN')}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleToggleMethod(method.id)}
                                    className="sr-only"
                                />
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

