'use client';

import { Button } from '@/shared/components/ui/button.ui';

interface PaknCategoryPaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const PaknCategoryPagination: React.FC<PaknCategoryPaginationProps> = ({ page, totalPages, onPageChange }) => {
    if (totalPages <= 1) {
        return null;
    }

    const canPrev = page > 1;
    const canNext = page < totalPages;

    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
            <div className="text-sm text-slate-600">
                Trang <span className="font-semibold text-slate-900">{page}</span> / {totalPages}
            </div>
            <div className="flex items-center gap-2 justify-end">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(1)}
                    disabled={!canPrev}
                >
                    Đầu
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(page - 1)}
                    disabled={!canPrev}
                >
                    Trước
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(page + 1)}
                    disabled={!canNext}
                >
                    Sau
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(totalPages)}
                    disabled={!canNext}
                >
                    Cuối
                </Button>
            </div>
        </div>
    );
};

