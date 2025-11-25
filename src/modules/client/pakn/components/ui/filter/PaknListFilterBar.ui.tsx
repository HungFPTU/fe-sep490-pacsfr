"use client";

import { ManagerFilterBar } from '@/shared/components/manager/ui/filter/ManagerFilterBar.ui';
import { Select } from '@/shared/components/ui/select.ui';
import { PAKN_STATUS_OPTIONS } from '../../../constants';
import type { PaknCategoryOption } from '../../../types/response';

interface PaknListFilterBarProps {
    keyword: string;
    status: string;
    categoryId: string;
    onKeywordChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onSubmit: () => void;
    onReset: () => void;
    isLoading?: boolean;
    categories: PaknCategoryOption[];
}

export const PaknListFilterBar: React.FC<PaknListFilterBarProps> = ({
    keyword,
    status,
    categoryId,
    onKeywordChange,
    onStatusChange,
    onCategoryChange,
    onSubmit,
    onReset,
    isLoading,
    categories,
}) => {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
            <ManagerFilterBar
                searchValue={keyword}
                onSearchChange={onKeywordChange}
                onSubmit={onSubmit}
                onReset={onReset}
                isSubmitting={Boolean(isLoading)}
                searchPlaceholder="Nhập mã PAKN hoặc tiêu đề..."
                searchButtonVariant="default"
                className="gap-y-3"
            >
                <div className="w-full sm:w-40">
                    <Select
                        value={status}
                        onChange={(event) => onStatusChange(event.target.value)}
                        options={PAKN_STATUS_OPTIONS.map((option) => ({
                            value: option.value,
                            label: option.label,
                        }))}
                    />
                </div>
                <div className="w-full sm:w-56">
                    <Select
                        value={categoryId}
                        onChange={(event) => onCategoryChange(event.target.value)}
                        options={[
                            { value: '', label: 'Tất cả chủ đề' },
                            ...categories.map((category) => ({
                                value: category.id,
                                label: category.categoryName,
                            })),
                        ]}
                    />
                </div>
            </ManagerFilterBar>
        </div>
    );
};

