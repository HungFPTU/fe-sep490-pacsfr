'use client';

import React from 'react';
import type { PublicServiceNews } from '../../types';
import { PublicServiceNewsCard } from './PublicServiceNewsCard.ui';

interface PublicServiceNewsListProps {
    items: PublicServiceNews[];
    isLoading?: boolean;
}

export const PublicServiceNewsList: React.FC<PublicServiceNewsListProps> = ({ items, isLoading }) => {
    if (isLoading) {
        return (
            <div className="grid gap-6 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-64 animate-pulse rounded-2xl bg-gray-100" />
                ))}
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-500">
                Chưa có bài viết nào.
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {items.map((item) => (
                <PublicServiceNewsCard key={item.id} item={item} />
            ))}
        </div>
    );
};

