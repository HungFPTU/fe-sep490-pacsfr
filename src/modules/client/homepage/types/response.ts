/**
 * Homepage Module Types - Response DTOs
 */

// Re-export from existing modules
export type { Faq, FaqCategory } from '@/modules/client/faq';
export type { PublicServiceNews } from '@/modules/client/public-service-news';

// Statistics types for Dashboard
export interface MonthlyStatistic {
  month: string;
  year: number;
  totalSubmitted: number;
  totalResolved: number;
  onTimeCount: number;
  onTimeRate: number;
}

export interface OverallStatistic {
  year: number;
  totalSubmitted: number;
  totalResolved: number;
  onTimeCount: number;
  onTimeRate: number;
}

export interface DashboardStatistics {
  overall: OverallStatistic;
  monthly: MonthlyStatistic[];
}

// Service usage pie chart
export interface ServiceUsageItem {
  serviceId: string;
  serviceName: string;
  count: number;
  percentage: number;
}

// Queue by hour bar chart
export interface QueueByHourItem {
  hour: number;
  count: number;
}
