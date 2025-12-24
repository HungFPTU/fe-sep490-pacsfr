'use client';

import { useQuery } from '@tanstack/react-query';
import { homepageApi } from '../api';

const STATS_QUERY_KEY = 'homepage-statistics';

/**
 * Hook to fetch dashboard statistics for homepage
 */
export function useStatistics(year?: number) {
  const currentYear = year ?? new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  return useQuery({
    queryKey: [STATS_QUERY_KEY, currentYear],
    queryFn: async () => {
      try {
        // Get comprehensive report for the year
        const startDate = `${currentYear}-01-01`;
        const endDate = `${currentYear}-12-31`;
        
        const response = await homepageApi.getComprehensiveReport(startDate, endDate);
        return response.data?.data ?? null;
      } catch (error) {
        console.warn('Failed to fetch statistics:', error);
        return null;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
}

/**
 * Hook to fetch case processing line chart data
 */
export function useCaseProcessingStats(month?: number, year?: number) {
  const currentYear = year ?? new Date().getFullYear();
  const currentMonth = month ?? new Date().getMonth() + 1;

  return useQuery({
    queryKey: [STATS_QUERY_KEY, 'line-chart', currentMonth, currentYear],
    queryFn: async () => {
      try {
        const response = await homepageApi.getCaseProcessingStats(currentMonth, currentYear);
        return response.data?.data ?? null;
      } catch (error) {
        console.warn('Failed to fetch case processing stats:', error);
        return null;
      }
    },
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}
