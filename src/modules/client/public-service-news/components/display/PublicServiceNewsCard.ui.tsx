'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import type { PublicServiceNews } from '../../types';

interface PublicServiceNewsCardProps {
    item: PublicServiceNews;
}

const formatDate = (value?: string | Date) => {
    if (!value) return '';
    return new Date(value).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

export const PublicServiceNewsCard: React.FC<PublicServiceNewsCardProps> = ({ item }) => {
    const formattedDate = formatDate(item.createdAt);

    return (
        <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            {item.thumbnailUrl && (
                <div className="relative h-56 w-full">
                    <Image
                        src={item.thumbnailUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            )}

            <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                        {item.newsCategoryName ?? 'Tin tức'}
                    </span>
                    {formattedDate && <time>{formattedDate}</time>}
                </div>

                <Link href={`/tin-tuc/${item.id}`}>
                    <h2 className="text-xl font-semibold text-gray-900 transition-colors hover:text-red-600">
                        {item.title}
                    </h2>
                </Link>

                <p className="flex-1 text-gray-600 line-clamp-3">{item.summary}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <Link
                        href={`/tin-tuc/${item.id}`}
                        className="font-semibold text-red-600 transition-colors hover:text-red-700"
                    >
                        Đọc thêm →
                    </Link>
                </div>
            </div>
        </article>
    );
};

