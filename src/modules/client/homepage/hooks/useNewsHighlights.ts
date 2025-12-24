'use client';

import { useQuery } from '@tanstack/react-query';
import { homepageApi } from '../api';
import { getValuesPage } from '@/types/rest';
import type { PublicServiceNews } from '../types';

const NEWS_QUERY_KEY = 'homepage-news';

/**
 * Hook to fetch latest news for homepage
 */
export function useNewsHighlights(limit = 6) {
  return useQuery({
    queryKey: [NEWS_QUERY_KEY, limit],
    queryFn: async () => {
      const response = await homepageApi.getLatestNews(1, limit);
      const { items } = getValuesPage(response.data);
      return items as PublicServiceNews[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
