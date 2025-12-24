'use client';

import { useNewsHighlights } from '../../hooks';
import { NewsCard } from '../ui';
import { NewspaperIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { PublicServiceNews } from '../../types';

/**
 * News Highlights Section View Component
 * Displays latest public service news in a grid
 */
export function NewsHighlightsSectionView() {
  const { data: news = [], isLoading, error } = useNewsHighlights(6);

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <NewspaperIcon className="w-8 h-8 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              Tin tức dịch vụ công
            </h2>
          </div>
          <Link
            href="/tin-tuc"
            className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Xem tất cả
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* News Grid */}
        {news.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Chưa có tin tức nào
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item: PublicServiceNews) => (
              <NewsCard
                key={item.id}
                id={item.id}
                title={item.title}
                summary={item.summary || item.content?.substring(0, 150)}
                imageUrl={item.thumbnailUrl}
                publishedAt={item.createdAt as string}
                categoryName={item.newsCategoryName}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
