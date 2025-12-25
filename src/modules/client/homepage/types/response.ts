/**
 * Homepage Module - Response Types
 * Clean separation following Interface Segregation Principle
 */

// ====================
// Re-exports from existing modules
// ====================
export type { Faq, FaqCategory } from '@/modules/client/faq';
export type { PublicServiceNews } from '@/modules/client/public-service-news';

// ====================
// Service Statistics
// ====================
export interface ServiceStatistic {
  serviceId: string;
  serviceName: string;
  totalCases: number;
  completedCases: number;
  inProgressCases: number;
  checkedCases: number;
  pendingCases: number;
  canceledCases: number;
  averageProcessingTime: number;
  completionRate: number;
}

// ====================
// Daily Statistics
// ====================
export interface DailyStatistic {
  date: string;
  totalCases: number;
  completedCases: number;
  pendingCases: number;
  inProgressCases: number;
  checkedCases: number;
  canceledCases: number;
  averageProcessingTime: number;
}

// ====================
// System Statistics
// ====================
export interface SystemStatistics {
  totalCases: number;
  pendingCases: number;
  inProgressCases: number;
  completedCases: number;
  checkedCases: number;
  canceledCases: number;
  averageProcessingTime: number;
  todayCases: number;
  thisWeekCases: number;
  thisMonthCases: number;
  serviceStatistics?: {
    $values: ServiceStatistic[];
  };
  dailyStatistics?: {
    $values: DailyStatistic[];
  };
}

// ====================
// Staff Performance
// ====================
export interface ServicePerformance {
  serviceId: string;
  serviceName: string;
  casesHandled: number;
  averageProcessingTime: number;
  averageRating: number;
}

export interface StaffPerformance {
  staffId: string;
  staffName: string;
  staffCode: string;
  totalCases: number;
  completedCases: number;
  pendingCases: number;
  inProgressCases: number;
  checkedCases: number;
  canceledCases: number;
  averageProcessingTime: number;
  completionRate: number;
  averageRating: number;
  totalFeedbacks: number;
  servicePerformance?: {
    $values: ServicePerformance[];
  };
}

// ====================
// Feedback Statistics
// ====================
export interface ServiceRating {
  serviceId: string;
  serviceName: string;
  averageRating: number;
  totalFeedbacks: number;
}

export interface FeedbackStatistics {
  totalFeedbacks: number;
  averageRating: number;
  rating1Count: number;
  rating2Count: number;
  rating3Count: number;
  rating4Count: number;
  rating5Count: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  serviceRatings?: {
    $values: ServiceRating[];
  };
}

// ====================
// Comprehensive Report (Main Response)
// ====================
export interface ComprehensiveReportData {
  systemStatistics?: SystemStatistics;
  staffPerformance?: {
    $values: StaffPerformance[];
  };
  feedbackStatistics?: FeedbackStatistics;
  serviceStatistics?: {
    $values: ServiceStatistic[];
  };
  generatedAt?: string;
  fromDate?: string;
  toDate?: string;
}
