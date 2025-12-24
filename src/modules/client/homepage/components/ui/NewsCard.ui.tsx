'use client';

import Link from 'next/link';
import { CalendarIcon } from '@heroicons/react/24/outline';

interface NewsCardProps {
  id: string;
  title: string;
  summary?: string;
  imageUrl?: string;
  publishedAt?: string;
  categoryName?: string;
}

/**
 * News Card UI Component
 * Card for displaying news item preview
 */
export function NewsCard({
  id,
  title,
  summary,
  imageUrl,
  publishedAt,
  categoryName,
}: NewsCardProps) {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('vi-VN')
    : null;

  return (
    <Link
      href={`/tin-tuc/${id}`}
      className="block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      {imageUrl && (
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        {categoryName && (
          <span className="text-xs text-red-600 font-medium">{categoryName}</span>
        )}
        <h3 className="font-semibold text-gray-800 text-sm mt-1 line-clamp-2">
          {title}
        </h3>
        {summary && (
          <p className="text-gray-600 text-xs mt-2 line-clamp-2">{summary}</p>
        )}
        {formattedDate && (
          <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
            <CalendarIcon className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
