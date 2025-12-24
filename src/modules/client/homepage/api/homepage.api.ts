/**
 * Homepage Module - API Layer
 * Single Responsibility: HTTP calls only, no business logic
 */

import { httpNoLoading } from '@core/http/client';
import { API_PATH } from '@core/config/api.path';
import type { RestPaged, RestResponse } from '@/types/rest';
import type { 
  Faq, 
  FaqCategory, 
  PublicServiceNews,
  ComprehensiveReportData,
} from '../types';

// Generic dashboard response for untyped endpoints
interface GenericDashboardResponse {
  [key: string]: unknown;
}

export const homepageApi = {
  /**
   * Get FAQ list for homepage
   */
  getFaqs: (page = 1, size = 10) => {
    return httpNoLoading.get<RestPaged<Faq>>(
      API_PATH.CLIENT.FAQ.ALL('', '', '', true, page, size)
    );
  },

  /**
   * Get FAQ categories
   */
  getFaqCategories: (page = 1, size = 20) => {
    return httpNoLoading.get<RestPaged<FaqCategory>>(
      API_PATH.CLIENT.FAQ_CATEGORY.ALL('', true, page, size)
    );
  },

  /**
   * Get latest public service news
   */
  getLatestNews: (page = 1, size = 6) => {
    return httpNoLoading.get<RestPaged<PublicServiceNews>>(
      API_PATH.CLIENT.PUBLIC_SERVICE_NEWS.ALL('', '', '', true, page, size)
    );
  },

  /**
   * Get dashboard line chart data (case processing statistics)
   */
  getCaseProcessingStats: (month?: number, year?: number) => {
    return httpNoLoading.get<RestResponse<GenericDashboardResponse>>(
      API_PATH.MANAGER_DASHBOARD.GET_LINE_CHART(month, year)
    );
  },

  /**
   * Get service usage pie chart data
   */
  getServiceUsageStats: (startDate?: string, endDate?: string) => {
    return httpNoLoading.get<RestResponse<GenericDashboardResponse>>(
      API_PATH.MANAGER_DASHBOARD.GET_PIE_CHART(startDate, endDate)
    );
  },

  /**
   * Get comprehensive dashboard report
   */
  getComprehensiveReport: (fromDate?: string, toDate?: string) => {
    return httpNoLoading.get<RestResponse<ComprehensiveReportData>>(
      API_PATH.MANAGER_DASHBOARD.GET_COMPREHENSIVE_REPORT(fromDate, toDate)
    );
  },
};
