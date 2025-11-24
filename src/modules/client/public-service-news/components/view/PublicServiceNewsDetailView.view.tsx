'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePublicServiceNewsDetail } from '../../hooks';

interface PublicServiceNewsDetailViewProps {
    newsId: string;
}

const formatDate = (value?: string | Date) => {
    if (!value) return '';
    return new Date(value).toLocaleDateString('vi-VN', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

export const PublicServiceNewsDetailView: React.FC<PublicServiceNewsDetailViewProps> = ({ newsId }) => {
    const { data, isLoading } = usePublicServiceNewsDetail(newsId);
    const [fullImageOpen, setFullImageOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="h-10 w-1/3 animate-pulse rounded bg-gray-100" />
                <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />
                <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="h-4 animate-pulse rounded bg-gray-100" />
                    ))}
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
                Không tìm thấy bài viết.
            </div>
        );
    }

    return (
        <article className="space-y-4 sm:space-y-8 rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
                <Link href="/tin-tuc" className="font-semibold text-red-600 hover:text-red-700">
                    Tin tức
                </Link>
                <span>•</span>
                <span>{data.newsCategoryName || 'Tin tức dịch vụ công'}</span>
                {data.createdAt && (
                    <>
                        <span>•</span>
                        <time>{formatDate(data.createdAt)}</time>
                    </>
                )}
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{data.title}</h1>

            {data.thumbnailUrl && (
                <>
                    <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden rounded-xl sm:rounded-2xl">
                        <Image
                            src={data.thumbnailUrl}
                            alt={data.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 75vw"
                        />

                        <button
                            onClick={() => setFullImageOpen(true)}
                            className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 rounded-full bg-white/90 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-800 shadow hover:bg-white"
                        >
                            <span className="hidden sm:inline">Xem ảnh đầy đủ</span>
                            <span className="sm:hidden">Xem ảnh</span>
                        </button>
                    </div>

                    {fullImageOpen && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4"
                            onClick={() => setFullImageOpen(false)}
                        >
                            <button
                                onClick={() => setFullImageOpen(false)}
                                className="absolute right-2 sm:right-6 top-2 sm:top-6 rounded-full bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-800 shadow"
                            >
                                Đóng
                            </button>
                            <div
                                className="relative h-[70vh] sm:h-[80vh] w-full max-w-5xl"
                                onClick={(event) => event.stopPropagation()}
                            >
                                <Image
                                    src={data.thumbnailUrl}
                                    alt={data.title}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                />
                            </div>
                        </div>
                    )}
                </>
            )}

            <p className="text-base sm:text-lg text-gray-700">{data.summary}</p>

            <div
                className="prose prose-sm sm:prose-base prose-red max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: data.content || '' }}
            />
        </article>
    );
};

