'use client';

import { ManagerFilterBar } from '@/shared/components/manager/ui/filter/ManagerFilterBar.ui';
import { Select } from '@/shared/components/ui/select.ui';

export type StatusFilter = 'all' | 'active' | 'inactive';

interface PaknCategoryFilterBarProps {
    keyword: string;
    status: StatusFilter;
    onKeywordChange: (value: string) => void;
    onStatusChange: (status: StatusFilter) => void;
    onSubmit: () => void;
    onReset: () => void;
    isLoading?: boolean;
}

export const PaknCategoryFilterBar: React.FC<PaknCategoryFilterBarProps> = ({
    keyword,
    status,
    onKeywordChange,
    onStatusChange,
    onSubmit,
    onReset,
    isLoading,
}) => {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
            <ManagerFilterBar
                searchValue={keyword}
                onSearchChange={onKeywordChange}
                onSubmit={onSubmit}
                onReset={onReset}
                isSubmitting={Boolean(isLoading)}
                searchPlaceholder="Nhập tên danh mục..."
                searchButtonVariant="default"
                className="gap-y-3"
            >
                <div className="w-full sm:w-40">
                    <Select
                        value={status}
                        onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
                        options={[
                            { value: 'all', label: 'Tất cả trạng thái' },
                            { value: 'active', label: 'Đang hiển thị' },
                            { value: 'inactive', label: 'Đang ẩn' },
                        ]}
                    />
                </div>
            </ManagerFilterBar>
        </div>
    );
};

