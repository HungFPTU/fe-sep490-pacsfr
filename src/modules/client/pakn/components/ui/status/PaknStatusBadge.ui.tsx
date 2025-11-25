"use client";

import { Badge } from '@/shared/components/ui/badge.ui';
import { cn } from '@/shared/lib/utils';

const STATUS_COLOR_MAP: Record<string, string> = {
    Pending: 'bg-amber-100 text-amber-700',
    Processing: 'bg-blue-100 text-blue-700',
    Resolved: 'bg-emerald-100 text-emerald-700',
    Closed: 'bg-slate-200 text-slate-600',
};

interface PaknStatusBadgeProps {
    status: string;
}

export const PaknStatusBadge: React.FC<PaknStatusBadgeProps> = ({ status }) => {
    const normalized = status || 'Không xác định';
    const colorClass = STATUS_COLOR_MAP[status] ?? 'bg-slate-200 text-slate-600';

    return (
        <Badge className={cn('px-3 py-1 text-xs font-medium', colorClass)}>
            {normalized}
        </Badge>
    );
};

