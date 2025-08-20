import type { Counter, QueueOverview, StaffQueueState } from "@modules/queue/types";
import { queueApi } from "@modules/queue/api/queue.api";

function getElapsedMinutes(startedAt?: string | null): number {
    if (!startedAt) return 0;
    const started = new Date(startedAt).getTime();
    if (Number.isNaN(started)) return 0;
    const diffMs = Date.now() - started;
    return Math.max(0, Math.floor(diffMs / 60000));
}

// Simple mock data used as a fallback if API is unavailable
function createMockOverview(): QueueOverview {
    const nowIso = new Date().toISOString();
    const counters: Counter[] = Array.from({ length: 6 }, (_, i) => i + 1).map((idx) => {
        const isClosed = idx === 4; // minh hoạ: Quầy 4 đóng
        const serving = !isClosed && idx % 2 === 1; // quầy lẻ phục vụ, quầy chẵn chờ, trừ quầy đóng
        return {
            id: String(idx),
            name: `Quầy ${idx}`,
            serviceTypes: ["Dịch vụ chung"],
            current: isClosed
                ? null
                : {
                      id: `mock-${idx}`,
                      number: `${10 + idx}`.padStart(3, "0"),
                      serviceType: "Dịch vụ chung",
                      priority: idx === 1,
                      requestedAt: nowIso,
                      status: serving ? "serving" : "waiting",
                  },
            startedServingAt: serving ? new Date(Date.now() - idx * 7 * 60000).toISOString() : null,
            nextNumber: isClosed ? null : `${13 + idx}`.padStart(3, "0"),
            isClosed,
            staffName: isClosed ? null : serving ? `Nhân viên ${idx}` : `Nhân viên ${idx}`,
            staffAvatarUrl: isClosed ? null : "/assets/kaka.jpg",
        };
    });
    return {
        counters,
        totals: {
            waiting: 12,
            serving: counters.length,
            completedToday: 48,
        },
        updatedAt: nowIso,
    };
}

export const queueService = {
    getElapsedMinutes,
    getElapsedSeconds(startedAt?: string | null): number {
        if (!startedAt) return 0;
        const started = new Date(startedAt).getTime();
        if (Number.isNaN(started)) return 0;
        const diffMs = Date.now() - started;
        return Math.max(0, Math.floor(diffMs / 1000));
    },
    async getOverview(): Promise<QueueOverview> {
        try {
            const res = await queueApi.getOverview();
            return res.data;
        } catch {
            return createMockOverview();
        }
    },
    async getCounters(): Promise<Counter[]> {
        try {
            const res = await queueApi.getCounters();
            return res.data;
        } catch {
            return createMockOverview().counters;
        }
    },
    async getStaffState(counterId: string): Promise<StaffQueueState> {
        try {
            const res = await queueApi.getStaffCurrent(counterId);
            return res.data;
        } catch {
            const overview = createMockOverview();
            const counter = overview.counters.find((c) => c.id === counterId) || overview.counters[0];
            return { counterId: counter.id, current: counter.current };
        }
    },
    async callNext(counterId: string): Promise<StaffQueueState> {
        try {
            const res = await queueApi.next(counterId);
            return res.data;
        } catch {
            // Mock: increment the number
            const currentNumber = Math.floor(Math.random() * 999) + 1;
            return {
                counterId,
                current: {
                    id: `mock-${counterId}-${currentNumber}`,
                    number: String(currentNumber).padStart(3, "0"),
                    serviceType: "Dịch vụ chung",
                    priority: Math.random() < 0.2,
                    requestedAt: new Date().toISOString(),
                    status: "waiting",
                },
            };
        }
    },
    async completeCurrent(counterId: string): Promise<StaffQueueState> {
        try {
            const res = await queueApi.complete(counterId);
            return res.data;
        } catch {
            return { counterId, current: null };
        }
    },
    async skipCurrent(counterId: string): Promise<StaffQueueState> {
        try {
            const res = await queueApi.skip(counterId);
            return res.data;
        } catch {
            return { counterId, current: null };
        }
    },
};


