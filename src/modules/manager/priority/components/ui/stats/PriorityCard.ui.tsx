'use client';

import React from 'react';
import { 
    ClockIcon, 
    DocumentTextIcon, 
    UserIcon,
    BanknotesIcon,
    FlagIcon,
    CheckBadgeIcon
} from '@heroicons/react/24/outline';
import type { PriorityCase } from '../../../types';

interface Props {
    priorityCase: PriorityCase;
    onClick?: (priorityCase: PriorityCase) => void;
}

const getPriorityColor = (priority: number) => {
    if (priority === 1) {
        return {
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-700',
            badge: 'bg-red-100 text-red-700',
            label: 'Ưu tiên',
        };
    }
    return {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        badge: 'bg-blue-100 text-blue-700',
        label: 'Bình thường',
    };
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Hoàn thành':
            return 'bg-green-100 text-green-700';
        case 'Đang xử lý':
            return 'bg-blue-100 text-blue-700';
        case 'Mới tiếp nhận':
            return 'bg-amber-100 text-amber-700';
        default:
            return 'bg-slate-100 text-slate-700';
    }
};

export const PriorityCard: React.FC<Props> = ({ priorityCase, onClick }) => {
    const colors = getPriorityColor(priorityCase.priorityLevel);
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('vi-VN') + 'đ';
    };
    
    return (
        <div
            onClick={() => onClick?.(priorityCase)}
            className={`group relative overflow-hidden rounded-lg border ${colors.border} ${colors.bg} p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${onClick ? 'cursor-pointer' : ''}`}
        >
            <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <FlagIcon className={`h-4 w-4 ${colors.text}`} />
                        <h3 className="text-sm font-bold text-slate-900">
                            {priorityCase.caseCode}
                        </h3>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">
                        {priorityCase.serviceName}
                    </p>
                </div>
                <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors.badge}`}
                >
                    {colors.label}
                </span>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <UserIcon className="h-4 w-4" />
                        <span>Khách hàng:</span>
                    </div>
                    <span className="text-xs font-medium text-slate-900">
                        {priorityCase.guestName}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <DocumentTextIcon className="h-4 w-4" />
                        <span>Nhân viên:</span>
                    </div>
                    <span className="text-xs font-medium text-slate-900">
                        {priorityCase.staffName}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <ClockIcon className="h-4 w-4" />
                        <span>Hoàn thành:</span>
                    </div>
                    <span className="text-xs font-medium text-slate-900">
                        {formatDate(priorityCase.estimatedCompletionDate)}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <BanknotesIcon className="h-4 w-4" />
                        <span>Phí:</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-slate-900">
                            {formatCurrency(priorityCase.totalFee)}
                        </span>
                        {priorityCase.isPayment && (
                            <CheckBadgeIcon className="h-4 w-4 text-green-600" />
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-3 border-t border-slate-200 pt-3">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">Trạng thái:</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(priorityCase.currentStatus)}`}>
                        {priorityCase.currentStatus}
                    </span>
                </div>
            </div>
        </div>
    );
};

