'use client';

import React from 'react';
import { formatDate } from '@/shared/lib/utils';
import { Badge } from '@/shared/components/ui/badge.ui';
import type { Faq } from '../../../types';

interface Props {
    faq: Faq;
}

export const FaqInfo: React.FC<Props> = ({ faq }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Service Name */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Dịch vụ
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{faq.serviceName || '-'}</p>
            </div>

            {/* Category Name */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Danh mục câu hỏi thường gặp
                </label>
                <p className="mt-1 text-sm text-muted-foreground">{faq.categoryName || '-'}</p>
            </div>

            {/* Question */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">
                    Câu hỏi
                </label>
                <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">{faq.question}</p>
            </div>

            {/* Answer */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground">
                    Câu trả lời
                </label>
                <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">{faq.answer}</p>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Trạng thái
                </label>
                <div className="mt-1">
                    <Badge variant={faq.isActive ? 'outline' : 'secondary'}>
                        {faq.isActive ? 'Hoạt động' : 'Ngừng'}
                    </Badge>
                </div>
            </div>

            {/* Created At */}
            <div>
                <label className="block text-sm font-medium text-foreground">
                    Ngày tạo
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                    {faq.createdAt ? formatDate(faq.createdAt) : '-'}
                </p>
            </div>

            {/* Modified At */}
            {faq.modifiedAt && (
                <div>
                    <label className="block text-sm font-medium text-foreground">
                        Cập nhật lần cuối
                    </label>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {formatDate(faq.modifiedAt)}
                    </p>
                </div>
            )}
        </div>
    );
};

