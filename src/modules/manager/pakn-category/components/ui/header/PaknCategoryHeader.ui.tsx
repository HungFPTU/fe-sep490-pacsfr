'use client';

import { Button } from '@/shared/components/ui/button.ui';
import { Plus } from 'lucide-react';

interface PaknCategoryHeaderProps {
    onCreate: () => void;
}

export const PaknCategoryHeader: React.FC<PaknCategoryHeaderProps> = ({ onCreate }) => {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Quản lý danh mục phản ánh kiến nghị</h1>
                <p className="text-sm text-slate-600">
                    Thêm, chỉnh sửa và quản lý danh mục phản ánh kiến nghị cho hệ thống.
                </p>
            </div>
            <Button onClick={onCreate} className="inline-flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Thêm danh mục
            </Button>
        </div>
    );
};

