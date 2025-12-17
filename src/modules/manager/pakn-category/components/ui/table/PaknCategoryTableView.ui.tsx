'use client';

import type { PaknCategory } from '../../../types/response';
import { PaknCategoryTable } from './PaknCategoryTable.ui';

interface PaknCategoryTableViewProps {
    categories: PaknCategory[];
    isLoading: boolean;
    onEdit: (category: PaknCategory) => void;
    onDelete: (category: PaknCategory) => void;
}

export const PaknCategoryTableView: React.FC<PaknCategoryTableViewProps> = ({
    categories,
    isLoading,
    onEdit,
    onDelete,
}) => {
    if (isLoading) {
        return (
            <div className="py-10 text-center text-sm text-slate-500">
                Đang tải dữ liệu...
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="py-10 text-center text-sm text-slate-500">
                Chưa có danh mục nào.
            </div>
        );
    }

    return (
        <PaknCategoryTable
            categories={categories}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    );
};

