'use client';

import { Badge } from '@/shared/components/ui/badge.ui';

interface PaknCategoryStatusBadgeProps {
    isActive: boolean;
}

export const PaknCategoryStatusBadge: React.FC<PaknCategoryStatusBadgeProps> = ({ isActive }) => {
    return (
        <Badge className={isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}>
            {isActive ? 'Đang hiển thị' : 'Đang ẩn'}
        </Badge>
    );
};

