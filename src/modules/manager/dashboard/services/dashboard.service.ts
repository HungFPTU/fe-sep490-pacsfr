import { dashboardApi } from '../api/dashboard.api';
import type { 
    ComprehensiveReport, 
    DashboardFilters, 
    LineChartData,
    PieChartData,
    BarChartData
} from '../types';

const parseArray = (data: { $values?: unknown[] } | unknown[] | undefined) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === 'object' && '$values' in data) {
        return (data as { $values?: unknown[] }).$values || [];
    }
    return [];
};

export const dashboardService = {
    async getComprehensiveReport(filters?: DashboardFilters): Promise<ComprehensiveReport | null> {
        const response = await dashboardApi.getComprehensiveReport(filters);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }
        
        const rawData = response.data.data as Record<string, unknown>;
        const systemStats = rawData.systemStatistics as Record<string, unknown>;
        const feedbackStats = rawData.feedbackStatistics as Record<string, unknown>;
        
        const parsedData: ComprehensiveReport = {
            systemStatistics: {
                totalCases: (systemStats?.totalCases as number) || 0,
                pendingCases: (systemStats?.pendingCases as number) || 0,
                inProgressCases: (systemStats?.inProgressCases as number) || 0,
                completedCases: (systemStats?.completedCases as number) || 0,
                rejectedCases: (systemStats?.rejectedCases as number) || 0,
                averageProcessingTime: (systemStats?.averageProcessingTime as number) || 0,
                todayCases: (systemStats?.todayCases as number) || 0,
                thisWeekCases: (systemStats?.thisWeekCases as number) || 0,
                thisMonthCases: (systemStats?.thisMonthCases as number) || 0,
                serviceStatistics: parseArray(systemStats?.serviceStatistics as never) as never,
                dailyStatistics: parseArray(systemStats?.dailyStatistics as never) as never,
            },
            staffPerformance: parseArray(rawData.staffPerformance as never).map((staff: unknown) => {
                const staffData = staff as Record<string, unknown>;
                return {
                    ...staffData,
                    servicePerformance: parseArray(staffData.servicePerformance as never),
                };
            }) as never,
            feedbackStatistics: {
                totalFeedbacks: (feedbackStats?.totalFeedbacks as number) || 0,
                averageRating: (feedbackStats?.averageRating as number) || 0,
                rating1Count: (feedbackStats?.rating1Count as number) || 0,
                rating2Count: (feedbackStats?.rating2Count as number) || 0,
                rating3Count: (feedbackStats?.rating3Count as number) || 0,
                rating4Count: (feedbackStats?.rating4Count as number) || 0,
                rating5Count: (feedbackStats?.rating5Count as number) || 0,
                pendingCount: (feedbackStats?.pendingCount as number) || 0,
                approvedCount: (feedbackStats?.approvedCount as number) || 0,
                rejectedCount: (feedbackStats?.rejectedCount as number) || 0,
                serviceRatings: parseArray(feedbackStats?.serviceRatings as never) as never,
            },
            serviceStatistics: parseArray(rawData.serviceStatistics as never) as never,
            generatedAt: (rawData.generatedAt as string) || '',
            fromDate: (rawData.fromDate as string) || '',
            toDate: (rawData.toDate as string) || '',
        };
        
        return parsedData;
    },

    async getLineChart(filters?: { month?: number; year?: number }): Promise<LineChartData | null> {
        const response = await dashboardApi.getLineChart(filters);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }

        const rawData = response.data.data as Record<string, unknown>;
        const dataPoints = rawData.dataPoints as Record<string, unknown>;

        const parsedData: LineChartData = {
            dataPoints: parseArray(dataPoints as never) as never,
            totalCases: (rawData.totalCases as number) || 0,
            month: (rawData.month as number) || 0,
            year: (rawData.year as number) || 0,
        };

        return parsedData;
    },

    async getPieChart(filters?: { startDate?: string; endDate?: string }): Promise<PieChartData | null> {
        const response = await dashboardApi.getPieChart(filters);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }

        const rawData = response.data.data as Record<string, unknown>;
        const serviceData = rawData.serviceData as Record<string, unknown>;

        const parsedData: PieChartData = {
            serviceData: parseArray(serviceData as never) as never,
            totalUsage: (rawData.totalUsage as number) || 0,
            startDate: (rawData.startDate as string) || '',
            endDate: (rawData.endDate as string) || '',
        };

        return parsedData;
    },

    async getBarChart(filters?: { startDate?: string; endDate?: string }): Promise<BarChartData | null> {
        const response = await dashboardApi.getBarChart(filters);
        if (!response.data?.success || !response.data?.data) {
            return null;
        }

        const rawData = response.data.data as Record<string, unknown>;
        const hourlyData = rawData.hourlyData as Record<string, unknown>;

        const parsedData: BarChartData = {
            hourlyData: parseArray(hourlyData as never) as never,
            totalTickets: (rawData.totalTickets as number) || 0,
            peakHour: (rawData.peakHour as number) || 0,
            peakHourTicketCount: (rawData.peakHourTicketCount as number) || 0,
            startDate: (rawData.startDate as string) || '',
            endDate: (rawData.endDate as string) || '',
        };

        return parsedData;
    },
};

