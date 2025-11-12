import type { RestResponse } from '@/types/rest';

export type ServiceStatistic = {
    serviceId: string;
    serviceName: string;
    totalCases: number;
    completedCases: number;
    averageProcessingTime: number;
    completionRate: number;
};

export type DailyStatistic = {
    date: string;
    totalCases: number;
    completedCases: number;
};

export type ServicePerformanceDetail = {
    serviceId: string;
    serviceName: string;
    casesHandled: number;
    averageProcessingTime: number;
    averageRating: number;
};

export type StaffPerformance = {
    staffId: string;
    staffName: string;
    staffCode: string;
    totalCases: number;
    completedCases: number;
    pendingCases: number;
    averageProcessingTime: number;
    completionRate: number;
    averageRating: number;
    totalFeedbacks: number;
    servicePerformance: ServicePerformanceDetail[];
};

export type ServiceRating = {
    serviceId: string;
    serviceName: string;
    totalRatings: number;
    averageRating: number;
};

export type FeedbackStatistics = {
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
    serviceRatings: ServiceRating[];
};

export type SystemStatistics = {
    totalCases: number;
    pendingCases: number;
    inProgressCases: number;
    completedCases: number;
    rejectedCases: number;
    averageProcessingTime: number;
    todayCases: number;
    thisWeekCases: number;
    thisMonthCases: number;
    serviceStatistics: ServiceStatistic[];
    dailyStatistics: DailyStatistic[];
};

export type ComprehensiveReport = {
    systemStatistics: SystemStatistics;
    staffPerformance: StaffPerformance[];
    feedbackStatistics: FeedbackStatistics;
    serviceStatistics: ServiceStatistic[];
    generatedAt: string;
    fromDate: string;
    toDate: string;
};

export type DashboardFilters = {
    fromDate?: string;
    toDate?: string;
};

export type LineChartDataPoint = {
    day: number;
    date: string;
    caseCount: number;
    completedCount: number;
    processingCount: number;
};

export type LineChartData = {
    dataPoints: LineChartDataPoint[];
    totalCases: number;
    month: number;
    year: number;
};

export type LineChartResponse = RestResponse<LineChartData>;

export type PieChartDataPoint = {
    serviceId: string;
    serviceName: string;
    serviceCode: string;
    usageCount: number;
    usagePercentage: number;
    serviceGroupName: string;
};

export type PieChartData = {
    serviceData: PieChartDataPoint[];
    totalUsage: number;
    startDate: string;
    endDate: string;
};

export type PieChartResponse = RestResponse<PieChartData>;

export type BarChartDataPoint = {
    hour: number;
    hourLabel: string;
    ticketCount: number;
    percentage: number;
};

export type BarChartData = {
    hourlyData: BarChartDataPoint[];
    totalTickets: number;
    peakHour: number;
    peakHourTicketCount: number;
    startDate: string;
    endDate: string;
};

export type BarChartResponse = RestResponse<BarChartData>;

export type ChartFilters = {
    month?: number;
    year?: number;
    startDate?: string;
    endDate?: string;
};

