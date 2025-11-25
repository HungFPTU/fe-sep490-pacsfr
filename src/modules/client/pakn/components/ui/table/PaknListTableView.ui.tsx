'use client';

import type { PaknItem } from '../../../types/response';
import { PaknListTable } from './PaknListTable.ui';

interface PaknListTableViewProps {
    items: PaknItem[];
    isLoading: boolean;
}

export const PaknListTableView: React.FC<PaknListTableViewProps> = ({ items, isLoading }) => {
    if (isLoading) {
        return (
            <div className="rounded-lg border border-slate-200 bg-white py-10 text-center text-sm text-slate-500">
                Đang tải dữ liệu phản ánh...
            </div>
        );
    }

    if (!items || items.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 py-10 text-center text-sm text-slate-500">
                Chưa có phản ánh nào phù hợp với bộ lọc.
            </div>
        );
    }

    return <PaknListTable items={items} />;
};

