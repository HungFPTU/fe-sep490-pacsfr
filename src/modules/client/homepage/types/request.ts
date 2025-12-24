/**
 * Homepage Module Types - Request Filters
 */

// Re-export from existing modules
export type { FaqFilters, FaqCategoryFilters } from '@/modules/client/faq';
export type { PublicServiceNewsFilters } from '@/modules/client/public-service-news';

// Statistics request filters
export interface DashboardFilters {
  month?: number;
  year?: number;
  startDate?: string;
  endDate?: string;
}
