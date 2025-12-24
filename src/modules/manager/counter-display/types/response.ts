/**
 * Response Types for Counter Display API
 * Following Single Responsibility Principle - only response structures
 */

/**
 * Waiting ticket in a service group queue
 */
export type WaitingTicket = {
    ticketNumber: string;
    queuePosition: number;
    estimatedWaitTimeMinutes: number;
    createdAt: string;
};

/**
 * Service group overview with queue statistics
 */
export type ServiceGroupOverview = {
    serviceGroupId: string;
    serviceGroupName: string;
    serviceGroupCode: string;
    totalTickets: number;
    totalWaiting: number;
    totalProcessing: number;
    totalCompleted: number;
    averageServiceTimeMinutes: number;
    estimatedWaitTimeMinutes: number;
    estimatedTimeToLastTicket: number;
    activeCounters: {
        $id?: string;
        $values: string[];
    };
    waitingTickets: {
        $id?: string;
        $values: WaitingTicket[];
    };
};

/**
 * Work shift overview response from API
 */
export type WorkShiftOverview = {
    workShiftId: string;
    shiftDate: string;
    shiftStartTime: string;
    shiftEndTime: string;
    shiftType: string;
    totalTicketsToday: number;
    totalWaitingToday: number;
    totalProcessingToday: number;
    totalCompletedToday: number;
    serviceGroups: {
        $id?: string;
        $values: ServiceGroupOverview[];
    };
};

/**
 * API Response wrapper
 */
export type WorkShiftOverviewResponse = {
    $id?: string;
    success: boolean;
    message: string;
    data: WorkShiftOverview;
    timestamp: string;
};
