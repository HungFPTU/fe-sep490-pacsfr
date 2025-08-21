export type QueueNumber = {
    id: string;
    number: string; // e.g., A012
    serviceType: string; // e.g., Birth Registration
    priority: boolean;
    requestedAt: string; // ISO date
    status: "waiting" | "serving" | "completed" | "skipped";
};

export type Counter = {
    id: string;
    name: string; // e.g., Counter 1
    serviceTypes: string[];
    current?: QueueNumber | null;
    startedServingAt?: string | null; // ISO date when current started
    nextNumber?: string | null; // next queued number (digits-only string like 013)
    isClosed?: boolean; // counter is closed
    staffName?: string | null; // staff currently serving (if any)
    staffAvatarUrl?: string | null; // staff avatar image URL
};

export type QueueOverview = {
    counters: Counter[];
    totals: {
        waiting: number;
        serving: number;
        completedToday: number;
    };
    updatedAt: string;
};

export type StaffQueueState = {
    counterId: string;
    current?: QueueNumber | null;
};


