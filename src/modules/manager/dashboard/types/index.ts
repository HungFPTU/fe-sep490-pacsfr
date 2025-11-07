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

