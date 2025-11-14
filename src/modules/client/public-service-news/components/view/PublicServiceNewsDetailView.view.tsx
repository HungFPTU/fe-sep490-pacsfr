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
        <article className="space-y-8 rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
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

            <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>

            {data.thumbnailUrl && (
                <>
                    <div className="relative h-80 w-full overflow-hidden rounded-2xl">
                        <Image
                            src={data.thumbnailUrl}
                            alt={data.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 75vw"
                        />

                        <button
                            onClick={() => setFullImageOpen(true)}
                            className="absolute bottom-4 right-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-800 shadow hover:bg-white"
                        >
                            Xem ảnh đầy đủ
                        </button>
                    </div>

                    {fullImageOpen && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                            onClick={() => setFullImageOpen(false)}
                        >
                            <button
                                onClick={() => setFullImageOpen(false)}
                                className="absolute right-6 top-6 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow"
                            >
                                Đóng
                            </button>
                            <div
                                className="relative h-[80vh] w-full max-w-5xl"
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

            <p className="text-lg text-gray-700">{data.summary}</p>

            <div
                className="prose prose-red max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: data.content || '' }}
            />
        </article>
    );
};

